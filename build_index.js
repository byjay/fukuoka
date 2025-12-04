const fs = require('fs');

// 1. Image Pools (High Quality Unsplash URLs)
const imagePools = {
    food: [
        "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=500&q=80", // Ramen generic
        "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80", // Sushi
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80", // Burger/Steak
        "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80", // Dumplings
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&q=80", // Izakaya food
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80", // Yakitori
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&q=80", // Udon
        "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=500&q=80", // Sashimi
        "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80", // Dumplings 2
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80", // Sushi 2
        "https://images.unsplash.com/photo-1631515243349-e06036043944?w=500&q=80", // Curry
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80", // General Food
        "https://images.unsplash.com/photo-1542359553-66256f68c871?w=500&q=80", // Bowl
        "https://images.unsplash.com/photo-1595250963668-2329063d81b8?w=500&q=80", // Tempura
        "https://images.unsplash.com/photo-1604626623468-2329063d81b8?w=500&q=80"  // Beef
    ],
    cafe: [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=80", // Cafe interior
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80", // Coffee
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80", // Latte art
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&q=80", // Cafe shop
        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&q=80", // Coffee cup
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80", // Restaurant/Cafe
        "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=500&q=80", // Dessert
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80", // Social cafe
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80", // Starbucks style
        "https://images.unsplash.com/photo-1507133750069-bef72f3707a9?w=500&q=80"  // Modern cafe
    ],
    shopping: [
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&q=80", // Shopping bags
        "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&q=80", // Tokyo street/shop
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&q=80", // Mall
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80", // Fashion
        "https://images.unsplash.com/photo-1519671482538-518b76064044?w=500&q=80", // Boutique
        "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&q=80", // Shopping street
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&q=80", // Clothes
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80", // Storefront
        "https://images.unsplash.com/photo-1472851294608-4155f2118c03?w=500&q=80", // Luxury
        "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=500&q=80"  // Apparel
    ],
    sightseeing: [
        "https://images.unsplash.com/photo-1570176560374-27c720de30bf?w=500&q=80", // Shrine
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80", // Torii gate
        "https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?w=500&q=80", // Temple
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500&q=80", // Japan street
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&q=80", // Tokyo tower style
        "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=500&q=80", // City view
        "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=500&q=80", // Cherry blossom
        "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=500&q=80", // Japanese garden
        "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=500&q=80", // Lanterns
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=500&q=80"  // Street
    ]
};

// 2. Specific Image Map (Key Places)
const specificImages = {
    "신신 라멘": "https://images.unsplash.com/photo-1591345633174-2a9325cc6a3e?w=500&q=80", // Ramen specific
    "이치란": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&q=80", // Ramen booth style
    "키와미야 함바그": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80", // Hamburger steak
    "모토무라 규카츠": "https://images.unsplash.com/photo-1604626623468-2329063d81b8?w=500&q=80", // Beef cutlet
    "오호리 공원": "https://images.unsplash.com/photo-1565620731358-e8c038abc8d1?w=500&q=80", // Park lake
    "후쿠오카 타워": "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=500&q=80", // Tower
    "캐널시티": "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&q=80", // Mall
    "다자이후": "https://images.unsplash.com/photo-1570176560374-27c720de30bf?w=500&q=80", // Shrine
    "돈키호테": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&q=80", // Donki vibe
    "야타이": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80", // Street food
    "잇푸도": "https://images.unsplash.com/photo-1552611052-0d675b9063b7?w=500&q=80",
    "효탄 스시": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80",
    "치카에": "https://images.unsplash.com/photo-1534256958597-7fe685cbd745?w=500&q=80",
    "우동 타이라": "https://images.unsplash.com/photo-1598515214211-3f88c9195892?w=500&q=80",
    "다이묘 소프트크림": "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=500&q=80",
    "링고": "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=500&q=80",
    "일 포르노 델 미뇽": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80",
    "팀랩": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80",
    "건담": "https://images.unsplash.com/photo-1612487528505-d2338264c821?w=500&q=80"
};

// 3. Read Real Places Data
let placesContent = fs.readFileSync('places_data.js', 'utf8');
let placesArrayStr = placesContent.substring(placesContent.indexOf('['), placesContent.lastIndexOf(']') + 1);
let allPlaces = JSON.parse(placesArrayStr);

// 4. Apply Image Logic to All Places
allPlaces = allPlaces.map((place, index) => {
    let assignedImage = null;
    for (const [key, url] of Object.entries(specificImages)) {
        if (place.name.includes(key)) {
            assignedImage = url;
            break;
        }
    }

    if (!assignedImage) {
        let pool = imagePools.food;
        if (place.type.includes('카페')) pool = imagePools.cafe;
        else if (place.type.includes('쇼핑')) pool = imagePools.shopping;
        else if (place.type.includes('관광')) pool = imagePools.sightseeing;

        const imageIndex = index % pool.length;
        assignedImage = pool[imageIndex];
    }

    const images = [assignedImage];
    let pool = imagePools.food;
    if (place.type.includes('카페')) pool = imagePools.cafe;
    else if (place.type.includes('쇼핑')) pool = imagePools.shopping;
    else if (place.type.includes('관광')) pool = imagePools.sightseeing;

    for (let i = 1; i < 5; i++) {
        const nextIndex = (index + i) % pool.length;
        images.push(pool[nextIndex]);
    }

    return {
        ...place,
        images: images
    };
});

