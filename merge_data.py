import os

# Read the generated data
with open('places_data.js', 'r', encoding='utf-8') as f:
    places_data = f.read()

# Read the index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html_lines = f.readlines()

# Find start and end lines for replacement
start_index = -1
end_index = -1

for i, line in enumerate(html_lines):
    if 'const places = [' in line:
        start_index = i
    if '// 2. SCHEDULE:' in line:
        end_index = i - 1 # The line before the schedule section
        break

if start_index != -1 and end_index != -1:
    # Construct new content
    # Keep lines before start_index
    new_lines = html_lines[:start_index]
    
    # Add the new places data (ensure indentation if needed, but JS is forgiving)
    new_lines.append(places_data + "\n\n")
    
    # Keep lines after end_index (The schedule section starts at end_index + 1 usually, 
    # but we found the line with '// 2. SCHEDULE:' so we want to keep that and everything after)
    # My logic above: end_index is the line *before* the schedule header.
    # So we want to resume from the line that contains '// 2. SCHEDULE:' which is `html_lines[end_index + 1]`?
    # Let's check the loop break condition.
    # The loop breaks when `line` contains '// 2. SCHEDULE:'. `i` is the index of that line.
    # So we want to keep from `i` onwards.
    
    # Re-evaluating logic:
    # start_index is 'const places = ['
    # We want to replace everything from start_index until the line BEFORE '// 2. SCHEDULE:'
    # Actually, we want to keep '// 2. SCHEDULE:' and everything after.
    
    # Let's find the index of '// 2. SCHEDULE:'
    schedule_header_index = -1
    for i, line in enumerate(html_lines):
        if '// 2. SCHEDULE:' in line:
            schedule_header_index = i
            break
            
    if schedule_header_index != -1:
        # We replace from start_index to schedule_header_index - 2 (to keep the separator line if it exists)
        # In the file view:
        # 446:     // ==========================================
        # 447:     // 2. SCHEDULE: ...
        
        # So we should look for the separator line '    // ==========================================' before SCHEDULE
        separator_index = -1
        for i in range(schedule_header_index - 5, schedule_header_index + 1):
            if '// ==========================================' in html_lines[i]:
                separator_index = i
                break
        
        resume_index = separator_index if separator_index != -1 else schedule_header_index
        
        final_lines = html_lines[:start_index] + [places_data + "\n\n"] + html_lines[resume_index:]
        
        with open('index.html', 'w', encoding='utf-8') as f:
            f.writelines(final_lines)
        print("Successfully merged places_data.js into index.html")
    else:
        print("Could not find Schedule section header")
else:
    print("Could not find start marker")
