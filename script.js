import Toast from "./Toast.js";

document.querySelector("button").addEventListener("click", () => {
  const mytoast = new Toast({
    Text: "Hello World",
    position: "top-left",
  });
});
