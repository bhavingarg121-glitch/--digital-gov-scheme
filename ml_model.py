from flask import Flask, request, jsonify
import pandas as pd
from sklearn.tree import DecisionTreeClassifier

app = Flask(__name__)

# ===== TRAINING DATA =====
data = [
    [25, 200000, 1, "Maharashtra", "PM Kisan"],
    [20, 100000, 2, "Delhi", "Scholarship"],
    [30, 500000, 3, "Karnataka", "Mudra Loan"],
    [28, 150000, 4, "Maharashtra", "Ujjwala"],
]

df = pd.DataFrame(data, columns=["age","income","occupation","state","scheme"])

# Encode state
df["state"] = df["state"].astype("category").cat.codes

X = df[["age","income","occupation","state"]]
y = df["scheme"]

model = DecisionTreeClassifier()
model.fit(X,y)

# ===== HELPERS =====
def map_occupation(o):
    return {
        "farmer":1,
        "student":2,
        "business":3,
        "woman":4
    }.get(o,0)

# ===== API =====
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    age = data["age"]
    income = data["income"]
    occ = map_occupation(data["occupation"])

    # simple state encoding
    state_map = {"Maharashtra":0,"Delhi":1,"Karnataka":2}
    state = state_map.get(data["state"],0)

    pred = model.predict([[age,income,occ,state]])

    return jsonify({
        "recommended_scheme": pred[0]
    })

if __name__ == "__main__":
    app.run(port=5000)
