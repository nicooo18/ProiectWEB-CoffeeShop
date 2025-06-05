   const apiKey = '65de3a8c44ce4b55840dbf5d3c2f05a0';

    document.getElementById('searchBtn').addEventListener('click', () => {
      const ingredients = document.getElementById('ingredientsInput').value.trim();
      if (!ingredients) {
        alert('Please enter at least one ingredient.');
        return;
      }

      fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=5&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          const resultsDiv = document.getElementById('results');
          resultsDiv.innerHTML = '';

          if (!data || data.length === 0) {
            resultsDiv.textContent = 'No recipes found for these ingredients.';
            return;
          }

          data.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';

            const img = document.createElement('img');
            img.src = recipe.image;
            img.alt = recipe.title;

            const title = document.createElement('h3');
            title.textContent = recipe.title;

            recipeDiv.appendChild(img);
            recipeDiv.appendChild(title);
            resultsDiv.appendChild(recipeDiv);
          });
        })
        .catch(err => {
          alert('Error fetching recipes: ' + err.message);
        });
    });