const placesData = [
    {
        "id": "p1",
        "area": "Daimyo (다이묘)",
        "type": "Tonkatsu (돈카츠)",
        "name": "모토무라 규카츠",
        "rating": "4.8 (11,158)",
        "desc": "돈까스 전문식당. 살살 녹는 규카츠의 정석.",
        "menu": "<ul class='menu-list'><li><span>규카츠 정식 (130g)</span> <span>1,930엔</span></li><li><span>규카츠 정식 (260g)</span> <span>2,600엔</span></li><li><span>생맥주</span> <span>600엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.8</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"음식은 말해뭐해 맛있고 살살 녹는 맛이었습니다.\"\n        </div>\n    </div>\n    ",
        "info": "11:00 - 22:00",
        "transport": "1 Chome-14-5 Daimyo",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Motomura Gyukatsu Fukuoka",
        "images": [
            "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&q=80",
            "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80"
        ]
    },
    {
        "id": "p2",
        "area": "Hakata (하카타)",
        "type": "Yakiniku (야키니쿠)",
        "name": "니쿠이치 하카타점",
        "rating": "4.4 (2,124)",
        "desc": "편안한 분위기의 야키니쿠 식당. 가성비 좋은 와규.",
        "menu": "<ul class='menu-list'><li><span>상급 갈비</span> <span>980엔</span></li><li><span>특선 7종 모듬</span> <span>3,980엔</span></li><li><span>육회</span> <span>880엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.4</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"별이 5개뿐인게 너무 아쉽네요 10개였음 걍 별 10개 무조건이에요.\"\n        </div>\n    </div>\n    ",
        "info": "16:00 - 01:00",
        "transport": "Hakataekiminami 1 Chome-2-18",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Nikuichi Hakata",
        "images": [
            "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80",
            "https://images.unsplash.com/photo-1542359553-66256f68c871?w=500&q=80",
            "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80"
        ]
    },
    {
        "id": "p3",
        "area": "Haruyoshi (하루요시)",
        "type": "Izakaya (이자카야)",
        "name": "설화(유키하나)",
        "rating": "4.6 (1,102)",
        "desc": "한국인 입맛에 맞는 안주가 가득한 이자카야.",
        "menu": "<ul class='menu-list'><li><span>모츠나베</span> <span>1,500엔</span></li><li><span>꼬치구이 모듬</span> <span>1,200엔</span></li><li><span>하이볼</span> <span>500엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.6</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"음식 맛은 맛있지도, 맛없지도 않은... 하지만 분위기는 좋습니다.\"\n        </div>\n    </div>\n    ",
        "info": "17:00 - 03:00",
        "transport": "Haruyoshi 3 Chome-11-19",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Yukihana Fukuoka",
        "images": [
            "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80",
            "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=500&q=80",
            "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80"
        ]
    },
    {
        "id": "p4",
        "area": "Tenjin (텐진)",
        "type": "Ramen (라멘)",
        "name": "신신 라멘 텐진 본점",
        "rating": "4.3 (7,160)",
        "desc": "후쿠오카 3대 라멘. 잡내 없는 깔끔한 돈코츠 국물.",
        "menu": "<ul class='menu-list'><li><span>신신 라멘</span> <span>760엔</span></li><li><span>반숙 계란 라멘</span> <span>890엔</span></li><li><span>교자</span> <span>550엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.3</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"음식은 모두 맛있었어요 50분 정도 웨이팅하고 들어갔어요.\"\n        </div>\n    </div>\n    ",
        "info": "11:00 - 03:00",
        "transport": "3 Chome-2-19 Tenjin",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=ShinShin Ramen Tenjin",
        "images": [
            "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=500&q=80",
            "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80",
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80"
        ]
    },
    {
        "id": "p5",
        "area": "Imaizumi (이마이즈미)",
        "type": "Izakaya (이자카야)",
        "name": "하카타로바타 피쉬맨",
        "rating": "4.8 (5,807)",
        "desc": "회 세트 메뉴를 즐길 수 있는 세련된 장소. 계단식 회 플레이팅이 유명.",
        "menu": "<ul class='menu-list'><li><span>피쉬맨 모듬회 (계단)</span> <span>2,500엔</span></li><li><span>고등어 회</span> <span>1,200엔</span></li><li><span>명란 계란말이</span> <span>800엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.8</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"회 세트 메뉴를 즐길 수 있는 세련된 장소. 비주얼이 압도적입니다.\"\n        </div>\n    </div>\n    ",
        "info": "11:00 - 23:00",
        "transport": "1 Chome-4-23 Imaizumi",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Hakata Robata Fishman",
        "images": [
            "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80",
            "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=500&q=80",
            "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80"
        ]
    },
    {
        "id": "p6",
        "area": "Maizuru (마이즈루)",
        "type": "Seafood (해산물)",
        "name": "하카타 고마사바야",
        "rating": "4.4 (2,149)",
        "desc": "시장에서 사 온 생선으로 요리하는 캐주얼한 음식점. 고등어 회 정식이 일품.",
        "menu": "<ul class='menu-list'><li><span>고마사바 정식</span> <span>1,200엔</span></li><li><span>해산물 덮밥</span> <span>1,500엔</span></li><li><span>고등어 구이</span> <span>900엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.4</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"13번째 저의 마음속 1등 식당 이였습니다. 고등어가 비리지 않고 고소해요.\"\n        </div>\n    </div>\n    ",
        "info": "11:00 - 22:00",
        "transport": "Maizuru 1 Chome-2-11",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Hakata Gomasabaya",
        "images": [
            "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=500&q=80",
            "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80",
            "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80"
        ]
    },
    {
        "id": "p7",
        "area": "Tenjin (텐진)",
        "type": "Motsunabe (모츠나베)",
        "name": "원조 모츠나베 라쿠텐치 텐진본점",
        "rating": "4.7 (18,802)",
        "desc": "일식 내장 냄비 요리 전문점. 산더미 부추가 시그니처.",
        "menu": "<ul class='menu-list'><li><span>모츠나베 (1인)</span> <span>1,260엔</span></li><li><span>짬뽕면</span> <span>300엔</span></li><li><span>두부</span> <span>250엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.7</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"음식도 너무너무 좋고 직원분들도 너무너무 친절합니당!!!\"\n        </div>\n    </div>\n    ",
        "info": "11:00 - 24:00",
        "transport": "Tenjin 1 Chome-1-1",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Rakutenchi Tenjin",
        "images": [
            "https://images.unsplash.com/photo-1542359553-66256f68c871?w=500&q=80",
            "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=500&q=80",
            "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80"
        ]
    },
    {
        "id": "p8",
        "area": "Daimyo (다이묘)",
        "type": "Seafood (해산물)",
        "name": "치카에",
        "rating": "4.3 (3,523)",
        "desc": "수조가 있는 대형 해산물 요리점. 명란 튜브가 유명.",
        "menu": "<ul class='menu-list'><li><span>치카에 정식 (점심)</span> <span>2,000엔</span></li><li><span>활어회 정식</span> <span>3,500엔</span></li><li><span>명란 튜브</span> <span>800엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.3</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"식비는 2,000엔/1인당 주말점심한정. 분위기가 고급스럽고 맛도 깔끔합니다.\"\n        </div>\n    </div>\n    ",
        "info": "17:00 - 22:00",
        "transport": "2 Chome-2-17 Daimyo",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Chikae Fukuoka",
        "images": [
            "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80",
            "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=500&q=80",
            "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80"
        ]
    },
    {
        "id": "p9",
        "area": "Hakata (하카타)",
        "type": "Udon (우동)",
        "name": "다이치노 우동",
        "rating": "4.2 (3,944)",
        "desc": "투명하고 쫄깃한 면발이 특징인 우동 맛집. 우엉 튀김이 거대함.",
        "menu": "<ul class='menu-list'><li><span>고기 우엉 튀김 우동</span> <span>780엔</span></li><li><span>야채 튀김 우동</span> <span>680엔</span></li><li><span>붓카케 우동</span> <span>700엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.2</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"메뉴도 그림이랑 한국어로 되어있어 자판기에서 편하게 주문 했음.\"\n        </div>\n    </div>\n    ",
        "info": "10:00 - 21:00",
        "transport": "Hakata Ekimae 2 Chome-1-1",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Daichino Udon Hakata",
        "images": [
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80",
            "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=500&q=80",
            "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80"
        ]
    },
    {
        "id": "p10",
        "area": "Haruyoshi (하루요시)",
        "type": "Izakaya (이자카야)",
        "name": "히토쿠치 교자 타케토라",
        "rating": "4.8 (2,776)",
        "desc": "한입 교자가 맛있는 이자카야. 2차로 가기 좋은 곳.",
        "menu": "<ul class='menu-list'><li><span>한입 교자 (10개)</span> <span>500엔</span></li><li><span>생맥주</span> <span>550엔</span></li><li><span>오이 무침</span> <span>350엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.8</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"밤에 손님들이 많았고, 주문한 메뉴들은 모두 무난했습니다.\"\n        </div>\n    </div>\n    ",
        "info": "17:00 - 03:00",
        "transport": "3 Chome-26-27 Haruyoshi",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Hitokuchi Gyoza Taketora",
        "images": [
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80",
            "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80",
            "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80"
        ]
    },
    {
        "id": "p11",
        "area": "Sumiyoshi (스미요시)",
        "type": "Yakitori (야키토리)",
        "name": "야키토리 하레루야",
        "rating": "4.9 (460)",
        "desc": "현지인들이 찾는 숨은 야키토리 맛집. 꼬치 하나하나 정성스럽게 구워줌.",
        "menu": "<ul class='menu-list'><li><span>꼬치 5종 세트</span> <span>1,000엔</span></li><li><span>삼겹살 꼬치</span> <span>180엔</span></li><li><span>닭껍질</span> <span>150엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.9</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"4박 5일 여행 중 저와 남편의 단연 1등 맛집! 사장님이 정말 친절하세요.\"\n        </div>\n    </div>\n    ",
        "info": "17:30 - 24:00",
        "transport": "2 Chome-15-1 Sumiyoshi",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Yakitori Hareruya Fukuoka",
        "images": [
            "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80",
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80",
            "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80"
        ]
    },
    {
        "id": "p12",
        "area": "Nakasu (나카스)",
        "type": "Eel (장어)",
        "name": "요시즈카 우나기야",
        "rating": "4.4 (8,697)",
        "desc": "150년 전통의 장어 덮밥 전문점. 후쿠오카 최고의 장어 맛집.",
        "menu": "<ul class='menu-list'><li><span>우나쥬 (4조각)</span> <span>3,500엔</span></li><li><span>우나쥬 (6조각)</span> <span>4,800엔</span></li><li><span>장어 계란말이</span> <span>800엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.4</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"밥한끼 35000원이지만 비싼만큼 맛은 있어요. 부모님 모시고 가기 좋습니다.\"\n        </div>\n    </div>\n    ",
        "info": "10:00 - 21:00",
        "transport": "2 Chome-8-27 Nakasu",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Yoshizuka Unagiya",
        "images": [
            "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=500&q=80",
            "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80",
            "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80"
        ]
    },
    {
        "id": "p13",
        "area": "Daimyo (다이묘)",
        "type": "Tonkatsu (돈카츠)",
        "name": "쿠로부타 돈카츠 쿠로마츠",
        "rating": "4.5 (723)",
        "desc": "흑돼지 돈카츠 전문점. 두툼한 고기와 바삭한 튀김옷.",
        "menu": "<ul class='menu-list'><li><span>로스 카츠 정식</span> <span>1,800엔</span></li><li><span>히레 카츠 정식</span> <span>2,000엔</span></li><li><span>특상 로스 카츠</span> <span>2,400엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.5</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"음식은 한화 약 18,000원 정도인데 비싸지 않은 가격이다. 육즙이 살아있어요.\"\n        </div>\n    </div>\n    ",
        "info": "11:00 - 21:00",
        "transport": "2 Chome-1-38 Daimyo",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Kurobuta Tonkatsu Kuromatsu",
        "images": [
            "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&q=80",
            "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80"
        ]
    },
    {
        "id": "p14",
        "area": "Tenjin (텐진)",
        "type": "Ramen (라멘)",
        "name": "멘야 카네토라 텐진본점",
        "rating": "4.3 (2,846)",
        "desc": "진한 멸치 육수의 츠케멘 맛집. 매운맛 조절 가능.",
        "menu": "<ul class='menu-list'><li><span>츠케멘</span> <span>1,000엔</span></li><li><span>매운 츠케멘</span> <span>1,100엔</span></li><li><span>토핑 전부 추가</span> <span>1,350엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.3</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"라면과 토핑을 파는 북적이는 바. 면발이 쫄깃하고 국물이 정말 진해요.\"\n        </div>\n    </div>\n    ",
        "info": "10:30 - 22:30",
        "transport": "Watanabedori 4 Chome-9-18",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Menya Kanetora Tenjin",
        "images": [
            "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=500&q=80",
            "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80",
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80"
        ]
    },
    {
        "id": "p15",
        "area": "Watanabedori (와타나베도리)",
        "type": "Rice Bowl (덮밥)",
        "name": "부타 매니아동 이나다야 선",
        "rating": "4.7 (543)",
        "desc": "돼지고기 덮밥 전문점. 숯불 향 가득한 고기가 밥 위에 듬뿍.",
        "menu": "<ul class='menu-list'><li><span>부타동 (보통)</span> <span>850엔</span></li><li><span>부타동 (대)</span> <span>1,000엔</span></li><li><span>계란 노른자 추가</span> <span>100엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.7</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"웨이팅 없고 점원이 친절함 오차즈케도 맛있다. 숨은 맛집 발견!\"\n        </div>\n    </div>\n    ",
        "info": "11:00 - 21:00",
        "transport": "Watanabedori 1 Chome-1-1",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Inadaya Sun Fukuoka",
        "images": [
            "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&q=80",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80"
        ]
    },
    {
        "id": "p16",
        "area": "Imaizumi (이마이즈미)",
        "type": "Motsunabe (모츠나베)",
        "name": "모츠나베 라쿠텐치 이마이즈미 총본점",
        "rating": "4.8 (17,256)",
        "desc": "라쿠텐치의 또 다른 본점. 넓은 좌석과 변함없는 맛.",
        "menu": "<ul class='menu-list'><li><span>모츠나베</span> <span>1,260엔</span></li><li><span>짬뽕면</span> <span>300엔</span></li><li><span>두부</span> <span>250엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.8</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"느끼할까봐 걱정했는데 하나도 안느끼고 너무 맛있었습니다. 부추가 신의 한 수.\"\n        </div>\n    </div>\n    ",
        "info": "17:00 - 24:00",
        "transport": "Imaizumi 1 Chome-19-18",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Rakutenchi Imaizumi",
        "images": [
            "https://images.unsplash.com/photo-1542359553-66256f68c871?w=500&q=80",
            "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=500&q=80",
            "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80"
        ]
    },
    {
        "id": "p17",
        "area": "Hakata (하카타)",
        "type": "Steak (스테이크)",
        "name": "키와미야 함바그 하카타점",
        "rating": "4.2 (2,938)",
        "desc": "하카타역 바로 옆에 위치한 키와미야. 접근성이 좋아 항상 줄이 깁니다.",
        "menu": "<ul class='menu-list'><li><span>함바그 S</span> <span>1,298엔</span></li><li><span>함바그 M</span> <span>1,628엔</span></li><li><span>세트</span> <span>+440엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.2</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"역시 맛집이라 30분 이상의 웨이팅은 기본이더라구요. 기다린 보람이 있는 맛.\"\n        </div>\n    </div>\n    ",
        "info": "11:00 - 22:00",
        "transport": "Hakataekichuogai 2-1",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Kiwamiya Hakata",
        "images": [
            "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80",
            "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&q=80"
        ]
    },
    {
        "id": "p18",
        "area": "Higashihirao (히가시히라오)",
        "type": "Tempura (튀김)",
        "name": "텐푸라 히라오 본점",
        "rating": "4.4 (6,679)",
        "desc": "갓 튀긴 튀김을 하나씩 가져다주는 후쿠오카 스타일 덴푸라.",
        "menu": "<ul class='menu-list'><li><span>기본 정식</span> <span>890엔</span></li><li><span>아지와이 정식</span> <span>990엔</span></li><li><span>오징어 젓갈</span> <span>무료</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.4</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"2번은 가세요 가성비 맛집. 오징어 젓갈이 정말 맛있어서 밥도둑입니다.\"\n        </div>\n    </div>\n    ",
        "info": "10:30 - 21:00",
        "transport": "2 Chome-4-1 Higashihirao",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Tempura Hirao Main Store",
        "images": [
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80",
            "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80",
            "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80"
        ]
    },
    {
        "id": "p19",
        "area": "Hakata (하카타)",
        "type": "Udon (우동)",
        "name": "하가쿠레 우동",
        "rating": "4.4 (2,508)",
        "desc": "미슐랭 빕구르망에 선정된 우동 맛집. 부드러운 면발이 특징.",
        "menu": "<ul class='menu-list'><li><span>고기 우엉 우동</span> <span>650엔</span></li><li><span>새우 튀김 우동</span> <span>600엔</span></li><li><span>유부 초밥</span> <span>200엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.4</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"다카마쓰 처럼 쫀득한 우동과 다릅니다. 부들부들해서 술술 넘어가요.\"\n        </div>\n    </div>\n    ",
        "info": "11:00 - 21:00",
        "transport": "2 Chome-3-32 Hakataekiminami",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Hagakure Udon",
        "images": [
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80",
            "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=500&q=80",
            "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80"
        ]
    },
    {
        "id": "p20",
        "area": "Nakasu (나카스)",
        "type": "Steak (스테이크)",
        "name": "미야치쿠 스테이크",
        "rating": "4.5 (717)",
        "desc": "고급 미야자키규를 철판에서 구워주는 스테이크 하우스.",
        "menu": "<ul class='menu-list'><li><span>런치 코스</span> <span>4,500엔</span></li><li><span>디너 코스</span> <span>10,000엔</span></li><li><span>안심 스테이크</span> <span>8,000엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.5</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"2인 기준 한화 52만원 정도를 썼음. 특별한 날 가기 좋은 최고의 서비스.\"\n        </div>\n    </div>\n    ",
        "info": "11:00 - 22:00",
        "transport": "Nakasu 5 Chome-2-1",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Miyachiku Steak Fukuoka",
        "images": [
            "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80",
            "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&q=80"
        ]
    },
    {
        "id": "p21",
        "area": "Tenjin (텐진)",
        "type": "Shopping (쇼핑)",
        "name": "돈키호테 텐진 본점",
        "rating": "3.9 (12,000+)",
        "desc": "24시간 영업하는 대형 디스카운트 스토어. 의약품, 화장품, 간식 등 없는 게 없습니다.",
        "menu": "<ul class='menu-list'><li><span>동전 파스</span> <span>600엔</span></li><li><span>휴족시간</span> <span>500엔</span></li><li><span>퍼펙트 휩</span> <span>400엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">3.9</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"지하 1층부터 5층까지 물건이 정말 많습니다. 텍스 리펀 줄이 기니까 여유 있게 가세요.\"\n        </div>\n    </div>\n    ",
        "info": "24시간 영업",
        "transport": "텐진역 도보 5분",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Don Quijote Tenjin",
        "images": [
            "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&q=80",
            "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&q=80"
        ]
    },
    {
        "id": "p22",
        "area": "Nakasu (나카스)",
        "type": "Shopping (쇼핑)",
        "name": "돈키호테 나카스점",
        "rating": "3.8 (9,500+)",
        "desc": "나카스 강변에 위치한 돈키호테. 1층과 2층으로 구성되어 쇼핑하기 편리합니다.",
        "menu": "<ul class='menu-list'><li><span>이치란 라멘 키트</span> <span>2,000엔</span></li><li><span>킷캣 녹차맛</span> <span>300엔</span></li><li><span>산토리 위스키</span> <span>1,500엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">3.8</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"텐진점보다 통로가 넓어서 쇼핑하기 쾌적합니다. 새벽에 가서 여유롭게 쇼핑했어요.\"\n        </div>\n    </div>\n    ",
        "info": "24시간 영업",
        "transport": "나카스카와바타역",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Don Quijote Nakasu",
        "images": [
            "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&q=80",
            "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&q=80"
        ]
    },
    {
        "id": "p23",
        "area": "Tenjin (텐진)",
        "type": "Drugstore (드럭스토어)",
        "name": "마츠모토 키요시 텐진점",
        "rating": "4.0 (500+)",
        "desc": "일본 최대 드럭스토어 체인. 화장품과 의약품 종류가 다양합니다.",
        "menu": "<ul class='menu-list'><li><span>샤론 파스</span> <span>900엔</span></li><li><span>이브 진통제</span> <span>700엔</span></li><li><span>하다라보 고쿠쥰</span> <span>800엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.0</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"돈키호테보다 화장품 종류가 더 많은 것 같아요. 쿠폰 쓰면 더 저렴하게 살 수 있습니다.\"\n        </div>\n    </div>\n    ",
        "info": "09:00 - 23:00",
        "transport": "텐진 지하상가",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Matsumoto Kiyoshi Tenjin",
        "images": [
            "https://images.unsplash.com/photo-1519671482538-518b76064044?w=500&q=80",
            "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&q=80"
        ]
    },
    {
        "id": "p24",
        "area": "Ohori (오호리)",
        "type": "Sight (관광)",
        "name": "오호리 공원",
        "rating": "4.5 (10,000+)",
        "desc": "후쿠오카 시민들의 휴식처. 큰 호수를 따라 산책하기 좋습니다.",
        "menu": "<ul class='menu-list'><li><span>입장료</span> <span>무료</span></li><li><span>오리배(30분)</span> <span>1,000엔</span></li><li><span>스타벅스 커피</span> <span>500엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.5</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"호수 보면서 멍 때리기 좋아요. 스타벅스 뷰가 예술입니다. 아침 산책 코스로 추천!\"\n        </div>\n    </div>\n    ",
        "info": "24시간 개방",
        "transport": "오호리공원역",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Ohori Park",
        "images": [
            "https://images.unsplash.com/photo-1570176560374-27c720de30bf?w=500&q=80",
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80"
        ]
    },
    {
        "id": "p25",
        "area": "Momochi (모모치)",
        "type": "Sight (관광)",
        "name": "후쿠오카 타워",
        "rating": "4.3 (8,000+)",
        "desc": "후쿠오카의 랜드마크. 전망대에서 보는 야경이 아름답습니다.",
        "menu": "<ul class='menu-list'><li><span>전망대 입장권</span> <span>800엔</span></li><li><span>사랑의 자물쇠</span> <span>1,000엔</span></li><li><span>기념품</span> <span>500엔~</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.3</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"해 질 녘에 가서 야경까지 보고 오세요. 모모치 해변이랑 같이 묶어서 가면 좋습니다.\"\n        </div>\n    </div>\n    ",
        "info": "09:30 - 22:00",
        "transport": "니시진역 버스 15분",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Fukuoka Tower",
        "images": [
            "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500&q=80",
            "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&q=80"
        ]
    },
    {
        "id": "p26",
        "area": "Momochi (모모치)",
        "type": "Sight (관광)",
        "name": "모모치 해변 공원",
        "rating": "4.4 (5,500+)",
        "desc": "이국적인 분위기의 인공 해변. 후쿠오카 타워 바로 앞.",
        "menu": "<ul class='menu-list'><li><span>입장료</span> <span>무료</span></li><li><span>맥주</span> <span>600엔</span></li><li><span>아이스크림</span> <span>400엔</span></li></ul>",
        "reviews": "\n    <div class=\"review-summary-card\">\n        <div class=\"review-score\">\n            <span class=\"score-num\">4.4</span>\n            <span class=\"score-stars\">⭐⭐⭐⭐⭐</span>\n        </div>\n        <div class=\"review-text\">\n            \"유럽 같은 건물이 있어서 사진 찍기 예뻐요. 바다 보면서 맥주 한잔하면 힐링 됩니다.\"\n        </div>\n    </div>\n    ",
        "info": "24시간 개방",
        "transport": "후쿠오카 타워 앞",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Momochi Seaside Park",
        "images": [
            "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=500&q=80",
            "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=500&q=80"
        ]
    }
];
if (typeof module !== 'undefined') module.exports = placesData;