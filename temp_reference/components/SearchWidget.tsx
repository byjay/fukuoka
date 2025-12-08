import React, { useState, useEffect } from 'react';
import { AffiliateConfig, TripSettings } from '../types';

interface SearchWidgetProps {
  location: { city: string; country: string };
  tripSettings: TripSettings;
  setTripSettings: (settings: TripSettings) => void;
  affiliate: AffiliateConfig;
}

const SearchWidget: React.FC<SearchWidgetProps> = ({ location, tripSettings, setTripSettings, affiliate }) => {
  const [searchState, setSearchState] = useState<'idle' | 'searching' | 'results'>('idle');
  const [scanMessage, setScanMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const cleanCity = location.city.split('(')[0].trim();
  
  // Date Logic
  const startDate = tripSettings.startDate || new Date().toISOString().split('T')[0];
  const startObj = new Date(startDate);
  const endObj = new Date(startObj);
  endObj.setDate(endObj.getDate() + tripSettings.days);
  const endDate = endObj.toISOString().split('T')[0];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripSettings({ ...tripSettings, startDate: e.target.value });
    setSearchState('idle'); // Reset on change
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripSettings({ ...tripSettings, days: parseInt(e.target.value) || 1 });
    setSearchState('idle');
  };

  // Deep Links Generation
  const getSkyscannerLink = () => {
    const formattedDate = startDate.slice(2).replace(/-/g, ''); // YYMMDD
    return `https://www.skyscanner.co.kr/transport/flights/icn/${cleanCity}/${formattedDate}`;
  };

  const getAgodaLink = () => {
    return `https://www.agoda.com/search?text=${cleanCity}&checkIn=${startDate}&los=${tripSettings.days}&cid=${affiliate.agodaId || ''}`;
  };

  const getHotelsCombinedLink = () => {
    return `https://www.hotelscombined.co.kr/place/${cleanCity}/${startDate}/${endDate}`;
  };

  const getTripComLink = () => {
    return `https://kr.trip.com/flights/?AllianceID=${affiliate.tripComId || ''}`;
  };

  // Simulate AI Search Performance
  const startSearch = () => {
    setSearchState('searching');
    setProgress(0);
    
    const messages = [
        "전 세계 1,200개 항공사 데이터 스캔 중...",
        `${cleanCity} 지역 호텔 3,500개 가격 비교 분석...`,
        "제휴사 특별 할인 쿠폰 확인 중...",
        "최적의 여행 경로 알고리즘 적용...",
        "실시간 최저가 패키지 생성 완료!"
    ];

    let msgIndex = 0;
    setScanMessage(messages[0]);

    // Progress bar animation
    const interval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                return 100;
            }
            return prev + 2;
        });
    }, 40);

    // Message cycling
    const msgInterval = setInterval(() => {
        msgIndex++;
        if (msgIndex < messages.length) {
            setScanMessage(messages[msgIndex]);
        }
    }, 800);

    // Finish
    setTimeout(() => {
        clearInterval(interval);
        clearInterval(msgInterval);
        setSearchState('results');
    }, 3500);
  };

  const dayOfWeek = new Date(startDate).toLocaleDateString('ko-KR', { weekday: 'short' });
  const endDayOfWeek = new Date(endDate).toLocaleDateString('ko-KR', { weekday: 'short' });

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8 animate-fade-in-up">
      
      {/* 1. Header & Input Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white relative overflow-hidden">
         {/* Background Effect */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
         <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

         <div className="relative z-10">
            <h3 className="text-xl font-bold flex items-center mb-6">
                <span className="bg-indigo-500/20 p-2 rounded-lg mr-3 backdrop-blur-sm border border-indigo-400/30">
                    <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
                AI 실시간 가격 비교 (Global Scanner)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                {/* Location Display */}
                <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 px-2">
                    <label className="text-xs text-indigo-200 font-semibold uppercase tracking-wider mb-1 block">Destination</label>
                    <div className="text-xl font-black">{location.city}</div>
                    <div className="text-sm text-gray-300">{location.country}</div>
                </div>

                {/* Date Input */}
                <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 px-2">
                    <label className="text-xs text-indigo-200 font-semibold uppercase tracking-wider mb-1 block">Check-in</label>
                    <input 
                        type="date" 
                        value={startDate}
                        onChange={handleDateChange}
                        className="bg-transparent text-white font-bold text-lg w-full outline-none p-0 cursor-pointer focus:ring-0 placeholder-white" 
                    />
                    <div className="text-xs text-gray-400">{dayOfWeek}요일</div>
                </div>

                {/* Duration Input */}
                <div className="md:col-span-3 px-2 flex flex-col justify-center">
                    <label className="text-xs text-indigo-200 font-semibold uppercase tracking-wider mb-1 block">Duration</label>
                    <div className="flex items-center">
                        <input 
                            type="number" 
                            min="1" max="60"
                            value={tripSettings.days}
                            onChange={handleDurationChange}
                            className="bg-transparent text-white font-bold text-2xl w-16 outline-none p-0" 
                        />
                        <span className="text-sm font-medium opacity-70 mt-1">Nights</span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="md:col-span-3 flex items-center justify-end">
                    <button 
                        onClick={startSearch}
                        disabled={searchState === 'searching'}
                        className={`w-full py-3 px-6 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center
                            ${searchState === 'searching' 
                                ? 'bg-slate-700 text-slate-400 cursor-wait' 
                                : 'bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 text-white'}
                        `}
                    >
                        {searchState === 'searching' ? (
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                검색 중...
                            </div>
                        ) : '최저가 검색'}
                    </button>
                </div>
            </div>
         </div>
      </div>

      {/* 2. Searching Animation (Veo-like) */}
      {searchState === 'searching' && (
          <div className="p-10 bg-slate-50 flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-full max-w-md">
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                      <span>Scanning Databases</span>
                      <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-8 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 h-2 rounded-full transition-all duration-75 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                          <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse"></div>
                          <svg className="w-16 h-16 text-indigo-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                      </div>
                      <h4 className="text-lg font-bold text-slate-800 animate-pulse text-center">
                          {scanMessage}
                      </h4>
                      <div className="flex gap-3 mt-4">
                          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse delay-75"></div>
                          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse delay-150"></div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* 3. Results Section */}
      {searchState === 'results' && (
          <div className="p-6 bg-slate-50 animate-fade-in-up">
              
              {/* Flights */}
              <div className="mb-8">
                  <h4 className="flex items-center text-lg font-bold text-slate-800 mb-4">
                      <span className="text-2xl mr-2">✈️</span> 
                      항공권 추천 (Flights)
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold animate-pulse">Live Price</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Result 1: Skyscanner */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden" onClick={() => window.open(getSkyscannerLink(), '_blank')}>
                          <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">가격 비교 1위</div>
                          <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">🛫</div>
                                    <div>
                                        <div className="font-bold text-gray-900">ICN → {cleanCity.substring(0,3).toUpperCase()}</div>
                                        <div className="text-xs text-gray-500">{startDate} • 직항/경유 포함</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-400">왕복 최저가</div>
                                    <div className="font-black text-lg text-slate-900">가격 확인</div>
                                </div>
                          </div>
                          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                <div className="flex items-center text-xs text-gray-500 gap-2">
                                    <img src="https://images.skyscnr.com/images/country/flag/header/kr.png" alt="logo" className="h-4 opacity-70"/>
                                    <span>Skyscanner</span>
                                </div>
                                <span className="text-blue-600 font-bold text-sm group-hover:underline">지금 확인하기 →</span>
                          </div>
                      </div>

                      {/* Result 2: Trip.com */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden" onClick={() => window.open(getTripComLink(), '_blank')}>
                           <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">패키지 특가</div>
                           <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-xl">👜</div>
                                    <div>
                                        <div className="font-bold text-gray-900">항공 + 호텔 번들</div>
                                        <div className="text-xs text-gray-500">최대 20% 추가 할인</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-400">예상 할인가</div>
                                    <div className="font-black text-lg text-blue-600">특가 보기</div>
                                </div>
                          </div>
                          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                <div className="text-xs text-gray-500 font-bold">Trip.com</div>
                                <span className="text-blue-600 font-bold text-sm group-hover:underline">예약 하러가기 →</span>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Hotels */}
              <div>
                  <h4 className="flex items-center text-lg font-bold text-slate-800 mb-4">
                      <span className="text-2xl mr-2">🏨</span> 
                      숙소 추천 (Hotels)
                      <span className="ml-2 text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold">Best Rate</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Result 3: Agoda */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all overflow-hidden cursor-pointer group flex" onClick={() => window.open(getAgodaLink(), '_blank')}>
                          <div className="w-1/3 bg-gray-200 relative">
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                              </div>
                              <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-1.5 py-0.5 rounded">★ 4.8</div>
                          </div>
                          <div className="w-2/3 p-4 flex flex-col justify-between">
                              <div>
                                  <div className="font-bold text-gray-900 leading-tight mb-1">{location.city} 인기 호텔</div>
                                  <div className="text-xs text-gray-500">{startDate} ~ {endDate} ({tripSettings.days}박)</div>
                              </div>
                              <div className="flex justify-between items-end mt-2">
                                  <div className="text-xs text-gray-400 line-through">₩250,000</div>
                                  <div className="text-right">
                                      <div className="font-bold text-lg text-red-600">오늘의 특가</div>
                                      <div className="text-[10px] text-gray-500">Agoda</div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Result 4: HotelsCombined */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all overflow-hidden cursor-pointer group flex" onClick={() => window.open(getHotelsCombinedLink(), '_blank')}>
                           <div className="w-1/3 bg-gray-200 relative">
                               <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                               </div>
                           </div>
                           <div className="w-2/3 p-4 flex flex-col justify-between">
                              <div>
                                  <div className="font-bold text-gray-900 leading-tight mb-1">모든 예약 사이트 비교</div>
                                  <div className="text-xs text-gray-500">호텔스닷컴, 부킹닷컴 등 한번에</div>
                              </div>
                              <div className="mt-2 text-right">
                                  <span className="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors">
                                      최저가 검색하기
                                  </span>
                              </div>
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Styles for Animations */}
      <style>{`
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
            animation: blob 7s infinite;
        }
        .animation-delay-2000 {
            animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default SearchWidget;
