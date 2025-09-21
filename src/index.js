import "./pages/index.css";
import { showModal, hideModal } from "./components/modal.js";
import { createCard, deleteCard, handleLikeCard } from "./components/card.js";
import { enableValidation, clearValidation, setDisabledBtn } from "./components/validation.js";
import { getCardsData, getProfileData, editeProfileData, addCardApi, avatarProfileData } from "./components/api.js";

const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__image-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupClose = document.querySelectorAll(".popup__close");

const formEdit = popupEdit.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const addCardModal = document.querySelector(".popup_type_new-card");
const addCardModalForm = addCardModal.querySelector(".popup__form");
const popupCardName = addCardModalForm.querySelector(".popup__input_type_card-name");
const popupUrl = addCardModalForm.querySelector(".popup__input_type_url");

const addAvatarModal = document.querySelector(".popup_type_avatar");
const popupAvatar = addAvatarModal.querySelector(".popup__form");
const popupAvatarLink = popupAvatar.querySelector(".popup__input_type_avatar");

const openCard = document.querySelector(".popup_type_image");
const cardImage = document.querySelector(".popup__image");
const cardCaption = document.querySelector(".popup__caption");

const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const avatarFormBtn = popupAvatar.querySelector(".popup__button");
const editFormBtn = formEdit.querySelector(".popup__button");
const cardFormBtn = addCardModalForm.querySelector(".popup__button");

function previewImagePopup(link, name) {
  cardImage.src = link;
  cardImage.alt = name;
  cardCaption.textContent = name;
  showModal(openCard);
}

function launchEditPopup() {
  clearValidation(formEdit, selectors);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  setDisabledBtn(!formEdit.checkValidity(), selectors, editFormBtn); // кнопка активна, если форма валидна
  showModal(popupEdit);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  editFormBtn.textContent = "Сохранение...";
  editeProfileData(nameInput.value, jobInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      hideModal(popupEdit);
    })
    .catch((e) => console.error("Ошибка редактирования профиля: " + e))
    .finally(() => {
      editFormBtn.textContent = "Сохранить";
    });
}

function submitNewCardForm(evt) {
  evt.preventDefault();
  cardFormBtn.textContent = "Сохранение...";
  addCardApi(popupCardName.value, popupUrl.value)
    .then((data) => {
      const card = createCard(data, deleteCard, handleLikeCard, previewImagePopup, userId);
      cardContainer.prepend(card);
      addCardModalForm.reset();
      setDisabledBtn(true, selectors, cardFormBtn);
      hideModal(addCardModal);
    })
    .catch((error) => console.log(`Ошибка в создании карточки: ${error}`))
    .finally(() => {
      cardFormBtn.textContent = "Сохранить";
    });
}

function submitAvatarForm(evt) {
  evt.preventDefault();
  avatarFormBtn.textContent = "Сохранение...";
  avatarProfileData(popupAvatarLink.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      popupAvatar.reset();
      setDisabledBtn(true, selectors, avatarFormBtn);
      hideModal(addAvatarModal);
    })
    .catch((e) => console.error("Ошибка редактирования аватара: " + e))
    .finally(() => {
      avatarFormBtn.textContent = "Сохранить";
    });
}

let userId = null;

Promise.all([getCardsData(), getProfileData()])
  .then(([cardData, profileData]) => {
    userId = profileData._id;
    profileImage.style.backgroundImage = `url(${profileData.avatar})`;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;

    cardData.forEach((item) => {
      const card = createCard(item, deleteCard, handleLikeCard, previewImagePopup, userId);
      cardContainer.append(card);
    });
  })
  .catch((e) => console.error("Ошибка: " + e));

editButton.addEventListener("click", launchEditPopup);

addButton.addEventListener("click", () => {
  clearValidation(addCardModalForm, selectors);
  setDisabledBtn(true, selectors, cardFormBtn);
  showModal(addCardModal);
});

avatarButton.addEventListener("click", () => {
  clearValidation(popupAvatar, selectors);
  setDisabledBtn(true, selectors, avatarFormBtn);
  showModal(addAvatarModal);
});

formEdit.addEventListener("submit", submitProfileForm);
addCardModalForm.addEventListener("submit", submitNewCardForm);
popupAvatar.addEventListener("submit", submitAvatarForm);

document.querySelectorAll(".popup__close").forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const currentPopup = evt.target.closest(".popup");
    if (currentPopup) hideModal(currentPopup);
  });
});

enableValidation(selectors);
