import {
  customValidationTitleHandler,
  customValidationDescriptionHandler,
} from "../utility/customValidation.js";
import Utils from "../utility/utils.js";
import { buatItem } from "../view/home.js";
import notesapi from "../data/notes-api.js";

class NotesForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `          
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: sans-serif;
      }
          
      button,
      input {
        padding: 0.5rem 1rem;
        border: 2px solid black;
        border-radius: 5px;
        border: none;
        outline: none;
      }
          
      label {
        font-weight: 400;
      }
              #notesForm {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        color: rgb(44, 44, 44);
        width: 100%;
        font-size: 1rem;
        border-radius: 0.25rem;
      }
          
      #title {
        padding: 1rem 1rem;
        border: 2px solid black;
        border-radius: 5px;
        width: 100%;
      }
          
      textarea {
        resize: none;
        border: none;
        outline: none;
      }
          
      #description {
        width: 100%;
        height: 10rem;
        padding: 1rem 1rem;
        border: 2px solid black;
        border-radius: 5px;
      }
          
      .label-judul {
        display: block;
        margin-bottom: 0.25rem;
      }
          
      #notesFormSubmit {
        background: rgb(255, 242, 120);
        border: 2px solid black;
        border-radius: 10px;
        color: rgb(0, 0, 0);
        cursor: pointer;
        align-self: end;
      }
          
      #notesFormSubmit:hover {
           background: rgb(243, 232, 138);
          color: rgb(0, 0, 0);
      }
      #notesFormSubmit:active {
        background: rgb(248, 230, 69);
      }
          
      .validation-message {
        margin-block: 0.5rem;
        color: rgb(255, 7, 7);
      }
          
      #title:user-invalid,
      #description:user-invalid {
        border: 1px solid rgb(255, 7, 7);
      }
   `;
  }

  async _tambahNotes() {
    const form = this._shadowRoot.querySelector("#notesForm");
    const unarchivedNotesBtn = document.querySelector("#allnotes");
    const archivedNotesBtn = document.querySelector("#archived");

    function notesBaru() {
      const id = Utils.buatIdUnik();
      const title = form.elements["title"].value;
      const body = form.elements["description"].value;
      const createdAt = Utils.buatCreatedAt();
      const archived = false;

      const newNote = Utils.makeNewNote(id, title, body, createdAt, archived);

      return newNote;
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      archivedNotesBtn.classList.remove("active");
      unarchivedNotesBtn.classList.add("active");
      await notesapi.createNote(notesBaru());
      const notes = await notesapi.getNotesnonArchived();
      buatItem(notes);
      form.reset();
      return;
    });
  }

  _validateForm() {
    const form = this._shadowRoot.querySelector("#notesForm");
    const titleOnInput = form.elements["title"];
    const descriptionOnInput = form.elements["description"];
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    titleOnInput.addEventListener("change", customValidationTitleHandler);
    titleOnInput.addEventListener("invalid", customValidationTitleHandler);

    titleOnInput.addEventListener("blur", (event) => {
      // Validate the field
      const isValid = event.target.validity.valid;
      const errorMessage = event.target.validationMessage;

      const connectedValidationId =
        event.target.getAttribute("aria-describedby");
      const connectedValidationEl = connectedValidationId
        ? this._shadowRoot.getElementById(connectedValidationId)
        : null;

      if (connectedValidationEl && errorMessage && !isValid) {
        connectedValidationEl.innerText = errorMessage;
      } else {
        connectedValidationEl.innerText = "";
      }
    });

    descriptionOnInput.addEventListener(
      "change",
      customValidationDescriptionHandler,
    );
    descriptionOnInput.addEventListener(
      "invalid",
      customValidationDescriptionHandler,
    );

    descriptionOnInput.addEventListener("blur", (event) => {
      const isValidsecription = event.target.validity.valid;
      const errorMessageDescription = event.target.validationMessage;

      const connectedValidationId =
        event.target.getAttribute("aria-describedby");
      const connectedValidationEl = connectedValidationId
        ? this._shadowRoot.getElementById(connectedValidationId)
        : null;

      if (
        connectedValidationEl &&
        errorMessageDescription &&
        !isValidsecription
      ) {
        connectedValidationEl.innerText = errorMessageDescription;
      } else {
        connectedValidationEl.innerText = "";
      }
    });
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = "";
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
    <form id="notesForm" autocomplete="off">
          <div>
            <label class="label-judul" for="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder=" Judul"
              minlength="5"
              aria-describedby="titleValidation"
            />
            <p
              id="titleValidation"
              class="validation-message"
              aria-live="polite"
            ></p>
          </div>
          <div>
            <label class="label-judul" for="description">Description</label>
            <textarea
              id="description"
              name="description"
              required
              placeholder="Deskripsi"
              minlength="10"
              aria-describedby="deskriptionValidation"
            ></textarea>
            <p
              id="deskriptionValidation"
              class="validation-message"
              aria-live="polite"
            ></p>
          </div>
          <button id="notesFormSubmit" type="submit">Add Note</button>
        </form>
    `;
    this._validateForm();
    this._tambahNotes();
  }
}

customElements.define("notes-form", NotesForm);
