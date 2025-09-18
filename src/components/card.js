import { deleteCardApi, likeCardApi, dislikeCardApi } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(item, removeCard, handleLikeCard, previewImagePopup, userId) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");
  const likeCount = card.querySelector(".card__like-count");
  const title = card.querySelector(".card__title");

  likeCount.textContent = item.likes.length;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  title.textContent = item.name;

  if (item.owner && item.owner._id === userId) {
    deleteButton.addEventListener("click", (e) => removeCard(e, item._id));
  } else {
    deleteButton.classList.add("card__delete-button_hidden");
  }

  if (item.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", (evt) =>
    handleLikeCard(evt, likeButton, item._id, likeCount)
  );

  cardImage.addEventListener("click", () => previewImagePopup(item.link, item.name));

  return card;
}

export function deleteCard(evt, id) {
  evt.stopPropagation();
  deleteCardApi(id)
    .then(() => {
      evt.target.closest(".places__item").remove();
    })
    .catch((er) => {
      console.log(`Ошибка в удалении карточки: ${er}`);
    });
}

export function handleLikeCard(evt, likebtn, cardId, likeCount) {
  evt.stopPropagation();
  const isActive = likebtn.classList.contains("card__like-button_is-active");
  const action = isActive ? dislikeCardApi : likeCardApi;

  action(cardId)
    .then((data) => {
      likebtn.classList.toggle("card__like-button_is-active", !isActive);
      likeCount.textContent = data.likes.length;
    })
    .catch((er) => {
      console.log(`Ошибка при смене лайка: ${er}`);
    });
}
