const DEFAULT_OPTIONS = {
  autoClose: 5000,
  position: "top-right",
  onClose: () => {},
  canClose: true,
};
export default class Toast {
  #toastElem;
  #autoCloseTimeout;
  #removeBinded;
  constructor(options) {
    this.#toastElem = document.createElement("div");
    this.#toastElem.classList.add("toast");
    requestAnimationFrame(() => {
      this.#toastElem.classList.add("show");
    });
    this.#removeBinded = this.remove.bind(this);
    this.update({ ...DEFAULT_OPTIONS, ...options });
  }

  set autoClose(value) {
    if (value == false) return;
    if (this.#autoCloseTimeout) clearTimeout(this.#autoCloseTimeout);
    this.#autoCloseTimeout = setTimeout(() => {
      this.remove();
    }, value);
  }
  set position(value) {
    const currentContainer = this.#toastElem.parentElement;
    const selector = `.toast-container[data-position="${value}"]`;
    const container =
      document.querySelector(selector) || createContainer(value);
    container.append(this.#toastElem);
    if (!currentContainer || currentContainer.hasChildNodes()) return;
    currentContainer.remove();
  }

  set Text(value) {
    this.#toastElem.textContent = value;
  }

  set canClose(value) {
    this.#toastElem.classList.toggle("can-close", value);
    if (value) {
      this.#toastElem.addEventListener("click", this.#removeBinded);
    } else {
      this.#toastElem.removeEventListener("click", this.#removeBinded);
    }
  }
  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }
  // show() {
  //   const toastElem = document.createElement("div");
  //   toastElem.classList.add("toast");
  // }
  remove() {
    console.log("called remove");
    const container = this.#toastElem.parentElement;
    this.#toastElem.classList.remove("show");
    this.#toastElem.addEventListener("transitionend", () => {
      this.#toastElem.remove();
    });
    if (container.hasChildNodes()) return;
    this.onClose();
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
