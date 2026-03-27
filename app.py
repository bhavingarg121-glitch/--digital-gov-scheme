from flask import Flask, jsonify
from flask_cors import CORS
import requests
import feedparser
import time
import json
import os

app = Flask(__name__)
CORS(app)

# Example schemes
schemes = [
    {"name": "Pradhan Mantri Awas Yojana", "description": "Affordable housing", "category": "Housing", "link": "https://example.gov.in/pmay"},
    {"name": "Ayushman Bharat", "description": "Health insurance", "category": "Health", "link": "https://example.gov.in/ayushman-bharat"},
    {"name": "PM-KISAN", "description": "Income support", "category": "Employment", "link": "https://example.gov.in/pm-kisan"}
]

# PIB RSS feeds
rss_feeds = [
    {"name": "Central", "url": "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1"},
    {"name": "Education", "url": "https://pib.gov.in/RssMain.aspx?ModId=21&Lang=1"},
    {"name": "Health", "url": "https://pib.gov.in/RssMain.aspx?ModId=17&Lang=1"}
]

# Cache settings
CACHE_FILE = "news_cache.json"
CACHE_TTL = 300  # seconds (5 minutes)

def load_cache():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return {"data": [], "timestamp": 0}
    return {"data": [], "timestamp": 0}

def save_cache(cache):
    try:
        with open(CACHE_FILE, "w") as f:
            json.dump(cache, f)
    except Exception as e:
        print(f"Error saving cache: {e}")

# Initialize cache
news_cache = load_cache()

@app.route('/api/schemes')
def get_schemes():
    return jsonify(schemes)

@app.route('/api/news')
def get_news():
    now = time.time()
    # Serve cached data if still fresh
    if news_cache["data"] and (now - news_cache["timestamp"] < CACHE_TTL):
        print("Serving cached news from file")
        return jsonify(news_cache["data"])

    all_news = []
    for feed in rss_feeds:
        try:
            response = requests.get(feed["url"], timeout=10)
            response.raise_for_status()
            d = feedparser.parse(response.text)

            print(f"Feed: {feed['name']} | Status: {response.status_code} | Entries: {len(d.entries)}")

            for entry in d.entries[:10]:
                all_news.append({
                    "title": entry.get("title", "No title"),
                    "link": entry.get("link", ""),
                    "source": feed["name"]
                })

        except Exception as e:
            print(f"Error fetching {feed['url']}: {e}")

    # Update cache if we got data
    if all_news:
        news_cache["data"] = all_news
        news_cache["timestamp"] = now
        save_cache(news_cache)

    return jsonify(all_news)

if __name__ == '__main__':
    app.run(debug=True)
