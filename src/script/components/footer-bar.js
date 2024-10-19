class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      div {
        padding: 12px 16px;
        text-align: center;
      }
    `;
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = "";
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
    <div>
      <p>&copy; Notes App 2024</p>
    </div>
    `;
  }
}

customElements.define("footer-bar", FooterBar);
