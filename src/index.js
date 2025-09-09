import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
  generateCardComponent,
  removeCardNode,
  toggleCardLike,
} from "./components/card.js";
import { showModal, hideModal, closePopupOnOverlay } from "./components/modal.js";

const containerCards = document.querySelector(".places__list");
const btnProfileEdit = document.querySelector(".profile__edit-button");
const btnCardAdd = document.querySelector(".profile__add-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupCardAdd = document.querySelector(".popup_type_new-card");
const popupImagePreview = document.querySelector(".popup_type_image");
const closeBtnEdit = popupProfileEdit.querySelector(".popup__close");
const closeBtnAdd = popupCardAdd.querySelector(".popup__close");
const closeBtnImage = popupImagePreview.querySelector(".popup__close");
const imageInPopup = popupImagePreview.querySelector(".popup__image");
const captionInPopup = popupImagePreview.querySelector(".popup__caption");
const userNameDisplay = document.querySelector(".profile__title");
const userJobDisplay = document.querySelector(".profile__description");
const formProfileEdit = popupProfileEdit.querySelector(".popup__form");
const formCardAdd = popupCardAdd.querySelector(".popup__form");
const inputUserName = popupProfileEdit.querySelector(".popup__input_name");
const inputUserJob = popupProfileEdit.querySelector(
  ".popup__input_description"
);
const inputCardTitle = popupCardAdd.querySelector(".popup__input_card-name");
const inputCardUrl = popupCardAdd.querySelector(".popup__input_url");

function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const card = generateCardComponent(
      cardData,
      removeCardNode,
      previewImagePopup,
      toggleCardLike
    );
    containerCards.appendChild(card);
  });
}

renderInitialCards();

function previewImagePopup(link, title) {
  imageInPopup.src = link;
  imageInPopup.alt = title;
  captionInPopup.textContent = title;
  showModal(popupImagePreview);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  userNameDisplay.textContent = inputUserName.value;
  userJobDisplay.textContent = inputUserJob.value;
  hideModal(popupProfileEdit);
}

function launchEditPopup() {
  inputUserName.value = userNameDisplay.textContent;
  inputUserJob.value = userJobDisplay.textContent;
  showModal(popupProfileEdit);
}

function submitNewCardForm(evt) {
  evt.preventDefault();
  const newCardData = {
    name: inputCardTitle.value,
    link: inputCardUrl.value,
  };
  const newCard = generateCardComponent(
    newCardData,
    removeCardNode,
    previewImagePopup,
    toggleCardLike
  );
  containerCards.prepend(newCard);
  formCardAdd.reset();
  hideModal(popupCardAdd);
}

closeBtnImage.addEventListener("click", () => hideModal(popupImagePreview));
btnProfileEdit.addEventListener("click", launchEditPopup);
btnCardAdd.addEventListener("click", () => showModal(popupCardAdd));
popupImagePreview.addEventListener("click", (evt) =>
  closePopupOnOverlay(evt, popupImagePreview)
);
closeBtnEdit.addEventListener("click", () => hideModal(popupProfileEdit));
closeBtnAdd.addEventListener("click", () => hideModal(popupCardAdd));
[popupProfileEdit, popupCardAdd].forEach((popup) =>
  popup.addEventListener("click", (evt) => closePopupOnOverlay(evt, popup))
);
formProfileEdit.addEventListener("submit", submitProfileForm);
formCardAdd.addEventListener("submit", submitNewCardForm);
