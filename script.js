import Toast from "./Toast.js";

const mytoast = new Toast({
  Text: "Hello World",
  onClose: () => alert("closed"),
});

setTimeout(() => {
  mytoast.update({ position: "top-left" });
}, 1000);
