fetch("http://127.0.0.1:5000/schemes")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("schemes");
    container.innerHTML = "";
    data.forEach(scheme => {
      container.innerHTML += `
        <div class="card">
          <h3>${scheme.name}</h3>
          <p>${scheme.description}</p>
          <a href="${scheme.link}" target="_blank">Learn More</a>
        </div>
      `;
    });
  });
