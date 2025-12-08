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
        <div class="card" onclick="HybridUI.openPlaceModal('${place.id}')">
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
                <button style="margin-top: 15px; background: transparent; border: 1px solid var(--accent-color); color: var(--accent-color); padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">View Details & Menu</button>
            </div>
        </div>
    `;
};

// --- MODAL LOGIC ---
const openPlaceModal = (id) => {
    // Find place data (assuming window.places or passed data)
    // We need a global lookup or pass the object. 
    // Since we are generating HTML strings, looking up by ID in global data is easiest.
    const place = window.allPlaceData ? window.allPlaceData.find(p => p.id === id) : null;
    if (!place) return;

    // Create Modal HTML
    const imgUrl = (place.images && place.images.length > 0) ? place.images[0] : `https://source.unsplash.com/800x600/?${place.type},${place.area}`;

    const modalHtml = `
        <div class="modal-overlay" id="place-modal" onclick="HybridUI.closePlaceModal(event)">
            <div class="modal-content">
                <button class="modal-close" onclick="HybridUI.closePlaceModal(event, true)">&times;</button>
                <img src="${imgUrl}" class="modal-image">
                
                <div class="modal-body">
                    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:20px;">
                        <div>
                            <span style="color:var(--accent-color); text-transform:uppercase; letter-spacing:1px; font-size:0.9rem;">${place.type} • ${place.area}</span>
                            <h2 style="font-family:var(--font-serif); font-size:2.5rem; margin:5px 0;">${place.name}</h2>
                            <h3 style="font-size:1.2rem; opacity:0.7; font-weight:300;">${place.name_en}</h3>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-size:1.5rem; color:var(--accent-color);">⭐ ${place.rating.split(' ')[0]}</div>
                            <div style="opacity:0.6;">${place.review_count || 'Local Favorite'}</div>
                        </div>
                    </div>

                    <p style="font-size:1.1rem; line-height:1.6; color:#ddd;">${place.desc}</p>
                    
                    <div class="modal-info-grid">
                        <div class="detail-section">
                            <h4 class="detail-title">🍽️ Signature Menu</h4>
                            <div style="opacity:0.9;">${place.menu || 'Explore the menu on site.'}</div>
                        </div>
                        
                        <div class="detail-section">
                            <h4 class="detail-title">💡 Travel Tips</h4>
                            <p>${place.detail_data?.tips || 'No specific tips.'}</p>
                            <div style="margin-top:10px; font-size:0.9rem; opacity:0.8;">
                                <strong>Essentials:</strong> ${place.detail_data?.essentials || '-'}
                            </div>
                        </div>

                        <div class="detail-section">
                            <h4 class="detail-title">📍 Info</h4>
                            <ul style="list-style:none; padding:0; line-height:2;">
                                <li><strong>Hours:</strong> ${place.info}</li>
                                <li><strong>Address:</strong> ${place.transport}</li>
                                <li><strong>Fee:</strong> ${place.detail_data?.ticketInfo || 'Free entry'}</li>
                            </ul>
                        </div>

                        <div class="detail-section">
                            <h4 class="detail-title">💬 Local Review</h4>
                            <p style="font-style:italic; opacity:0.8;">"${place.reviews || place.detail_data?.summary_en}"</p>
                        </div>
                    </div>

                    <a href="${place.mapUrl}" target="_blank" style="display:block; text-align:center; background:var(--accent-color); color:#000; padding:15px; font-weight:bold; border-radius:8px; margin-top:20px;">Open in Google Maps</a>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existing = document.getElementById('place-modal');
    if (existing) existing.remove();

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.getElementById('place-modal').style.display = 'flex';
};

const closePlaceModal = (e, force = false) => {
    if (force || e.target.id === 'place-modal') {
        const modal = document.getElementById('place-modal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    }
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
    getUrlParam,
    openPlaceModal,
    closePlaceModal
};
