
const btn = document.getElementById("loadSchemes");
const container = document.getElementById("scheme-cards");

btn.addEventListener("click", () => {

  // Loader
  container.innerHTML = `
    <div class="loader">
      <div class="spinner"></div>
    </div>
  `;

  fetch("http://127.0.0.1:5000/api/schemes")
    .then(res => res.json())
    .then(data => {

      container.innerHTML = "";

      data.forEach(s => {
        container.innerHTML += `
          <div class="scheme-card" data-category="${s.category}">
            <h3>${s.name}</h3>
            <p>${s.description}</p>
            <span>${s.category}</span><br>
            <a href="${s.link}" target="_blank">View →</a>
          </div>
        `;
      });

    })
    .catch(() => {
      container.innerHTML = "<p>Error loading data</p>";
    });
});
