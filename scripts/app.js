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

// Variables globales
let draggedIngredient = null;

// Agregar la funcionalidad de arrastrar
document.querySelectorAll("#ingredient-list li").forEach((item) => {
  item.draggable = true; // Hacer que los elementos sean arrastrables

  item.addEventListener("dragstart", function (event) {
    draggedIngredient = event.target; // Guardar el ingrediente arrastrado
    setTimeout(function () {
      event.target.style.display = "none"; // Hacer invisible el ingrediente mientras se arrastra
    }, 0);
  });

  item.addEventListener("dragend", function (event) {
    setTimeout(function () {
      draggedIngredient.style.display = "block"; // Restaurar el ingrediente a su posición original
      draggedIngredient = null;
    }, 0);
  });
});

// Agregar la funcionalidad de soltar en las zonas del calendario (dropzones)
document.querySelectorAll(".dropzone").forEach((dropzone) => {
  dropzone.addEventListener("dragover", function (event) {
    event.preventDefault(); // Permitir que se pueda soltar
    dropzone.classList.add("drag-over"); // Cambiar el fondo de la zona al arrastrar un ingrediente sobre ella
  });

  dropzone.addEventListener("dragleave", function () {
    dropzone.classList.remove("drag-over"); // Volver al fondo original cuando se deja de arrastrar
  });

  dropzone.addEventListener("drop", function (event) {
    event.preventDefault();
    dropzone.classList.remove("drag-over"); // Remover el fondo de la zona cuando se ha soltado el ingrediente

    // Crear una nueva copia del ingrediente arrastrado y añadirle la clase 'dropped-item'
    const droppedIngredient = draggedIngredient.cloneNode(true);
    droppedIngredient.classList.add("dropped-item"); // Aplicar el estilo de 'dropped-item'

    // Agregar el ingrediente al calendario
    dropzone.appendChild(droppedIngredient);
  });
});
