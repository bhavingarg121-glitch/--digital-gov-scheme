from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# 🔥 NEWS API (Primary)
API_KEY = "766ef16a3a3c48c381e72d76e79a328f"

@app.route("/news")
def get_news():
    url = f"https://newsapi.org/v2/top-headlines?country=in&apiKey={API_KEY}"
    response = requests.get(url)
    data = response.json()

    articles = []

    for item in data.get("articles", [])[:6]:
        articles.append({
            "title": item.get("title"),
            "description": item.get("description"),
            "url": item.get("url")
        })

    return jsonify(articles)


# 🔥 BASIC WEB SCRAPING (Fallback / Extra)
@app.route("/scraped-news")
def scrape_news():
    url = "https://www.thehindu.com/news/national/"
    response = requests.get(url)

    soup = BeautifulSoup(response.text, "html.parser")

    news_list = []
    articles = soup.find_all("h3")

    for article in articles[:6]:
        title = article.text.strip()
        news_list.append({
            "title": title,
            "description": "Latest update from The Hindu",
            "url": url
        })

    return jsonify(news_list)


# 🔥 HOME CHECK
@app.route("/")
def home():
    return "Backend Running 🚀"


if __name__ == "__main__":
    app.run(debug=True)
