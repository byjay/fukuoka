
import { GoogleGenAI } from "@google/genai";
import { Place, ItineraryOption, TripSettings } from "../types";

const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper to parse price string to number for sorting
const parsePrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    const clean = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
};

export const fetchPlacesByCategory = async (
  city: string, 
  country: string,
  category: string,
  tripSettings: TripSettings,
  excludeNames: string[] = []
): Promise<{ places: Place[], rawText: string }> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Format exclusions
  const exclusionNote = excludeNames.length > 0 
    ? `\nIMPORTANT EXCLUSION: Do NOT include these places: ${excludeNames.join(", ")}.`
    : "";

  const prompt = `
    Task: Act as a professional travel data scraper for ${city}, ${country}.
    Target Category: "${category}"
    Quantity: Exactly 30 distinct, high-quality locations.
    ${exclusionNote}
    
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

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    const text = response.text || "";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const places: Place[] = [];
    const rawItems = text.split("---ITEM START---").slice(1);

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
            finalNameEn = finalNameEn.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            let finalNameKo = nameKoMatch ? nameKoMatch[1].trim() : finalNameEn;
            
            const rating = ratingMatch ? ratingMatch[1].trim() : "4.5";
            const price = priceMatch ? priceMatch[1].trim() : "Moderate";
            const priceNum = parsePrice(price);
            const address = addressMatch ? addressMatch[1].trim() : city;
            
            const hours = hoursMatch ? hoursMatch[1].trim() : "10:00 - 20:00";
            const fee = feeMatch ? feeMatch[1].trim() : "";
            const menu = menuMatch ? menuMatch[1].trim() : "";
            const tips = tipsMatch ? tipsMatch[1].trim() : "";
            const essentials = essentialsMatch ? essentialsMatch[1].trim() : "";

            let reviewEn = reviewEnMatch ? reviewEnMatch[1].trim().replace(/\n/g, ' ') : "No details.";
            let reviewKo = reviewKoMatch ? reviewKoMatch[1].trim().replace(/\n/g, ' ') : "정보 없음.";

            // Grounding Logic
            const chunk = chunks.find(c => 
                c.web?.title && (
                    c.web.title.toLowerCase().includes(finalNameEn.toLowerCase()) || 
                    finalNameEn.toLowerCase().includes(c.web.title.toLowerCase())
                )
            );

            let mapLink = "";
            if (chunk && chunk.web?.uri) {
                mapLink = chunk.web.uri;
            } else {
                mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(finalNameEn + " " + city)}`;
            }

            // Photo Search Logic
            let searchKeywords = "";
            const lowerCat = category.toLowerCase();
            if (lowerCat.includes("restaurant") || lowerCat.includes("food")) {
                searchKeywords = "food dish menu delicious close-up -people";
            } else if (lowerCat.includes("cafe")) {
                searchKeywords = "coffee dessert interior aesthetic -people";
            } else if (lowerCat.includes("shopping")) {
                searchKeywords = "store interior products shelf -people";
            } else {
                searchKeywords = "scenery landscape view architecture -people";
            }

            const photoSearchLink = `https://www.google.com/search?tbm=isch&tbs=isz:l&q=${encodeURIComponent(city + " " + country + " " + finalNameEn + " " + searchKeywords)}`;
            
            // File Name Generation (Strict English)
            const safeName = finalNameEn.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
            const safeCategory = category.split('(')[0].trim().replace(/[^a-zA-Z0-9]/g, '');
            const randomSuffix = Math.floor(Math.random() * 1000);
            const imageFileName = `${safeCategory}_${safeName}_${randomSuffix}.jpg`;

            const placeObj: Place = {
                id: generateId(),
                category: category,
                name_en: finalNameEn,
                name_ko: finalNameKo,
                summary_en: reviewEn,
                summary_ko: reviewKo,
                location: address,
                rating: rating,
                priceLevel: price,
                priceNum: priceNum,
                mapLink: mapLink,
                photoSearchLink: photoSearchLink,
                sourceTitle: finalNameEn,
                imageFileName: imageFileName,
                operatingHours: hours,
                ticketInfo: fee,
                menuInfo: menu,
                travelTips: tips,
                essentialItems: essentials
            };

            places.push(placeObj);
        }
    });

    return { places, rawText: text };
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    throw error;
  }
};

