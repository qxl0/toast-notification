import Toast from "./Toast.js";

const mytoast = new Toast({
  Text: "Hello World",
});

setTimeout(() => {
  mytoast.update({ position: "top-left" });
}, 1000);
