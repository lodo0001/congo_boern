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
        <div class="product"
             data-name="${product.name}"
             data-price="${product.price}"
             data-image="${product.image_url}"
             data-description="${product.description || ""}">
          <img src="${product.image_url}" alt="${
      product.name
    }" class="product_img">
          <h3 class="product_name">${product.name}</h3>
          <p class="product_price">${product.price} kr</p>
          <button class="btn" type="button">LÆS MERE</button>
        </div>
      `;
  });

  //js til product view (altså når man klikker på et product)
  //små noter
  // henter her class'en productview fra html
  const modal = document.querySelector(".productview");

  document.querySelectorAll(".product").forEach((prod) => {
    //“Når brugeren klikker på dette produktkort, kør denne funktion.”
    prod.addEventListener("click", () => {
      //vores modal finder/fylder sig med vores data vi selv har lavet i superbase
      modal.querySelector(".product_img").src = prod.dataset.image;
      modal.querySelector(".product_name").textContent = prod.dataset.name;
      modal.querySelector(".product_price").textContent =
        prod.dataset.price + " kr";
      modal.querySelector(".product_description").textContent =
        prod.dataset.description;
      //Vis modal'en
      modal.showModal();
      modal.scrollTop = 0;
      //Uden modal.scrollTop = 0; så vil den åbne sig i bunden, derfor har vi brug for den så den starter fra toppen af
    });
  });

  // js til når man lukker produktet ned
  // "Når brugeren klikker på X, så luk ned"
  modal.querySelector(".close_btn").addEventListener("click", () => {
    modal.close();
  });

  // Luk ved klik på
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.close();
    }
  });
}
