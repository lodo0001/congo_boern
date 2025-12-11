const endpoint = "https://iqqldzhjadbboziuaesb.supabase.co/rest/v1/bestyrelse";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxcWxkemhqYWRiYm96aXVhZXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MDIyMDksImV4cCI6MjA4MDk3ODIwOX0.NnyxHFypraZMRJqV0eF7GRZM9zchrTUMHvcmAaRrpF0";

const options = {
  method: "GET",
  headers: {
    apikey: key,
    "Content-Type": "application/json",
  },
};

function showCards1(cards) {
  const managementContainer = document.querySelector(".management-cb-section");
  
  if (!managementContainer) {
    console.error("Management container not found!");
    return;
  }

  // Ginas card er hardcoded, fordi hun har en cta 
  let htmlString = `<article class="management-card">
    <img src="img/bestyrelsen/gina.webp" alt="" class="management-pic" />
    <p class="name">Gina Nzeba Tshiswaka Hagebro</p>
    <p class="title">
      Forkvinde og grundlægger af Congos Børn, Vigalex og Maison Vigalex
    </p>
    <p class="education">Profession: Børne- og familiekonsulent</p>
    <div class="btn-container">
      <a href="" class="gina-btn">Læs ginas historie</a>
    </div>
  </article>`;
  
  if (cards && cards.length > 0) {
    cards.forEach((element) => {
      htmlString += `<article class="management-card">
        <img src="https://iqqldzhjadbboziuaesb.supabase.co/storage/v1/object/public/bestyrelsen-img/${element.id}.webp" alt="${element.name}" class="management-pic" />
        <p class="name">${element.name}</p>
        <p class="title">${element.title}</p>
        <p class="education">${element.education}</p>
      </article>`;
    });
  }
  
  managementContainer.innerHTML = htmlString;
}

window.addEventListener('DOMContentLoaded', async function() {
  try {
    console.log("Fetching data from:", endpoint);
    const response = await fetch(endpoint, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Data received:", data);
    showCards1(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    showCards1([]);
  }
});