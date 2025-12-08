// scripts/affiliates.js
// Extracted from App.tsx

const AFFILIATE_PROGRAMS = [
    {
        key: 'agodaId',
        name: 'Agoda (아고다)',
        type: 'hotel',
        icon: '🏨',
        baseUrl: 'https://www.agoda.com/partners/partnersearch.aspx',
        // Example logic for generating link
        generateLink: (cid, city) => `https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=${cid}&city=${city}`
    },
    {
        key: 'klookId',
        name: 'Klook (클룩)',
        type: 'activity',
        icon: '🎫',
        baseUrl: 'https://www.klook.com/',
        generateLink: (aid, city) => `https://www.klook.com/search?aid=${aid}&city=${city}`
    },
    {
        key: 'coupangId',
        name: 'Coupang (쿠팡)',
        type: 'shopping',
        icon: '🛍️',
        baseUrl: 'https://coupa.ng/',
        generateLink: (id, keyword) => `https://coupa.ng/${id}` // Simplified
    },
    {
        key: 'tripId',
        name: 'Trip.com (트립닷컴)',
        type: 'flight',
        icon: '✈️',
        baseUrl: 'https://kr.trip.com/',
        generateLink: (id, city) => `https://kr.trip.com/?Allianceid=${id}`
    }
];

// Default Affiliate IDs (Placeholders - User should update these)
const DEFAULT_AFFILIATES = {
    agodaId: '1922247', // Example ID
    klookId: '34567',
    coupangId: 'CA12345',
    tripId: '98765'
};

const AffiliateManager = {
    getLink: (type, city_en) => {
        // Simple logic to return a random affiliate link for the type
        const prog = AFFILIATE_PROGRAMS.find(p => p.type === type) || AFFILIATE_PROGRAMS[0];
        const id = DEFAULT_AFFILIATES[prog.key];
        // In a real app, city_en would need to be mapped to specific IDs
        return prog.generateLink(id, city_en);
    },

    renderBanner: (type) => {
        if (type === 'hotel') {
            return `
                <div class="affiliate-banner hotel">
                    <div class="aff-icon">🏨</div>
                    <div class="aff-text">
                        <strong>Best Hotel Deals</strong>
                        <span>Save up to 80% with Agoda</span>
                    </div>
                    <a href="${AffiliateManager.getLink('hotel', 'Fukuoka')}" target="_blank" class="aff-btn">Check Prices</a>
                </div>
            `;
        }
        if (type === 'activity') {
            return `
                <div class="affiliate-banner activity">
                    <div class="aff-icon">🎫</div>
                    <div class="aff-text">
                        <strong>Klook Activities</strong>
                        <span>Skip the line tickets & tours</span>
                    </div>
                    <a href="${AffiliateManager.getLink('activity', 'Fukuoka')}" target="_blank" class="aff-btn">Book Now</a>
                </div>
            `;
        }
        return '';
    }
};

window.AffiliateManager = AffiliateManager;
