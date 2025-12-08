// ui_core.js - Core Logic for Hybrid Travel Platform

// --- CONFIG ---
const ASSET_BASE = './images'; // or Unsplash URL logic
const DATA_BASE = './data';

// --- UTILS ---
const getUrlParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

const formatPrice = (level) => {
    switch (level) {
        case 'Cheap': return '$';
        case 'Moderate': return '$$';
        case 'Expensive': return '$$$';
        default: return level || '$$';
    }
};

// --- RENDERERS ---

/**
 * Renders a standard place card for the grid view
 */
const renderPlaceCard = (place) => {
    // Fallback image if none provided
    const imgUrl = (place.images && place.images.length > 0)
        ? place.images[0]
        : `https://source.unsplash.com/400x300/?${place.type},${place.area}`;

    return `
        <div class="card">
            <img src="${imgUrl}" alt="${place.name_en}" class="card-image" loading="lazy">
            <div class="card-content">
                <div class="card-meta">
                    <span>${place.type}</span>
                    <span>⭐ ${place.rating.split(' ')[0]}</span>
                </div>
                <h3 class="card-title">${place.name} <br><small style="opacity:0.7">${place.name_en}</small></h3>
                <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 10px;">${place.desc.substring(0, 100)}...</p>
                <div style="display: flex; gap: 10px; font-size: 0.8rem;">
                    <span style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">${place.area}</span>
                    <span style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">${place.priceLevel || '$$'}</span>
                </div>
                <a href="${place.mapUrl}" target="_blank" style="display: block; margin-top: 15px; color: var(--accent-color); font-size: 0.9rem;">View on Map &rarr;</a>
            </div>
        </div>
    `;
};

/**
 * Renders a "Native Ad" or "Featured" card seamlessly into the stream
 */
const renderAdCard = (type) => {
    if (type === 'hotel') {
        return `
            <div class="ad-card">
                <span class="ad-label">Sponsored</span>
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200" class="ad-image" alt="Luxury Hotel">
                <div class="ad-content">
                    <h4>Stay in Style</h4>
                    <p style="font-size: 0.9rem; opacity:0.8; margin-bottom: 5px;">Experience the best local hospitality with our partner hotels.</p>
                    <a href="#" class="ad-cta">Check Rates</a>
                </div>
            </div>
        `;
    }
    if (type === 'gear') {
        return `
            <div class="ad-card">
                <span class="ad-label">Essential Gear</span>
                <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200" class="ad-image" alt="Travel Bag">
                <div class="ad-content">
                    <h4>Pack Like a Pro</h4>
                    <p style="font-size: 0.9rem; opacity:0.8; margin-bottom: 5px;">Don't forget the essentials for this trip.</p>
                    <a href="#" class="ad-cta">Shop Now</a>
                </div>
            </div>
        `;
    }
    return '';
};

// --- DATA HANDLING ---
const loadCityData = async (cityCode) => {
    const scriptId = `data-script-${cityCode}`;
    if (document.getElementById(scriptId)) return window.places; // Already loaded

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.id = scriptId;
        // The generator saves files as "osaka_data.js"
        script.src = `./data/${cityCode}_data.js`;

        script.onload = () => {
            if (typeof window.places !== 'undefined') {
                resolve(window.places);
            } else {
                reject(new Error("Data file loaded but 'places' variable not found."));
            }
        };
        script.onerror = () => reject(new Error(`Failed to load data for ${cityCode}`));
        document.body.appendChild(script);
    });
};

// --- EXPORT ---
window.HybridUI = {
    renderPlaceCard,
    renderAdCard,
    loadCityData,
    getUrlParam
};
