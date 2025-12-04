const fs = require('fs');

const newFunction = `function toggleSchedule(dayKey) {
            const dropdown = document.getElementById('schedule-dropdown');
            const tabs = document.querySelectorAll('.schedule-tab');
            
            tabs.forEach(tab => tab.classList.remove('active'));
            
            if (currentSchedule === dayKey && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
                currentSchedule = null;
            } else {
                event.target.classList.add('active');
                const day = scheduleData[dayKey];
                
                // 일정 표시
                let html = \`<h3 style="margin-bottom:12px;color:var(--accent);font-weight:800;">\${day.title}</h3>\`;
                day.items.forEach(item => {
                    html += \`<div class="schedule-item"><strong>\${item.time}</strong> \${item.text}</div>\`;
                });

                // 추천 장소 로직 (일정 제목에 따라 지역 필터링)
                let targetArea = '';
                if (day.title.includes('텐진')) targetArea = '天神 (텐진)';
                else if (day.title.includes('하카타')) targetArea = '博多 (하카타)';
                else if (day.title.includes('나카스')) targetArea = '中洲 (나카스)';
                
                if (targetArea) {
                    const recommendations = places.filter(p => p.area === targetArea && (p.type.includes('맛집') || p.type.includes('쇼핑'))).slice(0, 4);
                    
                    if (recommendations.length > 0) {
                        html += \`<div style="margin-top:20px;padding-top:15px;border-top:1px solid rgba(255,255,255,0.1);">
                            <h4 style="font-size:0.9rem;color:var(--accent-2);margin-bottom:10px;">✨ 이 일정 주변 추천</h4>
                            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">\`;
                        
                        recommendations.forEach(place => {
                            html += \`<div onclick="showDetails(places.find(p => p.id === '\${place.id}'))" style="background:rgba(0,0,0,0.2);padding:8px;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:8px;">
                                <img src="\${place.images[0]}" style="width:40px;height:40px;border-radius:6px;object-fit:cover;">
                                <div style="overflow:hidden;">
                                    <div style="font-size:0.8rem;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">\${place.name}</div>
                                    <div style="font-size:0.7rem;opacity:0.7;">⭐ \${place.rating.split(' ')[0]}</div>
                                </div>
                            </div>\`;
                        });
                        html += \`</div></div>\`;
                    }
                }

                dropdown.innerHTML = html;
                dropdown.classList.add('show');
                currentSchedule = dayKey;
            }
        }`;

let html = fs.readFileSync('index.html', 'utf8');

// Regex to match the existing toggleSchedule function
// Matches from "function toggleSchedule(dayKey) {" to the closing brace of the else block
const regex = /function toggleSchedule\(dayKey\) \{[\s\S]*?currentSchedule = dayKey;\s*\}\s*\}/;

if (regex.test(html)) {
    html = html.replace(regex, newFunction);
    fs.writeFileSync('index.html', html);
    console.log('Successfully replaced toggleSchedule function');
} else {
    console.log('Could not find toggleSchedule function to replace');
    // Fallback: append if not found (though it should be there)
}
