import json
import random

categories = ["Housing", "Health", "Employment", "Women", "Pension"]
base_url = "https://example.gov.in/scheme"

schemes = []

for i in range(1, 4651):
    category = random.choice(categories)
    scheme = {
        "name": f"Scheme {i} - {category}",
        "description": f"This is a description for Scheme {i} under {category} category.",
        "category": category,
        "link": f"{base_url}/{i}"
    }
    schemes.append(scheme)

with open("schemes.json", "w", encoding="utf-8") as f:
    json.dump(schemes, f, indent=2, ensure_ascii=False)

print("Generated schemes.json with 4650 schemes.")
