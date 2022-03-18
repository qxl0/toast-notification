import Toast from "./Toast.js";

const mytoast = new Toast({
  Text: "Hello World",
});

setTimeout(() => {
  mytoast.update({ Text: "Bye" });
}, 1000);
