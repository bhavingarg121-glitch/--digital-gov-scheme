import json
import random

categories = ["Education", "Health", "Agriculture", "Employment", "Women", "Finance", "Housing"]

schemes = []

for i in range(1, 5001):   # 5000 schemes
    scheme = {
        "name": f"Government Scheme {i}",
        "description": f"This is description for scheme {i}. It provides benefits to citizens.",
        "link": "https://www.india.gov.in/",
        "category": random.choice(categories)
    }
    schemes.append(scheme)

with open("schemes.json", "w", encoding="utf-8") as f:
    json.dump(schemes, f, indent=2)

print(" 5000 schemes generated!")
