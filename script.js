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

  // Find matching scheme
  const result = schemesIndex.find(scheme =>
    scheme.keywords.some(keyword => query.includes(keyword))
  );

  if (result) {
    // Show result in alert or redirect
    alert(`Found: ${result.name}\nCategory: ${result.category}\nOpening link...`);
    window.open(result.link, "_blank");
  } else {
    alert("No matching scheme found. Try keywords like 'pension', 'scholarship', or 'PM Kisan'.");
  }
}
