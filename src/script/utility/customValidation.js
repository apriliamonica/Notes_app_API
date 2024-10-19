export const customValidationTitleHandler = (event) => {
  event.target.setCustomValidity("");

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("Wajib diisi...");
    return;
  }

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity("Minimal panjang adalah lima karakter...");
    return;
  }
};

export const customValidationDescriptionHandler = (event) => {
  event.target.setCustomValidity("");

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("Wajib diisi...");
    return;
  }

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity(
      "Minimal panjang adalah sepuluh karakter....",
    );
    return;
  }
};
