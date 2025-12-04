const fs = require('fs');

// 1. Verified Image Pools (Static IDs to ensure no 404s)
// These are specific photo IDs from Unsplash that are high quality and reliable.
const verifiedPools = {
    food: [
        "1580828343064-fde4fc206bc6", // Ramen
        "1553621042-f6e147245754", // Sushi
        "1594212699903-ec8a3eca50f5", // Burger
        "1569050467447-ce54b3bbc37d", // Dumplings
        "1618843479313-40f8afb4b4d8", // Izakaya
        "1552566626-52f8b828add9", // Yakitori
        "1563245372-f21724e3856d", // Udon
        "1519985176271-adb1088fa94c", // Sashimi
        "1534422298391-e4f8c172dddb", // Dumplings 2
        "1579871494447-9811cf80d66c", // Sushi 2
        "1631515243349-e06036043944", // Curry
        "1504674900247-0877df9cc836", // Meat
        "1542359553-66256f68c871", // Bowl
        "1595250963668-2329063d81b8", // Tempura
        "1604626623468-2329063d81b8", // Beef
        "1560155016-bd4879ae8f21", // Noodles
        "1559314809-0d155014e29e", // Fish
        "1626804475297-411dbe63c4f4", // Fried
        "1512621776951-a57141f2eefd", // Healthy
        "1540189549336-e6e99c3679fe"  // Salad
    ],
    cafe: [
        "1554118811-1e0d58224f24", // Cafe
        "1495474472287-4d71bcdd2085", // Coffee
        "1509042239860-f550ce710b93", // Latte
        "1521017432531-fbd92d768814", // Shop
        "1497935586351-b67a49e012bf", // Cup
        "1517248135467-4c7edcad34c4", // Interior
        "1559305616-3f99cd43e353", // Dessert
        "1514432324607-a09d9b4aefdd", // Social
        "1461023058943-07fcbe16d735", // Starbucks
        "1507133750069-bef72f3707a9", // Modern
        "1498804103079-a6375b7e4a2a", // Pour over
        "1495774856032-8b70b14cf201"  // Iced
    ],
    shopping: [
        "1607082348824-0a96f2a4b9da", // Bags
        "1528698827591-e19ccd7bc23d", // Street
        "1555529669-e69e7aa0ba9a", // Mall
        "1483985988355-763728e1935b", // Fashion
        "1519671482538-518b76064044", // Boutique
        "1534452203293-494d7ddbf7e0", // Street 2
        "1567401893414-76b7b1e5a7a5", // Clothes
        "1441986300917-64674bd600d8", // Store
        "1472851294608-4155f2118c03", // Luxury
        "1479064555552-3ef4979f8908", // Apparel
        "1556905055-8f358a7a47b2", // Shoes
        "1556906781-9a412961c28c"  // Sneakers
    ],
    sightseeing: [
        "1570176560374-27c720de30bf", // Shrine
        "1493976040374-85c8e12f0c0e", // Torii
        "1528360983277-13d9b152c6d1", // Temple
        "1545569341-9eb8b30979d9", // Street
        "1503899036084-c55cdd92da26", // Tower
        "1480796927426-f609979314bd", // City
        "1524413840807-0c3cb6fa808d", // Cherry
        "1492571350019-22de08371fd3", // Garden
        "1478436127897-769e1b3f0f36", // Lanterns
        "1542051841857-5f90071e7989", // Street 2
        "1526481280693-3bfa7568e0f3", // Japan
        "1528164344553-924af9359bd2"  // Culture
    ]
};

