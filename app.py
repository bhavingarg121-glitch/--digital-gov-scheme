from flask import Flask, jsonify, render_template
import feedparser
import random

app = Flask(__name__)

# -------------------- NEWS --------------------
RSS_FEEDS = {
    "Central": "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=1",
    "Education": "https://pib.gov.in/RssMain.aspx?ModId=21&Lang=1&Regid=1",
    "Health": "https://pib.gov.in/RssMain.aspx?ModId=17&Lang=1&Regid=1"
}

@app.route("/api/news")
def get_news():
    news_items = []
    for source, url in RSS_FEEDS.items():
        feed = feedparser.parse(url)
        for entry in feed.entries[:5]:  # top 5 items per feed
            news_items.append({
                "title": entry.title,
                "link": entry.link,
                "source": source
            })
    return jsonify(news_items)

# -------------------- SCHEMES --------------------
# For demo, generate 4650+ fake schemes
CATEGORIES = ["Education", "Health", "Employment", "Housing", "Women", "Pension"]
@app.route("/api/schemes")
def get_schemes():
    schemes = []
    for i in range(1, 4651):
        cat = random.choice(CATEGORIES)
        schemes.append({
            "name": f"Scheme {i}",
            "description": f"This is the description for Scheme {i} in {cat}.",
            "category": cat,
            "link": f"https://example.gov.in/scheme-{i}"
        })
    return jsonify(schemes)

# -------------------- FRONTEND --------------------
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
