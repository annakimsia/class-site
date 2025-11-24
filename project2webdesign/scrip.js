const basket = document.getElementById("basket");
const section = document.getElementById("ingredient-section");

let draggedItem = null;

document.querySelectorAll(".ingredient").forEach(item => {
  item.addEventListener("dragstart", () => {
    draggedItem = item;
    draggedItem.style.opacity = "0.5";
  });

  item.addEventListener("dragend", () => {
    draggedItem.style.opacity = "1";
  });
});

section.addEventListener("dragover", e => e.preventDefault());

section.addEventListener("drop", e => {
  if (!draggedItem) return;

  const sectionRect = section.getBoundingClientRect();
  const basketRect = basket.getBoundingClientRect();

  const mouseX = e.clientX - sectionRect.left;
  const mouseY = e.clientY - sectionRect.top;

  const basketX = basketRect.left - sectionRect.left;
  const basketY = basketRect.top - sectionRect.top;

  const isInsideBasket =
    e.clientX > basketRect.left &&
    e.clientX < basketRect.right &&
    e.clientY > basketRect.top &&
    e.clientY < basketRect.bottom;

  if (isInsideBasket) {
    draggedItem.style.left = basketX + basketRect.width / 2 - draggedItem.offsetWidth / 2 + "px";
    draggedItem.style.top = basketY + basketRect.height / 2 - draggedItem.offsetHeight / 2 + "px";
  } else {
    draggedItem.style.left = mouseX - draggedItem.offsetWidth / 2 + "px";
    draggedItem.style.top = mouseY - draggedItem.offsetHeight / 2 + "px";
  }

  draggedItem.style.position = "absolute";
  draggedItem = null;
});
