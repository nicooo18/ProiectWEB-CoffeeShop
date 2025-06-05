document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('usernameInput');
  const starRatingInput = document.getElementById('starRatingInput');
  const commentInput = document.getElementById('commentInput');
  const addReviewBtn = document.getElementById('addReviewBtn');
  const reviewsContainer = document.querySelector('.reviews-container');

  // Recenzii initiale
  const initialReviews = [
    { username: 'Emily', stars: 5, comment: 'Absolutely loved the coffee and cozy vibe!' },
    { username: 'John', stars: 4, comment: 'Great service, good coffee. A bit crowded though.' },
    { username: 'Sophia', stars: 3, comment: 'Coffee was decent, but it took a while to get served.' }
  ];

  // Creeaza un review DOM
  function createReviewElement(username, stars, comment) {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');

    const usernameEl = document.createElement('div');
    usernameEl.classList.add('username');
    usernameEl.textContent = username;

    const starsEl = document.createElement('div');
    starsEl.classList.add('stars');
    starsEl.textContent = '★'.repeat(stars) + '☆'.repeat(5 - stars);

    const commentEl = document.createElement('div');
    commentEl.classList.add('comment');
    commentEl.textContent = comment;

    reviewDiv.appendChild(usernameEl);
    reviewDiv.appendChild(starsEl);
    reviewDiv.appendChild(commentEl);

    return reviewDiv;
  }

  // Afiseaza toate review-urile + creeaza scroll infinit
  function displayReviews(reviews) {
    reviewsContainer.innerHTML = ''; // curata tot

    reviews.forEach(({ username, stars, comment }) => {
      const element = createReviewElement(username, stars, comment);
      reviewsContainer.appendChild(element);
    });

    // Adauga clone pentru scroll infinit
    const clones = Array.from(reviewsContainer.children).map(child => child.cloneNode(true));
    clones.forEach(clone => reviewsContainer.appendChild(clone));
  }

  // Lista recenziilor curente (in memorie)
  const allReviews = [...initialReviews];

  // Initial: afiseaza recenziile
  displayReviews(allReviews);

  // cand adaugi un review nou
  addReviewBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const stars = parseInt(starRatingInput.value);
    const comment = commentInput.value.trim();

    if (!username || !comment) {
      alert('Please enter your name and comment.');
      return;
    }

    // Adauga in lista si reafiseaza totul
    allReviews.unshift({ username, stars, comment });
    displayReviews(allReviews);

    // Goleste formularul
    usernameInput.value = '';
    starRatingInput.value = '5';
    commentInput.value = '';
  });
});
