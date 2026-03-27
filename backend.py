from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

def load_data():
    try:
        with open("schemes.json", encoding="utf-8") as f:
            return json.load(f)
    except:
        return []

@app.route("/api/schemes")
def get_schemes():
    return jsonify(load_data())

@app.route("/")
def home():
    return "Backend running ✅"

if __name__ == "__main__":
   app.run(debug=True, host="0.0.0.0", port=5000)
