const DEFAULT_OPTIONS = {
  autoClose: 5000,
  position: "top-right",
  onClose: () => {},
  canClose: true,

  showProgress: true,
};
export default class Toast {
  #toastElem;
  #autoCloseTimeout;
  #removeBinded;
  #visibleSince;
  #autoClose;
  #progressInterval;
  #timeVisible = 0;
  #pause;
  #unpause;
  #isPaused = false;
  #hoverPause;
  constructor(options) {
    this.#toastElem = document.createElement("div");
    this.#toastElem.classList.add("toast");
    this.#visibleSince = new Date();
    requestAnimationFrame(() => {
      this.#toastElem.classList.add("show");
    });
    this.#removeBinded = this.remove.bind(this);
    this.#pause = () => (this.#isPaused = true);
    this.#unpause = () => (this.#isPaused = false);
    this.update({ ...DEFAULT_OPTIONS, ...options });
  }

  set autoClose(value) {
    this.#autoClose = value;
    this.#timeVisible = 0;
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

  set showProgress(value) {
    this.#toastElem.classList.toggle("progress", value);
    this.#toastElem.style.setProperty("--progress", 1);

    if (value) {
      let lastTimeCalled = new Date();

      this.#progressInterval = setInterval(() => {
        if (!this.#isPaused) {
          this.#timeVisible += new Date() - lastTimeCalled;
          this.#toastElem.style.setProperty(
            "--progress",
            1 - this.#timeVisible / this.#autoClose
          );
        }
        lastTimeCalled = new Date();
      }, 10);
    }
  }

  set pauseOnHover(value) {
    if (value) {
      this.#toastElem.addEventListener("mouseover", this.#pause);
      this.#toastElem.addEventListener("mouseleave", this.#unpause);
    } else {
      this.#toastElem.removeEventListener("mouseover", this.#pause);
      this.#toastElem.removeEventListener("mouseover", this.#unpause);
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
    clearTimeout(this.#autoCloseTimeout);
    clearTimeout(this.#progressInterval);
    const container = this.#toastElem.parentElement;
    this.#toastElem.classList.remove("show");
    this.#toastElem.addEventListener("transitionend", () => {
      this.#toastElem.remove();
      if (container.hasChildNodes()) return;
      container.remove();
    });
    this.onClose();
  }
}

function createContainer(position) {
  const container = document.createElement("div");
  container.classList.add("toast-container");
  container.dataset.position = position;
  document.body.appendChild(container);
  return container;
}
