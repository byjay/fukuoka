
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { fetchPlacesByCategory, generateItinerary } from './services/geminiService';
import { Place, CategoryState, CollectionStatus, ItineraryOption, TripSettings, AffiliateConfig } from './types';
import ResultCard from './components/ResultCard';
import ItineraryCard from './components/ItineraryCard';
import BudgetPackingCard from './components/BudgetPackingCard';

// Database of Countries and Cities
const DESTINATIONS: Record<string, string[]> = {
    "Japan (일본)": ["Fukuoka (후쿠오카)", "Osaka (오사카)", "Tokyo (도쿄)", "Kyoto (교토)", "Sapporo (삿포로)", "Okinawa (오키나와)", "Nagoya (나고야)"],
    "Vietnam (베트남)": ["Danang (다낭)", "Hanoi (하노이)", "Ho Chi Minh (호치민)", "Nha Trang (나트랑)", "Phu Quoc (푸꾸옥)"],
    "Thailand (태국)": ["Bangkok (방콕)", "Phuket (푸켓)", "Chiang Mai (치앙마이)", "Pattaya (파타야)"],
    "USA (미국)": ["New York (뉴욕)", "Los Angeles (LA)", "Las Vegas (라스베가스)", "San Francisco (샌프란시스코)", "Hawaii (하와이)", "Guam (괌)"],
    "France (프랑스)": ["Paris (파리)", "Nice (니스)", "Lyon (리옹)"],
    "Italy (이탈리아)": ["Rome (로마)", "Florence (피렌체)", "Venice (베네치아)", "Milan (밀라노)"],
    "Spain (스페인)": ["Barcelona (바르셀로나)", "Madrid (마드리드)", "Seville (세비야)"],
    "UK (영국)": ["London (런던)", "Edinburgh (에딘버러)", "Manchester (맨체스터)"],
    "Taiwan (대만)": ["Taipei (타이베이)", "Kaohsiung (가오슝)", "Jiufen (지우펀)"],
    "Singapore (싱가포르)": ["Singapore (싱가포르)"],
    "Indonesia (인도네시아)": ["Bali (발리)", "Jakarta (자카르타)"],
    "Philippines (필리핀)": ["Cebu (세부)", "Boracay (보라카이)", "Manila (마닐라)"],
    "Australia (호주)": ["Sydney (시드니)", "Melbourne (멜버른)", "Gold Coast (골드코스트)"],
    "Germany (독일)": ["Berlin (베를린)", "Munich (뮌헨)", "Frankfurt (프랑크푸르트)"],
    "Czech (체코)": ["Prague (프라하)"],
    "Hungary (헝가리)": ["Budapest (부다페스트)"],
    "Austria (오스트리아)": ["Vienna (비엔나)", "Salzburg (잘츠부르크)"],
    "Turkey (튀르키예)": ["Istanbul (이스탄불)", "Cappadocia (카파도키아)"],
    "Canada (캐나다)": ["Vancouver (밴쿠버)", "Toronto (토론토)", "Montreal (몬트리올)"],
    "Hong Kong (홍콩)": ["Hong Kong (홍콩)"],
    "Macau (마카오)": ["Macau (마카오)"],
    "Malaysia (말레이시아)": ["Kuala Lumpur (쿠알라룸푸르)", "Kota Kinabalu (코타키나발루)"],
    "Switzerland (스위스)": ["Zurich (취리히)", "Interlaken (인터라켄)", "Geneva (제네바)"],
    "Netherlands (네덜란드)": ["Amsterdam (암스테르담)"],
    "Belgium (벨기에)": ["Brussels (브뤼셀)"],
    "Portugal (포르투갈)": ["Lisbon (리스본)", "Porto (포르투)"],
    "UAE (아랍에미리트)": ["Dubai (두바이)", "Abu Dhabi (아부다비)"],
    "Croatia (크로아티아)": ["Dubrovnik (두브로브니크)", "Split (스플리트)"],
    "Greece (그리스)": ["Athens (아테네)", "Santorini (산토리니)"],
    "New Zealand (뉴질랜드)": ["Auckland (오클랜드)", "Queenstown (퀸스타운)"]
};

// Korean Airports
const AIRPORTS = [
    { code: "ICN", name: "Incheon (인천)" },
    { code: "GMP", name: "Gimpo (김포)" },
    { code: "PUS", name: "Busan (김해/부산)" },
    { code: "TAE", name: "Daegu (대구)" },
    { code: "CJJ", name: "Cheongju (청주)" },
    { code: "CJU", name: "Jeju (제주)" },
];