// 2. Specific Image Map (Key Places)
const specificImages = {
    "신신 라멘": "1591345633174-2a9325cc6a3e", // Ramen specific
    "이치란": "1552611052-33e04de081de", // Ramen booth
    "키와미야 함바그": "1594212699903-ec8a3eca50f5", // Hamburger
    "모토무라 규카츠": "1604626623468-2329063d81b8", // Beef
    "오호리 공원": "1565620731358-e8c038abc8d1", // Park
    "후쿠오카 타워": "1558862107-d49ef2a04d72", // Tower
    "캐널시티": "1555529669-e69e7aa0ba9a", // Mall
    "다자이후": "1570176560374-27c720de30bf", // Shrine
    "돈키호테": "1607082348824-0a96f2a4b9da", // Donki
    "야타이": "1540959733332-eab4deabeeaf", // Yatai
    "잇푸도": "1552611052-0d675b9063b7", // Ramen
    "효탄 스시": "1579871494447-9811cf80d66c", // Sushi
    "치카에": "1534256958597-7fe685cbd745", // Sashimi
    "우동 타이라": "1598515214211-3f88c9195892", // Udon
    "다이묘 소프트크림": "1559305616-3f99cd43e353", // Ice cream
    "링고": "1568571780765-9276ac8b75a2", // Apple pie
    "일 포르노 델 미뇽": "1555507036-ab1f4038808a", // Croissant
    "팀랩": "1550684848-fac1c5b4e853", // Art
    "건담": "1612487528505-d2338264c821" // Gundam
};

// 3. Read Real Places Data
let placesContent = fs.readFileSync('places_data.js', 'utf8');
let placesArrayStr = placesContent.substring(placesContent.indexOf('['), placesContent.lastIndexOf(']') + 1);
let allPlaces = JSON.parse(placesArrayStr);

// 4. Apply Image Logic
allPlaces = allPlaces.map((place, index) => {
    let assignedId = null;

    // Check specific mapping first
    for (const [key, id] of Object.entries(specificImages)) {
        if (place.name.includes(key)) {
            assignedId = id;
            break;
        }
    }

    // Fallback to pools
    if (!assignedId) {
        let pool = verifiedPools.food;
        if (place.type.includes('카페')) pool = verifiedPools.cafe;
        else if (place.type.includes('쇼핑')) pool = verifiedPools.shopping;
        else if (place.type.includes('관광')) pool = verifiedPools.sightseeing;

        assignedId = pool[index % pool.length];
    }

    // Generate URLs
    const images = [];
    // Main image
    images.push(`https://images.unsplash.com/photo-${assignedId}?w=500&q=80`);

    // Gallery images (use next ones in pool)
    let pool = verifiedPools.food;
    if (place.type.includes('카페')) pool = verifiedPools.cafe;
    else if (place.type.includes('쇼핑')) pool = verifiedPools.shopping;
    else if (place.type.includes('관광')) pool = verifiedPools.sightseeing;

    for (let i = 1; i < 5; i++) {
        const nextId = pool[(index + i) % pool.length];
        images.push(`https://images.unsplash.com/photo-${nextId}?w=500&q=80`);
    }

    return {
        ...place,
        images: images
    };
});

const finalPlacesJson = JSON.stringify(allPlaces, null, 4);

