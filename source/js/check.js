let counter = 0;
let items = document.querySelectorAll(".gallery__item");
let counterElement = document.querySelector(".js-counter");
let item = document.querySelector(".gallery__check");

let updateCounter = (counter) => {
  counterElement.innerText = counter;
}

items.forEach((item) => {
	item.addEventListener("click", (event) => {
		event.preventDefault();
		if (item.classList.contains("gallery__item-active")) {
			item.classList.remove("gallery__item-active");
			counter--;
		} else {
			item.classList.add("gallery__item-active");
			counter++;
		}
		updateCounter(counter);
	})
});