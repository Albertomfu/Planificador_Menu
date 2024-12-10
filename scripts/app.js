document
  .getElementById("add-ingredient-btn")
  .addEventListener("click", function () {
    const ingredientInput = document.getElementById("ingredient-input");
    const ingredientValue = ingredientInput.value.trim();

    if (ingredientValue) {
      const ingredientList = document.getElementById("ingredient-list");
      const li = document.createElement("li");
      li.textContent = ingredientValue;
      ingredientList.appendChild(li);

      // Limpiar el campo de entrada después de agregar el ingrediente
      ingredientInput.value = "";
    } else {
      alert("Por favor, ingresa un ingrediente.");
    }
  });

const days = document.querySelectorAll(".day .dropzone");

document
  .getElementById("ingredient-list")
  .addEventListener("dragstart", function (event) {
    const draggedIngredient = event.target;
    draggedIngredient.setAttribute("draggable", "true");
    event.dataTransfer.setData("text", draggedIngredient.textContent);
  });

days.forEach((day) => {
  day.addEventListener("dragover", function (event) {
    event.preventDefault(); // Necesario para permitir el drop
  });

  day.addEventListener("drop", function (event) {
    event.preventDefault();
    const draggedIngredient = event.dataTransfer.getData("text");
    const newItem = document.createElement("div");
    newItem.textContent = draggedIngredient;
    newItem.classList.add("dropped-item");
    event.target.appendChild(newItem);
  });
});

document
  .getElementById("search-recipe-btn")
  .addEventListener("click", function () {
    const query = document.getElementById("recipe-input").value.trim();
    if (query) {
      // Simulamos la búsqueda de recetas con un array de ejemplo
      const recipes = [
        {
          name: "Tortilla de Patatas",
          description: "Una receta española con papas y huevos.",
        },
        {
          name: "Ensalada de Atún",
          description: "Una ensalada fresca con atún y verduras.",
        },
        // Añadir más recetas aquí...
      ];

      const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
      );

      const resultsDiv = document.getElementById("recipe-results");
      resultsDiv.innerHTML = ""; // Limpiar resultados anteriores

      filteredRecipes.forEach((recipe) => {
        const recipeItem = document.createElement("div");
        recipeItem.classList.add("recipe-item");
        recipeItem.innerHTML = `
          <h3>${recipe.name}</h3>
          <p>${recipe.description}</p>
          <button>Agregar al Menú</button>
        `;
        resultsDiv.appendChild(recipeItem);
      });
    } else {
      alert("Por favor, ingresa un nombre de receta para buscar.");
    }
  });
