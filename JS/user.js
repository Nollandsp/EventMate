import { supabase } from "./supabaseClient.js";

const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const messageStatus = loginForm.querySelector(".message-status");

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    messageStatus.textContent = "Merci de remplir tous les champs.";
    return;
  }

  messageStatus.textContent = "Connexion en cours…";

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Message personnalisé
    if (error.message.includes("Invalid login credentials")) {
      messageStatus.textContent = "Email ou mot de passe incorrect.";
    } else {
      messageStatus.textContent = "Erreur : " + error.message;
    }
  } else {
    messageStatus.style.color = "green";
    messageStatus.style.fontWeight = "bold";
    messageStatus.style.textAlign = "center";
    messageStatus.textContent = "Connexion réussie ! Redirection…";
    setTimeout(() => {
      window.location.href = "./event.html";
    }, 1000);
  }
});

// Inscription
document.addEventListener("DOMContentLoaded", () => {
  const signupBox = document.querySelector(".signup-box");
  if (!signupBox) return;

  const form = signupBox.querySelector("form");
  const inputs = form.querySelectorAll("input");
  const submitLink = form.querySelector("a");
  const message = form.querySelector("p");

  submitLink.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const password = inputs[2].value;

    if (!username || !email || !password) {
      message.style.color = "red";
      message.textContent = "Merci de remplir tous les champs.";
      return;
    }

    message.style.color = "black";
    message.textContent = "Inscription en cours…";

    // Inscription avec Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      message.style.color = "red";
      message.textContent = "Erreur : " + error.message;
      return;
    }

    message.style.color = "green";
    message.style.fontWeight = "bold";
    message.style.textAlign = "center";
    message.textContent = "Inscription réussie !";
  });
});
