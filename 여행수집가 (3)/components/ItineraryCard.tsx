import React, { useState } from 'react';
import { ItineraryDay, Place, Alternative } from '../types';

interface ItineraryCardProps {
  dayPlan: ItineraryDay;
  allPlaces: Place[];
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ dayPlan, allPlaces }) => {
  const [activeAlternatives, setActiveAlternatives] = useState<string | null>(null);

  // Construct Google Maps Direction URL
  const getRouteUrl = () => {
    if (dayPlan.items.length < 2) return '#';
    
    const baseUrl = "https://www.google.com/maps/dir/?api=1";
    const origin = encodeURIComponent(dayPlan.items[0].placeName);
    const destination = encodeURIComponent(dayPlan.items[dayPlan.items.length - 1].placeName);
    
    const waypoints = dayPlan.items.slice(1, -1)
      .map(item => encodeURIComponent(item.placeName))
      .join('|');
      
    return `${baseUrl}&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=walking`;
  };

  const toggleAlternative = (id: string) => {
    if (activeAlternatives === id) setActiveAlternatives(null);
    else setActiveAlternatives(id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden h-full">
      <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
        <h3 className="text-white font-bold text-lg">Day {dayPlan.day}</h3>
        <a 
          href={getRouteUrl()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors flex items-center shadow-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.447-.894L15 7m0 13V7"></path></svg>
          지도 (Route)
        </a>
      </div>
      
      <div className="p-6 relative">
        {/* Vertical Line */}
        <div className="absolute left-10 top-8 bottom-8 w-0.5 bg-gray-200"></div>

        <div className="space-y-8">
          {dayPlan.items.map((item, index) => {
            const placeDetails = allPlaces.find(p => p.id === item.placeId);
            const isLast = index === dayPlan.items.length - 1;
            const uniqueId = `item-${dayPlan.day}-${index}`;

            return (
              <div key={index} className="relative flex items-start gap-4 z-10">
                {/* Time Dot */}
                <div className={`flex-none w-8 h-8 rounded-full border-4 border-white shadow-md flex items-center justify-center
                  ${index === 0 ? 'bg-green-500 text-white' : isLast ? 'bg-red-500 text-white' : 'bg-indigo-500 text-white'}
                `}>
                  <span className="text-[10px] font-bold">{index + 1}</span>
                </div>

                <div className="flex-1">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-indigo-200 transition-colors relative">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{item.timeOfDay}</span>
                            <span className="text-xs text-gray-400">{placeDetails?.category}</span>
                        </div>
                        
                        <h4 className="font-bold text-gray-900 text-base mb-1">{item.placeName}</h4>
                        <p className="text-xs text-gray-500 mb-1">{placeDetails?.name_ko}</p>
                        <p className="text-sm text-gray-700 mb-2">{item.description_ko}</p>
                        
                        <div className="flex items-center gap-3 mt-3">
                            {placeDetails && (
                                <>
                                <button 
                                    onClick={() => window.open(placeDetails.mapLink, '_blank')}
                                    className="text-xs text-indigo-600 font-bold hover:underline flex items-center"
                                >
                                    지도 보기
                                </button>
                                <span className="text-gray-300">|</span>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(placeDetails.imageFileName);
                                        window.open(placeDetails.photoSearchLink, '_blank');
                                    }}
                                    className="text-xs text-indigo-600 font-bold hover:underline flex items-center"
                                >
                                    사진 검색
                                </button>
                                </>
                            )}
                            
                            {item.alternatives && item.alternatives.length > 0 && (
                                <button
                                    onClick={() => toggleAlternative(uniqueId)}
                                    className="ml-auto text-xs bg-white border border-gray-300 text-gray-600 px-2 py-1 rounded hover:bg-gray-50 flex items-center"
                                >
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                    다른 옵션 {activeAlternatives === uniqueId ? '닫기' : '보기'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Alternatives Dropdown */}
                    {activeAlternatives === uniqueId && item.alternatives && (
                        <div className="mt-2 bg-yellow-50 rounded-xl p-3 border border-yellow-200 animate-fade-in-up">
                            <h5 className="text-xs font-bold text-yellow-800 mb-2 uppercase">Alternatives (대체 장소)</h5>
                            <div className="space-y-2">
                                {item.alternatives.map((alt, i) => (
                                    <div key={i} className="flex justify-between items-center bg-white p-2 rounded border border-yellow-100 shadow-sm">
                                        <div>
                                            <div className="text-xs font-bold text-gray-800">{alt.name}</div>
                                            <div className="text-[10px] text-gray-500">{alt.type} • {alt.reason}</div>
                                        </div>
                                        <button
                                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(alt.name)}`, '_blank')}
                                            className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold hover:bg-yellow-200"
                                        >
                                            지도
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;