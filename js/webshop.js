//Vi linker til vores produkter i superbase
const endpoint =
  "https://rrqhptyjazoybvabgugx.supabase.co/rest/v1/webshop_cb?select=*";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJycWhwdHlqYXpveWJ2YWJndWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MTY2NDksImV4cCI6MjA4MTE5MjY0OX0.0yHlPaxi1IZ-ktnRRLg25GsUuf0h8JetsNBwUVC_hAE";

const options = {
  method: "GET",
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  },
};

//  lidt noter til det øverste
// headers = Ting vi sender med til browseren, for at sige her er lidt ekstra information

const productlistContainer = document.querySelector(".productlist");

// Henter produkter fra Supabase
fetch(endpoint, options)
  .then((response) => response.json())
  .then((data) => showProducts(data))
  .catch((error) => console.error("Fejl:", error));

function showProducts(products) {
  productlistContainer.innerHTML = "";

  products.forEach((product) => {
    productlistContainer.innerHTML += `
      <a href="productview.html?id=${product.id}" class="product_link">
        <div class="product">
          <img src="${product.image_url}" alt="${product.name}" class="product_img">
          <h3 class="product_name">${product.name}</h3>
          <p class="product_price">${product.price} kr</p>
           <button class="btn" type="button">LÆS MERE</button>
        </div>
      </a>
    `;
  });
}
