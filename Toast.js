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
    console.log(value);
  }
  // show() {
  //   const toastElem = document.createElement("div");
  //   toastElem.classList.add("toast");
  // }
  update() {}
  remove() {}
}
