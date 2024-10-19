import notesapi from "../data/notes-api.js";
import Utils from "../utility/utils.js";

function buatItem(notesList) {
  const notesContainer = document.querySelector("notes-list");

  function createNoteItemElement({ title, body, id, archived }) {
    return `
    <div class="notesList" id="${id}">
      <h3 class="notesItemTitle">${title}</h3>
      <p class="notesItemDescription">${body}</p>
      <div class="button-group">
        <button class="deleteButton">Delete</button>
         ${
           archived
             ? `<button class="unarchivedButton">Unarchived</button>`
             : `<button class="archivedButton">Archived</button>`
         }
      </div>
    </div>
    `;
  }

  const noteItems = notesList.map((note) => {
    return createNoteItemElement(note);
  });

  notesContainer.innerHTML = "";
  notesContainer.innerHTML = noteItems.join("");

  if (notesContainer.innerHTML === "") {
    notesContainer.innerHTML = "tidak ada notes";
  }
}

const home = async () => {
  const notes = await notesapi.getNotesnonArchived();
  buatItem(notes);

  const archivedNotesBtn = document.querySelector("#archived");
  archivedNotesBtn.addEventListener("click", async () => {
    archivedNotesBtn.classList.add("active");
    unarchivedNotesBtn.classList.remove("active");
    const archivedNotes = await notesapi.getArchivedNotes();
    buatItem(archivedNotes);
  });

  const unarchivedNotesBtn = document.querySelector("#allnotes");
  unarchivedNotesBtn.addEventListener("click", async () => {
    archivedNotesBtn.classList.remove("active");
    unarchivedNotesBtn.classList.add("active");
    const notes = await notesapi.getNotesnonArchived();
    buatItem(notes);
  });

  const archiveButtons = document.querySelectorAll(".archivedButton");
  const unarchiveButtons = document.querySelectorAll(".unarchivedButton"); // Pastikan ini sesuai ID elemen Anda

  if (unarchivedNotesBtn && unarchivedNotesBtn.classList.contains("active")) {
    // Jika unarchivedNotesBtn aktif, tampilkan tombol "archive" dan sembunyikan "unarchive"
    archiveButtons.forEach((btn) => {
      btn.style.display = "block"; // Tampilkan tombol "archive"
    });
    unarchiveButtons.forEach((btn) => {
      btn.style.display = "none"; // Sembunyikan tombol "unarchive"
    });
  } else {
    // Jika tidak aktif, tampilkan tombol "unarchive" dan sembunyikan "archive"
    archiveButtons.forEach((btn) => {
      btn.style.display = "none"; // Sembunyikan tombol "archive"
    });
    unarchiveButtons.forEach((btn) => {
      btn.style.display = "block"; // Tampilkan tombol "unarchive"
    });
  }

  const notesContainer = document.querySelector("notes-list");
  notesContainer.addEventListener("click", async (event) => {
    const target = event.target;

    if (
      target.classList.contains("deleteButton") ||
      target.classList.contains("archivedButton") ||
      target.classList.contains("unarchivedButton")
    ) {
      const noteElement = target.closest(".notesList"); // Mengambil elemen induk terdekat dengan class "notesList"
      const noteId = noteElement.id; // Mengambil id dari elemen induk

      if (target.classList.contains("deleteButton")) {
        archivedNotesBtn.classList.remove("active");
        unarchivedNotesBtn.classList.add("active");
        await Utils.dltBtn(noteId);
      }

      if (target.classList.contains("archivedButton")) {
        await Utils.arcBtn(noteId);
      }

      if (target.classList.contains("unarchivedButton")) {
        await Utils.unarcBtn(noteId);
      }
    }
  });
};

export { home, buatItem };
