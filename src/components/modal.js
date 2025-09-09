function showModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", onEscapeKeyPress);
}

function hideModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", onEscapeKeyPress);
}

function closePopupOnOverlay(evt, popupElem) {
  if (evt.target === evt.currentTarget) {
    hideModal(popupElem);
  }
}

function onEscapeKeyPress(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".popup_is-opened");
    if (activeModal) hideModal(activeModal);
  }
}

export { showModal, hideModal, closePopupOnOverlay };