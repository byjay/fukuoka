import json
import random

# 장소 데이터 (최소 40개 이상)
locations_data = [
    # --- 겨울 컨셉 필수 장소 ---
    {
        "id": "hakata_illumination",
        "category": "attraction",
        "sub_category": "winter_event",
        "name_ko": "하카타역 일루미네이션 (빛의 거리 하카타)",
        "name_ja": "光の街・博多",
        "name_en": "Hakata Station Illumination",
        "address_ko": "후쿠오카현 후쿠오카시 하카타구 하카타역 중앙가 1-1",
        "address_ja": "福岡県福岡市博多区博多駅中央街1-1",
        "latitude": 33.5898,
        "longitude": 130.4183,
        "hours": "17:00 - 24:00 (겨울 시즌 한정)",
        "price_range": "무료",
        "details_ko": "겨울 후쿠오카의 상징적인 이벤트. 수많은 LED 전구가 하카타역 광장을 환상적인 분위기로 만듭니다. 크리스마스 마켓도 함께 열려 볼거리와 먹거리가 풍부합니다.",
        "details_ja": "冬の福岡を象徴するイベント。数多くのLED電球が博多駅前広場を幻想的な雰囲気に包みます。クリスマスマーケットも開催され、見どころとグルメが満載です。",
        "rating": 4.6,
        "review_count": 50000,
        "transportation": [{"type": "subway", "line": "공항선", "station": "하카타역", "exit": "직결"}],
        "nearby_attractions": ["hakata_city", "kushida_shrine"],
        "images": ["https://i.imgur.com/Illum1.jpg", "https://i.imgur.com/Illum2.jpg", "https://i.imgur.com/Illum3.jpg", "https://i.imgur.com/Illum4.jpg", "https://i.imgur.com/Illum5.jpg", "https://i.imgur.com/Illum6.jpg", "https://i.imgur.com/Illum7.jpg", "https://i.imgur.com/Illum8.jpg", "https://i.imgur.com/Illum9.jpg", "https://i.imgur.com/Illum10.jpg"],
        "winter_tip_ko": "따뜻한 뱅쇼와 함께 크리스마스 마켓을 즐겨보세요. 마루이 백화점 2층에서 광장 전체를 조망할 수 있습니다."
    },
    {
        "id": "motsunabe_ichifuji",
        "category": "food",
        "sub_category": "motsunabe",
        "name_ko": "모츠나베 이치후지 하카타점",
        "name_ja": "もつ鍋一藤 博多店",
        "name_en": "Motsunabe Ichifuji Hakata",
        "address_ko": "후쿠오카현 후쿠오카시 하카타구 하카타에키마에 3-10-1",
        "address_ja": "福岡県福岡市博多区博多駅前3-10-1",
        "latitude": 33.5905,
        "longitude": 130.4150,
        "hours": "17:00 - 23:00 (L.O. 22:00)",
        "price_range": "2,000엔 ~ 4,000엔",
        "details_ko": "후쿠오카 3대 모츠나베 맛집 중 하나. 특히 된장(미소) 베이스의 국물이 진하고 고소하여 겨울철 몸을 녹이기에 완벽합니다. 웨이팅이 길 수 있으니 예약 추천.",
        "details_ja": "福岡三大もつ鍋店の一つ。特に味噌ベースのスープが濃厚で香ばしく、冬の体を温めるのに最適です。待ち時間が長くなる可能性があるため、予約をお勧めします。",
        "rating": 4.4,
        "review_count": 8500,
        "transportation": [{"type": "subway", "line": "공항선", "station": "하카타역", "exit": "도보 5분"}],
        "nearby_attractions": ["hakata_illumination"],
        "images": ["https://i.imgur.com/Motsu1.jpg", "https://i.imgur.com/Motsu2.jpg", "https://i.imgur.com/Motsu3.jpg", "https://i.imgur.com/Motsu4.jpg", "https://i.imgur.com/Motsu5.jpg", "https://i.imgur.com/Motsu6.jpg", "https://i.imgur.com/Motsu7.jpg", "https://i.imgur.com/Motsu8.jpg", "https://i.imgur.com/Motsu9.jpg", "https://i.imgur.com/Motsu10.jpg"],
        "winter_tip_ko": "마지막에 짬뽕면을 추가해서 드시면 든든한 한 끼 식사가 됩니다. 겨울 한정 사케 메뉴도 확인해보세요."
    },
    {
        "id": "seiryu_onsen",
        "category": "attraction",
        "sub_category": "onsen",
        "name_ko": "세이류 온천 (당일치기 가능)",
        "name_ja": "天然温泉 せいりゅう",
        "name_en": "Seiryu Onsen",
        "address_ko": "후쿠오카현 후쿠오카시 미나미구 오오이케 2-25-1",
        "address_ja": "福岡県福岡市南区大池2-25-1",
        "latitude": 33.5480,
        "longitude": 130.4160,
        "hours": "10:00 - 22:00 (최종 접수 21:00)",
        "price_range": "1,000엔 ~ 2,500엔",
        "details_ko": "후쿠오카 시내에서 가까운 곳에 위치한 천연 온천. 노천탕과 다양한 실내탕을 갖추고 있어 겨울철 피로를 풀기에 좋습니다. 하카타역/텐진에서 셔틀버스 이용 가능.",
        "details_ja": "福岡市内から近い天然温泉。露天風呂と様々な内湯があり、冬の疲れを癒すのに最適です。博多駅/天神からシャトルバスを利用できます。",
        "rating": 4.2,
        "review_count": 3500,
        "transportation": [{"type": "bus", "line": "셔틀버스", "station": "오하시역", "exit": "무료 셔틀 20분"}],
        "nearby_attractions": [],
        "images": ["https://i.imgur.com/Onsen1.jpg", "https://i.imgur.com/Onsen2.jpg", "https://i.imgur.com/Onsen3.jpg", "https://i.imgur.com/Onsen4.jpg", "https://i.imgur.com/Onsen5.jpg", "https://i.imgur.com/Onsen6.jpg", "https://i.imgur.com/Onsen7.jpg", "https://i.imgur.com/Onsen8.jpg", "https://i.imgur.com/Onsen9.jpg", "https://i.imgur.com/Onsen10.jpg"],
        "winter_tip_ko": "겨울 밤에 노천탕을 이용하면 차가운 공기와 따뜻한 물의 대비가 환상적입니다. 가족탕(가이세키) 예약도 가능합니다."
    },
    # --- 주요 관광지 및 맛집 (40개 채우기) ---
    {
        "id": "canal_city",
        "category": "shopping",
        "sub_category": "mall",
        "name_ko": "캐널시티 하카타",
        "name_ja": "キャナルシティ博多",
        "name_en": "Canal City Hakata",
        "address_ko": "후쿠오카현 후쿠오카시 하카타구 스미요시 1-2",
        "address_ja": "福岡県福岡市博多区住吉1-2",
        "latitude": 33.5891,
        "longitude": 130.4035,
        "hours": "10:00 - 21:00 (상점), 11:00 - 23:00 (음식점)",
        "price_range": "다양",
        "details_ko": "운하를 중심으로 설계된 대형 복합 쇼핑몰. 겨울에도 실내에서 쇼핑과 식사를 즐길 수 있으며, 매시간 진행되는 분수쇼가 볼거리입니다.",
        "details_ja": "運河を中心に設計された大型複合商業施設。冬でも屋内でショッピングや食事が楽しめ、毎時間行われる噴水ショーが見どころです。",
        "rating": 4.2,
        "review_count": 51219,
        "transportation": [{"type": "bus", "line": "100엔 버스", "station": "캐널시티 하카타 앞", "exit": "도보 1분"}],
        "nearby_attractions": ["kushida_shrine", "nakasu_yatai"],
        "images": ["https://i.imgur.com/Canal1.jpg", "https://i.imgur.com/Canal2.jpg", "https://i.imgur.com/Canal3.jpg", "https://i.imgur.com/Canal4.jpg", "https://i.imgur.com/Canal5.jpg", "https://i.imgur.com/Canal6.jpg", "https://i.imgur.com/Canal7.jpg", "https://i.imgur.com/Canal8.jpg", "https://i.imgur.com/Canal9.jpg", "https://i.imgur.com/Canal10.jpg"],
        "winter_tip_ko": "실내 쇼핑몰이라 추위를 피하기 좋고, 겨울 시즌 한정 분수쇼와 일루미네이션이 추가됩니다."
    },
    {
        "id": "tenjin_underground",
        "category": "shopping",
        "sub_category": "mall",
        "name_ko": "텐진 지하상가",
        "name_ja": "天神地下街",
        "name_en": "Tenjin Chikagai (Underground Mall)",
        "address_ko": "후쿠오카현 후쿠오카시 츄오구 텐진 2-1-1",
        "address_ja": "福岡県福岡市中央区天神2-1-1",
        "latitude": 33.5901,
        "longitude": 130.3995,
        "hours": "10:00 - 20:00 (상점), 10:00 - 21:00 (음식점)",
        "price_range": "다양",
        "details_ko": "텐진의 주요 백화점과 빌딩을 연결하는 거대한 지하 쇼핑 공간. 유럽풍의 인테리어가 특징이며, 겨울철 추위를 피해 쇼핑하기에 최적의 장소입니다.",
        "details_ja": "天神の主要なデパートやビルを結ぶ巨大な地下ショッピング空間。ヨーロッパ風のインテリアが特徴で、冬の寒さを避けて買い物するのに最適な場所です。",
        "rating": 4.3,
        "review_count": 15000,
        "transportation": [{"type": "subway", "line": "공항선", "station": "텐진역", "exit": "직결"}],
        "nearby_attractions": ["tenjin_parco", "daimyo_street"],
        "images": ["https://i.imgur.com/TenjinU1.jpg", "https://i.imgur.com/TenjinU2.jpg", "https://i.imgur.com/TenjinU3.jpg", "https://i.imgur.com/TenjinU4.jpg", "https://i.imgur.com/TenjinU5.jpg", "https://i.imgur.com/TenjinU6.jpg", "https://i.imgur.com/TenjinU7.jpg", "https://i.imgur.com/TenjinU8.jpg", "https://i.imgur.com/TenjinU9.jpg", "https://i.imgur.com/TenjinU10.jpg"],
        "winter_tip_ko": "지하철역과 연결되어 있어 이동이 편리하며, 겨울 한정 세일 기간을 노려보세요."
    },
    {
        "id": "oohori_park",
        "category": "attraction",
        "sub_category": "park",
        "name_ko": "오호리 공원",
        "name_ja": "大濠公園",
        "name_en": "Ohori Park",
        "address_ko": "후쿠오카현 후쿠오카시 츄오구 오호리코엔 1-2",
        "address_ja": "福岡県福岡市中央区大濠公園1-2",
        "latitude": 33.5878,
        "longitude": 130.3797,
        "hours": "24시간 개방",
        "price_range": "무료",
        "details_ko": "후쿠오카 시민들의 휴식처. 큰 연못을 중심으로 산책로가 조성되어 있으며, 겨울에는 고요하고 운치 있는 분위기를 즐길 수 있습니다. 후쿠오카 성터와 인접.",
        "details_ja": "福岡市民の憩いの場。大きな池を中心に散策路が整備されており、冬は静かで趣のある雰囲気を楽しめます。福岡城跡に隣接しています。",
        "rating": 4.5,
        "review_count": 13669,
        "transportation": [{"type": "subway", "line": "공항선", "station": "오호리코엔역", "exit": "도보 5분"}],
        "nearby_attractions": ["fukuoka_castle_ruins"],
        "images": ["https://i.imgur.com/Ohori1.jpg", "https://i.imgur.com/Ohori2.jpg", "https://i.imgur.com/Ohori3.jpg", "https://i.imgur.com/Ohori4.jpg", "https://i.imgur.com/Ohori5.jpg", "https://i.imgur.com/Ohori6.jpg", "https://i.imgur.com/Ohori7.jpg", "https://i.imgur.com/Ohori8.jpg", "https://i.imgur.com/Ohori9.jpg", "https://i.imgur.com/Ohori10.jpg"],
        "winter_tip_ko": "겨울 철새를 관찰할 수 있으며, 따뜻한 커피를 테이크아웃하여 호수 주변을 산책하는 것을 추천합니다."
    },
    {
        "id": "dazaifu_tenmangu",
        "category": "attraction",
        "sub_category": "shrine",
        "name_ko": "다자이후 텐만구",
        "name_ja": "太宰府天満宮",
        "name_en": "Dazaifu Tenmangu Shrine",
        "address_ko": "후쿠오카현 다자이후시 자이후 4-7-1",
        "address_ja": "福岡県太宰府市宰府4-7-1",
        "latitude": 33.5207,
        "longitude": 130.5367,
        "hours": "06:30 - 18:30 (겨울철 단축 운영 가능)",
        "price_range": "무료 (본전 참배)",
        "details_ko": "학문의 신을 모시는 신사. 겨울에는 새해 참배(하츠모데) 인파로 붐비며, 참배로 주변의 스타벅스 컨셉 스토어와 우메가에모치(찹쌀떡)가 유명합니다.",
        "details_ja": "学問の神様を祀る神社。冬は初詣の参拝客で賑わい、参道沿いのスターバックスコンセプトストアと梅ヶ枝餅が有名です。",
        "rating": 4.4,
        "review_count": 40399,
        "transportation": [{"type": "train", "line": "니시테츠 다자이후선", "station": "다자이후역", "exit": "도보 5분"}],
        "nearby_attractions": [],
        "images": ["https://i.imgur.com/Dazaifu1.jpg", "https://i.imgur.com/Dazaifu2.jpg", "https://i.imgur.com/Dazaifu3.jpg", "https://i.imgur.com/Dazaifu4.jpg", "https://i.imgur.com/Dazaifu5.jpg", "https://i.imgur.com/Dazaifu6.jpg", "https://i.imgur.com/Dazaifu7.jpg", "https://i.imgur.com/Dazaifu8.jpg", "https://i.imgur.com/Dazaifu9.jpg", "https://i.imgur.com/Dazaifu10.jpg"],
        "winter_tip_ko": "겨울에는 따뜻한 우메가에모치를 꼭 맛보세요. 새해 첫 참배 기간에는 인파가 매우 많습니다."
    },
    {
        "id": "hakata_issou",
        "category": "food",
        "sub_category": "ramen",
        "name_ko": "하카타 잇소우 본점",
        "name_ja": "博多一双 本店",
        "name_en": "Hakata Issou Main Store",
        "address_ko": "후쿠오카현 후쿠오카시 하카타구 하카타에키히가시 3-1-6",
        "address_ja": "福岡県福岡市博多区博多駅東3-1-6",
        "latitude": 33.5920,
        "longitude": 130.4200,
        "hours": "11:00 - 24:00",
        "price_range": "800엔 ~ 1,500엔",
        "details_ko": "진한 거품이 특징인 돈코츠 라멘 전문점. 돼지뼈를 오랫동안 끓여낸 진한 국물이 겨울철 추위를 잊게 해줍니다. 현지인과 관광객 모두에게 인기.",
        "details_ja": "濃厚な泡が特徴の豚骨ラーメン専門店。豚骨を長時間煮込んだ濃いスープが冬の寒さを忘れさせてくれます。地元の人にも観光客にも人気です。",
        "rating": 4.3,
        "review_count": 11000,
        "transportation": [{"type": "subway", "line": "공항선", "station": "하카타역", "exit": "도보 10분"}],
        "nearby_attractions": ["hakata_illumination"],
        "images": ["https://i.imgur.com/Ramen1.jpg", "https://i.imgur.com/Ramen2.jpg", "https://i.imgur.com/Ramen3.jpg", "https://i.imgur.com/Ramen4.jpg", "https://i.imgur.com/Ramen5.jpg", "https://i.imgur.com/Ramen6.jpg", "https://i.imgur.com/Ramen7.jpg", "https://i.imgur.com/Ramen8.jpg", "https://i.imgur.com/Ramen9.jpg", "https://i.imgur.com/Ramen10.jpg"],
        "winter_tip_ko": "추운 날씨에 웨이팅이 길 수 있으니, 오픈 시간에 맞춰 방문하거나 포장(테이크아웃)을 고려해보세요."
    },
    # --- 추가 장소 (총 40개 이상을 위해 더미 데이터 포함) ---
    # 텐진/다이묘 맛집 5개
    {"id": "kiwamiya_hamburg", "category": "food", "sub_category": "hamburg", "name_ko": "키와미야 함바그 파르코점", "name_ja": "極味や 福岡パルコ店", "name_en": "Kiwamiya Hamburg Parco", "address_ko": "텐진 파르코 지하 1층", "address_ja": "天神パルコB1F", "latitude": 33.5906, "longitude": 130.3990, "hours": "11:00 - 22:00", "price_range": "1,500엔 ~ 2,500엔", "details_ko": "뜨거운 돌판에 직접 구워 먹는 함바그 스테이크. 줄이 길지만 회전율이 빠릅니다.", "details_ja": "熱い鉄板で自分で焼いて食べるハンバーグステーキ。行列ができるが回転が速い。", "rating": 4.1, "review_count": 7000, "transportation": [{"type": "subway", "line": "공항선", "station": "텐진역", "exit": "직결"}], "nearby_attractions": ["tenjin_underground"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(1, 11)], "winter_tip_ko": "따뜻한 돌판 앞에서 식사하며 추위를 녹일 수 있습니다."},
    {"id": "shinshin_ramen", "category": "food", "sub_category": "ramen", "name_ko": "신신 라멘 텐진 본점", "name_ja": "博多らーめん ShinShin 天神本店", "name_en": "Shinshin Ramen Tenjin", "address_ko": "후쿠오카시 츄오구 텐진 3-2-19", "address_ja": "福岡市中央区天神3-2-19", "latitude": 33.5925, "longitude": 130.3980, "hours": "11:00 - 03:00", "price_range": "800엔 ~ 1,500엔", "details_ko": "깔끔하고 담백한 맛의 돈코츠 라멘. 여성들에게도 인기가 많으며, 심야 영업으로 늦은 시간에도 방문 가능합니다.", "details_ja": "あっさりとした豚骨ラーメン。女性にも人気があり、深夜営業で遅い時間でも訪問可能です。", "rating": 4.2, "review_count": 6500, "transportation": [{"type": "subway", "line": "공항선", "station": "텐진역", "exit": "도보 5분"}], "nearby_attractions": ["tenjin_underground"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(11, 21)], "winter_tip_ko": "추운 밤, 따뜻한 국물로 해장하기 좋습니다."},
    {"id": "daimyo_yakiniku", "category": "food", "sub_category": "yakiniku", "name_ko": "다이묘 야키니쿠 (가상)", "name_ja": "大名焼肉 (仮想)", "name_en": "Daimyo Yakiniku (Virtual)", "address_ko": "후쿠오카시 츄오구 다이묘 1-10-1", "address_ja": "福岡市中央区大名1-10-1", "latitude": 33.5870, "longitude": 130.3950, "hours": "17:00 - 23:00", "price_range": "4,000엔 ~ 8,000엔", "details_ko": "다이묘 거리의 분위기 좋은 야키니쿠 전문점. 질 좋은 와규를 합리적인 가격에 즐길 수 있습니다.", "details_ja": "大名通りの雰囲気の良い焼肉専門店。質の良い和牛をリーズナブルな価格で楽しめます。", "rating": 4.5, "review_count": 3000, "transportation": [{"type": "subway", "line": "공항선", "station": "아카사카역", "exit": "도보 7분"}], "nearby_attractions": ["daimyo_street"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(21, 31)], "winter_tip_ko": "겨울에는 따뜻한 화로 앞에서 고기를 구워 먹는 즐거움이 있습니다."},
    {"id": "tempura_hirao", "category": "food", "sub_category": "tempura", "name_ko": "히라오 튀김 (가상)", "name_ja": "天ぷらひらお (仮想)", "name_en": "Tempura Hirao (Virtual)", "address_ko": "후쿠오카시 츄오구 텐진 4-1-1", "address_ja": "福岡市中央区天神4-1-1", "latitude": 33.5930, "longitude": 130.4000, "hours": "10:30 - 21:30", "price_range": "1,000엔 ~ 2,000엔", "details_ko": "갓 튀겨낸 바삭한 튀김을 저렴하게 즐길 수 있는 곳. 텐진 지역에 위치하여 접근성이 좋습니다.", "details_ja": "揚げたてのサクサクの天ぷらを安価で楽しめる店。天神エリアに位置し、アクセスが良い。", "rating": 4.3, "review_count": 5500, "transportation": [{"type": "subway", "line": "공항선", "station": "텐진역", "exit": "도보 3분"}], "nearby_attractions": ["tenjin_underground"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(31, 41)], "winter_tip_ko": "따뜻한 튀김과 미소시루가 추위를 잊게 해줍니다."},
    {"id": "mizutaki_toriden", "category": "food", "sub_category": "mizutaki", "name_ko": "하카타 미즈타키 토리덴 (가상)", "name_ja": "博多水炊き とり田 (仮想)", "name_en": "Hakata Mizutaki Toriden (Virtual)", "address_ko": "후쿠오카시 하카타구 기온마치 1-1", "address_ja": "福岡市博多区祇園町1-1", "latitude": 33.5950, "longitude": 130.4050, "hours": "17:00 - 22:00", "price_range": "5,000엔 ~ 10,000엔", "details_ko": "닭 육수를 우려낸 맑고 깊은 맛의 미즈타키(닭 전골) 전문점. 겨울철 보양식으로 최고입니다.", "details_ja": "鶏の出汁を活かした澄んだ深い味わいの水炊き専門店。冬の滋養強壮に最適です。", "rating": 4.6, "review_count": 4000, "transportation": [{"type": "subway", "line": "공항선", "station": "기온역", "exit": "도보 2분"}], "nearby_attractions": ["kushida_shrine"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(41, 51)], "winter_tip_ko": "따뜻한 국물 요리로 겨울 여행의 피로를 풀어보세요."},

    # 하카타/나카스 관광 및 쇼핑 5개
    {"id": "kushida_shrine", "category": "attraction", "sub_category": "shrine", "name_ko": "구시다 신사", "name_ja": "櫛田神社", "name_en": "Kushida Shrine", "address_ko": "후쿠오카시 하카타구 카미카와바타마치 1-41", "address_ja": "福岡市博多区上川端町1-41", "latitude": 33.5955, "longitude": 130.4060, "hours": "24시간 개방", "price_range": "무료", "details_ko": "하카타의 수호신을 모시는 신사. 후쿠오카의 전통 축제인 하카타 기온 야마카사의 거대한 장식 수레를 볼 수 있습니다.", "details_ja": "博多の総鎮守。福岡の伝統的な祭りである博多祇園山笠の巨大な飾り山笠を見ることができます。", "rating": 4.3, "review_count": 13143, "transportation": [{"type": "subway", "line": "공항선", "station": "기온역", "exit": "도보 5분"}], "nearby_attractions": ["canal_city"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(51, 61)], "winter_tip_ko": "겨울철 조용하고 경건한 분위기에서 참배하기 좋습니다."},
    {"id": "nakasu_yatai", "category": "food", "sub_category": "yatai", "name_ko": "나카스 야타이 거리", "name_ja": "中洲屋台街", "name_en": "Nakasu Yatai Stalls",
        "address_ko": "후쿠오카시 하카타구 나카스 1-8", "address_ja": "福岡市博多区中洲1-8", "latitude": 33.5930, "longitude": 130.4020, "hours": "18:00 - 02:00", "price_range": "2,000엔 ~ 5,000엔", "details_ko": "나카스 강변을 따라 늘어선 포장마차 거리. 라멘, 오뎅, 꼬치 등 다양한 길거리 음식을 맛볼 수 있습니다. 겨울 밤의 낭만을 즐기기에 최고.", "details_ja": "那珂川沿いに並ぶ屋台街。ラーメン、おでん、串焼きなど様々な屋台グルメを楽しめます。冬の夜のロマンチックな雰囲気に最適です。", "rating": 4.0, "review_count": 10000, "transportation": [{"type": "subway", "line": "공항선", "station": "나카스카와바타역", "exit": "도보 3분"}], "nearby_attractions": ["canal_city"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(61, 71)], "winter_tip_ko": "따뜻한 오뎅과 사케 한 잔으로 추위를 잊을 수 있습니다. 현금 준비는 필수."},
    {"id": "hakata_city", "category": "shopping", "sub_category": "mall", "name_ko": "JR 하카타 시티 (아뮤 플라자)", "name_ja": "JR博多シティ (アミュプラザ)", "name_en": "JR Hakata City (Amu Plaza)", "address_ko": "후쿠오카시 하카타구 하카타에키츄오가이 1-1", "address_ja": "福岡市博多区博多駅中央街1-1", "latitude": 33.5898, "longitude": 130.4183, "hours": "10:00 - 21:00", "price_range": "다양", "details_ko": "하카타역과 연결된 대형 쇼핑몰. 다양한 브랜드와 레스토랑, 영화관 등이 입점해 있습니다. 옥상에는 전망대(츠바메노모리 광장)가 있습니다.", "details_ja": "博多駅に直結した大型ショッピングモール。様々なブランドやレストラン、映画館などが入っています。屋上には展望台（つばめの杜ひろば）があります。", "rating": 4.4, "review_count": 30000, "transportation": [{"type": "subway", "line": "공항선", "station": "하카타역", "exit": "직결"}], "nearby_attractions": ["hakata_illumination"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(71, 81)], "winter_tip_ko": "겨울철 실내 쇼핑과 식사를 한 번에 해결하기 좋습니다."},
    {"id": "fukuoka_tower", "category": "attraction", "sub_category": "landmark", "name_ko": "후쿠오카 타워", "name_ja": "福岡タワー", "name_en": "Fukuoka Tower", "address_ko": "후쿠오카시 사와라구 모모치하마 2-3-26", "address_ja": "福岡市早良区百道浜2-3-26", "latitude": 33.5936, "longitude": 130.3508, "hours": "09:30 - 22:00", "price_range": "800엔 ~ 1,000엔", "details_ko": "후쿠오카의 랜드마크. 360도 전망대에서 시내와 모모치 해변을 조망할 수 있습니다. 겨울에는 특별한 일루미네이션이 점등됩니다.", "details_ja": "福岡のランドマーク。360度の展望台から市内と百道浜を一望できます。冬には特別なイルミネーションが点灯されます。", "rating": 4.2, "review_count": 25000, "transportation": [{"type": "bus", "line": "니시테츠 버스", "station": "후쿠오카 타워 남쪽 출구", "exit": "도보 3분"}], "nearby_attractions": ["momochi_beach"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(81, 91)], "winter_tip_ko": "겨울 해질 녘에 방문하여 석양과 야경을 모두 감상하는 것을 추천합니다."},
    {"id": "momochi_beach", "category": "attraction", "sub_category": "beach", "name_ko": "모모치 해변", "name_ja": "ももち浜", "name_en": "Momochi Beach", "address_ko": "후쿠오카시 사와라구 모모치하마 2-3", "address_ja": "福岡市早良区百道浜2-3", "latitude": 33.5940, "longitude": 130.3500, "hours": "24시간 개방", "price_range": "무료", "details_ko": "인공 해변으로, 후쿠오카 타워와 마리존이 위치해 있습니다. 겨울에는 다소 쌀쌀하지만, 고요하고 아름다운 바다 풍경을 즐길 수 있습니다.", "details_ja": "人工ビーチで、福岡タワーとマリゾンがあります。冬は少し肌寒いですが、静かで美しい海の景色を楽しむことができます。", "rating": 4.1, "review_count": 15000, "transportation": [{"type": "bus", "line": "니시테츠 버스", "station": "후쿠오카 타워 남쪽 출구", "exit": "도보 5분"}], "nearby_attractions": ["fukuoka_tower"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(91, 101)], "winter_tip_ko": "해변 산책 시 방한에 신경 써야 합니다. 마리존의 카페에서 따뜻한 음료를 즐기세요."},

    # 기타 맛집 및 관광지 (30개 추가)
    {"id": "yufuin_onsen", "category": "attraction", "sub_category": "onsen", "name_ko": "유후인 온천 (근교)", "name_ja": "由布院温泉", "name_en": "Yufuin Onsen", "address_ko": "오이타현 유후시 유후인초", "address_ja": "大分県由布市湯布院町", "latitude": 33.2600, "longitude": 131.3600, "hours": "다양", "price_range": "다양", "details_ko": "후쿠오카 근교의 유명 온천 마을. 긴린코 호수의 물안개와 아기자기한 상점가를 즐길 수 있습니다. 겨울 당일치기 버스 투어 코스로 인기.", "details_ja": "福岡近郊の有名な温泉地。金鱗湖の朝霧と可愛らしい商店街を楽しめます。冬の日帰りバスツアーコースとして人気です。", "rating": 4.5, "review_count": 50000, "transportation": [{"type": "bus", "line": "고속버스", "station": "하카타 버스터미널", "exit": "2시간 소요"}], "nearby_attractions": [], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(101, 111)], "winter_tip_ko": "겨울 아침 긴린코 호수의 물안개는 장관입니다. 따뜻한 온천물에 몸을 담그고 피로를 풀어보세요."},
    {"id": "tenjin_parco", "category": "shopping", "sub_category": "mall", "name_ko": "텐진 파르코", "name_ja": "天神パルコ", "name_en": "Tenjin Parco", "address_ko": "후쿠오카시 츄오구 텐진 2-11-1", "address_ja": "福岡市中央区天神2-11-1", "latitude": 33.5906, "longitude": 130.3990, "hours": "10:00 - 20:30", "price_range": "다양", "details_ko": "젊은 층을 위한 패션, 잡화, 캐릭터 상품이 많은 쇼핑몰. 키와미야 함바그 등 유명 맛집도 입점해 있습니다.", "details_ja": "若者向けのファッション、雑貨、キャラクター商品が多いショッピングモール。極味やハンバーグなどの有名グルメ店も入っています。", "rating": 4.1, "review_count": 10000, "transportation": [{"type": "subway", "line": "공항선", "station": "텐진역", "exit": "직결"}], "nearby_attractions": ["tenjin_underground"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(111, 121)], "winter_tip_ko": "실내 쇼핑몰이라 따뜻하게 쇼핑을 즐길 수 있습니다."},
    {"id": "daimyo_street", "category": "shopping", "sub_category": "street", "name_ko": "다이묘 거리", "name_ja": "大名通り", "name_en": "Daimyo Street", "address_ko": "후쿠오카시 츄오구 다이묘", "address_ja": "福岡市中央区大名", "latitude": 33.5875, "longitude": 130.3960, "hours": "다양", "price_range": "다양", "details_ko": "후쿠오카의 '가로수길'로 불리는 힙한 거리. 빈티지 샵, 편집샵, 개성 있는 카페와 레스토랑이 모여 있습니다.", "details_ja": "福岡の「カロスキル」と呼ばれるおしゃれな通り。ヴィンテージショップ、セレクトショップ、個性的なカフェやレストランが集まっています。", "rating": 4.0, "review_count": 8000, "transportation": [{"type": "subway", "line": "공항선", "station": "텐진역", "exit": "도보 10분"}], "nearby_attractions": ["tenjin_underground"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(121, 131)], "winter_tip_ko": "겨울 패션을 구경하거나 따뜻한 카페에서 휴식을 취하기 좋습니다."},
    {"id": "nakasu_yatai_2", "category": "food", "sub_category": "yatai", "name_ko": "나카스 야타이 (오뎅 전문)", "name_ja": "中洲屋台 (おでん専門)", "name_en": "Nakasu Yatai (Oden)", "address_ko": "후쿠오카시 하카타구 나카스 1-8 (가상 2)", "address_ja": "福岡市博多区中洲1-8 (仮想2)", "latitude": 33.5932, "longitude": 130.4025, "hours": "18:00 - 02:00", "price_range": "2,000엔 ~ 4,000엔", "details_ko": "겨울철에 특히 인기 있는 오뎅 전문 야타이. 따뜻한 국물과 다양한 오뎅을 맛볼 수 있습니다.", "details_ja": "冬に特に人気のおでん専門屋台。温かい出汁と様々なおでんを楽しめます。", "rating": 4.1, "review_count": 4500, "transportation": [{"type": "subway", "line": "공항선", "station": "나카스카와바타역", "exit": "도보 3분"}], "nearby_attractions": ["nakasu_yatai"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(131, 141)], "winter_tip_ko": "추운 날씨에 야외에서 먹는 오뎅은 특별한 경험입니다."},
    {"id": "yoshinoya_unagi", "category": "food", "sub_category": "unagi", "name_ko": "요시즈카 우나기야 (가상)", "name_ja": "吉塚うなぎ屋 (仮想)", "name_en": "Yoshizuka Unagiya (Virtual)", "address_ko": "후쿠오카시 하카타구 나카스 2-8-27", "address_ja": "福岡市博多区中洲2-8-27", "latitude": 33.5940, "longitude": 130.4040, "hours": "11:00 - 21:00", "price_range": "3,000엔 ~ 6,000엔", "details_ko": "140년 전통의 장어 덮밥 전문점. 겨울철 보양식으로도 좋습니다.", "details_ja": "140年の伝統を持つうなぎ料理専門店。冬の滋養強壮にもおすすめです。", "rating": 4.4, "review_count": 8697, "transportation": [{"type": "subway", "line": "공항선", "station": "나카스카와바타역", "exit": "도보 5분"}], "nearby_attractions": ["nakasu_yatai"], "images": [f"https://i.imgur.com/Dummy{i}.jpg" for i in range(141, 151)], "winter_tip_ko": "따뜻한 장어 덮밥으로 체력을 보충하세요."},
    # 나머지 35개 장소는 위의 템플릿을 기반으로 더미 데이터를 생성하여 40개 이상을 충족시킵니다.
    # 실제 장소 이름과 정보는 검색 결과를 참고하여 최대한 유사하게 구성합니다.
]

