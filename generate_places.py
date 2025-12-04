import json
import random

# Real-ish Data Source (Internal Knowledge Simulation) - KOREAN WITH RICH DATA
raw_data = [
    # --- 텐진 (Tenjin) ---
    ("신신 라멘 텐진 본점", "Food", "Tenjin", "하카타 순수 돈코츠 라멘, 얇은 면발이 특징입니다."),
    ("키와미야 함바그", "Food", "Tenjin", "직접 돌판에 구워 먹는 이마리규 햄버그 스테이크."),
    ("효탄 스시", "Food", "Tenjin", "합리적인 가격의 고품질 스시. 항상 줄이 깁니다."),
    ("모츠나베 라쿠텐치", "Food", "Tenjin", "부추가 산더미처럼 쌓인 곱창전골. 현지인 맛집."),
    ("이치란 텐진", "Food", "Tenjin", "독서실 좌석 스타일. 1인 손님도 편함."),
    ("잇푸도 다이묘", "Food", "Tenjin", "글로벌 라멘 브랜드의 본점."),
    ("레드락", "Food", "Tenjin", "유명한 로스트비프 덮밥."),
    ("우동 타이라", "Food", "Tenjin", "유명한 우엉 튀김 우동."),
    ("튀김 히라오", "Food", "Tenjin", "갓 튀긴 튀김을 카운터에서."),
    ("치카에", "Food", "Tenjin", "고급 해산물 점심 특선."),
    
    ("이와타야 백화점", "Shopping", "Tenjin", "명품 브랜드와 유명한 지하 식품관."),
    ("텐진 지하상가", "Shopping", "Tenjin", "유럽풍 스타일의 지하 쇼핑 거리."),
    ("솔라리아 플라자", "Shopping", "Tenjin", "영화관과 레스토랑이 있는 패션 빌딩."),
    ("다이마루 후쿠오카", "Shopping", "Tenjin", "훌륭한 식품관이 있는 전통 백화점."),
    ("미나 텐진", "Shopping", "Tenjin", "유니클로와 로프트가 있는 캐주얼 쇼핑몰."),
    ("빅카메라 텐진", "Shopping", "Tenjin", "대형 가전 양판점. 면세 가능."),
    ("유자와야", "Shopping", "Tenjin", "뜨개질과 털실 전문점."),
    ("애니메이트 텐진", "Shopping", "Tenjin", "애니메이션과 만화 굿즈의 천국."),
    ("만다라케", "Shopping", "Tenjin", "중고 애니메이션 및 빈티지 장난감."),
    
    ("키르훼봉", "Cafe", "Tenjin", "유명한 과일 타르트 전문점."),
    ("공차", "Cafe", "Tenjin", "인기 버블티 체인."),
    ("스타벅스 츠타야", "Cafe", "Tenjin", "츠타야 서점과 함께하는 북카페."),
    ("빌즈 후쿠오카", "Cafe", "Tenjin", "유명한 리코타 팬케이크."),
    ("스테레오 커피", "Cafe", "Tenjin", "좋은 음악이 있는 스탠딩 커피 바."),
    
    ("후쿠오카 시청", "Sight", "Tenjin", "크리스마스 마켓과 행사가 열리는 곳."),
    ("아크로스 후쿠오카", "Sight", "Tenjin", "계단식 정원이 있는 친환경 건물."),
    ("케고 공원", "Sight", "Tenjin", "도심 속 공원, 겨울 조명."),
    ("케고 신사", "Sight", "Tenjin", "도심 한복판에 있는 신사."),
    ("수이쿄 텐만구", "Sight", "Tenjin", "오피스 가에 숨겨진 신사."),

    # --- 하카타 (Hakata) ---
    ("하카타역", "Sight", "Hakata", "거대한 쇼핑 단지가 있는 주요 교통 허브."),
    ("JR 하카타 시티", "Shopping", "Hakata", "아뮤 플라자, 한큐, 데이토스가 한곳에."),
    ("키테 하카타", "Shopping", "Hakata", "OIOI와 레스토랑이 있는 현대적인 몰."),
    ("하카타 한큐", "Shopping", "Hakata", "고급 백화점."),
    ("아뮤 플라자 하카타", "Shopping", "Hakata", "트렌디한 패션과 도큐핸즈."),
    ("데이토스", "Food", "Hakata", "면 요리 거리와 기념품 시장."),
    ("하카타 잇소우", "Food", "Hakata", "카푸치노 거품 돈코츠 라멘."),
    ("하카타 잇코샤", "Food", "Hakata", "전통적인 거품 돈코츠 라멘."),
    ("다이치노 우동", "Food", "Hakata", "투명한 면발과 거대한 튀김."),
    ("모츠나베 오야마", "Food", "Hakata", "진한 된장 베이스 곱창전골."),
    ("모츠나베 쇼라쿠", "Food", "Hakata", "간장 베이스의 깔끔한 맛."),
    ("테츠나베 교자", "Food", "Hakata", "철판 군만두."),
    
    ("아사히 맥주 공장", "Sight", "Hakata", "신선한 맥주 투어 및 시음."),
    ("스미요시 신사", "Sight", "Hakata", "규슈에서 가장 오래된 신사 중 하나."),
    ("라쿠스이엔", "Sight", "Hakata", "전통 일본 정원."),
    ("후지타 공원", "Sight", "Hakata", "역 근처의 조용한 공원."),
    ("캐널시티 하카타", "Shopping", "Hakata", "운하가 흐르는 쇼핑몰."),
    ("라멘 스타디움", "Food", "Hakata", "유명 라멘 가게들의 집합소."),
    ("팀랩 포레스트", "Sight", "Hakata", "디지털 아트 뮤지엄."),
    ("보스 이조 후쿠오카", "Sight", "Hakata", "미끄럼틀이 있는 엔터테인먼트 복합시설."),
    ("마크 이즈 후쿠오카", "Shopping", "Hakata", "돔 근처의 대형 쇼핑몰."),
    ("후쿠오카 타워", "Sight", "Hakata", "전망대가 있는 상징적인 타워."),
    ("하카타 포트 타워", "Sight", "Hakata", "항구 전망 타워."),
    ("베이사이드 플레이스 하카타", "Sight", "Hakata", "수족관이 있는 여객 터미널."),
    ("나미하노유", "Sight", "Hakata", "항구 근처 온천 시설."),
    ("하카타 전통 공예관", "Sight", "Hakata", "지역 공예품 박물관."),
    ("마치야 민속 박물관", "Sight", "Hakata", "오래된 상인 가옥 박물관."),
    ("구시다 신사", "Sight", "Hakata", "하카타의 수호 신사."),

    # --- 나카스 (Nakasu) ---
    ("나카스 야타이 거리", "Food", "Nakasu", "강변을 따라 늘어선 상징적인 포장마차."),
    ("야타이 얌모리", "Food", "Nakasu", "유명한 야타이 포장마차."),
    ("야타이 마미짱", "Food", "Nakasu", "영어 메뉴가 있는 친절한 야타이."),
    ("이치란 본사 총본점", "Food", "Nakasu", "이치란 라멘의 타워."),
    ("요시즈카 우나기야", "Food", "Nakasu", "후쿠오카 최고의 장어 덮밥."),
    ("두부 요리 우메노하나", "Food", "Nakasu", "가이세키 스타일 두부 요리."),
    ("닌교 쇼지", "Sight", "Nakasu", "붉은 등불이 있는 오래된 골목."),
    ("후쿠하쿠 데아이 다리", "Sight", "Nakasu", "텐진과 나카스를 잇는 다리."),
    ("카와바타 상점가", "Shopping", "Nakasu", "전통적인 아케이드 쇼핑 거리."),
    ("하카타좌", "Sight", "Nakasu", "가부키 및 연극 공연장."),
    ("후쿠오카 아시아 미술관", "Sight", "Nakasu", "현대 아시아 미술 컬렉션."),
    ("하카타 리버레인", "Shopping", "Nakasu", "미술관이 있는 고급 몰."),
    ("돈키호테 나카스", "Shopping", "Nakasu", "24시간 할인점."),
    ("멘타이코 피아", "Food", "Nakasu", "매운 명란젓 전문점."),
    ("테츠나베 나카스", "Food", "Nakasu", "철판 교자 나카스 지점."),
    ("바 히구치", "Food", "Nakasu", "유명한 정통 바."),
    ("루이다의 주점", "Food", "Nakasu", "드래곤 퀘스트 테마 바."),
    ("쉽스 가든", "Cafe", "Nakasu", "강 위에 떠 있는 카페."),
    ("블루보틀 커피", "Cafe", "Nakasu", "텐진/나카스 근처의 새로운 지점."),

    # --- 다이묘 / 야쿠인 / 모모치 / 기타 ---
    ("카페 델 솔", "Cafe", "Daimyo", "폭신한 팬케이크."),
    ("수요일의 앨리스", "Shopping", "Daimyo", "이상한 나라의 앨리스 테마 샵."),
    ("슈프림 후쿠오카", "Shopping", "Daimyo", "스트릿웨어 브랜드."),
    ("나이키 후쿠오카", "Shopping", "Daimyo", "대형 나이키 매장."),
    ("라인 프렌즈 스토어", "Shopping", "Daimyo", "라인 캐릭터 굿즈."),
    ("아이보리쉬", "Cafe", "Daimyo", "프렌치 토스트 전문점."),
    ("공차 다이묘", "Cafe", "Daimyo", "버블티."),
    ("쿠시카츠 타나카", "Food", "Daimyo", "튀김 꼬치."),
    
    ("야키니쿠 바쿠로", "Food", "Yakuin", "고품질 와규 소고기."),
    ("노 커피", "Cafe", "Yakuin", "스타일리시한 그레이 테마 카페."),
    ("아베키", "Cafe", "Yakuin", "치즈케이크로 유명한 작은 카페."),
    ("굿 업 커피", "Cafe", "Yakuin", "앙버터 토스트."),
    
    ("마누 커피", "Cafe", "Yakuin", "노란 컵 커피."),
    ("훅 커피", "Cafe", "Yakuin", "비행기 테마."),
    ("오호리 공원", "Sight", "Momochi", "큰 호수 공원."),
    ("후쿠오카 성터", "Sight", "Momochi", "역사적인 유적지."),
    ("마이즈루 공원", "Sight", "Momochi", "벚꽃 명소."),
    ("후쿠오카 시 미술관", "Sight", "Momochi", "오호리 공원 내 미술관."),
    ("다자이후 텐만구", "Sight", "Others", "학문의 신사."),
    ("고묘젠지", "Sight", "Others", "선종 정원 사찰."),
    ("규슈 국립 박물관", "Sight", "Others", "대형 역사 박물관."),
    ("스타벅스 다자이후", "Cafe", "Others", "쿠마 켄고 건축."),
    ("우메가에 모치", "Food", "Others", "매화 찹쌀떡 거리 간식."),
    ("난조인", "Sight", "Others", "와불상."),
    ("이토시마 야자수 그네", "Sight", "Others", "해변 사진 명소."),
    ("선셋 카페", "Cafe", "Others", "바닷가 카페."),
    ("런던 버스 카페", "Cafe", "Others", "상징적인 버스 카페."),
    ("토토로 숲", "Sight", "Others", "숲 터널."),
    ("사쿠라이 후타미가우라", "Sight", "Others", "부부바위 토리이."),
]

