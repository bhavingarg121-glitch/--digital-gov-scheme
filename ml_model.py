from flask import Flask, request, jsonify
import pandas as pd
import re
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

# ===== LOAD DATASET =====
df = pd.read_csv("schemes_dataset.csv")

# ===== ENCODE TEXT =====
le_occ = LabelEncoder()
le_state = LabelEncoder()
le_scheme = LabelEncoder()

df["occupation"] = le_occ.fit_transform(df["occupation"])
df["state"] = le_state.fit_transform(df["state"])
df["scheme"] = le_scheme.fit_transform(df["scheme"])

X = df[["age","income","occupation","state"]]
y = df["scheme"]

# ===== MODEL =====
model = RandomForestClassifier(n_estimators=100)
model.fit(X,y)

# ===== NLP PARSER =====
def parse_text(text):
    text = text.lower()

    # age
    age = re.search(r'\d{2}', text)
    age = int(age.group()) if age else 25

    # income
    income = re.search(r'\d{4,6}', text)
    income = int(income.group()) if income else 200000

    # occupation
    if "farmer" in text: occ = "farmer"
    elif "student" in text: occ = "student"
    elif "business" in text: occ = "business"
    elif "woman" in text: occ = "woman"
    else: occ = "student"

    # state
    if "maharashtra" in text: state = "Maharashtra"
    elif "delhi" in text: state = "Delhi"
    elif "karnataka" in text: state = "Karnataka"
    else: state = "Maharashtra"

    return age, income, occ, state

# ===== API =====
@app.route("/predict", methods=["POST"])
def predict():
    text = request.json.get("text")

    age, income, occ, state = parse_text(text)

    occ_enc = le_occ.transform([occ])[0]
    state_enc = le_state.transform([state])[0]

    pred = model.predict([[age,income,occ_enc,state_enc]])

    scheme = le_scheme.inverse_transform(pred)[0]

    return jsonify({
        "parsed": {
            "age": age,
            "income": income,
            "occupation": occ,
            "state": state
        },
        "recommended_scheme": scheme
    })

if __name__ == "__main__":
    app.run(port=5000)
