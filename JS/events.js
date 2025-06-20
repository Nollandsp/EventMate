// Importation de Supabase depuis supabaseClient.js
import { supabase } from "./supabaseClient.js";

const form = document.getElementById("event-form");
const errorMessage = document.getElementById("form-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const { data, error } = await supabase.from("Events").insert([
      {
        title: formData.get("title"), // Correspond à la colonne "title"
        description: formData.get("description"), // Correspond à la colonne "description"
        location: formData.get("location"), // Correspond à la colonne "location"
        date: formData.get("date"), // Correspond à la colonne "date"
        tags: formData.get("tags"), // Si "tags" est utilisé dans "extra_info", vous pouvez l'ajouter ici
        is_private: formData.get("private") === "on", // Correspond à la colonne "is_private"
        extra_info: {
          seats: formData.get("seats"), // Exemple d'ajout dans "extra_info"
          language: formData.get("language"),
        },
      },
    ]);

    if (error) {
      console.error(error);
      if (errorMessage) {
        errorMessage.textContent = "Erreur lors de la création de l'événement.";
      }
    } else {
      window.location.href = "/"; // Redirection après succès
    }
  } catch (err) {
    console.error("Erreur inattendue :", err);
    if (errorMessage) {
      errorMessage.textContent = "Une erreur inattendue s'est produite.";
    }
  }
});
