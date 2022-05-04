import renderWelcomePanel from "./components/Welcome";
import "./style.css";
import { verifyAttemptLoginFailure } from "./utils/loginUtils";

const $ = document.querySelector.bind(document);
const app = <HTMLDivElement>$("#app");
const token = localStorage.getItem("token");

if (verifyAttemptLoginFailure()) {
  window.location.href = "blocked.html";
} else {
  if (!token) {
    window.location.href = "login.html";
  }
}

renderWelcomePanel(app);