const finalPlacesJson = JSON.stringify(allPlaces, null, 4);

// 5. HTML Template (Premium Minimalist 2026)
const html = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>후쿠오카 2025</title>
    <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary: #FF385C;
            --black: #222222;
            --gray-dark: #717171;
            --gray-light: #DDDDDD;
            --bg: #FFFFFF;
            --shadow: 0 6px 16px rgba(0,0,0,0.08);
            --radius: 16px;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: transparent;
        }
        
        body {
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
            background-color: var(--bg);
            color: var(--black);
            padding-bottom: 80px; /* Space for bottom nav */
            overflow-x: hidden;
        }

        /* Hero Section - Minimalist */
        .hero {
            padding: 60px 24px 20px 24px;
            background: white;
        }
        .hero h1 {
            font-size: 28px;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 8px;
            color: var(--black);
        }
        .hero p {
            font-size: 16px;
            color: var(--gray-dark);
            font-weight: 400;
        }

        /* Sticky Filter Bar */
        .sticky-header {
            position: sticky;
            top: 0;
            z-index: 100;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }

        .category-filter {
            display: flex;
            gap: 12px;
            padding: 0 24px;
            overflow-x: auto;
            scrollbar-width: none;
        }
        .category-filter::-webkit-scrollbar {
            display: none;
        }

        .filter-btn {
            flex: 0 0 auto;
            padding: 10px 16px;
            border-radius: 24px;
            background: white;
            border: 1px solid var(--gray-light);
            color: var(--black);
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .filter-btn.active {
            border-color: var(--black);
            background: var(--black);
            color: white;
        }
        .filter-btn i {
            font-size: 14px;
        }

        /* Main Content Areas */
        .view-section {
            display: none;
            padding: 24px;
            animation: fadeIn 0.3s ease;
        }
        .view-section.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Places Grid */
        .places-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 20px;
        }
        
        /* Mobile Grid Fix */
        @media (max-width: 480px) {
            .places-grid {
                grid-template-columns: 1fr 1fr;
                gap: 16px;
            }
        }

        .place-card {
            background: white;
            border-radius: var(--radius);
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .place-card:active {
            transform: scale(0.98);
        }

        .place-image-container {
            position: relative;
            padding-top: 100%; /* 1:1 Aspect Ratio */
            border-radius: var(--radius);
            overflow: hidden;
            background: #f0f0f0;
        }
        .place-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .place-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255,255,255,0.9);
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
            backdrop-filter: blur(4px);
        }

        .place-info {
            padding: 12px 4px;
        }

        .place-name {
            font-size: 15px;
            font-weight: 600;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: var(--black);
        }

        .place-meta {
            font-size: 13px;
            color: var(--gray-dark);
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .star-icon {
            color: var(--black);
            font-size: 12px;
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
            padding: 8px 16px;
            border-radius: 20px;
            background: #f5f5f5;
            color: var(--gray-dark);
            font-size: 14px;
            font-weight: 600;
            border: none;
            white-space: nowrap;
        }
        .day-btn.active {
            background: var(--black);
            color: white;
        }

        .timeline-item {
            padding-left: 24px;
            border-left: 2px solid #f0f0f0;
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
            background: var(--black);
            border-radius: 50%;
        }
        .time {
            font-size: 13px;
            font-weight: 700;
            color: var(--gray-dark);
            margin-bottom: 4px;
        }
        .event-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
        }
        .event-desc {
            font-size: 14px;
            color: var(--gray-dark);
            line-height: 1.5;
        }

        /* Bottom Nav - Fixed & Consolidated */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: white;
            border-top: 1px solid #f0f0f0;
            display: flex;
            justify-content: space-around;
            padding: 12px 0 24px 0; /* Extra padding for iPhone home bar */
            z-index: 1000;
        }
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            color: var(--gray-dark);
            font-size: 11px;
            font-weight: 500;
            width: 60px;
            cursor: pointer;
        }
        .nav-item.active {
            color: var(--primary);
        }
        .nav-item i {
            font-size: 24px;
            margin-bottom: 2px;
        }

        /* Modal - Full Screen Mobile Style */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
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
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 2001;
            cursor: pointer;
            border: none;
        }

        .modal-hero-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
        }

        .modal-content {
            padding: 24px;
            max-width: 800px;
            margin: 0 auto;
        }

        .modal-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .modal-meta {
            display: flex;
            gap: 16px;
            font-size: 14px;
            color: var(--gray-dark);
            margin-bottom: 24px;
            padding-bottom: 24px;
            border-bottom: 1px solid #f0f0f0;
        }

        .info-block {
            margin-bottom: 32px;
        }
        .info-label {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
            color: var(--black);
        }
        .info-text {
            font-size: 15px;
            line-height: 1.6;
            color: #444;
        }

        .menu-list li {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f5f5f5;
            font-size: 15px;
        }
        .menu-list li:last-child {
            border-bottom: none;
        }

        .review-summary-card {
            background: #f8f8f8;
            padding: 20px;
            border-radius: 12px;
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
            color: var(--black);
        }
        .review-text {
            font-size: 15px;
            line-height: 1.6;
            color: #444;
            font-style: italic;
        }

        .map-btn {
            display: block;
            width: 100%;
            padding: 16px;
            background: var(--black);
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            margin-top: 40px;
        }

    </style>
