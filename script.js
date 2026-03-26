// ------------------ Translations ------------------
const translations = {
  en: { header:"Scheme Sathi", heroTitle:"Empowering Citizens with Government Schemes" },
  hi: { header:"योजना साथी", heroTitle:"सरकारी योजनाओं से नागरिकों को सशक्त बनाना" }
};
document.getElementById("lang-toggle")?.addEventListener("click", () => {
  const currentLang = document.documentElement.lang || "en";
  const newLang = currentLang==="en"?"hi":"en";
  document.documentElement.lang=newLang;
  const t=translations[newLang];
  document.querySelector("header h1").innerText=t.header;
  document.querySelector(".hero h2").innerText=t.heroTitle;
});

// ------------------ Lazy Loading Schemes ------------------
const container=document.getElementById('schemes-container'); 
let allSchemes=[], loadedCount=0, batchSize=50;

async function fetchSchemes(){
  try{
    const res=await fetch('data/schemes.json'); 
    allSchemes=await res.json();
    displaySchemes('All',true);
  }catch(err){ container.innerHTML='<p>Failed to load schemes.</p>'; console.error(err);}
}

function displaySchemes(category,reset=false){
  if(reset){ container.innerHTML=''; loadedCount=0;}
  const filtered=category==='All'?allSchemes:allSchemes.filter(s=>s.category===category);
  const toLoad=filtered.slice(loadedCount,loadedCount+batchSize); 
  loadedCount+=batchSize;
  toLoad.forEach(scheme=>{
    const card=document.createElement('div'); 
    card.classList.add('card-item'); 
    card.dataset.category=scheme.category;
    card.innerHTML=`<div class="glass-card scheme-card">
      <h3>${scheme.name}</h3>
      <p>${scheme.description}</p>
      <a href="${scheme.link}" target="_blank"><button class="btn">Learn More</button></a>
    </div>`;
    container.appendChild(card);
  });
  if(loadedCount>=filtered.length){ window.removeEventListener('scroll',handleScroll);}
  else{ window.addEventListener('scroll',handleScroll);}
}

function handleScroll(){ 
  if(window.innerHeight+window.scrollY>=document.body.offsetHeight-100){
    const activeCategory=document.querySelector('.sidebar ul li a.active')?.dataset.category||'All';
    displaySchemes(activeCategory);
  }
}

document.querySelectorAll('.sidebar ul li a').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault(); 
    document.querySelectorAll('.sidebar ul li a').forEach(l=>l.classList.remove('active'));
    link.classList.add('active'); 
    displaySchemes(link.dataset.category,true);
  });
});

// ------------------ News Section ------------------
const rssFeeds=[
  {name:"Central",url:"https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=1"},
  {name:"Education",url:"https://pib.gov.in/RssMain.aspx?ModId=21&Lang=1&Regid=1"},
  {name:"Health",url:"https://pib.gov.in/RssMain.aspx?ModId=17&Lang=1&Regid=1"}
];
async function loadGovNews(){
  const newsContainer=document.getElementById('news-container'); 
  if(!newsContainer) return;
  newsContainer.innerHTML='<li>Loading news…</li>'; 
  const allNews=[];
  for(const feed of rssFeeds){
    try{
      const proxyUrl=`https://api.allorigins.win/raw?url=${encodeURIComponent(feed.url)}`;
      const res=await fetch(proxyUrl); 
      const xmlData=await res.text();
      const parser=new DOMParser(); 
      const xmlDoc=parser.parseFromString(xmlData,"text/xml");
      xmlDoc.querySelectorAll("item").forEach(item=>allNews.push({
        title:item.querySelector("title").textContent,
        link:item.querySelector("link").textContent,
        source:feed.name,
        pubDate:item.querySelector("pubDate")?new Date(item.querySelector("pubDate").textContent):new Date()
      }));
    }catch(err){ console.error(`Error loading feed ${feed.name}:`, err);}
  }
  allNews.sort((a,b)=>b.pubDate-a.pubDate); 
  newsContainer.innerHTML='';
  allNews.slice(0,10).forEach(article=>{
    const li=document.createElement('li'); 
    const a=document.createElement('a'); 
    a.href=article.link; a.target="_blank";
    a.textContent=`[${article.source}] ${article.title}`; 
    li.appendChild(a); 
    newsContainer.appendChild(li);
  });
}

// ------------------ Dark Mode Toggle ------------------
document.getElementById('dark-mode-toggle')?.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  document.getElementById('dark-mode-toggle').textContent=document.body.classList.contains('dark')?'☀️':'🌙';
});

// ------------------ Initial Load ------------------
fetchSchemes(); 
loadGovNews();
async function loadGovNews() {
  const newsContainer = document.getElementById('news-container');
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
  } catch(err) {
    newsContainer.innerHTML = '<li>Failed to load news.</li>';
    console.error(err);
  }
}

loadGovNews();
