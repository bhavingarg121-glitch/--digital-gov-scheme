// ------------------ Translations ------------------
const translations = {
  en: {
    header: "Scheme Sathi",
    heroTitle: "Empowering Citizens with Government Schemes"
  },
  hi: {
    header: "योजना साथी",
    heroTitle: "सरकारी योजनाओं से नागरिकों को सशक्त बनाना"
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

// ------------------ Lazy-loaded Schemes ------------------
const container = document.getElementById('schemes-container');
let allSchemes = [];
let loadedCount = 0;
const batchSize = 50; // Number of schemes per scroll

// Load schemes JSON
async function fetchSchemes() {
  try {
    const res = await fetch('schemes.json');
    allSchemes = await res.json();
    displaySchemes('All', true);
  } catch (err) {
    container.innerHTML = '<p>Failed to load schemes.</p>';
    console.error(err);
  }
}

// Display schemes by category
function displaySchemes(category, reset = false) {
  if (reset) {
    container.innerHTML = '';
    loadedCount = 0;
  }

  const filtered = category === 'All' ? allSchemes : allSchemes.filter(s => s.category === category);

  const toLoad = filtered.slice(loadedCount, loadedCount + batchSize);
  loadedCount += batchSize;

  toLoad.forEach(scheme => {
    const card = document.createElement('div');
    card.classList.add('card-item');
    card.innerHTML = `
      <div class="glass-card">
        <h3>${scheme.name}</h3>
        <p>${scheme.description}</p>
        <a href="${scheme.link}" target="_blank"><button class="btn">Learn More</button></a>
      </div>
    `;
    container.appendChild(card);
  });

  if (loadedCount >= filtered.length) {
    window.removeEventListener('scroll', handleScroll);
  } else {
    window.addEventListener('scroll', handleScroll);
  }
}

// Lazy load on scroll
function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    const activeCategory = document.querySelector('.sidebar ul li a.active')?.dataset.category || 'All';
    displaySchemes(activeCategory);
  }
}

// Category filter click
document.querySelectorAll('.sidebar ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.sidebar ul li a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    displaySchemes(link.dataset.category, true);
  });
});

// Initial load
fetchSchemes();

// ------------------ News Section ------------------
async function loadGovNews() {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '<li>Loading news…</li>';

  try {
    const res = await fetch('/api/news'); // Backend API
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
  } catch(err) {
    newsContainer.innerHTML = '<li>Failed to load news.</li>';
    console.error(err);
  }
}

loadGovNews();

// ------------------ Dark Mode Toggle ------------------
const darkModeBtn = document.getElementById('dark-mode-toggle');
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkModeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// ------------------ Mobile Menu Toggle ------------------
const mobileBtn = document.getElementById('mobile-menu-btn');
mobileBtn.addEventListener('click', () => {
  document.querySelector('header nav').classList.toggle('hidden');
});
