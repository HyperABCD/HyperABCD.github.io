document.addEventListener("DOMContentLoaded", function() {

  const url = 'https://api.hypixel.net/v2/skyblock/bazaar';

  fetch(url)
      .then(response => {
          if (!response.ok) {
              thrownewError(`Failed to fetch data: ${response.statusText}`);
          }
          return response.json();
      })
      .then(data => {
          const finalData = {};

          for (const x in data.products) {
              const productData = data.products[x];
              
              const sellSummary = productData.sell_summary;
              const sellText = sellSummary.length > 0 ? `${sellSummary[0].pricePerUnit}` : "No sell order found";

              const buySummary = productData.buy_summary;
              const buyText = buySummary.length > 0 ? `${buySummary[0].pricePerUnit}` : "No buy order found";

              finalData[x] = { buyText, sellText };
          }

          const outputDiv = document.getElementById('output');
          const fragment = document.createDocumentFragment();

          for (const item in finalData) {
              const card = document.createElement('div');
              card.classList.add('card');
              const itemName = item.replace(/_/g, ' ').replace('ENCHANTMENT', '');
              card.innerHTML = `
                  <img class="itemimg" src="50.png" alt="Item image" width="500" height="600">
                  <h5 class="card-title">${itemName}</h5>
                  <p class="card-text"><b>Sell price per unit:</b> ${finalData[item].sellText}</p>
                  <p class="card-text"><b>Buy price per unit:</b> ${finalData[item].buyText}</p>
              `;
              fragment.appendChild(card);
          }

          outputDiv.appendChild(fragment);
      })
      .catch(error => {
          console.error(error);
          document.getElementById('output').innerHTML = '<p>Failed to load data. Please try again later.</p>';
      });
});

const searchbutton = document.getElementById('searchbutton');
const searchinput = document.getElementById('searchinput');

function myFunction() {
    searchinput.focus();
}

function performSearch() {
  const searchText = document.getElementById('searchinput').value.toLowerCase();
  console.log("Texte de recherche : " + searchText); // Affiche le texte de recherche

  const items = document.querySelectorAll('.card');
  console.log("Nombre d'éléments à vérifier : " + items.length); // Affiche le nombre d'éléments

  items.forEach(item => {
      const itemText = item.textContent.toLowerCase();
      if (itemText.includes(searchText)) {
          item.classList.remove('hidden'); // Affiche l'élément
          console.log("Élément affiché : " + itemText);
      } else {
          item.classList.add('hidden'); // Masque l'élément
      }
  });
  console.log("Recherche effectuée");
}

// Recherche lorsqu'on appuie sur Enter dans le champ de saisie
document.getElementById('searchinput').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
      event.preventDefault(); // Empêche le comportement par défaut
      performSearch();
  }
});


  
