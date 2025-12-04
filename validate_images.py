import json
import requests
import re
from concurrent.futures import ThreadPoolExecutor

def check_url(url):
    try:
        response = requests.head(url, timeout=5)
        if response.status_code == 200:
            return None
        return f"{url} -> {response.status_code}"
    except Exception as e:
        return f"{url} -> {str(e)}"

def validate_images():
    with open('places_data.js', 'r', encoding='utf-8') as f:
        content = f.read()
        # Extract JSON array
        json_str = content[content.find('['):content.rfind(']')+1]
        places = json.loads(json_str)

    urls = []
    for place in places:
        if 'images' in place:
            urls.extend(place['images'])

    print(f"Checking {len(urls)} images...")
    
    broken = []
    with ThreadPoolExecutor(max_workers=20) as executor:
        results = executor.map(check_url, urls)
        for result in results:
            if result:
                broken.append(result)

    if broken:
        print(f"Found {len(broken)} broken images:")
        for b in broken:
            print(b)
    else:
        print("All images are valid!")

if __name__ == "__main__":
    validate_images()
