const fs = require('fs');

// 1. Verified Image Pools (Static IDs)
const verifiedPools = {
    food: [
        "1580828343064-fde4fc206bc6", "1553621042-f6e147245754", "1594212699903-ec8a3eca50f5",
        "1569050467447-ce54b3bbc37d", "1618843479313-40f8afb4b4d8", "1552566626-52f8b828add9",
        "1563245372-f21724e3856d", "1519985176271-adb1088fa94c", "1534422298391-e4f8c172dddb",
        "1579871494447-9811cf80d66c", "1631515243349-e06036043944", "1504674900247-0877df9cc836",
        "1542359553-66256f68c871", "1595250963668-2329063d81b8", "1604626623468-2329063d81b8"
    ],
    cafe: [
        "1554118811-1e0d58224f24", "1495474472287-4d71bcdd2085", "1509042239860-f550ce710b93",
        "1521017432531-fbd92d768814", "1497935586351-b67a49e012bf", "1517248135467-4c7edcad34c4",
        "1559305616-3f99cd43e353", "1514432324607-a09d9b4aefdd", "1461023058943-07fcbe16d735",
        "1507133750069-bef72f3707a9"
    ],
    shopping: [
        "1607082348824-0a96f2a4b9da", "1528698827591-e19ccd7bc23d", "1555529669-e69e7aa0ba9a",
        "1483985988355-763728e1935b", "1519671482538-518b76064044", "1534452203293-494d7ddbf7e0",
        "1567401893414-76b7b1e5a7a5", "1441986300917-64674bd600d8", "1472851294608-4155f2118c03",
        "1479064555552-3ef4979f8908"
    ],
    sightseeing: [
        "1570176560374-27c720de30bf", "1493976040374-85c8e12f0c0e", "1528360983277-13d9b152c6d1",
        "1545569341-9eb8b30979d9", "1503899036084-c55cdd92da26", "1480796927426-f609979314bd",
        "1524413840807-0c3cb6fa808d", "1492571350019-22de08371fd3", "1478436127897-769e1b3f0f36",
        "1542051841857-5f90071e7989"
    ]
};

// 2. Specific Image Map
const specificImages = {
    "신신 라멘": "1591345633174-2a9325cc6a3e",
    "이치란": "1552611052-33e04de081de",
    "키와미야 함바그": "1594212699903-ec8a3eca50f5",
    "모토무라 규카츠": "1604626623468-2329063d81b8",
    "오호리 공원": "1565620731358-e8c038abc8d1",
    "후쿠오카 타워": "1558862107-d49ef2a04d72",
    "캐널시티": "1555529669-e69e7aa0ba9a",
    "다자이후": "1570176560374-27c720de30bf",
    "돈키호테": "1607082348824-0a96f2a4b9da",
    "야타이": "1540959733332-eab4deabeeaf",
    "잇푸도": "1552611052-0d675b9063b7",
    "효탄 스시": "1579871494447-9811cf80d66c",
    "치카에": "1534256958597-7fe685cbd745",
    "우동 타이라": "1598515214211-3f88c9195892",
    "다이묘 소프트크림": "1559305616-3f99cd43e353",
    "링고": "1568571780765-9276ac8b75a2",
    "일 포르노 델 미뇽": "1555507036-ab1f4038808a",
    "팀랩": "1550684848-fac1c5b4e853",
    "건담": "1612487528505-d2338264c821"
};

// 3. Read Data
let placesContent = fs.readFileSync('places_data.js', 'utf8');
let placesArrayStr = placesContent.substring(placesContent.indexOf('['), placesContent.lastIndexOf(']') + 1);
let allPlaces = JSON.parse(placesArrayStr);

