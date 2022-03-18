export default class Toast {
  #toastElem;
  constructor(options) {
    this.#toastElem = document.createElement("div");
    this.#toastElem.classList.add("toast");
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  set position(value) {
    const selector = `.toast-container[data-position="${value}"]`;
    const container =
      document.querySelector(selector) || createContainer(value);
    container.append(this.#toastElem);
  }

  set Text(value) {
    this.#toastElem.textContent = value;
  }
  // show() {
  //   const toastElem = document.createElement("div");
  //   toastElem.classList.add("toast");
  // }
  update() {}
  remove() {}
}

function createContainer(position) {
  const container = document.createElement("div");
  container.classList.add("toast-container");
  container.dataset.position = position;
  document.body.appendChild(container);
  return container;
}