# Menu templates by type
menu_templates = {
    "Food": [
        [("시그니처 메뉴", "800-1200엔"), ("정식", "1000-1500엔"), ("사이드 메뉴", "300-500엔")],
        [("A세트", "900엔"), ("B세트", "1200엔"), ("C세트", "1500엔"), ("음료 추가", "200엔")],
        [("기본", "700엔"), ("특선", "1100엔"), ("프리미엄", "1800엔"), ("추가 토핑", "100-300엔")],
    ],
    "Cafe": [
        [("커피", "400-600엔"), ("케이크", "500-800엔"), ("세트", "900엔")],
        [("드립 커피", "500엔"), ("라테", "600엔"), ("디저트", "700엔"), ("브런치", "1200엔")],
        [("블렌드", "450엔"), ("에스프레소", "300엔"), ("시즌 메뉴", "700엔")],
    ],
    "Shopping": [
        [("상품 구경", "다양함"), ("면세", "가능"), ("한정판", "수시 입고")],
        [("패션", "다양"), ("잡화", "다양"), ("기념품", "300-3000엔")],
    ],
    "Sight": [
        [("입장료", "무료-800엔"), ("관람 시간", "30분-1시간"), ("사진", "촬영 가능")],
        [("무료 입장", "가능"), ("주차", "근처 유료")],
    ]
}

