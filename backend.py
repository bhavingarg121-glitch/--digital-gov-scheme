from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Load data
with open("data/schemes.json", encoding="utf-8") as f:
    schemes = json.load(f)

@app.route("/api/schemes")
def get_schemes():
    return jsonify(schemes)

if __name__ == "__main__":
    app.run(debug=True)
