const DEFAULT_OPTIONS = {
  autoClose: 5000,
};
export default class Toast {
  #toastElem;
  #autoCloseTimeout;
  constructor(options) {
    this.#toastElem = document.createElement("div");
    this.#toastElem.classList.add("toast");
    Object.entries({ ...DEFAULT_OPTIONS, ...options }).forEach(
      ([key, value]) => {
        this[key] = value;
      }
    );
  }

  set autoClose(value) {
    if (value == false) return;
    if (this.#autoCloseTimeout) clearTimeout(this.#autoCloseTimeout);
    this.#autoCloseTimeout = setTimeout(() => {
      this.remove();
    }, value);
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
  remove() {
    const container = this.#toastElem.parentElement;
    this.#toastElem.remove();
    if (container.hasChildNodes()) return;
    container.remove();
  }
}

function createContainer(position) {
  const container = document.createElement("div");
  container.classList.add("toast-container");
  container.dataset.position = position;
  document.body.appendChild(container);
  return container;
}
