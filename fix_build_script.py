
import os

file_path = 'build_index.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The broken string
broken = 'galleryHtml += `< img src = "${imgUrl}" loading = "lazy" onclick = "document.getElementById(\'modal-img\').src=\'${imgUrl}\'" > `;'
# The fixed string
fixed = 'galleryHtml += `<img src="${imgUrl}" loading="lazy" onclick="document.getElementById(\'modal-img\').src=\'${imgUrl}\'">`;'

if broken in content:
    new_content = content.replace(broken, fixed)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed syntax error.")
else:
    # Try a more loose match if exact string fails due to whitespace
    import re
    pattern = r'galleryHtml \+= `< img src = ".*?" .*? > `;'
    if re.search(pattern, content):
        print("Found broken pattern, fixing...")
        # We know what it should be
        # We need to be careful with regex replacement to keep the variable
        # Actually, let's just replace the specific broken tag parts
        new_content = content.replace('< img src =', '<img src=').replace(' > `', '> `')
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Fixed syntax error via partial replace.")
    else:
        print("Could not find broken string.")
