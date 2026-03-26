// ---------------- Language Toggle ----------------
const translations = {
  en: { header: "Scheme Sathi", heroTitle: "Empowering Citizens with Government Schemes" },
  hi: { header: "योजना साथी", heroTitle: "सरकारी योजनाओं से नागरिकों को सशक्त बनाना" }
};
document.getElementById("lang-toggle").addEventListener("click", () => {
  const currentLang = document.documentElement.lang || "en";
  const newLang = currentLang === "en" ? "hi" : "en";
  document.documentElement.lang = newLang;
  document.querySelector("header h1").innerText = translations[newLang].header;
});

// ---------------- Dark Mode ----------------
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.getElementById('dark-mode-toggle').textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// ---------------- News & Schemes Sections ----------------
const schemesSection = document.getElementById('schemes-section');
const newsSection = document.getElementById('news-section');
const schemesContainer = document.getElementById('schemes-container');
const newsContainer = document.getElementById('news-container');

// Show news
document.getElementById('news-btn').addEventListener('click', e => {
  e.preventDefault();
  schemesSection.style.display = 'none';
  newsSection.style.display = 'block';
  loadGovNews();
});

// Fetch news from backend
async function loadGovNews() {
  newsContainer.innerHTML = '<li>Loading news…</li>';
  try {
    const res = await fetch('/api/news');
    const news = await res.json();
    newsContainer.innerHTML = '';
    news.forEach(article => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = article.link;
      a.target = "_blank";
      a.textContent = `[${article.source}] ${article.title}`;
      li.appendChild(a);
      newsContainer.appendChild(li);
    });
  } catch (err) {
    newsContainer.innerHTML = '<li>Failed to load news.</li>';
    console.error(err);
  }
}

// ---------------- Lazy Load Schemes ----------------
let allSchemes = [];
let loadedCount = 0;
const batchSize = 50;

// Fetch schemes from backend
async function fetchSchemes() {
  const res = await fetch('/api/schemes');
  allSchemes = await res.json();
  displaySchemes('All', true);
}

// Display schemes
function displaySchemes(category, reset=false) {
  if(reset) { schemesContainer.innerHTML=''; loadedCount=0; }
  const filtered = category==='All'?allSchemes:allSchemes.filter(s=>s.category===category);
  const toLoad = filtered.slice(loadedCount, loadedCount+batchSize);
  loadedCount += batchSize;
  toLoad.forEach(s => {
    const card = document.createElement('div');
    card.classList.add('card-item');
    card.innerHTML = `<div class="glass-card">
      <h3>${s.name}</h3>
      <p>${s.description}</p>
      <a href="${s.link}" target="_blank"><button>Learn More</button></a>
    </div>`;
    schemesContainer.appendChild(card);
  });
  if(loadedCount < filtered.length) window.addEventListener('scroll', handleScroll);
  else window.removeEventListener('scroll', handleScroll);
}

// Scroll lazy load
function handleScroll() {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    const activeCategory = document.querySelector('header nav ul li a.active')?.dataset.category || 'All';
    displaySchemes(activeCategory);
  }
}

// Category clicks
document.querySelectorAll('header nav ul li a[data-category]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('header nav ul li a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    schemesSection.style.display='block';
    newsSection.style.display='none';
    displaySchemes(link.dataset.category, true);
  });
});

// Initial load
fetchSchemes();
