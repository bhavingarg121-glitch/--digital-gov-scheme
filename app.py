from flask import Flask, jsonify
import feedparser

app = Flask(__name__)

# ------------------ RSS Feeds ------------------
RSS_FEEDS = [
    {"name": "Central", "url": "https://pib.gov.in/rssfeed.aspx?SiteId=1&CategoryId=6"},
    {"name": "Education", "url": "https://pib.gov.in/rssfeed.aspx?SiteId=1&CategoryId=21"},
    {"name": "Health", "url": "https://pib.gov.in/rssfeed.aspx?SiteId=1&CategoryId=17"},
]

@app.route('/api/news')
def get_news():
    news_items = []
    for feed in RSS_FEEDS:
        parsed_feed = feedparser.parse(feed["url"])
        for entry in parsed_feed.entries[:10]:  # get latest 10 from each feed
            news_items.append({
                "title": entry.title,
                "link": entry.link,
                "source": feed["name"],
                "published": entry.published if "published" in entry else ""
            })
    # Sort news by published date (latest first)
    news_items.sort(key=lambda x: x.get("published", ""), reverse=True)
    return jsonify(news_items)

if __name__ == "__main__":
    app.run(debug=True)
