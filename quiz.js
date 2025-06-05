function submitQuiz() {
  const answers = {
    q1: document.querySelector('input[name="q1"]:checked')?.value,
    q2: document.querySelector('input[name="q2"]:checked')?.value,
    q3: document.querySelector('input[name="q3"]:checked')?.value,
  };

  if (!answers.q1 || !answers.q2 || !answers.q3) {
    alert("Please answer all questions!");
    return;
  }

  fetch('menu.json')
    .then(res => res.json())
    .then(menu => {
      let recommendation;

      if (answers.q1 === "strong" && answers.q2 === "classic") {
        recommendation = menu.find(item => item.name === "Espresso");
      } else if (answers.q1 === "creamy" && answers.q2 === "sweet") {
        recommendation = menu.find(item => item.name === "Latte");
      } else if (answers.q1 === "cold") {
        recommendation = menu.find(item => item.name === "Ice Coffee");
      } else if (answers.q2 === "matcha") {
        recommendation = menu.find(item => item.name === "Pink Matcha");
      } else {
        recommendation = menu.find(item => item.name === "Capuccino");
      }

      showResult(recommendation);
    });
}

function showResult(coffee) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h2>Your Perfect Match: ${coffee.name}</h2>
    <img src="${coffee.image}" alt="${coffee.name}" />
    <p>${coffee.description}</p>
    <p><strong>${coffee.price}</strong></p>
  `;
}
