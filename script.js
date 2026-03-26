// ------------------ Translations ------------------
const translations = {
  en: {
    header: "Scheme Sathi",
    heroTitle: "Empowering Citizens with Government Schemes"
    // add more keys...
  },
  hi: {
    header: "योजना साथी",
    heroTitle: "सरकारी योजनाओं से नागरिकों को सशक्त बनाना"
    // add more keys...
  }
};

// Language toggle
document.getElementById("lang-toggle").addEventListener("click", () => {
  const currentLang = document.documentElement.lang || "en";
  const newLang = currentLang === "en" ? "hi" : "en";
  document.documentElement.lang = newLang;

  const t = translations[newLang];
  document.querySelector("header h1").innerText = t.header;
  document.querySelector(".hero h2").innerText = t.heroTitle;
});

// ------------------ Schemes ------------------
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
      <a href="${scheme.link}" target="_blank" 
         class="inline-block mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Apply Now
      </a>
    `;
    container.appendChild(card);
  });
}



// ------------------ Eligibility Checker ------------------
document.getElementById('checkBtn').addEventListener('click', checkEligibility);

function checkEligibility() {
  const age = parseInt(document.getElementById('age').value);
  const income = parseInt(document.getElementById('income').value);
  const occupation = document.getElementById('occupation').value;

  loadCategory(occupation);

  const cards = document.querySelectorAll('#schemeContainer .bg-white');
  cards.forEach(card => {
    const minAge = parseInt(card.dataset?.minage || 0);
    const maxAge = parseInt(card.dataset?.maxage || 100);
    const maxIncome = parseInt(card.dataset?.income || Infinity);

    if ((!isNaN(age) && age >= minAge && age <= maxAge) &&
        (!isNaN(income) && income <= maxIncome)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// ------------------ News Section ------------------
const rssFeeds = [
  {name: "Central", url: "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=1"},
  {name: "Education", url: "https://pib.gov.in/RssMain.aspx?ModId=21&Lang=1&Regid=1"},
  {name: "Health", url: "https://pib.gov.in/RssMain.aspx?ModId=17&Lang=1&Regid=1"}
];

async function loadGovNews() {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '<li>Loading news…</li>';

  const allNews = [];

  for (const feed of rssFeeds) {
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feed.url)}`;
      const res = await fetch(proxyUrl);
      const xmlData = await res.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, "text/xml");
      const items = xmlDoc.querySelectorAll("item");
      items.forEach(item => {
        allNews.push({
          title: item.querySelector("title").textContent,
          link: item.querySelector("link").textContent,
          source: feed.name,
          pubDate: item.querySelector("pubDate") ? new Date(item.querySelector("pubDate").textContent) : new Date()
        });
      });
    } catch(err) { console.error(`Error loading feed ${feed.name}:`, err); }
  }

  allNews.sort((a,b)=>b.pubDate-a.pubDate);
  newsContainer.innerHTML = '';
  allNews.slice(0,10).forEach(article=>{
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = article.link;
    a.target = "_blank";
    a.textContent = `[${article.source}] ${article.title}`;
    li.appendChild(a);
    newsContainer.appendChild(li);
  });
}

loadGovNews();
// ---------------- Scheme Filter ----------------
const filterButtons = document.querySelectorAll('.scheme-filter');
const schemeCards = document.querySelectorAll('.scheme-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    schemeCards.forEach(card => {
      if(category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ---------------- Mobile Menu Toggle ----------------
const mobileBtn = document.getElementById('mobile-menu-btn');
mobileBtn.addEventListener('click', () => {
  const nav = document.querySelector('header nav');
  nav.classList.toggle('hidden');
});

// ---------------- Dark Mode Toggle ----------------
const darkModeBtn = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  darkModeBtn.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
});