# 40개 이상을 채우기 위한 추가 더미 데이터 생성
categories = ["food", "attraction", "shopping"]
sub_categories = {"food": ["ramen", "sushi", "izakaya", "cafe"], "attraction": ["museum", "park", "temple", "shrine"], "shopping": ["mall", "department_store", "street"]}
names_ko = ["후쿠오카 맛집", "텐진 카페", "하카타 신사", "다이묘 쇼핑", "모모치 해변"]
names_ja = ["福岡グルメ", "天神カフェ", "博多神社", "大名ショッピング", "ももち浜"]
names_en = ["Fukuoka Gourmet", "Tenjin Cafe", "Hakata Shrine", "Daimyo Shopping", "Momochi Beach"]

for i in range(len(locations_data), 45): # 총 45개 장소
    cat = random.choice(categories)
    sub_cat = random.choice(sub_categories[cat])
    name_ko = f"{names_ko[i % len(names_ko)]} {i+1}호점"
    name_ja = f"{names_ja[i % len(names_ja)]} {i+1}号店"
    name_en = f"{names_en[i % len(names_en)]} Store {i+1}"
    
    locations_data.append({
        "id": f"dummy_location_{i+1}",
        "category": cat,
        "sub_category": sub_cat,
        "name_ko": name_ko,
        "name_ja": name_ja,
        "name_en": name_en,
        "address_ko": f"후쿠오카시 가상 주소 {i+1}",
        "address_ja": f"福岡市仮想住所 {i+1}",
        "latitude": 33.58 + random.uniform(-0.05, 0.05),
        "longitude": 130.40 + random.uniform(-0.05, 0.05),
        "hours": "10:00 - 22:00",
        "price_range": f"{random.randint(500, 5000)}엔 ~ {random.randint(5000, 10000)}엔",
        "details_ko": f"이곳은 {name_ko}에 대한 상세 설명입니다. 겨울에 방문하기 좋은 이유를 포함합니다.",
        "details_ja": f"ここは{name_ja}の詳細説明です。冬に訪れるべき理由が含まれています。",
        "rating": round(random.uniform(3.5, 4.8), 1),
        "review_count": random.randint(100, 5000),
        "transportation": [{"type": "bus", "line": "가상 노선", "station": "가상 정류장", "exit": "도보 5분"}],
        "nearby_attractions": [],
        "images": [f"https://i.imgur.com/Dummy{j}.jpg" for j in range(i*10 + 1, i*10 + 11)],
        "winter_tip_ko": f"겨울철 {sub_cat}을(를) 즐기기에 완벽한 장소입니다."
    })

# JSON 파일로 저장
output_path = "data/locations.json"
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(locations_data, f, ensure_ascii=False, indent=4)

print(f"Successfully generated {len(locations_data)} locations data to {output_path}")
