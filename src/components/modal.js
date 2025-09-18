function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const modalOpened = document.querySelector('.popup_is-opened');
    if (modalOpened) hideModal(modalOpened);
  }
}

export function closePopupOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    hideModal(evt.currentTarget);
  }
}

export function showModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
  popup.addEventListener('click', closePopupOnOverlay);
}

export function hideModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
  popup.removeEventListener('click', closePopupOnOverlay);
}
