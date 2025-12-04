import json
import random

# Verified Image Pools (Static IDs)
verified_pools = {
    "food": [
        "1580828343064-fde4fc206bc6", "1553621042-f6e147245754", "1594212699903-ec8a3eca50f5", 
        "1569050467447-ce54b3bbc37d", "1618843479313-40f8afb4b4d8", "1552566626-52f8b828add9", 
        "1563245372-f21724e3856d", "1519985176271-adb1088fa94c", "1534422298391-e4f8c172dddb", 
        "1579871494447-9811cf80d66c", "1504674900247-0877df9cc836"
    ],
    "cafe": [
        "1554118811-1e0d58224f24", "1495474472287-4d71bcdd2085", "1509042239860-f550ce710b93", 
        "1521017432531-fbd92d768814", "1497935586351-b67a49e012bf", "1517248135467-4c7edcad34c4", 
        "1559305616-3f99cd43e353", "1514432324607-a09d9b4aefdd", "1461023058943-07fcbe16d735"
    ],
    "shopping": [
        "1607082348824-0a96f2a4b9da", "1528698827591-e19ccd7bc23d", "1555529669-e69e7aa0ba9a", 
        "1483985988355-763728e1935b", "1519671482538-518b76064044", "1534452203293-494d7ddbf7e0", 
        "1567401893414-76b7b1e5a7a5", "1441986300917-64674bd600d8", "1472851294608-4155f2118c03", 
        "1479064555552-3ef4979f8908"
    ],
    "sightseeing": [
        "1570176560374-27c720de30bf", "1493976040374-85c8e12f0c0e", 
        "1545569341-9eb8b30979d9", "1503899036084-c55cdd92da26", "1480796927426-f609979314bd", 
        "1524413840807-0c3cb6fa808d", "1492571350019-22de08371fd3", "1478436127897-769e1b3f0f36", 
        "1542051841857-5f90071e7989"
    ]
}

# Helper to create a place object
def create_place(id_suffix, area, type_str, name, rating, desc, menu_items, review_text, info, transport, map_url, image_keywords):
    # Construct menu HTML
    menu_html = "<ul class='menu-list'>"
    for item, price in menu_items.items():
        menu_html += f"<li><span>{item}</span> <span>{price}</span></li>"
    menu_html += "</ul>"

    # Construct reviews HTML (Summary style)
    reviews_html = f"""
    <div class="review-summary-card">
        <div class="review-score">
            <span class="score-num">{rating.split(' ')[0]}</span>
            <span class="score-stars">⭐⭐⭐⭐⭐</span>
        </div>
        <div class="review-text">
            "{review_text}"
        </div>
    </div>
    """

    # Assign Images (Priority: image_keywords if list, else pool)
    images = []
    if isinstance(image_keywords, list) and len(image_keywords) > 0 and "-" in image_keywords[0]:
        # Assume it's a list of specific Unsplash IDs
        for img_id in image_keywords:
            images.append(f"https://images.unsplash.com/photo-{img_id}?w=500&q=80")
    else:
        # Fallback to pool logic
        pool_key = "food"
        if "카페" in type_str: pool_key = "cafe"
        elif "쇼핑" in type_str: pool_key = "shopping"
        elif "관광" in type_str: pool_key = "sightseeing"
        
        pool = verified_pools[pool_key]
        start_idx = (id_suffix * 3) % len(pool)
        for i in range(5):
            img_id = pool[(start_idx + i) % len(pool)]
            images.append(f"https://images.unsplash.com/photo-{img_id}?w=500&q=80")

    # Robust Map URL
    safe_map_url = map_url if map_url.startswith("http") else f"https://www.google.com/maps/search/?api=1&query={name}"

    return {
        "id": f"p{id_suffix}",
        "area": area,
        "type": type_str,
        "name": name,
        "rating": rating,
        "desc": desc,
        "menu": menu_html,
        "reviews": reviews_html, 
        "info": info,
        "transport": transport,
        "mapUrl": safe_map_url,
        "images": images
    }

places = []

