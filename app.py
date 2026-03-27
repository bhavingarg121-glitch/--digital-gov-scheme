from flask import Flask, jsonify
import json

app = Flask(__name__)

def load_data():
    with open("schemes.json", encoding="utf-8") as f:
        return json.load(f)

@app.route("/api/schemes")
def get_schemes():
    return jsonify(load_data())

@app.route("/")
def home():
    return "Scheme Sathi API is running 🚀"

if __name__ == "__main__":
    app.run(debug=True)
