const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const section = document.querySelector('.favorites-section');

if (favorites.length === 0) {
  section.innerHTML = '<p>You have no favorite products yet.</p>';
} else {
  fetch('menu.json')
    .then(response => response.json())
    .then(data => {
      favorites.forEach(favName => {
        const product = data.find(item => item.name === favName);
        if (product) {
          const div = document.createElement('div');
          div.className = 'favorite-item';
          div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>
            <button class="remove-favorite" data-name="${product.name}">Remove</button>
          `;
          section.appendChild(div);
        }
      });

      // Dupa ce ai pus toate favoritele in DOM, ataseaza event listener la butoane
      document.querySelectorAll('.remove-favorite').forEach(button => {
        button.addEventListener('click', () => {
          const nameToRemove = button.getAttribute('data-name');
          removeFavorite(nameToRemove);
        });
      });
    })
    .catch(() => {
      section.innerHTML = '<p>Failed to load favorite products.</p>';
    });
}

function removeFavorite(name) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(item => item !== name);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  alert(`${name} removed from favorites.`);
  location.reload();
}