export const generateItinerary = async (
    city: string, 
    country: string,
    places: Place[],
    settings: TripSettings
): Promise<ItineraryOption[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY is not defined");
  const ai = new GoogleGenAI({ apiKey });

  const placeList = places.map(p => `- ${p.name_en} (${p.category})`).join("\n");

  const prompt = `
    Task: Create 5 DIFFERENT travel itinerary options for ${city}, ${country}.
    
    User Settings:
    - Origin Airport: ${settings.originCity} (Code: ${settings.originCode})
    - Base Hotel: ${settings.hotel}
    - Duration: ${settings.days} days
    - Travel Style: ${settings.style}

    Constraint:
    - Output must be valid JSON strictly.
    - Create 5 distinct options (e.g., "Foodie Focus", "Relaxed & Scenic", "Classic Tour", etc.).
    - Include a BUDGET PLAN (Food, Transport, Tickets) in LOCAL CURRENCY + KRW estimate.
    - Include a PACKING LIST (Essentials for ${city}, ${country}) for shopping affiliates.
    
    CRITICAL FLIGHT ANALYSIS:
    - Analyze the route from ${settings.originCity} (${settings.originCode}) to ${city}.
    - Is there typically a direct flight?
    - If NOT (e.g. Daegu to Paris), provide a warning and recommend routing (e.g. "Transfer at Incheon").
    - Estimate round-trip flight cost (Economy) in KRW.
    
    JSON Structure:
    [
      {
        "id": 1,
        "title_en": "Option 1 Title",
        "title_ko": "옵션 1 제목",
        "description": "Short description",
        "flightAnalysis": {
            "origin": "${settings.originCode}",
            "destination": "${city}",
            "isDirectLikely": true/false,
            "warningMessage": "Warning if no direct flight",
            "recommendedRoute": "Direct or via Incheon",
            "estPrice": "Approx Flight Price"
        },
        "budget": {
            "currency": "JPY",
            "exchangeRate": 9.0,
            "foodCost": 5000,
            "transportCost": 1000,
            "ticketCost": 2000,
            "totalLocal": 8000,
            "totalKrw": 72000
        },
        "packingList": [
            { "item": "110V Adapter", "category": "Electronics", "reason": "Voltage difference" }
        ],
        "days": [
           {
             "day": 1,
             "items": [
               {
                 "timeOfDay": "Morning",
                 "placeName": "Name",
                 "description_en": "Reason",
                 "description_ko": "이유",
                 "alternatives": [
                    { "name": "Alt 1", "type": "Food", "reason": "Reason" }
                 ]
               }
             ]
           }
        ]
      }
    ]

    Available Places (Use these if relevant, or suggest famous spots):
    ${placeList}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    const jsonText = response.text || "[]";
    const options = JSON.parse(jsonText);
    
    return options.map((option: any) => ({
      ...option,
      days: option.days.map((day: any) => ({
        ...day,
        items: day.items.map((item: any) => {
          const originalPlace = places.find(p => 
              p.name_en.toLowerCase().includes(item.placeName.toLowerCase()) || 
              item.placeName.toLowerCase().includes(p.name_en.toLowerCase())
          );
          
          return {
            ...item,
            placeId: originalPlace ? originalPlace.id : generateId(),
            placeName: originalPlace ? originalPlace.name_en : item.placeName,
          };
        })
      }))
    }));

  } catch (error) {
    console.error("Itinerary Generation Error", error);
    return [];
  }
};
