# app.py
from flask import Flask, jsonify
import feedparser

app = Flask(__name__)

# ------------------ RSS Feeds ------------------
RSS_FEEDS = {
    "central": "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=1",
    "education": "https://pib.gov.in/RssMain.aspx?ModId=21&Lang=1&Regid=1",
    "health": "https://pib.gov.in/RssMain.aspx?ModId=17&Lang=1&Regid=1"
}

@app.route("/api/news")
def get_news():
    all_news = []
    for source, url in RSS_FEEDS.items():
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:10]:  # Top 10 news per feed
                all_news.append({
                    "title": entry.title,
                    "link": entry.link,
                    "source": source.capitalize(),
                    "published": entry.published if "published" in entry else ""
                })
        except Exception as e:
            print(f"Error fetching {source} feed: {e}")

    # Sort by published date (newest first)
    all_news.sort(key=lambda x: x["published"], reverse=True)
    return jsonify(all_news)

if __name__ == "__main__":
    app.run(debug=True)
