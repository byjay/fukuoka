const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require("@google/genai");
const DESTINATIONS = require('./destinations');
require('dotenv').config({ path: './.env.local' }); // Load from .env.local

// LOAD API KEYS
const API_KEYS = (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "").split(',').map(k => k.trim()).filter(k => k);

if (API_KEYS.length === 0) {
    console.error("Error: GEMINI_API_KEYS is not set in .env.local");
    process.exit(1);
}

// Key Rotation Helper
let currentKeyIndex = 0;
const getNextKey = () => {
    const key = API_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    return key;
};

const getAiClient = (key) => new GoogleGenAI({ apiKey: key });

// Constants
const TARGET_CATEGORIES = [
    { id: 'restaurants', name: 'Restaurants (맛집)', type_display: '맛집' },
    { id: 'cafes', name: 'Cafes (카페)', type_display: '카페' },
    { id: 'sightseeing', name: 'Sightseeing (관광지)', type_display: '관광' },
    { id: 'shopping', name: 'Shopping (쇼핑)', type_display: '쇼핑' }
];

const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper to parse price string to number for sorting
const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const clean = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
};

// --- DATA FETCHING LOGIC (Ported from geminiService.ts) ---
async function fetchPlacesByCategory(city, country, categoryObj) {
    const category = categoryObj.name;
    const prompt = `
    Task: Act as a professional travel data scraper for ${city}, ${country}.
    Target Category: "${category}"
    Quantity: Exactly 30 distinct, high-quality locations.
    
    Language Requirement: 
    - Provide BOTH English and Korean data.
    - If the local language is not English, transliterate or use the official English name for PLACE_EN.
    
    For EACH location, strictly follow this format:
    
    ---ITEM START---
    PLACE_EN: [Official English Name]
    PLACE_KO: [Official Korean Name]
    RATING: [Estimate rating 4.0-5.0]
    PRICE: [Price level: Cheap / Moderate / Expensive or Actual Cost]
    ADDRESS: [Full Address in English]
    
    INFO_HOURS: [Opening Hours, e.g., 10:00 - 22:00 or "24 Hours"]
    INFO_FEE: [Entrance Fee or "Free" or avg price per person]
    INFO_MENU: [CRITICAL: List 3-5 signature menu items with approx LOCAL prices. e.g. "Tonkotsu Ramen (¥980), Gyoza (¥400)"]
    
    TIPS: [Practical travel tips. e.g. "Cash Only", "Reserve in advance", "Best sunset view spot"]
    ESSENTIALS: [Specific items to buy/bring for this place. e.g. "Portable Fan", "Water Shoes", "110V Adapter"]

    REVIEW_EN: [Concise review in English (max 150 chars)]
    REVIEW_KO: [Concise review in Korean (max 100 chars)]
    ---ITEM END---

    Requirements:
    1. Output EXACTLY 30 items.
    2. "PLACE_EN" must be English alphabet only (No special chars).
  `;

    let attempts = 0;
    const maxAttempts = API_KEYS.length * 2; // Try through all keys twice

    while (attempts < maxAttempts) {
        try {
            const currentKey = getNextKey();
            const ai = getAiClient(currentKey);
            // console.log(`Using Key: ...${currentKey.slice(-4)} for ${category}`);

            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: prompt,
            });

            const text = response.text() || "";
            const rawItems = text.split("---ITEM START---").slice(1);
            const places = [];

            rawItems.forEach((item) => {
                const nameEnMatch = item.match(/PLACE_EN:\s*(.*?)(?=\n|PLACE_KO:)/);
                const nameKoMatch = item.match(/PLACE_KO:\s*(.*?)(?=\n|RATING:)/);
                const ratingMatch = item.match(/RATING:\s*(.*?)(?=\n|PRICE:)/);
                const priceMatch = item.match(/PRICE:\s*(.*?)(?=\n|ADDRESS:)/);
                const addressMatch = item.match(/ADDRESS:\s*(.*?)(?=\n|INFO_HOURS:)/);

                const hoursMatch = item.match(/INFO_HOURS:\s*(.*?)(?=\n|INFO_FEE:)/);
                const feeMatch = item.match(/INFO_FEE:\s*(.*?)(?=\n|INFO_MENU:|TIPS:)/);
                const menuMatch = item.match(/INFO_MENU:\s*(.*?)(?=\n|TIPS:)/);
                const tipsMatch = item.match(/TIPS:\s*(.*?)(?=\n|ESSENTIALS:)/);
                const essentialsMatch = item.match(/ESSENTIALS:\s*(.*?)(?=\n|REVIEW_EN:)/);

                const reviewEnMatch = item.match(/REVIEW_EN:\s*(.*?)(?=\n|REVIEW_KO:)/);
                const reviewKoMatch = item.match(/REVIEW_KO:\s*(.*?)(?=\n|---ITEM END---|$)/s);

                if (nameEnMatch) {
                    let finalNameEn = nameEnMatch[1].trim();
                    finalNameEn = finalNameEn.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove accents

                    let finalNameKo = nameKoMatch ? nameKoMatch[1].trim() : finalNameEn;
                    const rating = ratingMatch ? ratingMatch[1].trim() : "4.5";
                    const price = priceMatch ? priceMatch[1].trim() : "Moderate";
                    const address = addressMatch ? addressMatch[1].trim() : city;
                    const hours = hoursMatch ? hoursMatch[1].trim() : "10:00 - 20:00";
                    const fee = feeMatch ? feeMatch[1].trim() : "";
                    const menu = menuMatch ? menuMatch[1].trim() : "";
                    const tips = tipsMatch ? tipsMatch[1].trim() : "";
                    const essentials = essentialsMatch ? essentialsMatch[1].trim() : "";
                    let reviewEn = reviewEnMatch ? reviewEnMatch[1].trim().replace(/\n/g, ' ') : "No details.";
                    let reviewKo = reviewKoMatch ? reviewKoMatch[1].trim().replace(/\n/g, ' ') : "정보 없음.";

                    const safeCategory = category.split('(')[0].trim().toLowerCase();
                    const keywords = `${city},${safeCategory},${finalNameEn.split(' ')[0]}`.replace(/\s+/g, ',');

                    const placeObj = {
                        id: generateId(),
                        area: city.split('(')[0].trim(),
                        type: categoryObj.type_display,
                        name: finalNameKo,
                        name_en: finalNameEn,
                        rating: `${rating} (${Math.floor(Math.random() * 5000) + 500})`,
                        desc: reviewKo,
                        menu: menu,
                        reviews: reviewKo,
                        info: hours,
                        transport: address,
                        mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(finalNameEn + " " + city)}`,
                        images: [
                            `https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=500&q=80`
                        ],
                        detail_data: {
                            menuInfo: menu,
                            tips: tips,
                            essentials: essentials,
                            ticketInfo: fee,
                            summary_en: reviewEn
                        }
                    };

                    if (placeObj.menu.includes(',')) {
                        const items = placeObj.menu.split(',').map(i => `<li>${i.trim()}</li>`).join('');
                        placeObj.menu = `<ul class='menu-list'>${items}</ul>`;
                    }

                    places.push(placeObj);
                }
            });

            if (places.length > 0) return places;
            throw new Error("No places parsed from response");

        } catch (error) {
            console.error(`Error with key Attempt ${attempts + 1}/${maxAttempts} for ${category}: ${error.message}`);
            attempts++;
            if (attempts >= maxAttempts) {
                console.error(`Failed to generate data for ${city} - ${category} after multiple attempts.`);
                return [];
            }
            // Wait a significant time before retrying with next key (API asks for ~50s)
            console.log("Rate limit hit or error. Rotating key and waiting 60s...");
            await new Promise(resolve => setTimeout(resolve, 60000));
        }
    }
    return [];
}

// --- MAIN GENERATION LOOP ---
async function generateCityData(targetCityKey) {
    let targetCountry = "";
    let targetCity = "";

    // Find the city in DESTINATIONS
    console.log(`Searching for city: ${targetCityKey}`);
    for (const [country, cities] of Object.entries(DESTINATIONS)) {
        const found = cities.find(c => c.toLowerCase().includes(targetCityKey.toLowerCase()));
        if (found) {
            targetCountry = country;
            targetCity = found;
            break;
        }
    }

    if (!targetCity) {
        console.error("City not found in destinations list.");
        return;
    }

    console.log(`\n============== STARTING GENERATION FOR: ${targetCity} (${targetCountry}) ==============`);

    let allplaces = [];

    // Sequential execution to avoid 429 Rate Limit (Free Tier)
    for (const cat of TARGET_CATEGORIES) {
        console.log(`Fetching ${cat.name}...`);

        const places = await fetchPlacesByCategory(targetCity, targetCountry, cat);
        allplaces = [...allplaces, ...places];

        // Add a safety delay between categories even if successful
        if (allplaces.length > 0) {
            console.log("Waiting 10 seconds before next category...");
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    }

    console.log(`Collected ${allplaces.length} places total.`);

    // --- SAVE DATA ---
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    const cityCode = targetCity.split('(')[0].trim().toLowerCase().replace(/\s+/g, '_');
    const filename = `${cityCode}_data.js`;
    const filePath = path.join(dataDir, filename);

    const fileContent = `const places = ${JSON.stringify(allplaces, null, 4)};\n\nif (typeof module !== 'undefined') module.exports = places;`;

    fs.writeFileSync(filePath, fileContent);
    console.log(`Saved data to ${filePath}`);
}

// CLI Handling
const args = process.argv.slice(2);
const cityArg = args[0];

if (cityArg) {
    generateCityData(cityArg);
} else {
    console.log("Usage: node generate_global.js [city_name_fragment]");
    console.log("Example: node generate_global.js osaka");
}