# Review templates
review_templates = {
    "Food": [
        "양이 진짜 많아요! 배불러서 걷기 힘들 정도",
        "현지인들이 많이 오는 곳이라 믿고 먹을 수 있어요",
        "가격 대비 퀄리티가 정말 좋습니다",
        "맛은 좋은데 대기 시간이 좀 길어요",
        "재방문 의사 100%. 다음에 또 올게요",
    ],
    "Cafe": [
        "분위기 좋고 커피도 맛있어요",
        "케이크 비주얼이 미쳤어요",
        "가격은 조금 있지만 만족",
        "조용하고 와이파이도 빨라서 작업하기 좋아요",
        "웨이팅 있을 수 있으니 평일 오후 추천",
    ],
    "Shopping": [
        "품목이 다양해서 구경하는 재미가 있어요",
        "면세 가능하고 직원분들 친절해요",
        "한국보다 가격 저렴한 것들이 많아요",
        "신상품이 빨리 나와서 좋아요",
        "포장도 예쁘게 해주셔서 선물용으로 딱",
    ],
    "Sight": [
        "사진 찍기 정말 좋아요. 인생샷 건집니다",
        "입장료가 있지만 그만한 가치 있어요",
        "한적하고 조용해서 힐링되는 곳",
        "역사와 문화를 느낄 수 있어요",
        "무료인데 이렇게 좋아도 되나 싶을 정도",
    ]
}

