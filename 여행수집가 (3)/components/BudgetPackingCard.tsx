
import React from 'react';
import { BudgetBreakdown, PackingItem, AffiliateConfig, TripSettings, FlightAnalysis } from '../types';

interface BudgetPackingCardProps {
  budget: BudgetBreakdown;
  packingList: PackingItem[];
  affiliate: AffiliateConfig;
  location?: { city: string, country: string };
  tripSettings?: TripSettings;
  flightAnalysis?: FlightAnalysis;
}

const BudgetPackingCard: React.FC<BudgetPackingCardProps> = ({ budget, packingList, affiliate, location, tripSettings, flightAnalysis }) => {
  
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
  };
  
  const formatKRW = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  // Booking Links
  const cleanCity = location?.city.split('(')[0].trim() || '';
  const originCode = tripSettings?.originCode || 'ICN';
  const startDate = tripSettings?.startDate || new Date().toISOString().split('T')[0];
  const dateFormatted = startDate.slice(2).replace(/-/g, ''); // YYMMDD for Skyscanner

  const getSkyscannerLink = () => `https://www.skyscanner.co.kr/transport/flights/${originCode.toLowerCase()}/${cleanCity.toLowerCase().substring(0,3)}/${dateFormatted}`;
  const getTripComLink = () => `https://kr.trip.com/flights/?AllianceID=${affiliate.tripComId || ''}`;
  const getAgodaLink = () => `https://www.agoda.com/search?text=${cleanCity}&checkIn=${startDate}&los=${tripSettings?.days || 3}&cid=${affiliate.agodaId || ''}`;
  const getHotelsCombinedLink = () => `https://www.hotelscombined.co.kr/place/${cleanCity}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 animate-fade-in-up">
        
        {/* 1. FLIGHT & HOTEL BOOKING HUB (The 'Danawa' Style Aggregator) */}
        <div className="lg:col-span-3 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
             
             <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span className="bg-white/20 p-2 rounded-lg mr-3">✈️</span>
                    항공/숙박 최저가 비교 (Booking Aggregator)
                </h3>

                {/* Route Warning */}
                {flightAnalysis && !flightAnalysis.isDirectLikely && (
                    <div className="bg-orange-500/20 border border-orange-400/50 rounded-xl p-4 mb-6 flex items-start gap-3">
                         <svg className="w-6 h-6 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                         <div>
                             <div className="font-bold text-orange-200">직항 노선 주의 ({flightAnalysis.origin} → {flightAnalysis.destination})</div>
                             <div className="text-sm text-white/90">{flightAnalysis.warningMessage || "직항편이 없을 수 있습니다."} {flightAnalysis.recommendedRoute}</div>
                         </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Flights */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all">
                        <div className="text-xs text-indigo-300 font-bold uppercase mb-2">Flights</div>
                        <div className="flex justify-between items-end mb-3">
                             <div>
                                 <div className="text-lg font-bold">{originCode} ➔ {cleanCity}</div>
                                 <div className="text-xs text-gray-300">{startDate} • 왕복</div>
                             </div>
                             <div className="text-right">
                                 <div className="text-xs text-gray-400">예상 최저가</div>
                                 <div className="font-bold text-xl">{flightAnalysis?.estPrice || "가격 확인"}</div>
                             </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <a href={getSkyscannerLink()} target="_blank" rel="noopener noreferrer" className="bg-white text-slate-900 text-center py-2 rounded-lg text-xs font-bold hover:bg-gray-100">
                                 Skyscanner 비교
                             </a>
                             <a href={getTripComLink()} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white text-center py-2 rounded-lg text-xs font-bold hover:bg-blue-700">
                                 Trip.com 특가
                             </a>
                        </div>
                    </div>

                    {/* Hotels */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all">
                        <div className="text-xs text-green-300 font-bold uppercase mb-2">Hotels</div>
                        <div className="flex justify-between items-end mb-3">
                             <div>
                                 <div className="text-lg font-bold">{cleanCity} 호텔</div>
                                 <div className="text-xs text-gray-300">{tripSettings?.days}박 • 성인 2명</div>
                             </div>
                             <div className="text-right">
                                 <div className="text-xs text-gray-400">특가 할인</div>
                                 <div className="font-bold text-xl text-green-400">최대 60% OFF</div>
                             </div>
                        </div>
                         <div className="grid grid-cols-2 gap-2">
                             <a href={getAgodaLink()} target="_blank" rel="noopener noreferrer" className="bg-white text-slate-900 text-center py-2 rounded-lg text-xs font-bold hover:bg-gray-100">
                                 Agoda 검색
                             </a>
                             <a href={getHotelsCombinedLink()} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white text-center py-2 rounded-lg text-xs font-bold hover:bg-indigo-700">
                                 HotelsCombined
                             </a>
                        </div>
                    </div>
                </div>
             </div>
        </div>

        {/* 2. ESTIMATED BUDGET */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                예상 현지 경비 (Local Cost)
            </h3>
            
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-slate-600">식비</span><span className="font-semibold">{formatCurrency(budget.foodCost, budget.currency)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-600">교통</span><span className="font-semibold">{formatCurrency(budget.transportCost, budget.currency)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-600">티켓</span><span className="font-semibold">{formatCurrency(budget.ticketCost, budget.currency)}</span></div>
                
                <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between items-center">
                    <span className="font-bold">합계</span>
                    <span className="text-lg font-black text-indigo-600">{formatCurrency(budget.totalLocal, budget.currency)}</span>
                </div>
                <div className="text-right text-xs text-gray-400">≈ {formatKRW(budget.totalKrw)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-auto">
                 <a href={`https://www.klook.com/search?text=${cleanCity}&aid=${affiliate.klookId || ''}`} target="_blank" rel="noopener noreferrer" className="text-center bg-orange-50 text-orange-700 py-2 rounded-lg text-xs font-bold hover:bg-orange-100">🎟️ Klook 티켓</a>
                 <a href={`https://www.viator.com/searchResults/all?text=${cleanCity}&pid=${affiliate.viatorId || ''}`} target="_blank" rel="noopener noreferrer" className="text-center bg-emerald-50 text-emerald-700 py-2 rounded-lg text-xs font-bold hover:bg-emerald-100">🗺️ Viator 투어</a>
            </div>
        </div>

        {/* 3. SHOPPING CHECKLIST */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                준비물 (Shopping)
            </h3>
            
            <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[200px]">
                {packingList.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 p-2 rounded border border-gray-100">
                        <div className="font-bold text-slate-800 text-xs mb-1">{item.item}</div>
                        <div className="flex gap-2">
                            <a href={`https://www.coupang.com/np/search?q=${encodeURIComponent(item.item)}&channel=${affiliate.coupangId || 'guest'}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-white border border-red-100 text-red-600 text-[10px] font-bold py-1 rounded hover:bg-red-50">쿠팡</a>
                            <a href={`https://search.shopping.naver.com/search/all?query=${encodeURIComponent(item.item)}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-white border border-green-100 text-green-600 text-[10px] font-bold py-1 rounded hover:bg-green-50">네이버</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default BudgetPackingCard;
