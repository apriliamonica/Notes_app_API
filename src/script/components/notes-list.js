import Utils from "../utility/utils.js";

class NotesList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static get observedAttributes() {
    return ["maxheight"];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this._maxheight = this.getAttribute("maxheight");
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
         width: 100%;
      }
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: sans-serif;
      }
      .notes-list{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-template-rows: auto;
        gap: 1rem;
        background: rgb(255, 255, 255);
        width: 100%;
        overflow: auto;
        max-height: ${this.maxheight}rem;
        padding: 1rem;
      }
    `;
  }

  set maxheight(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;

    this._maxheight = value;
    this.render();
  }

  get maxheight() {
    return this._maxheight;
  }

  render() {
    this._shadowRoot.innerHTML = "";
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="notes-list">
        <slot></slot>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.maxheight = newValue;
    this.render();
  }
}

customElements.define("notes-list", NotesList);
