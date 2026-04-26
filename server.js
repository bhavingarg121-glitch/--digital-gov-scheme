const axios = require("axios");

app.post("/api/find", async (req,res)=>{

  const text = req.body.text;

  try {

    const ml = await axios.post("http://localhost:5000/predict", { text });

    const schemeName = ml.data.recommended_scheme;

    const schemes = await Scheme.find({
      name: new RegExp(schemeName, "i")
    });

    res.json({
      ai: ml.data,
      schemes
    });

  } catch(err){
    res.send("Error connecting ML");
  }
});