# --- REAL WORLD GOURMET FROM USER SCREENSHOTS ---
real_gourmet_places = [
    {
        "name": "모토무라 규카츠", "area": "Daimyo (다이묘)", "type": "Tonkatsu (돈카츠)", "rating": "4.8 (11,158)",
        "desc": "돈까스 전문식당. 살살 녹는 규카츠의 정석.",
        "menu": {"규카츠 정식 (130g)": "1,930엔", "규카츠 정식 (260g)": "2,600엔", "생맥주": "600엔"},
        "review": "음식은 말해뭐해 맛있고 살살 녹는 맛이었습니다.",
        "hours": "11:00 - 22:00", "loc": "1 Chome-14-5 Daimyo", "map_query": "Motomura Gyukatsu Fukuoka",
        "images": ["1553621042-f6e147245754", "1618843479313-40f8afb4b4d8", "1594212699903-ec8a3eca50f5"]
    },
    {
        "name": "니쿠이치 하카타점", "area": "Hakata (하카타)", "type": "Yakiniku (야키니쿠)", "rating": "4.4 (2,124)",
        "desc": "편안한 분위기의 야키니쿠 식당. 가성비 좋은 와규.",
        "menu": {"상급 갈비": "980엔", "특선 7종 모듬": "3,980엔", "육회": "880엔"},
        "review": "별이 5개뿐인게 너무 아쉽네요 10개였음 걍 별 10개 무조건이에요.",
        "hours": "16:00 - 01:00", "loc": "Hakataekiminami 1 Chome-2-18", "map_query": "Nikuichi Hakata",
        "images": ["1553621042-f6e147245754", "1542359553-66256f68c871", "1594212699903-ec8a3eca50f5"]
    },
    {
        "name": "설화(유키하나)", "area": "Haruyoshi (하루요시)", "type": "Izakaya (이자카야)", "rating": "4.6 (1,102)",
        "desc": "한국인 입맛에 맞는 안주가 가득한 이자카야.",
        "menu": {"모츠나베": "1,500엔", "꼬치구이 모듬": "1,200엔", "하이볼": "500엔"},
        "review": "음식 맛은 맛있지도, 맛없지도 않은... 하지만 분위기는 좋습니다.",
        "hours": "17:00 - 03:00", "loc": "Haruyoshi 3 Chome-11-19", "map_query": "Yukihana Fukuoka",
        "images": ["1579871494447-9811cf80d66c", "1519985176271-adb1088fa94c", "1534422298391-e4f8c172dddb"]
    },
    {
        "name": "신신 라멘 텐진 본점", "area": "Tenjin (텐진)", "type": "Ramen (라멘)", "rating": "4.3 (7,160)",
        "desc": "후쿠오카 3대 라멘. 잡내 없는 깔끔한 돈코츠 국물.",
        "menu": {"신신 라멘": "760엔", "반숙 계란 라멘": "890엔", "교자": "550엔"},
        "review": "음식은 모두 맛있었어요 50분 정도 웨이팅하고 들어갔어요.",
        "hours": "11:00 - 03:00", "loc": "3 Chome-2-19 Tenjin", "map_query": "ShinShin Ramen Tenjin",
        "images": ["1580828343064-fde4fc206bc6", "1569050467447-ce54b3bbc37d", "1552566626-52f8b828add9"]
    },
    {
        "name": "하카타로바타 피쉬맨", "area": "Imaizumi (이마이즈미)", "type": "Izakaya (이자카야)", "rating": "4.8 (5,807)",
        "desc": "회 세트 메뉴를 즐길 수 있는 세련된 장소. 계단식 회 플레이팅이 유명.",
        "menu": {"피쉬맨 모듬회 (계단)": "2,500엔", "고등어 회": "1,200엔", "명란 계란말이": "800엔"},
        "review": "회 세트 메뉴를 즐길 수 있는 세련된 장소. 비주얼이 압도적입니다.",
        "hours": "11:00 - 23:00", "loc": "1 Chome-4-23 Imaizumi", "map_query": "Hakata Robata Fishman",
        "images": ["1579871494447-9811cf80d66c", "1519985176271-adb1088fa94c", "1534422298391-e4f8c172dddb"]
    },
    {
        "name": "하카타 고마사바야", "area": "Maizuru (마이즈루)", "type": "Seafood (해산물)", "rating": "4.4 (2,149)",
        "desc": "시장에서 사 온 생선으로 요리하는 캐주얼한 음식점. 고등어 회 정식이 일품.",
        "menu": {"고마사바 정식": "1,200엔", "해산물 덮밥": "1,500엔", "고등어 구이": "900엔"},
        "review": "13번째 저의 마음속 1등 식당 이였습니다. 고등어가 비리지 않고 고소해요.",
        "hours": "11:00 - 22:00", "loc": "Maizuru 1 Chome-2-11", "map_query": "Hakata Gomasabaya",
        "images": ["1519985176271-adb1088fa94c", "1579871494447-9811cf80d66c", "1534422298391-e4f8c172dddb"]
    },
    {
        "name": "원조 모츠나베 라쿠텐치 텐진본점", "area": "Tenjin (텐진)", "type": "Motsunabe (모츠나베)", "rating": "4.7 (18,802)",
        "desc": "일식 내장 냄비 요리 전문점. 산더미 부추가 시그니처.",
        "menu": {"모츠나베 (1인)": "1,260엔", "짬뽕면": "300엔", "두부": "250엔"},
        "review": "음식도 너무너무 좋고 직원분들도 너무너무 친절합니당!!!",
        "hours": "11:00 - 24:00", "loc": "Tenjin 1 Chome-1-1", "map_query": "Rakutenchi Tenjin",
        "images": ["1542359553-66256f68c871", "1580828343064-fde4fc206bc6", "1569050467447-ce54b3bbc37d"]
    },
    {
        "name": "치카에", "area": "Daimyo (다이묘)", "type": "Seafood (해산물)", "rating": "4.3 (3,523)",
        "desc": "수조가 있는 대형 해산물 요리점. 명란 튜브가 유명.",
        "menu": {"치카에 정식 (점심)": "2,000엔", "활어회 정식": "3,500엔", "명란 튜브": "800엔"},
        "review": "식비는 2,000엔/1인당 주말점심한정. 분위기가 고급스럽고 맛도 깔끔합니다.",
        "hours": "17:00 - 22:00", "loc": "2 Chome-2-17 Daimyo", "map_query": "Chikae Fukuoka",
        "images": ["1579871494447-9811cf80d66c", "1519985176271-adb1088fa94c", "1534422298391-e4f8c172dddb"]
    },
    {
        "name": "다이치노 우동", "area": "Hakata (하카타)", "type": "Udon (우동)", "rating": "4.2 (3,944)",
        "desc": "투명하고 쫄깃한 면발이 특징인 우동 맛집. 우엉 튀김이 거대함.",
        "menu": {"고기 우엉 튀김 우동": "780엔", "야채 튀김 우동": "680엔", "붓카케 우동": "700엔"},
        "review": "메뉴도 그림이랑 한국어로 되어있어 자판기에서 편하게 주문 했음.",
        "hours": "10:00 - 21:00", "loc": "Hakata Ekimae 2 Chome-1-1", "map_query": "Daichino Udon Hakata",
        "images": ["1552566626-52f8b828add9", "1580828343064-fde4fc206bc6", "1569050467447-ce54b3bbc37d"]
    },
    {
        "name": "히토쿠치 교자 타케토라", "area": "Haruyoshi (하루요시)", "type": "Izakaya (이자카야)", "rating": "4.8 (2,776)",
        "desc": "한입 교자가 맛있는 이자카야. 2차로 가기 좋은 곳.",
        "menu": {"한입 교자 (10개)": "500엔", "생맥주": "550엔", "오이 무침": "350엔"},
        "review": "밤에 손님들이 많았고, 주문한 메뉴들은 모두 무난했습니다.",
        "hours": "17:00 - 03:00", "loc": "3 Chome-26-27 Haruyoshi", "map_query": "Hitokuchi Gyoza Taketora",
        "images": ["1552566626-52f8b828add9", "1534422298391-e4f8c172dddb", "1569050467447-ce54b3bbc37d"]
    },
    {
        "name": "야키토리 하레루야", "area": "Sumiyoshi (스미요시)", "type": "Yakitori (야키토리)", "rating": "4.9 (460)",
        "desc": "현지인들이 찾는 숨은 야키토리 맛집. 꼬치 하나하나 정성스럽게 구워줌.",
        "menu": {"꼬치 5종 세트": "1,000엔", "삼겹살 꼬치": "180엔", "닭껍질": "150엔"},
        "review": "4박 5일 여행 중 저와 남편의 단연 1등 맛집! 사장님이 정말 친절하세요.",
        "hours": "17:30 - 24:00", "loc": "2 Chome-15-1 Sumiyoshi", "map_query": "Yakitori Hareruya Fukuoka",
        "images": ["1534422298391-e4f8c172dddb", "1552566626-52f8b828add9", "1569050467447-ce54b3bbc37d"]
    },
    {
        "name": "요시즈카 우나기야", "area": "Nakasu (나카스)", "type": "Eel (장어)", "rating": "4.4 (8,697)",
        "desc": "150년 전통의 장어 덮밥 전문점. 후쿠오카 최고의 장어 맛집.",
        "menu": {"우나쥬 (4조각)": "3,500엔", "우나쥬 (6조각)": "4,800엔", "장어 계란말이": "800엔"},
        "review": "밥한끼 35000원이지만 비싼만큼 맛은 있어요. 부모님 모시고 가기 좋습니다.",
        "hours": "10:00 - 21:00", "loc": "2 Chome-8-27 Nakasu", "map_query": "Yoshizuka Unagiya",
        "images": ["1519985176271-adb1088fa94c", "1579871494447-9811cf80d66c", "1534422298391-e4f8c172dddb"]
    },
    {
        "name": "쿠로부타 돈카츠 쿠로마츠", "area": "Daimyo (다이묘)", "type": "Tonkatsu (돈카츠)", "rating": "4.5 (723)",
        "desc": "흑돼지 돈카츠 전문점. 두툼한 고기와 바삭한 튀김옷.",
        "menu": {"로스 카츠 정식": "1,800엔", "히레 카츠 정식": "2,000엔", "특상 로스 카츠": "2,400엔"},
        "review": "음식은 한화 약 18,000원 정도인데 비싸지 않은 가격이다. 육즙이 살아있어요.",
        "hours": "11:00 - 21:00", "loc": "2 Chome-1-38 Daimyo", "map_query": "Kurobuta Tonkatsu Kuromatsu",
        "images": ["1553621042-f6e147245754", "1618843479313-40f8afb4b4d8", "1594212699903-ec8a3eca50f5"]
    },
    {
        "name": "멘야 카네토라 텐진본점", "area": "Tenjin (텐진)", "type": "Ramen (라멘)", "rating": "4.3 (2,846)",
        "desc": "진한 멸치 육수의 츠케멘 맛집. 매운맛 조절 가능.",
        "menu": {"츠케멘": "1,000엔", "매운 츠케멘": "1,100엔", "토핑 전부 추가": "1,350엔"},
        "review": "라면과 토핑을 파는 북적이는 바. 면발이 쫄깃하고 국물이 정말 진해요.",
        "hours": "10:30 - 22:30", "loc": "Watanabedori 4 Chome-9-18", "map_query": "Menya Kanetora Tenjin",
        "images": ["1580828343064-fde4fc206bc6", "1569050467447-ce54b3bbc37d", "1552566626-52f8b828add9"]
    },
    {
        "name": "부타 매니아동 이나다야 선", "area": "Watanabedori (와타나베도리)", "type": "Rice Bowl (덮밥)", "rating": "4.7 (543)",
        "desc": "돼지고기 덮밥 전문점. 숯불 향 가득한 고기가 밥 위에 듬뿍.",
        "menu": {"부타동 (보통)": "850엔", "부타동 (대)": "1,000엔", "계란 노른자 추가": "100엔"},
        "review": "웨이팅 없고 점원이 친절함 오차즈케도 맛있다. 숨은 맛집 발견!",
        "hours": "11:00 - 21:00", "loc": "Watanabedori 1 Chome-1-1", "map_query": "Inadaya Sun Fukuoka",
        "images": ["1553621042-f6e147245754", "1618843479313-40f8afb4b4d8", "1504674900247-0877df9cc836"]
    },
    {
        "name": "모츠나베 라쿠텐치 이마이즈미 총본점", "area": "Imaizumi (이마이즈미)", "type": "Motsunabe (모츠나베)", "rating": "4.8 (17,256)",
        "desc": "라쿠텐치의 또 다른 본점. 넓은 좌석과 변함없는 맛.",
        "menu": {"모츠나베": "1,260엔", "짬뽕면": "300엔", "두부": "250엔"},
        "review": "느끼할까봐 걱정했는데 하나도 안느끼고 너무 맛있었습니다. 부추가 신의 한 수.",
        "hours": "17:00 - 24:00", "loc": "Imaizumi 1 Chome-19-18", "map_query": "Rakutenchi Imaizumi",
        "images": ["1542359553-66256f68c871", "1580828343064-fde4fc206bc6", "1569050467447-ce54b3bbc37d"]
    },
    {
        "name": "키와미야 함바그 하카타점", "area": "Hakata (하카타)", "type": "Steak (스테이크)", "rating": "4.2 (2,938)",
        "desc": "하카타역 바로 옆에 위치한 키와미야. 접근성이 좋아 항상 줄이 깁니다.",
        "menu": {"함바그 S": "1,298엔", "함바그 M": "1,628엔", "세트": "+440엔"},
        "review": "역시 맛집이라 30분 이상의 웨이팅은 기본이더라구요. 기다린 보람이 있는 맛.",
        "hours": "11:00 - 22:00", "loc": "Hakataekichuogai 2-1", "map_query": "Kiwamiya Hakata",
        "images": ["1553621042-f6e147245754", "1594212699903-ec8a3eca50f5", "1618843479313-40f8afb4b4d8"]
    },
    {
        "name": "텐푸라 히라오 본점", "area": "Higashihirao (히가시히라오)", "type": "Tempura (튀김)", "rating": "4.4 (6,679)",
        "desc": "갓 튀긴 튀김을 하나씩 가져다주는 후쿠오카 스타일 덴푸라.",
        "menu": {"기본 정식": "890엔", "아지와이 정식": "990엔", "오징어 젓갈": "무료"},
        "review": "2번은 가세요 가성비 맛집. 오징어 젓갈이 정말 맛있어서 밥도둑입니다.",
        "hours": "10:30 - 21:00", "loc": "2 Chome-4-1 Higashihirao", "map_query": "Tempura Hirao Main Store",
        "images": ["1552566626-52f8b828add9", "1534422298391-e4f8c172dddb", "1569050467447-ce54b3bbc37d"]
    },
    {
        "name": "하가쿠레 우동", "area": "Hakata (하카타)", "type": "Udon (우동)", "rating": "4.4 (2,508)",
        "desc": "미슐랭 빕구르망에 선정된 우동 맛집. 부드러운 면발이 특징.",
        "menu": {"고기 우엉 우동": "650엔", "새우 튀김 우동": "600엔", "유부 초밥": "200엔"},
        "review": "다카마쓰 처럼 쫀득한 우동과 다릅니다. 부들부들해서 술술 넘어가요.",
        "hours": "11:00 - 21:00", "loc": "2 Chome-3-32 Hakataekiminami", "map_query": "Hagakure Udon",
        "images": ["1552566626-52f8b828add9", "1580828343064-fde4fc206bc6", "1569050467447-ce54b3bbc37d"]
    },
    {
        "name": "미야치쿠 스테이크", "area": "Nakasu (나카스)", "type": "Steak (스테이크)", "rating": "4.5 (717)",
        "desc": "고급 미야자키규를 철판에서 구워주는 스테이크 하우스.",
        "menu": {"런치 코스": "4,500엔", "디너 코스": "10,000엔", "안심 스테이크": "8,000엔"},
        "review": "2인 기준 한화 52만원 정도를 썼음. 특별한 날 가기 좋은 최고의 서비스.",
        "hours": "11:00 - 22:00", "loc": "Nakasu 5 Chome-2-1", "map_query": "Miyachiku Steak Fukuoka",
        "images": ["1553621042-f6e147245754", "1594212699903-ec8a3eca50f5", "1618843479313-40f8afb4b4d8"]
    }
]

