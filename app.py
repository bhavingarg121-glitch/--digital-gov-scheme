from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# ================= HOME =================

@app.route("/")
def home():
    return redirect(url_for("login"))

# ================= LOGIN =================

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        username = request.form.get("username")
        password = request.form.get("password")

        print("LOGIN:", username, password)

        return f"Welcome {username}"

    return render_template("login.html")

# ================= REGISTER =================

@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        username = request.form.get("username")
        password = request.form.get("password")

        print("REGISTER:", username, password)

        return redirect(url_for("login"))

    return render_template("register.html")

# ================= RUN =================

if __name__ == "__main__":
    app.run(debug=True)
