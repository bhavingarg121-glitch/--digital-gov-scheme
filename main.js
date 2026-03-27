document.addEventListener("DOMContentLoaded", () => {

  const button = document.getElementById("loadSchemes");

  button.addEventListener("click", () => {
    fetch("http://127.0.0.1:5000/api/schemes")
      .then(res => res.json())
      .then(data => {
        displaySchemes(data);
      })
      .catch(err => console.log("Error:", err));
  });

});

function displaySchemes(data) {
  const container = document.getElementById("scheme-cards");
  container.innerHTML = "";

  data.forEach(scheme => {
    container.innerHTML += `
      <div class="scheme-card bg-white rounded-lg shadow p-6">
        <h3 class="text-xl font-bold mb-2">${scheme.name}</h3>
        <p class="text-gray-600 mb-2">${scheme.description || "No description"}</p>
        <a href="${scheme.link}" target="_blank" class="text-blue-500">View</a>
      </div>
    `;
  });
}
window.onload = function () {
  fetch("http://127.0.0.1:5000/api/schemes")
    .then(res => res.json())
    .then(data => displaySchemes(data));
};
