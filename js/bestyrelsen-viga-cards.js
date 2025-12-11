const endpoint2 = "https://iqqldzhjadbboziuaesb.supabase.co/rest/v1/bestyrelse_viga";
const key2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxcWxkemhqYWRiYm96aXVhZXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MDIyMDksImV4cCI6MjA4MDk3ODIwOX0.NnyxHFypraZMRJqV0eF7GRZM9zchrTUMHvcmAaRrpF0";

const options2 = {
  method: "GET",
  headers: {
    apikey: key2, 
    "Content-Type": "application/json",
  },
};

function showCards2(cards) { 
  const managementContainer = document.querySelector(".management-viga-section");
  
  if (!managementContainer) {
    console.error("Management container not found!");
    return;
  }

  let htmlString = ``;
  
  if (cards && cards.length > 0) {
    cards.forEach((element) => {
      htmlString += `<article class="management-card">
        <img src="https://iqqldzhjadbboziuaesb.supabase.co/storage/v1/object/public/bestyrelsen-viga-img/${element.id}.webp" alt="${element.name}" class="management-pic" />
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
    console.log("Fetching data from:", endpoint2);
    const response = await fetch(endpoint2, options2);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Data received:", data);
    showCards2(data); 
  } catch (error) {
    console.error("Error fetching data:", error);
    showCards2([]); 
  }
});