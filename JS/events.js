import { supabase } from "./supabaseClient.js";

async function handleEventSubmit(event) {
  event.preventDefault();
  const form = document.querySelector(".event-form form");
  const messageElement = document.querySelector(".event-form p");

  try {
    // 1. Préparation des données de l'event (sans les tags)
    const tagsInput = form.tags.value
      .split(",")
      .map((t) => t.trim().toLowerCase());
    const formData = {
      title: form.title.value,
      description: form.description.value,
      location: form.location.value,
      date: new Date(form.date.value).toISOString(),
      is_private: form.private.checked,
      seats: parseInt(form.seats.value, 10),
      language: form.language.value,
    };

    // 2. Insertion de l'événement
    const { data: insertedEvents, error: insertError } = await supabase
      .from("events")
      .insert([formData])
      .select();

    if (insertError) throw insertError;

    const eventId = insertedEvents[0]?.id;

    if (!eventId) throw new Error("ID de l’événement non récupéré.");

    // 3. Gestion des tags (création s’ils n’existent pas)
    const tagIds = [];

    for (const tag of tagsInput) {
      let { data: tagData, error: tagFetchError } = await supabase
        .from("tag")
        .select("id")
        .eq("name", tag)
        .maybeSingle();

      if (tagFetchError) throw tagFetchError;

      if (!tagData) {
        const { data: newTag, error: newTagError } = await supabase
          .from("tag")
          .insert([{ name: tag }])
          .select()
          .maybeSingle();

        if (newTagError) throw newTagError;
        tagIds.push(newTag.id);
      } else {
        tagIds.push(tagData.id);
      }
    }

    // 4. Insertion dans la table de liaison link_event_tag
    const linksToInsert = tagIds.map((tagId) => ({
      event_id: eventId,
      tag_id: tagId,
    }));

    const { error: linkError } = await supabase
      .from("link_event_tag")
      .insert(linksToInsert);

    if (linkError) throw linkError;

    // ✅ Succès
    messageElement.textContent =
      "Événement créé ! Ton event vient de dropper ! 🎉";
    messageElement.style.color = "#4ade80";

    setTimeout(() => {
      form.reset();
      messageElement.textContent = "";
    }, 3000);
  } catch (error) {
    console.error("Erreur détaillée :", error);
    messageElement.textContent =
      "Erreur lors de la création : " + (error.message || "inconnue");
    messageElement.style.color = "#ff6b6b";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const eventForm = document.querySelector(".event-form form");
  if (eventForm) {
    eventForm.addEventListener("submit", handleEventSubmit);
  }
});

export { handleEventSubmit };
