from flask import Flask, jsonify
import feedparser

app = Flask(__name__)

# Schemes example (replace with 4650+ in real file)
schemes = [
    {"name":"Pradhan Mantri Awas Yojana","description":"Affordable housing","category":"Housing","link":"https://example.gov.in/pmay"},
    {"name":"Ayushman Bharat","description":"Health insurance","category":"Health","link":"https://example.gov.in/ayushman-bharat"},
    {"name":"PM-KISAN","description":"Income support","category":"Employment","link":"https://example.gov.in/pm-kisan"}
]

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
        for entry in d.entries[:10]:
            all_news.append({
                "title": entry.title,
                "link": entry.link,
                "source": feed["name"]
            })
    return jsonify(all_news)

if __name__ == '__main__':
    app.run(debug=True)
