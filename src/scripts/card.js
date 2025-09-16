import { deleteCardApi, likeCardApi, dislikeCardApi } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(item, removeCard, handleLikeCard, previewImagePopup, userId) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const cardImage = card.querySelector('.card__image');
  const likeCount = card.querySelector('.card__like-count');
  likeCount.textContent = item.likes.length;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  card.querySelector('.card__title').textContent = item.name;

  if (item.owner._id === userId) {
    deleteButton.addEventListener('click', (e) => removeCard(e, item._id));
  } else {
    deleteButton.style.display = 'none';
  }

  if (item.likes.some((user) => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', (evt) => handleLikeCard(evt, likeButton, item._id, likeCount));
  card.addEventListener('click', () => previewImagePopup(item.link, item.name));
  return card;
}

export function deleteCard(evt, id) {
  evt.stopPropagation();
  deleteCardApi(id)
    .then(() => {
      evt.target.closest('.places__item').remove();
    })
    .catch((er) => {
      console.log(`Ошибка в удалении карточки: ${er}`);
    });
}

export function handleLikeCard(evt, likebtn, cardId, likeCount) {
  evt.stopPropagation();
  if (likebtn.classList.contains('card__like-button_is-active')) {
    dislikeCardApi(cardId)
      .then((data) => {
        likebtn.classList.remove('card__like-button_is-active');
        likeCount.textContent = data.likes.length;
      })
      .catch((er) => {
        console.log(`Ошибка в снятии лайка карточке: ${er}`);
      });
  } else {
    likeCardApi(cardId)
      .then((data) => {
        likebtn.classList.add('card__like-button_is-active');
        likeCount.textContent = data.likes.length;
      })
      .catch((er) => {
        console.log(`Ошибка в добавлении лайка карточке: ${er}`);
      });
  }
}
