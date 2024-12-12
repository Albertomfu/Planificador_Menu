// Variables globales
let draggedIngredient = null;

// Agregar ingrediente a la lista
document
  .getElementById("add-ingredient-btn")
  .addEventListener("click", function () {
    const ingredientInput = document.getElementById("ingredient-input");
    const ingredientValue = ingredientInput.value.trim();

    if (ingredientValue) {
      const ingredientList = document.getElementById("ingredient-list");
      const li = document.createElement("li");
      li.textContent = ingredientValue;
      li.draggable = true; // Hacer que los elementos sean arrastrables
      li.classList.add("ingredient-item"); // Clase para estilos
      ingredientList.appendChild(li);

      // Agregar eventos de arrastrar dinámicamente
      li.addEventListener("dragstart", handleDragStart);
      li.addEventListener("dragend", handleDragEnd);

      // Limpiar el campo de entrada después de agregar el ingrediente
      ingredientInput.value = "";
    } else {
      alert("Por favor, ingresa un ingrediente.");
    }
  });

function handleDragStart(event) {
  draggedIngredient = event.target; // Guardar el ingrediente arrastrado
  event.dataTransfer.setData("text/plain", draggedIngredient.textContent);
  setTimeout(() => (draggedIngredient.style.display = "none"), 0); // Hacer invisible temporalmente
}

function handleDragEnd(event) {
  setTimeout(() => (draggedIngredient.style.display = "block"), 0); // Restaurar visibilidad
  draggedIngredient = null;
}

// Agregar funcionalidad de arrastrar a los ingredientes iniciales
document.querySelectorAll("#ingredient-list li").forEach((item) => {
  item.draggable = true;
  item.addEventListener("dragstart", handleDragStart);
  item.addEventListener("dragend", handleDragEnd);
});

// Agregar funcionalidad de soltar a las zonas del calendario
document.querySelectorAll(".dropzone").forEach((dropzone) => {
  dropzone.addEventListener("dragover", function (event) {
    event.preventDefault(); // Permitir que se pueda soltar
    dropzone.classList.add("drag-over"); // Añadir efecto visual
  });

  dropzone.addEventListener("dragleave", function () {
    dropzone.classList.remove("drag-over"); // Quitar efecto visual
  });

  dropzone.addEventListener("drop", function (event) {
    event.preventDefault();
    dropzone.classList.remove("drag-over");

    const ingredientText = event.dataTransfer.getData("text/plain");
    if (ingredientText) {
      // Crear un clon del ingrediente arrastrado
      const droppedIngredient = document.createElement("div");
      droppedIngredient.textContent = ingredientText;
      droppedIngredient.classList.add("dropped-item"); // Clase para estilos
      dropzone.appendChild(droppedIngredient);
    }
  });
});

// Buscar recetas
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

// Agregar funcionalidad para eliminar ingredientes del calendario
document.querySelectorAll(".dropzone").forEach((dropzone) => {
  dropzone.addEventListener("click", function (event) {
    if (event.target.classList.contains("dropped-item")) {
      const confirmDelete = confirm(
        "¿Quieres eliminar este ingrediente del calendario?"
      );
      if (confirmDelete) {
        event.target.remove(); // Elimina el ingrediente seleccionado
      }
    }
  });
});
