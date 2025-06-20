import { supabase } from "./supabaseClient.js";

export async function addComment(text) {
  const { error } = await supabase.from("comments").insert([{ content: text }]);

  if (error) {
    alert("Erreur commentaire : " + error.message);
  } else {
    alert("Commentaire ajouté !");
  }
}
