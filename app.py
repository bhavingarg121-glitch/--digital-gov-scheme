from flask import Flask, jsonify
from flask_cors import CORS
import feedparser

app = Flask(__name__)
CORS(app)  # allow cross-origin requests

# Example schemes (expand with your full dataset)
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

@app.route('/api/schemes')
def get_schemes():
    return jsonify(schemes)

@app.route('/api/news')
def get_news():
    all_news = []
    for feed in rss_feeds:
        d = feedparser.parse(feed["url"])
        # Debug info
        print(f"Parsing feed: {feed['name']} ({feed['url']})")
        print(f"Bozo: {d.bozo}, Exception: {getattr(d, 'bozo_exception', None)}")
        print(f"Entries found: {len(d.entries)}")

        if d.bozo:
            # Skip problematic feeds but log the error
            continue

        for entry in d.entries[:10]:
            all_news.append({
                "title": entry.get("title", "No title"),
                "link": entry.get("link", ""),
                "source": feed["name"]
            })

    return jsonify(all_news)

if __name__ == '__main__':
    app.run(debug=True)
