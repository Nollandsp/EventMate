import { supabase } from "./supabaseClient.js";
import { addComment } from "./comment.js"; // commentaire dans un autre fichier

// 📌 Créer un événement
const eventForm = document.getElementById("event-form");

eventForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("event-title").value;
  const desc = document.getElementById("event-desc").value;

  const { error } = await supabase
    .from("events")
    .insert([{ title, description: desc }]);

  if (error) {
    alert("Erreur événement : " + error.message);
  } else {
    alert("Événement créé avec succès !");
  }
});

// 📌 Ajouter un commentaire
const commentForm = document.getElementById("comment-form");

commentForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = document.getElementById("comment-text").value;
  await addComment(text);
});
