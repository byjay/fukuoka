
import React, { useState, useEffect } from 'react';
import { Place, AffiliateConfig, TripSettings } from '../types';

interface ResultCardProps {
  place: Place;
  tripSettings?: TripSettings;
}

const ResultCard: React.FC<ResultCardProps> = ({ place, tripSettings }) => {
  const [affiliateConfig, setAffiliateConfig] = useState<AffiliateConfig>({} as AffiliateConfig);

  // Load Affiliate Config for shopping links
  useEffect(() => {
    const savedConfig = localStorage.getItem('affiliateConfig');
    if (savedConfig) {
        try {
            setAffiliateConfig(JSON.parse(savedConfig));
        } catch (e) {
            // ignore
        }
    }
  }, []);

  const getShoppingLink = (platform: 'coupang' | 'naver', query: string) => {
    const cleanQuery = encodeURIComponent(query.split(',')[0].trim()); 
    if (platform === 'coupang') {
        return `https://www.coupang.com/np/search?component=&q=${cleanQuery}&channel=${affiliateConfig.coupangId || 'guest'}`;
    } else {
        return `https://search.shopping.naver.com/search/all?query=${cleanQuery}`;
    }
  };

  // 3. Standard Card (Restaurant, Sightseeing, etc.)
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all flex flex-col h-full overflow-hidden group">
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-indigo-700 transition-colors">
            {place.name_en}
          </h3>
          <span className="flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold ml-2 whitespace-nowrap">
            ★ {place.rating}
          </span>
        </div>
        <h4 className="text-sm font-semibold text-gray-500 mb-2">{place.name_ko}</h4>
        
        <div className="flex flex-wrap gap-2 mb-3">
             <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                {place.category}
            </span>
            {place.priceLevel && (
                <span className="text-xs font-semibold bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100">
                    {place.priceLevel}
                </span>
            )}
        </div>

        {place.location && (
            <div className="flex items-start text-xs text-gray-500 mb-3">
                <svg className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {place.location}
            </div>
        )}

        <div className="bg-gray-50 p-3 rounded-lg mb-2 flex-grow">
            <p className="text-gray-800 text-xs font-medium mb-1 border-b border-gray-200 pb-1">
                {place.summary_ko}
            </p>
            <p className="text-gray-500 text-xs leading-relaxed italic">
                {place.summary_en}
            </p>
        </div>

        {/* Rich Data Section */}
        <div className="space-y-2 mt-2">
            {place.menuInfo && (
                <div className="text-[10px] bg-orange-50 p-2 rounded border border-orange-100">
                    <span className="font-bold text-orange-700 block mb-0.5">🍽️ 메뉴 & 가격</span>
                    <span className="text-gray-600 leading-tight whitespace-pre-wrap">{place.menuInfo}</span>
                </div>
            )}
            
            {(place.operatingHours || place.ticketInfo) && (
                <div className="flex gap-2 text-[10px]">
                   {place.operatingHours && (
                        <div className="flex-1 bg-slate-50 p-1.5 rounded border border-slate-200 text-slate-600">
                            🕒 {place.operatingHours}
                        </div>
                   )}
                   {place.ticketInfo && (
                        <div className="flex-1 bg-slate-50 p-1.5 rounded border border-slate-200 text-slate-600">
                            🎟️ {place.ticketInfo}
                        </div>
                   )}
                </div>
            )}

            {place.travelTips && (
                <div className="text-[10px] bg-blue-50 p-2 rounded border border-blue-100">
                     <span className="font-bold text-blue-700 block mb-0.5">💡 여행 꿀팁</span>
                     <span className="text-gray-600">{place.travelTips}</span>
                </div>
            )}
             {place.essentialItems && (
                <div className="text-[10px] bg-red-50 p-2 rounded border border-red-100 group/item">
                     <div className="flex justify-between items-start">
                        <span className="font-bold text-red-700 block mb-0.5">🎒 필수템</span>
                     </div>
                     <span className="text-gray-600 block mb-1.5">{place.essentialItems}</span>
                     
                     <div className="flex gap-1 mt-1 opacity-90">
                        <a 
                            href={getShoppingLink('coupang', place.essentialItems)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 text-center bg-white border border-red-200 text-red-600 rounded px-1.5 py-1 hover:bg-red-50 transition-colors text-[9px] font-bold"
                        >
                            Coupang
                        </a>
                        <a 
                            href={getShoppingLink('naver', place.essentialItems)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 text-center bg-white border border-green-200 text-green-600 rounded px-1.5 py-1 hover:bg-green-50 transition-colors text-[9px] font-bold"
                        >
                            Naver
                        </a>
                     </div>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default ResultCard;