// Affiliate Manual Data
const AFFILIATE_GUIDE = [
    {
        key: 'agodaId',
        name: 'Agoda (아고다)',
        type: '숙박 (Hotel)',
        icon: '🏨',
        signupLink: 'https://partners.agoda.com/',
        idGuide: 'CID 번호 (숫자)',
        placeholder: 'CID 입력',
        details: `<p>1. 위 링크로 <strong>아고다 파트너스</strong> 가입</p><p>2. 로그인 후 [도구] -> [텍스트 링크] 이동</p><p>3. 생성된 링크 URL 중 <code>cid=</code> 뒤의 숫자가 ID입니다.</p>`
    },
    {
        key: 'tripComId',
        name: 'Trip.com (트립닷컴)',
        type: '항공/숙박',
        icon: '✈️',
        signupLink: 'https://pages.trip.com/alliance/index-kr.html',
        idGuide: 'Alliance ID (AID)',
        placeholder: 'AID 입력',
        details: `<p>1. <strong>트립닷컴 제휴 프로그램</strong> 가입</p><p>2. 대시보드 상단 또는 우측 상단에 <strong>AID</strong>(숫자) 확인</p>`
    },
    {
        key: 'klookId',
        name: 'Klook (클룩)',
        type: '티켓/투어',
        icon: '🎟️',
        signupLink: 'https://affiliate.klook.com/',
        idGuide: 'Affiliate ID',
        placeholder: 'Affiliate ID 입력',
        details: `<p>1. <strong>클룩 제휴 파트너</strong> 등록</p><p>2. 승인 메일 수신 후 로그인</p><p>3. 대시보드 URL에 있는 숫자가 ID입니다.</p>`
    },
    {
        key: 'viatorId',
        name: 'Viator (비아터)',
        type: '투어/체험',
        icon: '🗺️',
        signupLink: 'https://www.viatorpartner.com/',
        idGuide: 'PID / UID',
        placeholder: 'PID 입력',
        details: `<p>1. <strong>Viator Partner</strong> 가입</p><p>2. 계정 설정에서 Partner ID (PID) 확인</p>`
    },
    {
        key: 'gygId',
        name: 'GetYourGuide',
        type: '투어/티켓',
        icon: '🎫',
        signupLink: 'https://partner.getyourguide.com/',
        idGuide: 'Partner ID',
        placeholder: 'Partner ID 입력',
        details: `<p>1. <strong>GetYourGuide Partner</strong> 가입</p><p>2. 대시보드 홈에서 파트너 ID 확인</p>`
    },
    {
        key: 'coupangId',
        name: 'Coupang (쿠팡)',
        type: '쇼핑',
        icon: '🛍️',
        signupLink: 'https://partners.coupang.com/',
        idGuide: '추천인 ID / AF 코드',
        placeholder: 'AF 코드 입력',
        details: `<p>1. <strong>쿠팡 파트너스</strong> 가입</p><p>2. [내 정보 관리]에서 <strong>AF로 시작하는 ID</strong> 복사</p>`
    },
    {
        key: 'naverId',
        name: 'Naver Shopping',
        type: '쇼핑',
        icon: 'n',
        signupLink: 'https://adcenter.shopping.naver.com/',
        idGuide: '네이버 쇼핑 파트너 ID',
        placeholder: '파트너 ID 입력',
        details: `<p>1. <strong>네이버 쇼핑 파트너존</strong> 가입</p><p>2. 좌측 메뉴 상단의 영문/숫자 혼용 ID 확인</p>`
    }
];

