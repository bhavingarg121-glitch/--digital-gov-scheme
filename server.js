const axios = require("axios");

app.post("/api/find", async (req,res)=>{

  const user = req.body;

  try {

    // 🔥 CALL PYTHON ML
    const mlRes = await axios.post("http://localhost:5000/predict", user);

    const recommended = mlRes.data.recommended_scheme;

    // 🔎 FIND FULL SCHEME DETAILS FROM DB
    const schemes = await Scheme.find({
      name: new RegExp(recommended, "i")
    });

    res.json(schemes);

  } catch(err){
    console.log(err);
    res.send("ML server error");
  }

});
