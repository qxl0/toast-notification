export default class Toast {
  constructor(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  set position(value) {
    console.log(value);
  }
  show() {}
  update() {}
  remove() {}
}
