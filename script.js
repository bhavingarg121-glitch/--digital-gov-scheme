document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("lang-toggle");
  let currentLang = "en";

  langBtn.addEventListener("click", () => {
    if (currentLang === "en") {
      alert("स्वागत है! अब पोर्टल हिंदी में है।");
      currentLang = "hi";
    } else {
      alert("Welcome! Portal is now in English.");
      currentLang = "en";
    }
  });
});