id_counter = 1
for p in real_gourmet_places:
    places.append(create_place(id_counter, p['area'], p['type'], p['name'], p['rating'], p['desc'], p['menu'], p['review'], p['hours'], p['loc'], f"https://www.google.com/maps/search/?api=1&query={p['map_query']}", p['images']))
    id_counter += 1

# --- SHOPPING (Don Quijote & Drugstores) ---
shopping_places = [
    {
        "name": "돈키호테 텐진 본점", "area": "Tenjin (텐진)", "type": "Shopping (쇼핑)", "rating": "3.9 (12,000+)",
        "desc": "24시간 영업하는 대형 디스카운트 스토어. 의약품, 화장품, 간식 등 없는 게 없습니다.",
        "menu": {"동전 파스": "600엔", "휴족시간": "500엔", "퍼펙트 휩": "400엔"},
        "review": "지하 1층부터 5층까지 물건이 정말 많습니다. 텍스 리펀 줄이 기니까 여유 있게 가세요.",
        "hours": "24시간 영업", "loc": "텐진역 도보 5분", "map_query": "Don Quijote Tenjin",
        "images": ["1607082348824-0a96f2a4b9da", "1528698827591-e19ccd7bc23d"]
    },
    {
        "name": "돈키호테 나카스점", "area": "Nakasu (나카스)", "type": "Shopping (쇼핑)", "rating": "3.8 (9,500+)",
        "desc": "나카스 강변에 위치한 돈키호테. 1층과 2층으로 구성되어 쇼핑하기 편리합니다.",
        "menu": {"이치란 라멘 키트": "2,000엔", "킷캣 녹차맛": "300엔", "산토리 위스키": "1,500엔"},
        "review": "텐진점보다 통로가 넓어서 쇼핑하기 쾌적합니다. 새벽에 가서 여유롭게 쇼핑했어요.",
        "hours": "24시간 영업", "loc": "나카스카와바타역", "map_query": "Don Quijote Nakasu",
        "images": ["1607082348824-0a96f2a4b9da", "1555529669-e69e7aa0ba9a"]
    },
    {
        "name": "마츠모토 키요시 텐진점", "area": "Tenjin (텐진)", "type": "Drugstore (드럭스토어)", "rating": "4.0 (500+)",
        "desc": "일본 최대 드럭스토어 체인. 화장품과 의약품 종류가 다양합니다.",
        "menu": {"샤론 파스": "900엔", "이브 진통제": "700엔", "하다라보 고쿠쥰": "800엔"},
        "review": "돈키호테보다 화장품 종류가 더 많은 것 같아요. 쿠폰 쓰면 더 저렴하게 살 수 있습니다.",
        "hours": "09:00 - 23:00", "loc": "텐진 지하상가", "map_query": "Matsumoto Kiyoshi Tenjin",
        "images": ["1519671482538-518b76064044", "1534452203293-494d7ddbf7e0"]
    }
]

