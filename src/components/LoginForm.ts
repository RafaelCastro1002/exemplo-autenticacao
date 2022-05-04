import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { firebaseApp } from "../config/firebase";
import { verifyAttemptLoginFailure } from "../utils/loginUtils";

const $ = document.querySelector.bind(document);

const authStatuses = [
  "auth/wrong-password",
  "auth/user-not-found",
  "auth/invalid-email",
];

const onSubmitLoginForm = (event: Event) => {
  event.preventDefault();

  const email = (<HTMLInputElement>$("#email")).value;
  const password = (<HTMLInputElement>$("#password")).value;

  const auth = getAuth(firebaseApp);
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      localStorage.setItem("loginAttemptFailure", "0");

      const { user } = userCredential;
      const idToken = await user.getIdToken();
      localStorage.setItem("token", idToken);
      window.location.href = "index.html";
    })
    .catch((error) => {
      const { code } = error;

      if (authStatuses.includes(code)) {
        const getLoginAttemptStorage = localStorage.getItem(
          "loginAttemptFailure"
        );
        const loginAttempt = getLoginAttemptStorage
          ? Number(getLoginAttemptStorage)
          : 0;

        const sumLoginAttempt = loginAttempt + 1;

        localStorage.setItem("loginAttemptFailure", sumLoginAttempt.toString());

        if (verifyAttemptLoginFailure()) {
          window.location.href = "blocked.html";
        }

        const errorParagraph = <HTMLParagraphElement>(
          document.querySelector("#error-message")
        );
        errorParagraph.innerText = "Credenciais inválidas";
      } else {
        console.log(code);
      }
    });
};

const renderLoginForm = (container: HTMLElement) => {
  const htmlContent = `
    <div id="container-login">
      <form id="login-form">
        <h2>Exemplo autenticação</h2>
        <div class="form-input">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" required>
        </div>

        <div class="form-input">
          <label for="email">Senha</label>
          <input type="password" id="password" name="password" required>
        </div>

        <button>Entrar</button>

        <p id="error-message"></p>
      </form>
    </div>
  `;

  container.innerHTML = htmlContent;
  const loginForm = <HTMLFormElement>$("#login-form");
  loginForm.onsubmit = onSubmitLoginForm;
};

export default renderLoginForm;
