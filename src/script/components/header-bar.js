class HeaderBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        text-align: center;
        width: 100%;
        background-color: #333;
        color: #fff;
        padding: 10px;
      }
        h1 {
          margin: 0;
        }
    `;
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = "";
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
    <div>
      <h1>Notes App</h1>
    </div>
    `;
  }
}

customElements.define("header-bar", HeaderBar);
