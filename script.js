const translations = {
  en: {
    header: "Citizen Digital Help Portal",
    heroTitle: "Connecting Citizens to Government Services",
    heroText: "One portal for laws, schemes, pensions, scholarships, and more—accessible to everyone.",
    btnSchemes: "Explore Schemes",
    btnScholarships: "Check Scholarships",
    btnLaws: "Latest Laws",
    announcement: "📢 Latest Update: New Pension Scheme announced for senior citizens.",
    lawsTitle: "Latest Laws & Policies",
    schemesTitle: "Government Schemes",
    farmers: "Farmers",
    middleClass: "Middle Class",
    students: "Students",
    contactTitle: "Need Help?",
    contactText: "Visit India.gov.in for official government resources."
  },
  hi: {
    header: "नागरिक डिजिटल सहायता पोर्टल",
    heroTitle: "नागरिकों को सरकारी सेवाओं से जोड़ना",
    heroText: "कानून, योजनाएँ, पेंशन, छात्रवृत्ति और अधिक—सबके लिए सुलभ एक पोर्टल।",
    btnSchemes: "योजनाएँ देखें",
    btnScholarships: "छात्रवृत्ति देखें",
    btnLaws: "नवीनतम कानून",
    announcement: "📢 नवीनतम अपडेट: वरिष्ठ नागरिकों के लिए नई पेंशन योजना की घोषणा।",
    lawsTitle: "नवीनतम कानून और नीतियाँ",
    schemesTitle: "सरकारी योजनाएँ",
    farmers: "किसान",
    middleClass: "मध्यम वर्ग",
    students: "छात्र",
    contactTitle: "सहायता चाहिए?",
    contactText: "आधिकारिक सरकारी संसाधनों के लिए India.gov.in पर जाएँ।"
  }
};
function searchPortal() {
  const query = document.getElementById("searchInput").value.toLowerCase();

  if (query.includes("law")) {
    document.getElementById("laws").scrollIntoView({ behavior: "smooth" });
  } else if (query.includes("scheme") || query.includes("farmer") || query.includes("middle") || query.includes("student")) {
    document.getElementById("schemes").scrollIntoView({ behavior: "smooth" });
  } else if (query.includes("scholarship")) {
    document.getElementById("students").scrollIntoView({ behavior: "smooth" });
  } else if (query.includes("contact") || query.includes("help")) {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  } else {
    alert("No matching section found. Try 'laws', 'schemes', 'scholarship', or 'contact'.");
  }
}
function searchPortal() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = ""; // clear old results

  const matches = schemesIndex.filter(scheme =>
    scheme.keywords.some(keyword => query.includes(keyword))
  );

  if (matches.length > 0) {
    matches.forEach(scheme => {
      const item = document.createElement("div");
      item.className = "mb-3";
      item.innerHTML = `
        <h3 class="font-bold">${scheme.name}</h3>
        <p class="text-sm text-gray-600">Category: ${scheme.category}</p>
        <a href="${scheme.link}" target="_blank" class="text-blue-700 underline">Go to official site</a>
      `;
      resultsContainer.appendChild(item);
    });
    resultsContainer.classList.remove("hidden");
  } else {
    resultsContainer.innerHTML = "<p class='text-red-600'>No matching scheme found. Try keywords like 'pension', 'scholarship', or 'PM Kisan'.</p>";
    resultsContainer.classList.remove("hidden");
  }
}
document.getElementById("lang-toggle").addEventListener("click", () => {
  const currentLang = document.documentElement.lang;
  const newLang = currentLang === "en" ? "hi" : "en";
  document.documentElement.lang = newLang;

  const t = translations[newLang];
  document.querySelector("header h1").innerText = t.header;
  document.querySelector(".hero h2").innerText = t.heroTitle;
  // repeat for other elements
});
// script.js

document.addEventListener("DOMContentLoaded", () => {
  renderSchemes(); // This will inject all scheme cards into index.html
});

// Toggle details manually (optional if you want expand buttons later)
function toggleDetails(id) {
  const section = document.getElementById(id);
  section.classList.toggle('hidden');
}

// Search filter
document.getElementById('searchInput').addEventListener('keyup', function() {
  let filter = this.value.toLowerCase();
  let cards = document.querySelectorAll('.scheme-card');
  cards.forEach(card => {
    let text = card.innerText.toLowerCase();
    card.style.display = text.includes(filter) ? '' : 'none';
  });
});

// Eligibility Checker
document.getElementById('checkBtn').addEventListener('click', checkEligibility);

function checkEligibility() {
  const age = parseInt(document.getElementById('age').value);
  const income = parseInt(document.getElementById('income').value);
  const occupation = document.getElementById('occupation').value;

  const cards = document.querySelectorAll('.scheme-card');
  cards.forEach(card => {
    const minAge = parseInt(card.dataset.minage);
    const maxAge = parseInt(card.dataset.maxage);
    const maxIncome = parseInt(card.dataset.income);
    const schemeOccupation = card.dataset.occupation;

    // Hide all first
    card.style.display = 'none';
    card.querySelector('.details').classList.add('hidden');

    // Show only matching schemes
    if (
      (!isNaN(age) && age >= minAge && age <= maxAge) &&
      (!isNaN(income) && income <= maxIncome) &&
      (occupation === schemeOccupation)
    ) {
      card.style.display = '';
      card.querySelector('.details').classList.remove('hidden');
    }
  });
}
// script.js
async function loadCategory(category) {
  const response = await fetch('data/schemes.json');
  const schemes = await response.json();
  const container = document.getElementById('schemeContainer');

  container.innerHTML = `<h2 class="text-2xl font-bold text-blue-700 mb-4">
    Schemes for ${category.charAt(0).toUpperCase() + category.slice(1)}
  </h2>`;

  schemes.filter(s => s.occupation === category).forEach(scheme => {
    const card = document.createElement('div');
    card.className = 'bg-white shadow-md rounded-lg p-6 border border-gray-200';
    card.innerHTML = `
      <h3 class="text-xl font-bold text-blue-700">${scheme.name.en} 
        <span class="text-gray-600">(${scheme.name.hi})</span>
      </h3>
      <p class="text-gray-600">Category: ${scheme.category.en} / ${scheme.category.hi}</p>
      <p class="mt-2 text-gray-800">${scheme.description.en}<br>
        <span class="italic text-gray-700">${scheme.description.hi}</span>
      </p>
      <div class="mt-4 bg-gray-50 p-4 rounded-lg">
        <h4 class="font-bold">Eligibility / पात्रता</h4>
        <div class="grid grid-cols-2 gap-4">
          <ul class="list-disc list-inside">
            ${scheme.eligibility.en.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <ul class="list-disc list-inside">
            ${scheme.eligibility.hi.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>
      <a href="${scheme.link}" target="_blank" 
         class="inline-block mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Apply Now
      </a>
    `;
    container.appendChild(card);
  });
}