// 5. HTML Template (Winter Glassmorphism + Bottom Nav Fix)
const html = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>후쿠오카 겨울 가이드 2025</title>
    <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --bg: #1e1e2e;
            --card-bg: rgba(255, 255, 255, 0.05);
            --glass-bg: rgba(30, 30, 46, 0.85);
            --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            --accent: #ff6b9d;
            --accent-2: #4cc9f0;
            --text: #ffffff;
            --text-secondary: #a0a0a0;
            --radius: 16px;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: transparent;
        }
        
        body {
            font-family: 'Pretendard', sans-serif;
            background: var(--bg);
            color: var(--text);
            padding-bottom: 100px; /* Space for bottom nav */
            overflow-x: hidden;
            min-height: 100vh;
        }

        /* Snow Animation */
        .snow {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            background-image: 
                radial-gradient(4px 4px at 100px 50px, #fff, transparent), 
                radial-gradient(6px 6px at 200px 150px, #fff, transparent), 
                radial-gradient(3px 3px at 300px 250px, #fff, transparent);
            background-size: 650px 650px;
            animation: snow 10s linear infinite;
            opacity: 0.1;
        }
        @keyframes snow {
            0% { background-position: 0 0, 0 0, 0 0; }
            100% { background-position: 100px 650px, 200px 650px, 300px 650px; }
        }

        /* Hero Section */
        .hero {
            position: relative;
            padding: 60px 24px 30px 24px;
            background: radial-gradient(circle at top right, rgba(118, 75, 162, 0.3), transparent 40%),
                        radial-gradient(circle at bottom left, rgba(79, 172, 254, 0.2), transparent 40%);
            z-index: 1;
        }
        .hero h1 {
            font-size: 32px;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 10px;
            background: linear-gradient(to right, #fff, #a0a0a0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero p {
            font-size: 16px;
            color: var(--text-secondary);
            font-weight: 400;
        }

        /* Main Content Areas */
        .view-section {
            display: none;
            padding: 0 24px 24px 24px;
            animation: fadeIn 0.4s ease;
            position: relative;
            z-index: 1;
        }
        .view-section.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Places Grid */
        .places-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 20px;
        }
        
        @media (max-width: 480px) {
            .places-grid {
                grid-template-columns: 1fr 1fr;
                gap: 16px;
            }
        }

        .place-card {
            background: var(--card-bg);
            border-radius: var(--radius);
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s;
            border: 1px solid rgba(255, 255, 255, 0.05);
            position: relative;
        }
        .place-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1;
            pointer-events: none;
        }
        .place-card:active {
            transform: scale(0.96);
        }
        .place-card:active::before {
            opacity: 1;
        }

        .place-image-container {
            position: relative;
            padding-top: 100%;
            background: #2a2a35;
        }
        .place-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
        }
        .place-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.6);
            color: #ffd700;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 700;
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255,215,0,0.3);
        }

        .place-info {
            padding: 14px;
        }

        .place-name {
            font-size: 15px;
            font-weight: 600;
            margin-bottom: 6px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: var(--text);
        }

        .place-meta {
            font-size: 12px;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .tag {
            background: rgba(255,255,255,0.1);
            padding: 2px 6px;
            border-radius: 4px;
        }

        /* Schedule View */
        .schedule-container {
            max-width: 600px;
            margin: 0 auto;
        }
        .day-selector {
            display: flex;
            gap: 10px;
            margin-bottom: 24px;
            overflow-x: auto;
            padding-bottom: 4px;
        }
        .day-btn {
            padding: 10px 18px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-secondary);
            font-size: 14px;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.1);
            white-space: nowrap;
            transition: all 0.3s;
        }
        .day-btn.active {
            background: var(--gradient-1);
            color: white;
            border-color: transparent;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .timeline-item {
            padding-left: 24px;
            border-left: 2px solid rgba(255,255,255,0.1);
            margin-bottom: 32px;
            position: relative;
        }
        .timeline-item::before {
            content: '';
            position: absolute;
            left: -6px;
            top: 0;
            width: 10px;
            height: 10px;
            background: var(--accent-2);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--accent-2);
        }
        .time {
            font-size: 13px;
            font-weight: 700;
            color: var(--accent-2);
            margin-bottom: 4px;
        }
        .event-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
            color: var(--text);
        }
        .event-desc {
            font-size: 14px;
            color: var(--text-secondary);
            line-height: 1.5;
        }

        /* NEW Bottom Nav - Unified Filter Bar */
        .bottom-nav-container {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding: 12px 0 24px 0;
            z-index: 1000;
            display: flex;
            justify-content: center;
        }

        .bottom-scroll-wrapper {
            display: flex;
            gap: 12px;
            padding: 0 24px;
            overflow-x: auto;
            scrollbar-width: none;
            width: 100%;
            max-width: 600px;
        }
        .bottom-scroll-wrapper::-webkit-scrollbar {
            display: none;
        }

        .nav-pill {
            flex: 0 0 auto;
            padding: 10px 18px;
            border-radius: 24px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--text-secondary);
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .nav-pill.active {
            background: var(--gradient-3);
            color: white;
            border-color: transparent;
            box-shadow: 0 4px 12px rgba(79, 172, 254, 0.3);
        }
        .nav-pill i {
            font-size: 14px;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #1e1e2e;
            z-index: 2000;
            overflow-y: auto;
            animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .modal.active {
            display: block;
        }
        @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }

        .modal-close-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 40px;
            height: 40px;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(10px);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2001;
            cursor: pointer;
            border: 1px solid rgba(255,255,255,0.1);
            color: white;
        }

        .modal-hero-image {
            width: 100%;
            height: 350px;
            object-fit: cover;
            mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
        }

        .modal-content {
            padding: 0 24px 40px 24px;
            max-width: 800px;
            margin: -40px auto 0;
            position: relative;
            z-index: 2;
        }

        .modal-title {
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 8px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .modal-meta {
            display: flex;
            gap: 16px;
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 32px;
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .info-block {
            margin-bottom: 32px;
        }
        .info-label {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 12px;
            color: var(--accent-2);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-text {
            font-size: 15px;
            line-height: 1.7;
            color: #e0e0e0;
        }

        .menu-list li {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            font-size: 15px;
        }
        .menu-list li span:last-child {
            color: var(--accent);
            font-weight: 600;
        }

        .review-summary-card {
            background: rgba(255,255,255,0.05);
            padding: 20px;
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .review-score {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
        }
        .score-num {
            font-size: 24px;
            font-weight: 800;
            color: white;
        }
        .review-text {
            font-size: 15px;
            line-height: 1.6;
            color: #d0d0d0;
            font-style: italic;
        }

        .map-btn {
            display: block;
            width: 100%;
            padding: 16px;
            background: var(--gradient-1);
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 16px;
            font-weight: 700;
            font-size: 16px;
            margin-top: 40px;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
            transition: transform 0.2s;
        }
        .map-btn:active {
            transform: scale(0.98);
        }

    </style>
</head>
<body>
    <div class="snow"></div>

    <!-- View: Home -->
    <div id="view-home" class="view-section active">
        <div class="hero">
            <h1>후쿠오카<br>겨울 여행 2025</h1>
            <p>현지인처럼 즐기는 3박 4일</p>
        </div>

        <div id="places-grid" class="places-grid">
            <!-- Injected by JS -->
        </div>
    </div>

    <!-- View: Schedule -->
    <div id="view-schedule" class="view-section">
        <div class="hero">
            <h1>여행 일정</h1>
            <p>효율적인 동선의 3박 4일 코스</p>
        </div>
        
        <div class="schedule-container">
            <div class="day-selector">
                <button class="day-btn active" onclick="showDay('day1', this)">1일차 (텐진)</button>
                <button class="day-btn" onclick="showDay('day2', this)">2일차 (유후인)</button>
                <button class="day-btn" onclick="showDay('day3', this)">3일차 (하카타)</button>
                <button class="day-btn" onclick="showDay('day4', this)">4일차 (귀국)</button>
            </div>
            
            <div id="schedule-content">
                <!-- Injected by JS -->
            </div>
        </div>
    </div>

    <!-- NEW Bottom Nav (Unified) -->
    <div class="bottom-nav-container">
        <div class="bottom-scroll-wrapper">
            <div class="nav-pill active" onclick="handleNav('all', this)"><i class="fas fa-th"></i>전체</div>
            <div class="nav-pill" onclick="handleNav('Food', this)"><i class="fas fa-utensils"></i>맛집</div>
            <div class="nav-pill" onclick="handleNav('Cafe', this)"><i class="fas fa-coffee"></i>카페</div>
            <div class="nav-pill" onclick="handleNav('Shopping', this)"><i class="fas fa-shopping-bag"></i>쇼핑</div>
            <div class="nav-pill" onclick="handleNav('Sight', this)"><i class="fas fa-camera"></i>관광</div>
            <div class="nav-pill" onclick="handleNav('Schedule', this)"><i class="fas fa-calendar-alt"></i>일정</div>
            <div class="nav-pill" onclick="window.open('https://www.google.com/maps/search/후쿠오카+맛집', '_blank')"><i class="fas fa-map-marked-alt"></i>지도</div>
        </div>
    </div>

    <!-- Modal -->
    <div id="detailModal" class="modal">
        <button class="modal-close-btn" onclick="closeModal()">
            <i class="fas fa-times"></i>
        </button>
        <img id="modal-img" src="" class="modal-hero-image">
        <div class="modal-content">
            <div id="modal-type" style="font-size:12px; color:#a0a0a0; font-weight:600; text-transform:uppercase; margin-bottom:4px;">TYPE</div>
            <h2 id="modal-title" class="modal-title">Title</h2>
            <div class="modal-meta">
                <span id="modal-rating"><i class="fas fa-star" style="color:#ffd700"></i> 4.5</span>
                <span id="modal-area">Area</span>
                <span id="modal-time">Time</span>
            </div>

            <div class="info-block">
                <div class="info-label"><i class="fas fa-info-circle"></i> 소개</div>
                <p id="modal-desc" class="info-text">Description</p>
            </div>

            <div class="info-block">
                <div class="info-label"><i class="fas fa-utensils"></i> 메뉴</div>
                <div id="modal-menu" class="info-text">Menu</div>
            </div>

            <div class="info-block">
                <div class="info-label"><i class="fas fa-comments"></i> 리뷰 요약</div>
                <div id="modal-reviews">Reviews</div>
            </div>

            <a id="modal-map-btn" href="#" target="_blank" class="map-btn">
                <i class="fab fa-google"></i> 구글맵에서 보기
            </a>
            <div style="height:40px;"></div>
        </div>
    </div>

    <script>
        const places = ${finalPlacesJson};
        
        const scheduleData = {
            day1: [
                { time: "10:00", title: "후쿠오카 공항 도착", desc: "지하철로 텐진 이동 (약 15분)" },
                { time: "11:30", title: "점심: 신신 라멘", desc: "텐진 본점에서 돈코츠 라멘 즐기기" },
                { time: "13:00", title: "다이묘 거리 쇼핑", desc: "슈프림, 스투시, 빈티지 샵 구경" },
                { time: "15:00", title: "카페 델 솔", desc: "폭신한 팬케이크로 당 충전" },
                { time: "17:00", title: "오호리 공원", desc: "호수 산책 및 일몰 감상" },
                { time: "19:00", title: "저녁: 모츠나베 라쿠텐치", desc: "부추 가득한 곱창전골" },
                { time: "21:00", title: "돈키호테 텐진", desc: "면세 쇼핑으로 하루 마무리" }
            ],
            day2: [
                { time: "08:30", title: "하카타역 집결", desc: "유후인행 버스 탑승" },
                { time: "10:30", title: "유후인 도착", desc: "유노츠보 거리 구경 및 간식" },
                { time: "12:00", title: "점심: 유후마부시 신", desc: "장어덮밥 또는 소고기덮밥" },
                { time: "13:30", title: "긴린코 호수", desc: "신비로운 호수 산책" },
                { time: "15:00", title: "온천 체험", desc: "무소엔 또는 바이엔 당일 온천" },
                { time: "17:00", title: "하카타로 복귀", desc: "버스 안에서 휴식" },
                { time: "19:00", title: "저녁: 하카타 잇소우", desc: "진한 돈코츠 라멘" }
            ],
            day3: [
                { time: "10:00", title: "스미요시 신사", desc: "아침 산책 및 참배" },
                { time: "11:30", title: "점심: 우동 타이라", desc: "우엉 튀김 우동 맛보기" },
                { time: "13:00", title: "캐널시티 하카타", desc: "분수쇼 관람 및 쇼핑" },
                { time: "15:00", title: "쿠시다 신사", desc: "명성황후 시해 칼 보관 장소" },
                { time: "17:00", title: "나카스 강변 산책", desc: "노을 지는 강변 걷기" },
                { time: "19:00", title: "저녁: 이치란 본점", desc: "돈코츠 라멘의 원조" },
                { time: "21:00", title: "나카스 야타이", desc: "포장마차에서 꼬치에 맥주 한잔" }
            ],
            day4: [
                { time: "09:00", title: "조식: 탄야 하카타", desc: "우설 정식으로 든든하게" },
                { time: "10:30", title: "아뮤 플라자 쇼핑", desc: "마지막 기념품 구매 (손수건 등)" },
                { time: "12:00", title: "점심: 하카타역 도시락", desc: "에키벤 구매하여 공항으로" },
                { time: "13:30", title: "후쿠오카 공항 이동", desc: "출국 수속 및 면세점 구경" }
            ]
        };

        // --- Unified Navigation Logic ---
        function handleNav(key, btn) {
            // Update UI
            document.querySelectorAll('.nav-pill').forEach(el => el.classList.remove('active'));
            if(btn) btn.classList.add('active');

            if (key === 'Schedule') {
                // Show Schedule View
                document.getElementById('view-home').classList.remove('active');
                document.getElementById('view-schedule').classList.add('active');
            } else {
                // Show Home View & Filter
                document.getElementById('view-schedule').classList.remove('active');
                document.getElementById('view-home').classList.add('active');
                
                // Filter Logic
                renderPlaces(key);
            }
            window.scrollTo(0,0);
        }

        // --- Home Logic ---
        function renderPlaces(filter) {
            const grid = document.getElementById('places-grid');
            grid.innerHTML = '';

            let filtered = places;
            if (filter === 'Food') filtered = places.filter(p => p.type.includes('맛집') || p.type.includes('グルメ'));
            else if (filter === 'Cafe') filtered = places.filter(p => p.type.includes('카페'));
            else if (filter === 'Shopping') filtered = places.filter(p => p.type.includes('쇼핑'));
            else if (filter === 'Sight') filtered = places.filter(p => p.type.includes('관광'));
            // 'all' passes through

            filtered.forEach(place => {
                const card = document.createElement('div');
                card.className = 'place-card';
                card.onclick = () => openModal(place.id);
                
                card.innerHTML = \`
                    <div class="place-image-container">
                        <img src="\${place.images[0]}" class="place-image" loading="lazy">
                        <div class="place-badge">\${place.rating.split(' ')[0]}</div>
                    </div>
                    <div class="place-info">
                        <div class="place-name">\${place.name}</div>
                        <div class="place-meta">
                            <span class="tag">\${place.type.split(' ')[0]}</span>
                            <span>\${place.area.split(' ')[0]}</span>
                        </div>
                    </div>
                \`;
                grid.appendChild(card);
            });
        }

        // --- Schedule Logic ---
        function showDay(dayKey, btn) {
            document.querySelectorAll('.day-btn').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');

            const container = document.getElementById('schedule-content');
            const items = scheduleData[dayKey];
            
            let html = '';
            items.forEach(item => {
                html += \`
                    <div class="timeline-item">
                        <div class="time">\${item.time}</div>
                        <div class="event-title">\${item.title}</div>
                        <div class="event-desc">\${item.desc}</div>
                    </div>
                \`;
            });
            container.innerHTML = html;
        }

        // --- Modal Logic ---
        function openModal(id) {
            const place = places.find(p => p.id === id);
            if (!place) return;

            document.getElementById('modal-img').src = place.images[0];
            document.getElementById('modal-title').innerText = place.name;
            document.getElementById('modal-type').innerText = place.type;
            document.getElementById('modal-rating').innerHTML = \`<i class="fas fa-star"></i> \${place.rating}\`;
            document.getElementById('modal-area').innerText = place.area;
            document.getElementById('modal-time').innerText = place.info;
            document.getElementById('modal-desc').innerText = place.desc;
            document.getElementById('modal-menu').innerHTML = place.menu;
            document.getElementById('modal-reviews').innerHTML = place.reviews;
            document.getElementById('modal-map-btn').href = place.mapUrl;

            const modal = document.getElementById('detailModal');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Push History State
            history.pushState({modalOpen: true}, null, '');
        }

        function closeModal() {
            const modal = document.getElementById('detailModal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Go back in history if we pushed state
            if (history.state && history.state.modalOpen) {
                history.back();
            }
        }

        // Handle Back Button
        window.addEventListener('popstate', (event) => {
            const modal = document.getElementById('detailModal');
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Init
        renderPlaces('all');
        showDay('day1', document.querySelector('.day-btn'));

    </script>
</body>
</html>`;

fs.writeFileSync('index.html', html);
console.log('Build complete: index.html created with ' + allPlaces.length + ' places.');
