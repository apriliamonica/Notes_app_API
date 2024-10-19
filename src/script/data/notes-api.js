const BASE_URL = "https://notes-api.dicoding.dev/v2";
import Utils from "../utility/utils";

const loading = document.querySelector("#loading");
const notesList = document.querySelector("notes-list");

class notesapi {
  static async createNote(note) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: note.title,
          body: note.body,
        }),
      });
      const responseJson = await response.json();
      console.log(responseJson);

      return responseJson;
    } catch (error) {
      alert("gagal menambahkan notes");
    }
  }

  static async getNotesnonArchived() {
    Utils.hideLoading(notesList);
    Utils.showLoading(loading);
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await Utils.sleep();
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      alert("gagal mendapatkan unarchived notes");
    } finally {
      Utils.hideLoading(loading);
      Utils.showLoading(notesList);
    }
  }

  static async getArchivedNotes() {
    Utils.hideLoading(notesList);
    Utils.showLoading(loading);
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await Utils.sleep();
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      alert("gagal mendapatkan archived notes");
    } finally {
      Utils.hideLoading(loading);
      Utils.showLoading(notesList);
    }
  }

  static async archiveNote(note_id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${note_id}/archive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      alert("gagal mengarchivekan notes");
    }
  }

  static async unarchiveNote(note_id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${note_id}/unarchive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);

      return responseJson;
    } catch (error) {
      alert("gagal mengunarchivekan notes");
    }
  }

  static async deleteNote(note_Id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${note_Id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      alert("gagal menghapus notes");
    }
  }
}

export default notesapi;