// 4. Apply Images
allPlaces = allPlaces.map((place, index) => {
    let assignedId = null;
    for (const [key, id] of Object.entries(specificImages)) {
        if (place.name.includes(key)) {
            assignedId = id;
            break;
        }
    }
    if (!assignedId) {
        let pool = verifiedPools.food;
        if (place.type.includes('카페')) pool = verifiedPools.cafe;
        else if (place.type.includes('쇼핑')) pool = verifiedPools.shopping;
        else if (place.type.includes('관광')) pool = verifiedPools.sightseeing;
        assignedId = pool[index % pool.length];
    }
    const images = [];
    images.push(`https://images.unsplash.com/photo-${assignedId}?w=500&q=80`);
    let pool = verifiedPools.food;
    if (place.type.includes('카페')) pool = verifiedPools.cafe;
    else if (place.type.includes('쇼핑')) pool = verifiedPools.shopping;
    else if (place.type.includes('관광')) pool = verifiedPools.sightseeing;
    for (let i = 1; i < 5; i++) {
        const nextId = pool[(index + i) % pool.length];
        images.push(`https://images.unsplash.com/photo-${nextId}?w=500&q=80`);
    }
    return { ...place, images: images };
});

const finalPlacesJson = JSON.stringify(allPlaces, null, 4);

