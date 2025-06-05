fetch('menu.json')
  .then(response => response.json())
  .then(data => {
    const section = document.querySelector('.menu-section');
    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'menu-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p class="price">${item.price}</p>
          <img 
            src="pinkheart.jpg" 
            alt="Add to favorites" 
            class="product-favorite-icon" 
            title="Add to favorites" 
            data-name="${item.name}"
            style="width: 25px; height: 25px; cursor: pointer; margin-top: 10px;"
          >
        </div>
      `;
      section.appendChild(div);
    });

    // Attach click listeners to all heart icons after items are added
    document.querySelectorAll('.product-favorite-icon').forEach(icon => {
      icon.addEventListener('click', () => {
        const productName = icon.getAttribute('data-name');
        addToFavorites(productName);
        icon.style.filter = 'brightness(0.8)';  // visually indicate added favorite
      });
    });
  });

function addToFavorites(productName) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.includes(productName)) {
    favorites.push(productName);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(`${productName} added to favorites!`);
  } else {
    alert(`${productName} is already in favorites!`);
  }
}

