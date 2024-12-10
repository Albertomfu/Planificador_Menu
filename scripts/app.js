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