// 5. HTML Template
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
            --bg: #121212;
            --card-bg: #1e1e1e;
            --glass-bg: rgba(30, 30, 30, 0.85);
            --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --accent: #ff6b9d;
            --text: #ffffff;
            --text-secondary: #b0b0b0;
            --radius: 16px;
        }
        
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        
        body {
            font-family: 'Pretendard', sans-serif;
            background: var(--bg);
            color: var(--text);
            padding-bottom: 100px;
            overflow-x: hidden;
            min-height: 100vh;
        }

        /* Snow */
        .snow {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;
            background-image: radial-gradient(4px 4px at 100px 50px, #fff, transparent), radial-gradient(6px 6px at 200px 150px, #fff, transparent);
            background-size: 650px 650px; animation: snow 10s linear infinite; opacity: 0.1;
        }
        @keyframes snow { 0% { background-position: 0 0, 0 0; } 100% { background-position: 100px 650px, 200px 650px; } }

        /* Premium Hero */
        .hero {
            padding: 40px 24px;
            background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent), url('https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80') center/cover;
            height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .hero h1 {
            font-size: 36px; font-weight: 800; line-height: 1.1;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
            margin-bottom: 8px;
        }
        .hero p { font-size: 15px; color: rgba(255,255,255,0.8); font-weight: 500; }

        /* Top Sticky Schedule Nav (Only in Schedule View) */
        .top-schedule-nav {
            position: sticky; top: 0; z-index: 90;
            background: var(--glass-bg); backdrop-filter: blur(16px);
            padding: 12px 0;
            display: none; /* Hidden by default */
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .top-schedule-nav.active { display: block; }

        .day-tabs {
            display: flex; gap: 10px; padding: 0 24px; overflow-x: auto; scrollbar-width: none;
        }
        .day-tab {
            padding: 8px 16px; border-radius: 20px;
            background: rgba(255,255,255,0.1); color: var(--text-secondary);
            font-size: 14px; font-weight: 600; white-space: nowrap;
            border: 1px solid rgba(255,255,255,0.1);
            transition: all 0.3s;
        }
        .day-tab.active {
            background: var(--gradient-1); color: white; border-color: transparent;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        /* Places Grid */
        .places-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; padding: 0 24px;
        }
        @media (max-width: 480px) { .places-grid { grid-template-columns: 1fr 1fr; } }

        .place-card {
            background: var(--card-bg); border-radius: var(--radius); overflow: hidden;
            border: 1px solid rgba(255,255,255,0.1); position: relative;
        }
        .place-image-container { position: relative; padding-top: 100%; background: #333; }
        .place-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
        .place-badge {
            position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.7); color: #ffd700;
            padding: 4px 8px; border-radius: 8px; font-size: 11px; font-weight: 700;
        }
        .place-info { padding: 12px; }
        .place-name { font-size: 15px; font-weight: 600; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .place-meta { font-size: 11px; color: var(--text-secondary); display: flex; gap: 6px; }

        /* Bottom Fixed Nav (Categories + Toggle) */
        .bottom-nav {
            position: fixed; bottom: 0; left: 0; width: 100%;
            background: #1a1a1a; border-top: 1px solid rgba(255,255,255,0.1);
            padding: 12px 0 24px 0; z-index: 1000;
            display: flex; justify-content: center;
        }
        .nav-scroll {
            display: flex; gap: 12px; padding: 0 20px; overflow-x: auto; width: 100%; max-width: 600px; scrollbar-width: none;
        }
        .nav-btn {
            flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 4px;
            width: 56px; color: #888; font-size: 10px; font-weight: 500; transition: all 0.2s;
        }
        .nav-btn.active { color: white; }
        .nav-btn-icon {
            width: 44px; height: 44px; background: rgba(255,255,255,0.08); border-radius: 14px;
            display: flex; align-items: center; justify-content: center; font-size: 18px;
            transition: all 0.2s;
        }
        .nav-btn.active .nav-btn-icon {
            background: var(--gradient-1); color: white; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        /* Schedule Content */
        .schedule-container { padding: 24px; display: none; }
        .schedule-container.active { display: block; }
        .timeline-item {
            padding-left: 20px; border-left: 2px solid rgba(255,255,255,0.1); margin-bottom: 24px; position: relative;
        }
        .timeline-item::before {
            content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px;
            background: #764ba2; border-radius: 50%;
        }
        .time { color: #764ba2; font-weight: 700; font-size: 13px; margin-bottom: 4px; }
        .event-title { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
        .event-desc { font-size: 14px; color: var(--text-secondary); }

        /* Modal */
        .modal {
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #121212; z-index: 2000; overflow-y: auto;
            animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .modal.active { display: block; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .modal-hero { width: 100%; height: 300px; object-fit: cover; mask-image: linear-gradient(to bottom, black 80%, transparent 100%); }
        .modal-content { padding: 0 24px 40px; position: relative; top: -40px; }
        .modal-close {
            position: fixed; top: 20px; left: 20px; width: 40px; height: 40px;
            background: rgba(0,0,0,0.5); border-radius: 50%; color: white;
            display: flex; align-items: center; justify-content: center; z-index: 2001;
            backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.1);
        }
        
        .review-summary-card {
            background: rgba(255,255,255,0.05); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-top: 10px;
        }
        .review-score { font-size: 24px; font-weight: 800; margin-bottom: 8px; }
        .review-text { font-size: 14px; line-height: 1.6; color: #d0d0d0; font-style: italic; }

    </style>
</head>
<body>
    <div class="snow"></div>

    <!-- Home View -->
    <div id="view-home">
        <div class="hero">
            <h1>FUKUOKA<br>WINTER 2025</h1>
            <p>후쿠오카 겨울 감성 여행 가이드</p>
        </div>
        <div id="places-grid" class="places-grid"></div>
    </div>

    <!-- Schedule View -->
    <div id="view-schedule" style="display:none;">
        <div class="top-schedule-nav active">
            <div class="day-tabs">
                <div class="day-tab active" onclick="showDay('day1', this)">1일차 (텐진)</div>
                <div class="day-tab" onclick="showDay('day2', this)">2일차 (유후인)</div>
                <div class="day-tab" onclick="showDay('day3', this)">3일차 (하카타)</div>
                <div class="day-tab" onclick="showDay('day4', this)">4일차 (귀국)</div>
            </div>
        </div>
        <div class="schedule-container active" id="schedule-content"></div>
    </div>

    <!-- Bottom Nav -->
    <div class="bottom-nav">
        <div class="nav-scroll">
            <div class="nav-btn active" onclick="switchTab('all', this)">
                <div class="nav-btn-icon"><i class="fas fa-th"></i></div>
                <span>전체</span>
            </div>
            <div class="nav-btn" onclick="switchTab('Food', this)">
                <div class="nav-btn-icon"><i class="fas fa-utensils"></i></div>
                <span>맛집</span>
            </div>
            <div class="nav-btn" onclick="switchTab('Cafe', this)">
                <div class="nav-btn-icon"><i class="fas fa-coffee"></i></div>
                <span>카페</span>
            </div>
            <div class="nav-btn" onclick="switchTab('Shopping', this)">
                <div class="nav-btn-icon"><i class="fas fa-shopping-bag"></i></div>
                <span>쇼핑</span>
            </div>
            <div class="nav-btn" onclick="switchTab('Sight', this)">
                <div class="nav-btn-icon"><i class="fas fa-camera"></i></div>
                <span>관광</span>
            </div>
            <div class="nav-btn" onclick="toggleSchedule(this)">
                <div class="nav-btn-icon"><i class="fas fa-calendar-alt"></i></div>
                <span>일정</span>
            </div>
            <div class="nav-btn" onclick="window.open('https://www.google.com/maps/search/후쿠오카+맛집', '_blank')">
                <div class="nav-btn-icon"><i class="fas fa-map-marked-alt"></i></div>
                <span>지도</span>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div id="detailModal" class="modal">
        <div class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></div>
        <img id="modal-img" src="" class="modal-hero">
        <div class="modal-content">
            <h2 id="modal-title" style="font-size:24px; margin-bottom:8px;">Title</h2>
            <div style="color:#888; font-size:13px; margin-bottom:20px;">
                <span id="modal-type">TYPE</span> • <span id="modal-area">AREA</span>
            </div>
            
            <div style="margin-bottom:24px;">
                <h3 style="font-size:16px; color:#764ba2; margin-bottom:8px;">소개</h3>
                <p id="modal-desc" style="font-size:15px; line-height:1.6; color:#ddd;">Desc</p>
            </div>

            <div style="margin-bottom:24px;">
                <h3 style="font-size:16px; color:#764ba2; margin-bottom:8px;">메뉴</h3>
                <div id="modal-menu" style="font-size:14px; color:#ddd;">Menu</div>
            </div>

            <div style="margin-bottom:24px;">
                <h3 style="font-size:16px; color:#764ba2; margin-bottom:8px;">리뷰 요약</h3>
                <div id="modal-reviews">Reviews</div>
            </div>

             <a id="modal-map-btn" href="#" target="_blank" style="display:block; width:100%; padding:16px; background:var(--gradient-1); color:white; text-align:center; border-radius:12px; text-decoration:none; font-weight:bold;">구글맵 보기</a>
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

        function renderPlaces(filter) {
            const grid = document.getElementById('places-grid');
            grid.innerHTML = '';
            let filtered = places;
            if (filter === 'Food') filtered = places.filter(p => p.type.includes('맛집') || p.type.includes('グルメ'));
            else if (filter === 'Cafe') filtered = places.filter(p => p.type.includes('카페'));
            else if (filter === 'Shopping') filtered = places.filter(p => p.type.includes('쇼핑'));
            else if (filter === 'Sight') filtered = places.filter(p => p.type.includes('관광'));

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
                            <span>\${place.type.split(' ')[0]}</span> • <span>\${place.area.split(' ')[0]}</span>
                        </div>
                    </div>
                \`;
                grid.appendChild(card);
            });
        }

        function switchTab(key, btn) {
            // Reset UI
            document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
            
            // Show Home, Hide Schedule
            document.getElementById('view-home').style.display = 'block';
            document.getElementById('view-schedule').style.display = 'none';
            
            renderPlaces(key);
            window.scrollTo(0,0);
        }

        function toggleSchedule(btn) {
            document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');

            document.getElementById('view-home').style.display = 'none';
            document.getElementById('view-schedule').style.display = 'block';
            
            showDay('day1', document.querySelector('.day-tab')); // Default to Day 1
            window.scrollTo(0,0);
        }

        function showDay(dayKey, btn) {
            document.querySelectorAll('.day-tab').forEach(el => el.classList.remove('active'));
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

        function openModal(id) {
            const place = places.find(p => p.id === id);
            if(!place) return;
            
            document.getElementById('modal-img').src = place.images[0];
            document.getElementById('modal-title').innerText = place.name;
            document.getElementById('modal-type').innerText = place.type;
            document.getElementById('modal-area').innerText = place.area;
            document.getElementById('modal-desc').innerText = place.desc;
            document.getElementById('modal-menu').innerHTML = place.menu;
            document.getElementById('modal-reviews').innerHTML = place.reviews;
            document.getElementById('modal-map-btn').href = place.mapUrl;

            document.getElementById('detailModal').classList.add('active');
            document.body.style.overflow = 'hidden';
            history.pushState({modalOpen: true}, null, '');
        }

        function closeModal() {
            document.getElementById('detailModal').classList.remove('active');
            document.body.style.overflow = 'auto';
            if (history.state && history.state.modalOpen) history.back();
        }

        window.addEventListener('popstate', () => {
            const modal = document.getElementById('detailModal');
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Init
        renderPlaces('all');
    </script>
</body>
</html>`;

fs.writeFileSync('index.html', html);
console.log('Build complete: index.html created with ' + allPlaces.length + ' places.');
