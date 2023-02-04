import "./src/public/css/style.css";
import { Favorites } from "./src/js/app.js";

const app = new Favorites("#app");

document.querySelector("#app").innerHTML = app;
