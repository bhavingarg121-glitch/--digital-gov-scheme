import requests
from bs4 import BeautifulSoup
import json
import time

# -------------------------------
# CATEGORY KEYWORDS
# -------------------------------
CATEGORIES = {
    "Women": ["women", "girl", "female", "mother", "matru", "mahila"],
    "Farmers": ["farmer", "kisan", "crop", "agri loan"],
    "Agriculture": ["agriculture", "farming", "soil", "irrigation"],
    "Infrastructure": ["road", "highway", "infrastructure", "urban", "smart city", "port"]
}

# -------------------------------
# MINISTRY / SOURCE URLS
# -------------------------------
URLS = [
    "https://www.india.gov.in/topics/agriculture",
    "https://www.india.gov.in/topics/rural",
    "https://www.india.gov.in/topics/women-child",
    "https://www.india.gov.in/topics/infrastructure",
    "https://www.india.gov.in/topics/employment"
]

# -------------------------------
# STORAGE
# -------------------------------
data = {
    "Women": [],
    "Farmers": [],
    "Agriculture": [],
    "Infrastructure": []
}

seen = set()

# -------------------------------
# CATEGORY DETECTOR
# -------------------------------
def detect_category(text):
    text = text.lower()
    for category, keywords in CATEGORIES.items():
        for keyword in keywords:
            if keyword in text:
                return category
    return None

# -------------------------------
# SCRAPER FUNCTION
# -------------------------------
def scrape_page(url):
    print(f"Scraping: {url}")
    try:
        res = requests.get(url, timeout=10)
        soup = BeautifulSoup(res.text, "lxml")

        for li in soup.find_all("li"):
            name = li.get_text(strip=True)

            if len(name) < 5:
                continue

            if name in seen:
                continue

            category = detect_category(name)

            if category:
                scheme = {
                    "name": name,
                    "link": url,
                    "description": f"Scheme under {category} category"
                }

                data[category].append(scheme)
                seen.add(name)

    except Exception as e:
        print("Error:", e)

# -------------------------------
# RUN SCRAPER
# -------------------------------
for url in URLS:
    scrape_page(url)
    time.sleep(2)  # avoid blocking

# -------------------------------
# SAVE FILES
# -------------------------------
for category in data:
    filename = f"data/{category.lower()}.json"
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data[category], f, indent=2, ensure_ascii=False)

print("\n✅ Scraping Completed!")
