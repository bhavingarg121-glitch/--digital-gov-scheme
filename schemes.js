// schemes.js

const schemesData = [
  {
    category: "Farmers",
    items: [
      { name: "PM Kisan Yojana", link: "https://pmkisan.gov.in/" },
      { name: "Soil Health Card Scheme", link: "https://soilhealth.dac.gov.in/" },
      { name: "Pradhan Mantri Fasal Bima Yojana", link: "https://pmfby.gov.in/" }
    ]
  },
  {
    category: "Students",
    items: [
      { name: "National Scholarship Portal", link: "https://scholarships.gov.in/" },
      { name: "INSPIRE Fellowship", link: "https://online-inspire.gov.in/" },
      { name: "National Means-cum-Merit Scholarship", link: "https://scholarships.gov.in/" }
    ]
  },
  {
    category: "Senior Citizens",
    items: [
      { name: "Indira Gandhi National Old Age Pension Scheme", link: "https://nsap.nic.in/" },
      { name: "Varishtha Pension Bima Yojana", link: "https://licindia.in/" },
      { name: "Atal Pension Yojana", link: "https://npscra.nsdl.co.in/" }
    ]
  },
  {
    category: "Women",
    items: [
      { name: "Sukanya Samriddhi Yojana", link: "https://www.nsiindia.gov.in/" },
      { name: "Mahila E-Haat", link: "https://mahilaehaat-rmk.gov.in/" },
      { name: "Pradhan Mantri Matru Vandana Yojana", link: "https://pmmvy.nic.in/" }
    ]
  },
  {
    category: "Workers",
    items: [
      { name: "Pradhan Mantri Shram Yogi Maandhan", link: "https://maandhan.in/" },
      { name: "Employees’ Provident Fund (EPF)", link: "https://www.epfindia.gov.in/" },
      { name: "ESIC Health Scheme", link: "https://www.esic.nic.in/" }
    ]
  }
];

// Function to render schemes dynamically
function renderSchemes() {
  const container = document.getElementById("schemesContainer");
  container.innerHTML = "";

  schemesData.forEach(section => {
    const categoryBlock = document.createElement("div");
    categoryBlock.className = "mb-6";

    const title = document.createElement("h3");
    title.className = "text-xl font-bold mb-3 text-maroon";
    title.textContent = section.category;
    categoryBlock.appendChild(title);

    section.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "card mb-3";

      const link = document.createElement("a");
      link.href = item.link;
      link.target = "_blank";
      link.textContent = item.name;

      card.appendChild(link);
      categoryBlock.appendChild(card);
    });

    container.appendChild(categoryBlock);
  });
}