for p in shopping_places:
    places.append(create_place(id_counter, p['area'], p['type'], p['name'], p['rating'], p['desc'], p['menu'], p['review'], p['hours'], p['loc'], f"https://www.google.com/maps/search/?api=1&query={p['map_query']}", p['images']))
    id_counter += 1

# --- SIGHTSEEING ---
sightseeing_places = [
    {
        "name": "오호리 공원", "area": "Ohori (오호리)", "type": "Sight (관광)", "rating": "4.5 (10,000+)",
        "desc": "후쿠오카 시민들의 휴식처. 큰 호수를 따라 산책하기 좋습니다.",
        "menu": {"입장료": "무료", "오리배(30분)": "1,000엔", "스타벅스 커피": "500엔"},
        "review": "호수 보면서 멍 때리기 좋아요. 스타벅스 뷰가 예술입니다. 아침 산책 코스로 추천!",
        "hours": "24시간 개방", "loc": "오호리공원역", "map_query": "Ohori Park",
        "images": ["1570176560374-27c720de30bf", "1493976040374-85c8e12f0c0e"]
    },
    {
        "name": "후쿠오카 타워", "area": "Momochi (모모치)", "type": "Sight (관광)", "rating": "4.3 (8,000+)",
        "desc": "후쿠오카의 랜드마크. 전망대에서 보는 야경이 아름답습니다.",
        "menu": {"전망대 입장권": "800엔", "사랑의 자물쇠": "1,000엔", "기념품": "500엔~"},
        "review": "해 질 녘에 가서 야경까지 보고 오세요. 모모치 해변이랑 같이 묶어서 가면 좋습니다.",
        "hours": "09:30 - 22:00", "loc": "니시진역 버스 15분", "map_query": "Fukuoka Tower",
        "images": ["1545569341-9eb8b30979d9", "1503899036084-c55cdd92da26"]
    },
    {
        "name": "모모치 해변 공원", "area": "Momochi (모모치)", "type": "Sight (관광)", "rating": "4.4 (5,500+)",
        "desc": "이국적인 분위기의 인공 해변. 후쿠오카 타워 바로 앞.",
        "menu": {"입장료": "무료", "맥주": "600엔", "아이스크림": "400엔"},
        "review": "유럽 같은 건물이 있어서 사진 찍기 예뻐요. 바다 보면서 맥주 한잔하면 힐링 됩니다.",
        "hours": "24시간 개방", "loc": "후쿠오카 타워 앞", "map_query": "Momochi Seaside Park",
        "images": ["1480796927426-f609979314bd", "1524413840807-0c3cb6fa808d"]
    }
]

for p in sightseeing_places:
    places.append(create_place(id_counter, p['area'], p['type'], p['name'], p['rating'], p['desc'], p['menu'], p['review'], p['hours'], p['loc'], f"https://www.google.com/maps/search/?api=1&query={p['map_query']}", p['images']))
    id_counter += 1

# Output to JSON file
with open('places_data.js', 'w', encoding='utf-8') as f:
    f.write("const placesData = " + json.dumps(places, ensure_ascii=False, indent=4) + ";")
    f.write("\nif (typeof module !== 'undefined') module.exports = placesData;")

print(f"Successfully generated places_data.js with {len(places)} items.")
