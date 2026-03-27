import json
import random

categories = [
    "Education",
    "Health",
    "Agriculture",
    "Employment",
    "Women",
    "Finance",
    "Housing",
    "Technology",
    "Pension"
]

schemes = []

for i in range(1, 5001):
    scheme = {
        "name": f"Government Scheme {i}",
        "description": f"This scheme provides benefits under program {i}.",
        "link": "https://www.india.gov.in/",
        "category": random.choice(categories)
    }
    schemes.append(scheme)

# Create schemes.json file
with open("schemes.json", "w", encoding="utf-8") as file:
    json.dump(schemes, file, indent=2)

print("✅ 5000 schemes generated successfully!")
