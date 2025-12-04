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
// Extract the array part
let placesArrayStr = placesContent.substring(placesContent.indexOf('['), placesContent.lastIndexOf(']') + 1);
let allPlaces = JSON.parse(placesArrayStr);

// 4. Apply Image Logic to All Places
allPlaces = allPlaces.map((place, index) => {
    // 1. Check Specific Images first
    let assignedImage = null;
    for (const [key, url] of Object.entries(specificImages)) {
        if (place.name.includes(key)) {
            assignedImage = url;
            break;
        }
    }

    // 2. If no specific image, use curated pool based on type
    if (!assignedImage) {
        let pool = imagePools.food; // Default
        if (place.type.includes('카페')) pool = imagePools.cafe;
        else if (place.type.includes('쇼핑')) pool = imagePools.shopping;
        else if (place.type.includes('관광')) pool = imagePools.sightseeing;

        // Deterministic random based on index
        const imageIndex = index % pool.length;
        assignedImage = pool[imageIndex];
    }

    // 3. Assign to images array (overwrite to ensure quality)
    // We give 5 images: 1st is the main one we selected, others are from the pool
    const images = [assignedImage];

    // Add 4 more random images from the same pool for the gallery
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

// 5. HTML Template (Modern 2026 Design with Mobile Fixes)
const html = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>후쿠오카 겨울 가이드 2025</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary: #FF385C;
            --secondary: #00A699;
            --dark: #222222;
            --light: #F7F7F7;
            --white: #FFFFFF;
            --gray: #717171;
            --shadow: 0 4px 12px rgba(0,0,0,0.08);
            --radius: 12px;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: transparent;
        }
        
        body {
            font-family: 'Noto Sans KR', sans-serif;
            background-color: var(--light);
            color: var(--dark);
            padding-bottom: 90px; /* Space for bottom nav */
        }

        /* Hero Section */
        .hero {
            position: relative;
            height: 40vh;
            min-height: 300px;
            background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80');
            background-size: cover;
            background-position: center;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 20px;
            color: white;
            z-index: 10;
        }

        .hero h1 {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .hero p {
            font-size: 1rem;
            opacity: 0.9;
            margin-bottom: 20px;
        }

        /* Sticky Nav Container */
        .sticky-nav-container {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            padding-bottom: 5px;
        }

        /* Schedule Tabs */
        .schedule-tabs {
            display: flex;
            gap: 10px;
            padding: 15px 20px 10px 20px;
            overflow-x: auto;
            background: white;
            scrollbar-width: none; /* Firefox */
        }
        .schedule-tabs::-webkit-scrollbar {
            display: none; /* Chrome/Safari */
        }

        .schedule-tab {
            flex: 0 0 auto;
            padding: 8px 16px;
            border-radius: 20px;
            background: #f0f0f0;
            color: var(--gray);
            font-weight: 500;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid transparent;
        }

        .schedule-tab.active {
            background: var(--dark);
            color: white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        /* Schedule Dropdown */
        .schedule-dropdown {
            display: none;
            background: white;
            padding: 20px;
            border-bottom: 1px solid #eee;
            animation: slideDown 0.3s ease;
            position: relative;
            z-index: 90;
        }
        .schedule-dropdown.active {
            display: block;
        }
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .timeline-item {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            position: relative;
        }
        .timeline-item:last-child {
            margin-bottom: 0;
        }
        .timeline-time {
            font-weight: 700;
            color: var(--primary);
            min-width: 50px;
            font-size: 0.9rem;
        }
        .timeline-content h4 {
            font-size: 1rem;
            margin-bottom: 4px;
        }
        .timeline-content p {
            font-size: 0.85rem;
            color: var(--gray);
        }

        /* Category Filter */
        .category-filter {
            display: flex;
            gap: 10px;
            padding: 5px 20px 15px 20px;
            overflow-x: auto;
            scrollbar-width: none;
            background: white;
            position: relative;
        }
        .category-filter::-webkit-scrollbar {
            display: none;
        }

        .filter-btn {
            flex: 0 0 auto;
            padding: 8px 14px;
            border-radius: 8px;
            background: white;
            border: 1px solid #eee;
            color: var(--dark);
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.03);
        }
        .filter-btn.active {
            border-color: var(--dark);
            background: #f9f9f9;
            font-weight: 600;
        }
        .filter-btn i {
            color: var(--primary);
        }

        /* Places Grid */
        .places-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 15px;
            padding: 20px;
            z-index: 1;
            position: relative;
        }

        /* Mobile Grid Fix */
        @media (max-width: 480px) {
            .places-grid {
                grid-template-columns: 1fr 1fr; /* Force 2 columns */
                gap: 10px;
                padding: 15px;
            }
            .place-image {
                height: 100px; /* Reduce height for mobile */
            }
            .place-name {
                font-size: 0.85rem;
            }
            .place-info {
                padding: 8px;
            }
        }

        .place-card {
            background: white;
            border-radius: var(--radius);
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: transform 0.2s;
            cursor: pointer;
            position: relative;
        }
        .place-card:active {
            transform: scale(0.98);
        }

        .place-image {
            width: 100%;
            height: 120px;
            object-fit: cover;
            background-color: #eee;
        }

        .place-info {
            padding: 12px;
        }

        .place-type {
            font-size: 0.7rem;
            color: var(--gray);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }

        .place-name {
            font-size: 0.95rem;
            font-weight: 600;
            margin-bottom: 6px;
            line-height: 1.3;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .place-rating {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 0.8rem;
            color: var(--dark);
        }
        .place-rating i {
            color: #FFD700;
            font-size: 0.7rem;
        }

        /* Bottom Nav */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: white;
            display: flex;
            justify-content: space-around;
            padding: 12px 0;
            border-top: 1px solid #eee;
            z-index: 9999;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            color: var(--gray);
            text-decoration: none;
            font-size: 0.7rem;
            width: 60px;
            cursor: pointer;
        }
        .nav-item.active {
            color: var(--primary);
        }
        .nav-item i {
            font-size: 1.2rem;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 99999;
            justify-content: center;
            align-items: flex-end;
        }
        .modal.active {
            display: flex;
        }

        .modal-content {
            background: white;
            width: 100%;
            max-width: 600px;
            height: 85vh;
            border-radius: 20px 20px 0 0;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }

        .modal-header {
            position: sticky;
            top: 0;
            background: white;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eee;
            z-index: 10;
        }
        .close-btn {
            background: #f0f0f0;
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1rem;
        }

        .modal-body {
            padding: 0;
        }

        .modal-image-gallery {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            height: 250px;
            background: #eee;
        }
        .modal-image-gallery img {
            flex: 0 0 100%;
            width: 100%;
            height: 100%;
            object-fit: cover;
            scroll-snap-align: start;
        }

        .modal-info {
            padding: 20px;
        }
        .modal-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .modal-meta {
            display: flex;
            gap: 15px;
            color: var(--gray);
            font-size: 0.9rem;
            margin-bottom: 20px;
            align-items: center;
        }
        .modal-desc {
            line-height: 1.6;
            margin-bottom: 25px;
            color: #444;
        }

        .info-section {
            margin-bottom: 25px;
            background: #f9f9f9;
            padding: 15px;
            border-radius: 12px;
        }
        .info-section h3 {
            font-size: 1rem;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-section h3 i {
            color: var(--primary);
        }

        .action-btn {
            display: block;
            width: 100%;
            padding: 15px;
            background: var(--primary);
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            margin-top: 20px;
            box-shadow: 0 4px 10px rgba(255, 56, 92, 0.3);
        }

        /* Recommendations */
        .recommendations {
            margin-top: 15px;
            padding: 15px;
            background: #fff5f5;
            border-radius: 12px;
            border: 1px solid #ffe0e0;
        }
        .rec-title {
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 10px;
        }
        .rec-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        .rec-card {
            background: white;
            padding: 8px;
            border-radius: 8px;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            border: 1px solid #eee;
        }
        .rec-card img {
            width: 30px;
            height: 30px;
            border-radius: 4px;
            object-fit: cover;
        }

    </style>
</head>
<body>
    <header class="hero">
        <h1>후쿠오카<br>겨울 여행 2025</h1>
        <p>현지인이 추천하는 진짜 맛집과 명소</p>
    </header>

    <div class="sticky-nav-container">
        <div class="schedule-tabs">
            <div class="schedule-tab active" onclick="toggleSchedule('day1')">1일차 (텐진)</div>
            <div class="schedule-tab" onclick="toggleSchedule('day2')">2일차 (유후인)</div>
            <div class="schedule-tab" onclick="toggleSchedule('day3')">3일차 (하카타)</div>
            <div class="schedule-tab" onclick="toggleSchedule('day4')">4일차 (귀국)</div>
        </div>

        <div class="category-filter">
            <div class="filter-btn active" onclick="renderPlaces('all')"><i class="fas fa-th"></i>전체</div>
            <div class="filter-btn" onclick="renderPlaces('グルメ (맛집)')"><i class="fas fa-utensils"></i>맛집</div>
            <div class="filter-btn" onclick="renderPlaces('カフェ (카페)')"><i class="fas fa-coffee"></i>카페</div>
            <div class="filter-btn" onclick="renderPlaces('ショッピング (쇼핑)')"><i class="fas fa-shopping-bag"></i>쇼핑</div>
            <div class="filter-btn" onclick="renderPlaces('観光 (관광)')"><i class="fas fa-camera"></i>관광</div>
        </div>
    </div>

    <div id="schedule-dropdown" class="schedule-dropdown">
        <!-- Injected by JS -->
    </div>

    <div id="places-grid" class="places-grid">
        <!-- Injected by JS -->
    </div>

    <div class="bottom-nav">
        <div class="nav-item active" onclick="window.scrollTo(0,0)">
            <i class="fas fa-home"></i>
            <span>홈</span>
        </div>
        <div class="nav-item" onclick="toggleSchedule(currentSchedule || 'day1'); document.querySelector('.schedule-tabs').scrollIntoView({behavior:'smooth'})">
            <i class="fas fa-calendar-alt"></i>
            <span>일정</span>
        </div>
        <div class="nav-item" onclick="window.open('https://www.google.com/maps/search/후쿠오카+맛집', '_blank')">
            <i class="fas fa-map-marked-alt"></i>
            <span>지도</span>
        </div>
        <div class="nav-item" onclick="alert('준비 중입니다.')">
            <i class="fas fa-user"></i>
            <span>MY</span>
        </div>
    </div>

    <!-- Modal -->
    <div id="detailModal" class="modal" onclick="closeModal(event)">
        <div class="modal-content">
            <div class="modal-header">
                <h3 style="font-size:1rem;">상세 정보</h3>
                <button class="close-btn" onclick="closeModal(event)"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div id="modal-gallery" class="modal-image-gallery"></div>
                <div class="modal-info">
                    <div id="modal-type" class="place-type">TYPE</div>
                    <h2 id="modal-title" class="modal-title">Place Name</h2>
                    <div class="modal-meta">
                        <span id="modal-rating"><i class="fas fa-star" style="color:#FFD700"></i> 4.5</span>
                        <span id="modal-area"><i class="fas fa-map-marker-alt"></i> Area</span>
                    </div>
                    <p id="modal-desc" class="modal-desc">Description goes here...</p>

                    <div class="info-section">
                        <h3><i class="fas fa-clock"></i> 영업 시간</h3>
                        <p id="modal-time">10:00 - 22:00</p>
                    </div>

                    <div class="info-section">
                        <h3><i class="fas fa-utensils"></i> 메뉴 & 가격</h3>
                        <div id="modal-menu">Menu list...</div>
                    </div>

                    <div class="info-section">
                        <h3><i class="fas fa-comments"></i> 방문자 리뷰</h3>
                        <div id="modal-reviews">Reviews...</div>
                    </div>

                    <a id="modal-map-btn" href="#" target="_blank" class="action-btn">
                        <i class="fab fa-google"></i> 구글맵에서 보기
                    </a>
                </div>
            </div>
        </div>
    </div>

    <script>
        const places = ${finalPlacesJson};
        
        const scheduleData = {
            day1: {
                title: "1일차: 텐진 & 다이묘 쇼핑",
                items: [
                    { time: "10:00", title: "후쿠오카 공항 도착", desc: "지하철로 텐진 이동 (약 15분)" },
                    { time: "11:30", title: "점심: 신신 라멘", desc: "텐진 본점에서 돈코츠 라멘 즐기기" },
                    { time: "13:00", title: "다이묘 거리 쇼핑", desc: "슈프림, 스투시, 빈티지 샵 구경" },
                    { time: "15:00", title: "카페 델 솔", desc: "폭신한 팬케이크로 당 충전" },
                    { time: "17:00", title: "오호리 공원", desc: "호수 산책 및 일몰 감상" },
                    { time: "19:00", title: "저녁: 모츠나베 라쿠텐치", desc: "부추 가득한 곱창전골" },
                    { time: "21:00", title: "돈키호테 텐진", desc: "면세 쇼핑으로 하루 마무리" }
                ]
            },
            day2: {
                title: "2일차: 유후인 버스 투어",
                items: [
                    { time: "08:30", title: "하카타역 집결", desc: "유후인행 버스 탑승" },
                    { time: "10:30", title: "유후인 도착", desc: "유노츠보 거리 구경 및 간식" },
                    { time: "12:00", title: "점심: 유후마부시 신", desc: "장어덮밥 또는 소고기덮밥" },
                    { time: "13:30", title: "긴린코 호수", desc: "신비로운 호수 산책" },
                    { time: "15:00", title: "온천 체험", desc: "무소엔 또는 바이엔 당일 온천" },
                    { time: "17:00", title: "하카타로 복귀", desc: "버스 안에서 휴식" },
                    { time: "19:00", title: "저녁: 하카타 잇소우", desc: "진한 돈코츠 라멘" }
                ]
            },
            day3: {
                title: "3일차: 하카타 & 나카스",
                items: [
                    { time: "10:00", title: "스미요시 신사", desc: "아침 산책 및 참배" },
                    { time: "11:30", title: "점심: 우동 타이라", desc: "우엉 튀김 우동 맛보기" },
                    { time: "13:00", title: "캐널시티 하카타", desc: "분수쇼 관람 및 쇼핑" },
                    { time: "15:00", title: "쿠시다 신사", desc: "명성황후 시해 칼 보관 장소" },
                    { time: "17:00", title: "나카스 강변 산책", desc: "노을 지는 강변 걷기" },
                    { time: "19:00", title: "저녁: 이치란 본점", desc: "돈코츠 라멘의 원조" },
                    { time: "21:00", title: "나카스 야타이", desc: "포장마차에서 꼬치에 맥주 한잔" }
                ]
            },
            day4: {
                title: "4일차: 귀국 준비",
                items: [
                    { time: "09:00", title: "조식: 탄야 하카타", desc: "우설 정식으로 든든하게" },
                    { time: "10:30", title: "아뮤 플라자 쇼핑", desc: "마지막 기념품 구매 (손수건 등)" },
                    { time: "12:00", title: "점심: 하카타역 도시락", desc: "에키벤 구매하여 공항으로" },
                    { time: "13:30", title: "후쿠오카 공항 이동", desc: "출국 수속 및 면세점 구경" }
                ]
            }
        };

        let currentSchedule = null;

        function renderPlaces(filter) {
            const grid = document.getElementById('places-grid');
            grid.innerHTML = '';

            const filtered = filter === 'all' 
                ? places 
                : places.filter(p => p.type.includes(filter));

            // Update active filter btn
            document.querySelectorAll('.filter-btn').forEach(btn => {
                if (btn.innerText.includes(filter.split(' ')[0]) || (filter === 'all' && btn.innerText.includes('전체'))) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            filtered.forEach(place => {
                const card = document.createElement('div');
                card.className = 'place-card';
                card.onclick = () => showDetails(place.id);
                
                card.innerHTML = \`
                    <img src="\${place.images[0]}" class="place-image" loading="lazy">
                    <div class="place-info">
                        <div class="place-type">\${place.type}</div>
                        <div class="place-name">\${place.name}</div>
                        <div class="place-rating"><i class="fas fa-star"></i> \${place.rating.split(' ')[0]}</div>
                    </div>
                \`;
                grid.appendChild(card);
            });
        }

        function toggleSchedule(dayKey) {
            const dropdown = document.getElementById('schedule-dropdown');
            const day = scheduleData[dayKey];
            
            // Update tabs
            document.querySelectorAll('.schedule-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.innerText.includes(dayKey.replace('day', ''))) tab.classList.add('active');
            });

            if (currentSchedule === dayKey && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                currentSchedule = null;
                return;
            }

            // Recommendation Logic
            let targetArea = '';
            if (day.title.includes('텐진')) targetArea = '天神 (텐진)';
            else if (day.title.includes('하카타')) targetArea = '博多 (하카타)';
            else if (day.title.includes('나카스')) targetArea = '中洲 (나카스)';
            
            let recHtml = '';
            if (targetArea) {
                const recommendations = places.filter(p => p.area === targetArea && (p.type.includes('맛집') || p.type.includes('쇼핑'))).slice(0, 4);
                if (recommendations.length > 0) {
                    recHtml = \`
                        <div class="recommendations">
                            <div class="rec-title"><i class="fas fa-map-marker-alt"></i> \${targetArea.split(' ')[1]} 근처 추천 장소</div>
                            <div class="rec-grid">
                                \${recommendations.map(p => \`
                                    <div class="rec-card" onclick="showDetails('\${p.id}')">
                                        <img src="\${p.images[0]}">
                                        <div>\${p.name}</div>
                                    </div>
                                \`).join('')}
                            </div>
                        </div>
                    \`;
                }
            }

            let html = \`<h3>\${day.title}</h3>\`;
            day.items.forEach(item => {
                html += \`
                    <div class="timeline-item">
                        <div class="timeline-time">\${item.time}</div>
                        <div class="timeline-content">
                            <h4>\${item.title}</h4>
                            <p>\${item.desc}</p>
                        </div>
                    </div>
                \`;
            });
            
            html += recHtml; // Add recommendations at bottom

            dropdown.innerHTML = html;
            dropdown.classList.add('active');
            currentSchedule = dayKey;
        }

        function showDetails(id) {
            const place = places.find(p => p.id === id);
            if (!place) return;

            document.getElementById('modal-title').innerText = place.name;
            document.getElementById('modal-type').innerText = place.type;
            document.getElementById('modal-rating').innerHTML = \`<i class="fas fa-star" style="color:#FFD700"></i> \${place.rating}\`;
            document.getElementById('modal-area').innerHTML = \`<i class="fas fa-map-marker-alt"></i> \${place.area}\`;
            document.getElementById('modal-desc').innerText = place.desc;
            document.getElementById('modal-time').innerText = place.info;
            document.getElementById('modal-menu').innerHTML = place.menu;
            document.getElementById('modal-reviews').innerHTML = place.reviews;
            document.getElementById('modal-map-btn').href = place.mapUrl;

            // Gallery
            const gallery = document.getElementById('modal-gallery');
            gallery.innerHTML = place.images.map(img => \`<img src="\${img}">\`).join('');

            document.getElementById('detailModal').classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }

        function closeModal(e) {
            if (e.target.classList.contains('modal') || e.target.closest('.close-btn')) {
                document.getElementById('detailModal').classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }

        // Init
        renderPlaces('all');
    </script>
</body>
</html>`;

fs.writeFileSync('index.html', html);
console.log('Build complete: index.html created with ' + allPlaces.length + ' places.');
