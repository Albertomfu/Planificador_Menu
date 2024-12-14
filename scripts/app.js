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

document.querySelectorAll(".dropzone").forEach((dropzone) => {
  let clickTimer = null; // Temporizador para diferenciar clic y doble clic

  dropzone.addEventListener("click", function (event) {
    if (event.target.classList.contains("dropped-item")) {
      // Establecer temporizador para detectar clic único
      clickTimer = setTimeout(() => {
        const confirmDelete = confirm(
          "¿Quieres eliminar este ingrediente del calendario?"
        );
        if (confirmDelete) {
          event.target.remove(); // Elimina el ingrediente
        }
      }, 250); // Tiempo para diferenciar clic de doble clic
    }
  });

  dropzone.addEventListener("dblclick", function (event) {
    if (event.target.classList.contains("dropped-item")) {
      clearTimeout(clickTimer); // Cancelar el temporizador del clic único
      const newText = prompt("Edita el ingrediente:", event.target.textContent);
      if (newText !== null && newText.trim() !== "") {
        event.target.textContent = newText; // Actualiza el texto del ingrediente
      }
    }
  });
});

// Seleccionar elementos del DOM
const recipeInput = document.getElementById("recipe-input");
const searchRecipeBtn = document.getElementById("search-recipe-btn");
const recipeResults = document.getElementById("recipe-results");

// API Key de Spoonacular
const API_KEY = "970d8ea12b4f46b4a870e2e1ac945a26";

// Buscar recetas en la API
async function fetchRecipes(query) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=20&addRecipeInformation=true&apiKey=${API_KEY}`
    );
    const data = await response.json();

    // Verificar la cantidad de resultados obtenidos
    if (data.results.length > 0) {
      console.log(`${data.results.length} recetas encontradas.`); // Ver cuántos resultados se obtienen
      displayRecipes(data.results); // Llamar a la función para mostrar las recetas
    } else {
      recipeResults.innerHTML = "<p>No se encontraron recetas.</p>";
    }
  } catch (error) {
    recipeResults.innerHTML = "<p>Error al cargar recetas.</p>";
    console.error(error);
  }
}

// Mostrar recetas en la interfaz
function displayRecipes(recipes) {
  recipeResults.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-item");

    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img" />
      <h3>${recipe.title}</h3>
      <button class="view-more-btn" data-id="${recipe.id}">Ver Más</button>
    `;

    recipeResults.appendChild(recipeCard);
  });

  // Agregar eventos a los botones "Ver Más"
  const viewMoreButtons = document.querySelectorAll(".view-more-btn");
  viewMoreButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      const recipeId = event.target.dataset.id;
      fetchRecipeDetails(recipeId);
    })
  );
}

// Obtener detalles de una receta
async function fetchRecipeDetails(id) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const recipe = await response.json();

    // Limpiar las instrucciones para mostrar solo el texto sin HTML
    const instructions = recipe.instructions
      ? recipe.instructions.replace(/<\/?[^>]+(>|$)/g, "")
      : "No disponibles";

    // Mostrar los detalles en un modal o en un área específica
    alert(
      `Detalles de ${
        recipe.title
      }:\n\nIngredientes:\n${recipe.extendedIngredients
        .map((ing) => `- ${ing.original}`)
        .join("\n")}\n\nInstrucciones:\n${instructions}`
    );
  } catch (error) {
    console.error("Error al cargar los detalles de la receta:", error);
  }
}

// Evento de búsqueda
searchRecipeBtn.addEventListener("click", () => {
  const query = recipeInput.value.trim();
  if (query) {
    fetchRecipes(query);
  } else {
    recipeResults.innerHTML =
      "<p>Por favor, introduce un término de búsqueda.</p>";
  }
});

async function translateText(text, targetLanguage = "es") {
  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "en", // Idioma original de la respuesta de la API
        target: targetLanguage, // Idioma destino (español)
      }),
    });
    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error("Error al traducir:", error);
    return text; // Devuelve el texto original si hay un error
  }
}