</head>
<body>

    <!-- View: Home -->
    <div id="view-home" class="view-section active">
        <div class="hero">
            <h1>후쿠오카<br>겨울 여행 2025</h1>
            <p>현지인처럼 즐기는 3박 4일</p>
        </div>

        <div class="sticky-header">
            <div class="category-filter">
                <div class="filter-btn active" onclick="filterPlaces('all', this)"><i class="fas fa-th"></i>전체</div>
                <div class="filter-btn" onclick="filterPlaces('グルメ (맛집)', this)"><i class="fas fa-utensils"></i>맛집</div>
                <div class="filter-btn" onclick="filterPlaces('カフェ (카페)', this)"><i class="fas fa-coffee"></i>카페</div>
                <div class="filter-btn" onclick="filterPlaces('ショッピング (쇼핑)', this)"><i class="fas fa-shopping-bag"></i>쇼핑</div>
                <div class="filter-btn" onclick="filterPlaces('観光 (관광)', this)"><i class="fas fa-camera"></i>관광</div>
            </div>
        </div>

        <div id="places-grid" class="places-grid" style="padding: 24px;">
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

    <!-- Bottom Nav -->
    <div class="bottom-nav">
        <div class="nav-item active" onclick="switchView('home', this)">
            <i class="fas fa-compass"></i>
            <span>탐색</span>
        </div>
        <div class="nav-item" onclick="switchView('schedule', this)">
            <i class="fas fa-calendar-alt"></i>
            <span>일정</span>
        </div>
        <div class="nav-item" onclick="window.open('https://www.google.com/maps/search/후쿠오카+맛집', '_blank')">
            <i class="fas fa-map-marked-alt"></i>
            <span>지도</span>
        </div>
    </div>

    <!-- Modal -->
    <div id="detailModal" class="modal">
        <button class="modal-close-btn" onclick="closeModal()">
            <i class="fas fa-times"></i>
        </button>
        <img id="modal-img" src="" class="modal-hero-image">
        <div class="modal-content">
            <div id="modal-type" style="font-size:12px; color:#717171; font-weight:600; text-transform:uppercase; margin-bottom:4px;">TYPE</div>
            <h2 id="modal-title" class="modal-title">Title</h2>
            <div class="modal-meta">
                <span id="modal-rating"><i class="fas fa-star"></i> 4.5</span>
                <span id="modal-area">Area</span>
                <span id="modal-time">Time</span>
            </div>

            <div class="info-block">
                <div class="info-label">소개</div>
                <p id="modal-desc" class="info-text">Description</p>
            </div>

            <div class="info-block">
                <div class="info-label">메뉴</div>
                <div id="modal-menu" class="info-text">Menu</div>
            </div>

            <div class="info-block">
                <div class="info-label">리뷰 요약</div>
                <div id="modal-reviews">Reviews</div>
            </div>

            <a id="modal-map-btn" href="#" target="_blank" class="map-btn">
                구글맵에서 보기
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

        // --- Navigation ---
        function switchView(viewName, btn) {
            // Update Nav
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            if(btn) btn.classList.add('active');

            // Update View
            document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
            document.getElementById('view-' + viewName).classList.add('active');
            
            window.scrollTo(0,0);
        }

        // --- Home Logic ---
        function renderPlaces(filter) {
            const grid = document.getElementById('places-grid');
            grid.innerHTML = '';

            const filtered = filter === 'all' 
                ? places 
                : places.filter(p => p.type.includes(filter));

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
                            <span>\${place.type.split(' ')[0]}</span>
                            <span>•</span>
                            <span>\${place.area.split(' ')[0]}</span>
                        </div>
                    </div>
                \`;
                grid.appendChild(card);
            });
        }

        function filterPlaces(filter, btn) {
            document.querySelectorAll('.filter-btn').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
            renderPlaces(filter);
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
