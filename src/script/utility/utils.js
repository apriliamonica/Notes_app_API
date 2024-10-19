import notesapi from "../data/notes-api.js";
import { home, buatItem } from "../view/home.js";

class Utils {
  static buatIdUnik() {
    const unikId = new Date().getTime();
    return `notes-${unikId}`;
  }

  static buatCreatedAt() {
    const date = new Date();
    return date.toISOString();
  }

  static makeNewNote(id, title, body, createdAt, archived) {
    return {
      id,
      title,
      body,
      createdAt,
      archived,
    };
  }

  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }

  static async dltBtn(notes) {
    console.log(notes);
    await notesapi.deleteNote(notes);
    const notesList = await notesapi.getNotesnonArchived();
    buatItem(notesList);
  }

  static async arcBtn(notes) {
    console.log(notes);
    await notesapi.archiveNote(notes);
    const notesList = await notesapi.getNotesnonArchived();
    buatItem(notesList);
  }

  static async unarcBtn(notes) {
    console.log(notes);
    await notesapi.unarchiveNote(notes);
    const notesList = await notesapi.getArchivedNotes();
    buatItem(notesList);
  }

  static showLoading(element) {
    element.style.display = "block";
  }

  static hideLoading(element) {
    element.style.display = "none";
  }

  // Hanya simulasi saja!
  // Ini hanya digunakan untuk menambah waktu penyelesaian dari proses asynchronous.
  static sleep(response = null) {
    // Proses async ini seharusnya tidak memiliki kemungkinan gagal.
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response);
      }, 1000),
    );
  }
}

export default Utils;