places = []
for i, (name, ptype, area, desc) in enumerate(raw_data):
    map_url = f"https://www.google.com/maps/search/{name.replace(' ', '+')}+후쿠오카"
    rating = round(random.uniform(4.0, 4.9), 1)
    review_count = random.randint(500, 15000)
    
    keywords = {
        "Food": "food,dish,cuisine,meal,ramen,sushi",
        "Cafe": "coffee,latte,cake,dessert,pastry",
        "Shopping": "merchandise,shop,store,goods,fashion",
        "Sight": "architecture,building,landscape,scenery,nature"
    }
    base_keyword = keywords.get(ptype, "fukuoka,scenery")
    
    area_map = {
        "Tenjin": "天神 (텐진)",
        "Hakata": "博多 (하카타)",
        "Nakasu": "中洲 (나카스)",
        "Daimyo": "大名 (다이묘)",
        "Yakuin": "薬院 (야쿠인)",
        "Momochi": "百道 (모모치)",
        "Others": "その他 (기타)"
    }
    type_map = {
        "Food": "グルメ (맛집)",
        "Cafe": "カフェ (카페)",
        "Shopping": "ショッピング (쇼핑)",
        "Sight": "観光 (관광)"
    }

    images = []
    for j in range(1, 11):
        images.append(f"https://loremflickr.com/400/300/{base_keyword}?random={i*100+j}")
    
    # Generate menu
    menu_list = random.choice(menu_templates.get(ptype, menu_templates["Sight"]))
    menu_html = "<ul style='margin:5px 0;padding-left:20px;'>"
    for menu_name, price in menu_list:
        menu_html += f"<li>{menu_name}: {price}</li>"
    menu_html += "</ul>"
    
    # Generate reviews
    review_pool = review_templates.get(ptype, review_templates["Sight"])
    num_reviews = random.randint(3, 4)
    selected_reviews = random.sample(review_pool, min(num_reviews, len(review_pool)))
    
    reviews_html = "<div style='margin-top:10px;'>"
    for idx, review in enumerate(selected_reviews, 1):
        reviews_html += f"<div style='background:rgba(255,255,255,0.05);padding:8px;margin:5px 0;border-radius:5px;font-size:0.85em;'>"
        reviews_html += f"<strong>👤 방문자 {idx}</strong><br>{review}"
        reviews_html += "</div>"
    reviews_html += "</div>"
    
    # Transport info
    transport_options = ["도보 5분", "도보 10분", "역 직결", "버스 5분", "지하철 10분"]
    transport = f"{area_map.get(area, area)} {random.choice(transport_options)}"
    
    place = {
        "id": f"p{i+1}",
        "area": area_map.get(area, area),
        "type": type_map.get(ptype, ptype),
        "name": name,
        "rating": f"{rating} ({review_count}+)",
        "desc": desc,
        "menu": menu_html,
        "reviews": reviews_html,
        "info": "毎日営業 (Google Map確認)",
        "transport": transport,
        "mapUrl": map_url,
        "images": images
    }
    places.append(place)

js_content = f"const places = {json.dumps(places, ensure_ascii=False, indent=4)};"

with open("places_data.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated {len(places)} places with detailed menus and reviews.")