const App: React.FC = () => {
  // 2-Step Selector State
  const [selectedCountry, setSelectedCountry] = useState("Japan (일본)");
  const [selectedCity, setSelectedCity] = useState("Fukuoka (후쿠오카)");
  const [customCity, setCustomCity] = useState("");
  
  const [currentResultLocation, setCurrentResultLocation] = useState<{city: string, country: string} | null>(null);

  // Core Categories for Scraping (No Flights/Hotels here)
  const [categories, setCategories] = useState<CategoryState[]>([
    { id: 'restaurants', name: 'Restaurants (맛집)', status: CollectionStatus.IDLE, count: 0 },
    { id: 'cafes', name: 'Cafes (카페)', status: CollectionStatus.IDLE, count: 0 },
    { id: 'sightseeing', name: 'Sightseeing (관광지)', status: CollectionStatus.IDLE, count: 0 },
    { id: 'shopping', name: 'Shopping (쇼핑)', status: CollectionStatus.IDLE, count: 0 },
  ]);

  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [sortMode, setSortMode] = useState<'default' | 'priceAsc' | 'ratingDesc'>('default');
  
  // Itinerary Logic
  const [itineraryOptions, setItineraryOptions] = useState<ItineraryOption[]>([]);
  const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);
  
  // Modal & Trip Settings
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<'trip' | 'affiliate'>('trip');
  const [expandedGuideKey, setExpandedGuideKey] = useState<string | null>(null);
  
  const [tripSettings, setTripSettings] = useState<TripSettings>({
      originCity: "Incheon (인천)",
      originCode: "ICN",
      hotel: "City Center",
      days: 3,
      style: "Balanced (균형 잡힌)",
      startDate: new Date().toISOString().split('T')[0]
  });

  const [affiliateConfig, setAffiliateConfig] = useState<AffiliateConfig>({
      coupangId: "",
      naverId: "",
      klookId: "",
      agodaId: "",
      tripComId: "",
      viatorId: "",
      gygId: ""
  });

  // Load Affiliate Config from LocalStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('affiliateConfig');
    if (savedConfig) {
        try {
            setAffiliateConfig(JSON.parse(savedConfig));
        } catch (e) {
            console.error("Failed to parse affiliate config", e);
        }
    }
  }, []);

  // Save Affiliate Config to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('affiliateConfig', JSON.stringify(affiliateConfig));
  }, [affiliateConfig]);

  const getExistingNames = (category: string) => {
    return allPlaces
      .filter(p => p.category === category)
      .map(p => p.name_en);
  };

  const getCityName = () => customCity.trim() ? customCity : selectedCity.split('(')[0].trim();
  const getCountryName = () => selectedCountry.split('(')[0].trim();

  // Handle Country Change
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newCountry = e.target.value;
      setSelectedCountry(newCountry);
      if (newCountry !== "Custom" && DESTINATIONS[newCountry]) {
          setSelectedCity(DESTINATIONS[newCountry][0]);
      } else {
          setSelectedCity("Custom");
      }
  };

  // Handle Origin Change
  const handleOriginChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const code = e.target.value;
      const airport = AIRPORTS.find(a => a.code === code);
      if (airport) {
          setTripSettings(prev => ({ ...prev, originCity: airport.name, originCode: code }));
      }
  };

  const startCollection = useCallback(async () => {
    const targetCity = getCityName();
    const targetCountry = getCountryName();
    
    const isAppending = currentResultLocation && 
                        currentResultLocation.city === targetCity && 
                        currentResultLocation.country === targetCountry;
    
    setIsProcessing(true);
    // Don't clear itinerary options here, user might want to generate after collecting more
    setCurrentResultLocation({ city: targetCity, country: targetCountry });
    
    if (!isAppending) {
      setAllPlaces([]); 
      setCategories(prev => prev.map(c => ({ ...c, status: CollectionStatus.LOADING, count: 0 })));
    } else {
      setCategories(prev => prev.map(c => ({ ...c, status: CollectionStatus.LOADING })));
    }

    const processCategory = async (categoryObj: CategoryState) => {
      try {
        const excludedNames = isAppending ? getExistingNames(categoryObj.name) : [];
        const { places } = await fetchPlacesByCategory(targetCity, targetCountry, categoryObj.name, tripSettings, excludedNames);
        
        setAllPlaces(prev => {
            const newPlaces = [...prev, ...places];
            return Array.from(new Map(newPlaces.map(item => [item.name_en, item])).values());
        });
        
        setCategories(prev => prev.map(c => 
          c.id === categoryObj.id 
            ? { 
                ...c, 
                status: CollectionStatus.COMPLETED, 
                count: (isAppending ? c.count : 0) + places.length 
              }
            : c
        ));
      } catch (error) {
        console.error(error);
        setCategories(prev => prev.map(c => 
          c.id === categoryObj.id 
            ? { ...c, status: CollectionStatus.ERROR }
            : c
        ));
      }
    };

    await Promise.all(categories.map(cat => processCategory(cat)));
    setIsProcessing(false);
  }, [categories, selectedCity, selectedCountry, customCity, currentResultLocation, allPlaces, tripSettings]);

  const initiateItineraryGeneration = () => {
      setShowSettingsModal(true);
      setActiveSettingsTab('trip');
  };

  const executeItineraryGeneration = async () => {
    if (!currentResultLocation && allPlaces.length === 0) {
        // Allow generating itinerary even if collection hasn't happened yet, using city name
        setCurrentResultLocation({ city: getCityName(), country: getCountryName() });
    }
    const loc = currentResultLocation || { city: getCityName(), country: getCountryName() };
    
    setShowSettingsModal(false);
    setIsGeneratingItinerary(true);
    try {
        const options = await generateItinerary(loc.city, loc.country, allPlaces, tripSettings);
        setItineraryOptions(options);
        setActiveOptionIndex(0);
    } catch (e) {
        console.error("Failed to generate itinerary", e);
    } finally {
        setIsGeneratingItinerary(false);
    }
  };

  // Sorting Logic
  const getSortedPlaces = () => {
      let sorted = [...allPlaces];
      if (sortMode === 'priceAsc') {
          sorted.sort((a, b) => (a.priceNum || 9999999) - (b.priceNum || 9999999));
      } else if (sortMode === 'ratingDesc') {
          sorted.sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"));
      }
      return sorted;
  };

  const handlePackageDownload = () => {
      const currentLoc = currentResultLocation || { city: getCityName(), country: getCountryName() };
      const data = {
        meta: {
          title: `${currentLoc.city}, ${currentLoc.country} Travel Data`,
          city: currentLoc.city,
          country: currentLoc.country,
          created_at: new Date().toISOString(),
          total_count: allPlaces.length,
          language: "en/ko",
        },
        affiliate_ids: affiliateConfig,
        data: allPlaces,
        itineraries: itineraryOptions
      };
      
      const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const jsonUrl = URL.createObjectURL(jsonBlob);
      const jsonLink = document.createElement('a');
      jsonLink.href = jsonUrl;
      jsonLink.download = `${currentLoc.city}_Travel_Plan.json`;
      document.body.appendChild(jsonLink);
      jsonLink.click();
      document.body.removeChild(jsonLink);
      
      alert("데이터 패키지 다운로드 완료!");
  };

  const totalCollected = allPlaces.length;
  const toggleGuide = (key: string) => expandedGuideKey === key ? setExpandedGuideKey(null) : setExpandedGuideKey(key);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 relative">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-2.5 rounded-xl shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">Travel Collector & Deals</h1>
                    <p className="text-xs text-slate-500 font-medium">여행 데이터 수집 • 실시간 가격 비교 • 원스톱 예약</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center justify-center bg-gray-50 p-2 rounded-xl border border-gray-200">
                {/* Country/City Selectors */}
                <select value={selectedCountry} onChange={handleCountryChange} className="w-36 py-2 text-sm border-gray-300 rounded-lg border shadow-sm outline-none">
                    {Object.keys(DESTINATIONS).map(country => <option key={country} value={country}>{country}</option>)}
                    <option value="Custom">Custom</option>
                </select>

                {selectedCountry !== "Custom" ? (
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-36 py-2 text-sm border-gray-300 rounded-lg border shadow-sm outline-none">
                        {DESTINATIONS[selectedCountry]?.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                ) : (
                    <input type="text" placeholder="City" value={customCity} onChange={(e) => setCustomCity(e.target.value)} className="w-32 py-2 text-sm border-gray-300 rounded-lg border shadow-sm" />
                )}
                
                <button onClick={startCollection} disabled={isProcessing} className={`px-5 py-2 text-sm font-bold rounded-lg text-white shadow-md transition-all ${isProcessing ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                    {isProcessing ? '수집 중...' : '정보 수집 시작'}
                </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Progress Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {categories.map((cat) => (
            <div key={cat.id} className={`relative overflow-hidden p-3 rounded-xl border transition-all ${cat.status === CollectionStatus.LOADING ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200 bg-white'}`}>
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-slate-800 text-xs truncate">{cat.name.split('(')[0]}</span>
                {cat.status === CollectionStatus.COMPLETED && <div className="h-2 w-2 rounded-full bg-green-500"></div>}
              </div>
              <div className="flex items-end gap-1">
                 <span className={`text-2xl font-black ${cat.status === CollectionStatus.LOADING ? 'text-indigo-600' : 'text-slate-900'}`}>{cat.count}</span>
                 <span className="text-[10px] text-slate-500 mb-1">건</span>
              </div>
              {cat.status === CollectionStatus.LOADING && <div className="absolute bottom-0 left-0 h-1 bg-indigo-500 animate-progress w-full"></div>}
            </div>
          ))}
        </div>

        {/* Itinerary & Booking Generation Action */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8 border-l-4 border-l-indigo-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">여행 계획 및 예약 (Trip Planning)</h3>
                    <p className="text-sm text-slate-500">데이터 수집 여부와 상관없이, 항공권/호텔 가격비교와 최적의 동선을 생성합니다.</p>
                </div>
                <div className="flex gap-3">
                     <button onClick={initiateItineraryGeneration} className="px-5 py-3 bg-indigo-600 text-white shadow-lg rounded-xl font-bold hover:bg-indigo-700 flex items-center">
                        {isGeneratingItinerary ? (
                            <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>계획 생성 중...</>
                        ) : '✨ 일정 및 예약 생성'}
                     </button>
                     <button onClick={handlePackageDownload} className="bg-slate-800 text-white px-5 py-3 rounded-xl font-bold hover:bg-slate-900 shadow-md">📦 데이터 저장</button>
                     <button onClick={() => { setShowSettingsModal(true); setActiveSettingsTab('affiliate'); }} className="bg-white border border-gray-300 text-gray-700 px-5 py-3 rounded-xl font-bold hover:bg-gray-50">💰 수익 설정</button>
                </div>
            </div>
        </div>

        {/* Itinerary Section */}
        {itineraryOptions.length > 0 && (
             <div className="mb-12 animate-fade-in-up">
                 <div className="flex overflow-x-auto gap-2 mb-4 pb-2">
                    {itineraryOptions.map((opt, idx) => (
                        <button 
                            key={opt.id}
                            onClick={() => setActiveOptionIndex(idx)}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeOptionIndex === idx ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                        >
                            Option {idx + 1}: {opt.title_ko}
                        </button>
                    ))}
                 </div>

                 {/* BOOKING HUB & BUDGET */}
                 {itineraryOptions[activeOptionIndex].budget && (
                    <BudgetPackingCard 
                        budget={itineraryOptions[activeOptionIndex].budget} 
                        packingList={itineraryOptions[activeOptionIndex].packingList}
                        affiliate={affiliateConfig}
                        location={{ city: getCityName(), country: getCountryName() }}
                        tripSettings={tripSettings}
                        flightAnalysis={itineraryOptions[activeOptionIndex].flightAnalysis}
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {itineraryOptions[activeOptionIndex].days.map(day => (
                        <ItineraryCard key={day.day} dayPlan={day} allPlaces={allPlaces} />
                    ))}
                </div>
             </div>
        )}

        {/* Results Toolbar & Grid (Only for Collected Data) */}
        {allPlaces.length > 0 && (
            <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-24 z-20">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2 sm:mb-0">
                    <span className="w-1 h-5 bg-indigo-600 rounded-full inline-block"></span>
                    수집된 장소 정보 ({totalCollected})
                </h2>
                
                <div className="flex gap-2">
                    <button 
                        onClick={() => setSortMode('default')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${sortMode === 'default' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                    >
                        기본순
                    </button>
                    <button 
                        onClick={() => setSortMode('priceAsc')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${sortMode === 'priceAsc' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                    >
                        💰 가격 낮은순
                    </button>
                    <button 
                        onClick={() => setSortMode('ratingDesc')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${sortMode === 'ratingDesc' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                    >
                        ★ 별점 높은순
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {getSortedPlaces().map((place) => (
                    <ResultCard key={place.id} place={place} tripSettings={tripSettings} />
                ))}
            </div>
            </div>
        )}
      </main>

      {/* Settings Modal */}
      {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
              <div className="bg-white rounded-xl p-0 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                  {/* Modal Header */}
                  <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-800">
                          {activeSettingsTab === 'trip' ? '✈️ 여행 기본 설정' : '💰 수익화(Affiliate) 설정'}
                      </h3>
                      <button onClick={() => setShowSettingsModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                  </div>

                  {/* Modal Body */}
                  <div className="p-6 overflow-y-auto custom-scrollbar">
                      {/* Tabs */}
                      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                          <button 
                            onClick={() => setActiveSettingsTab('trip')}
                            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${activeSettingsTab === 'trip' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            여행 정보 입력
                          </button>
                          <button 
                            onClick={() => setActiveSettingsTab('affiliate')}
                            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${activeSettingsTab === 'affiliate' ? 'bg-white shadow text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            제휴 ID 관리
                          </button>
                      </div>

                      {activeSettingsTab === 'trip' ? (
                          <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">출발 공항 (Origin)</label>
                                        <select 
                                            value={tripSettings.originCode} 
                                            onChange={handleOriginChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                        >
                                            {AIRPORTS.map(ap => <option key={ap.code} value={ap.code}>{ap.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">여행 시작일 (Start)</label>
                                        <input 
                                            type="date" 
                                            value={tripSettings.startDate}
                                            onChange={(e) => setTripSettings({...tripSettings, startDate: e.target.value})}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">여행 기간 (일)</label>
                                        <input 
                                            type="number" 
                                            value={tripSettings.days}
                                            onChange={(e) => setTripSettings({...tripSettings, days: parseInt(e.target.value)})}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">숙소 선호 위치</label>
                                        <input 
                                            type="text" 
                                            value={tripSettings.hotel}
                                            onChange={(e) => setTripSettings({...tripSettings, hotel: e.target.value})}
                                            placeholder="예: 시내 중심, 해변가"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">여행 스타일</label>
                                    <select 
                                        value={tripSettings.style} 
                                        onChange={(e) => setTripSettings({...tripSettings, style: e.target.value})}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                    >
                                        <option value="Balanced (균형 잡힌)">균형 잡힌 (Balanced)</option>
                                        <option value="Foodie (먹방 투어)">먹방 투어 (Foodie)</option>
                                        <option value="Relaxed (힐링/휴식)">힐링/휴식 (Relaxed)</option>
                                        <option value="Packed (알찬 일정)">알찬 일정 (Packed)</option>
                                        <option value="Shopping (쇼핑 위주)">쇼핑 위주 (Shopping)</option>
                                        <option value="Luxury (호캉스/럭셔리)">호캉스/럭셔리 (Luxury)</option>
                                    </select>
                                </div>
                          </div>
                      ) : (
                          <div className="space-y-4">
                              <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded mb-4">
                                  💡 아래 제휴사 ID를 입력하면, 일정 생성 시 생성되는 모든 구매 링크에 자동으로 적용되어 수익이 발생합니다.
                              </p>
                              {AFFILIATE_GUIDE.map((guide) => (
                                  <div key={guide.key} className="border border-gray-200 rounded-lg overflow-hidden">
                                      <div 
                                        className="flex items-center justify-between p-3 bg-white cursor-pointer hover:bg-gray-50"
                                        onClick={() => toggleGuide(guide.key)}
                                      >
                                          <div className="flex items-center gap-3">
                                              <span className="text-xl">{guide.icon}</span>
                                              <div>
                                                  <div className="text-sm font-bold text-gray-800">{guide.name}</div>
                                                  <div className="text-xs text-gray-500">{guide.type}</div>
                                              </div>
                                          </div>
                                          <div className="flex items-center gap-2">
                                              <span className={`text-xs ${affiliateConfig[guide.key as keyof AffiliateConfig] ? 'text-green-600 font-bold' : 'text-gray-300'}`}>
                                                  {affiliateConfig[guide.key as keyof AffiliateConfig] ? '설정됨' : '미설정'}
                                              </span>
                                              <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedGuideKey === guide.key ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                          </div>
                                      </div>
                                      
                                      {expandedGuideKey === guide.key && (
                                          <div className="p-4 bg-gray-50 border-t border-gray-200">
                                              <div className="mb-4 text-xs text-gray-600 space-y-1" dangerouslySetInnerHTML={{ __html: guide.details }}></div>
                                              <div className="flex gap-2">
                                                  <a href={guide.signupLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white border border-gray-300 text-gray-700 text-xs font-bold py-2 rounded text-center hover:bg-gray-100">
                                                      가입하기 (링크)
                                                  </a>
                                                  <input 
                                                    type="text" 
                                                    placeholder={guide.placeholder}
                                                    value={affiliateConfig[guide.key as keyof AffiliateConfig] || ''}
                                                    onChange={(e) => setAffiliateConfig({...affiliateConfig, [guide.key]: e.target.value})}
                                                    className="flex-[2] border border-gray-300 rounded px-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                                  />
                                              </div>
                                          </div>
                                      )}
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
                      {activeSettingsTab === 'trip' ? (
                          <button onClick={executeItineraryGeneration} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition-transform hover:scale-[1.02]">
                              🚀 AI 일정 생성 시작
                          </button>
                      ) : (
                          <button onClick={() => setActiveSettingsTab('trip')} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg">
                              설정 저장 후 여행 정보 입력
                          </button>
                      )}
                  </div>
              </div>
          </div>
      )}
      
      <style>{`
        @keyframes progress { 0% { width: 0% } 50% { width: 70% } 100% { width: 90% } }
        .animate-progress { animation: progress 2s ease-in-out infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
