function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const modals = document.querySelectorAll(".popup_is-opened");
    const lastOpened = modals[modals.length - 1];
    if (lastOpened) hideModal(lastOpened);
  }
}

export function closePopupOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    hideModal(evt.currentTarget);
  }
}

export function showModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
  popup.addEventListener("mousedown", closePopupOnOverlay);
}

export function hideModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("mousedown", closePopupOnOverlay);

  if (!document.querySelector(".popup_is-opened")) {
    document.removeEventListener("keydown", handleEscClose);
  }
}
