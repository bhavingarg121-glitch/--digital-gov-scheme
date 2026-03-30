let allSchemes = [];

fetch("http://127.0.0.1:5000/api/schemes")
  .then(res => res.json())
  .then(data => {
    allSchemes = data;

    displaySchemes(data);
    showRecommendations();
  });

/* ---------------- DISPLAY ---------------- */
function displaySchemes(data) {
  const container = document.getElementById("scheme-cards");
  container.innerHTML = "";

  data.forEach(s => {
    container.innerHTML += `
      <div class="scheme-card">
        <h3 class="font-bold">${s.name}</h3>
        <p>${s.description}</p>
        <span class="text-sm">${s.category}</span>
      </div>
    `;
  });
}
function displaySchemes(data) {
  const container = document.getElementById("scheme-cards");
  container.innerHTML = "";

  const token = localStorage.getItem("token");

  data.forEach(s => {
    container.innerHTML += `
      <div class="scheme-card bg-white p-4 rounded shadow">
        <h3>${s.name}</h3>
        <p>${s.description}</p>

        ${
          token
          ? `<button onclick="bookmarkScheme('${s.name}')"
               class="text-blue-500 mt-2">Save ⭐</button>`
          : `<p class="text-sm text-gray-400 mt-2">Login to save</p>`
        }
      </div>
    `;
  });
}
/* ---------------- RECOMMENDATION LOGIC ---------------- */
function showRecommendations() {

  const user = {
    age: 20,
    category: "Education"
  };

  const recommended = allSchemes.filter(s =>
    s.category === user.category
  );

  const container = document.getElementById("recommended");
  container.innerHTML = "";

  recommended.slice(0, 6).forEach(s => {
    container.innerHTML += `
      <div class="scheme-card">
        <h3>${s.name}</h3>
        <p>${s.description}</p>
      </div>
    `;
  });
}
