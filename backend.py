from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

schemes = [
    {"name": "Ayushman Bharat", "description": "Health insurance up to ₹5 lakh", "category": "Health", "link": "https://pmjay.gov.in"},
    {"name": "PM Awas Yojana", "description": "Housing for all", "category": "Housing", "link": "https://pmaymis.gov.in"},
    {"name": "National Scholarship Portal", "description": "Scholarships for students", "category": "Education", "link": "https://scholarships.gov.in"},
    {"name": "PM Kisan", "description": "Income support for farmers", "category": "Agriculture", "link": "https://pmkisan.gov.in"},
    {"name": "Skill India", "description": "Skill development program", "category": "Employment", "link": "https://skillindia.gov.in"}
]

@app.route('/api/schemes')
def get_schemes():
    return jsonify(schemes)

if __name__ == '__main__':
    app.run(debug=True)
