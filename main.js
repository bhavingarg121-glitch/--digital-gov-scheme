document.addEventListener("DOMContentLoaded", () => {

  const button = document.getElementById("loadSchemes");
  let allSchemes = [];
  let currentPage = 1;
  const perPage = 20;

  // Load schemes only on button click
  button.addEventListener("click", () => {
    fetch("http://127.0.0.1:5000/api/schemes")
      .then(res => res.json())
      .then(data => {
        allSchemes = data;
        currentPage = 1;
        displayPage();
      })
      .catch(err => console.error("Error:", err));
  });

  // Pagination buttons
  document.getElementById("nextPageBtn").addEventListener("click", () => {
    if (currentPage * perPage < allSchemes.length) {
      currentPage++;
      displayPage();
    }
  });

  document.getElementById("prevPageBtn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage();
    }
  });

  function displayPage() {
    const container = document.getElementById("scheme-cards");
    container.innerHTML = "";

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const pageData = allSchemes.slice(start, end);

    if (pageData.length === 0) {
      container.innerHTML = "<p class='text-red-500'>No schemes found</p>";
      return;
    }

    pageData.forEach(scheme => {
      container.innerHTML += `
        <div class="scheme-card bg-white rounded-lg shadow p-6 mb-4 hover-bounce hover-glow transition">
          <h3 class="text-xl font-bold mb-2">${scheme.name}</h3>
          <p class="text-gray-600 mb-2">${scheme.description || "No description available"}</p>
          <a href="${scheme.link}" target="_blank" class="text-blue-500 font-semibold">View</a>
        </div>
      `;
    });

    document.getElementById("pageNumber").innerText = currentPage;
  }

});
