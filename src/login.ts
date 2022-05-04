import renderLoginForm from "./components/LoginForm";
import "./style.css";
import { verifyAttemptLoginFailure } from "./utils/loginUtils";

if (verifyAttemptLoginFailure()) {
  window.location.href = "blocked.html";
}

const app = <HTMLDivElement>document.querySelector("#app");
renderLoginForm(app);
