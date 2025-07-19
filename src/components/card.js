const templateCardNode = document.querySelector('#card-template').content.querySelector(".card");

function generateCardComponent(dataCard, onRemoveCard, onOpenPopup, onToggleLike) {
  const newCard = templateCardNode.cloneNode(true),
        imageElement = newCard.querySelector('.card__image'),
        titleElement = newCard.querySelector('.card__title'),
        likeToggleBtn = newCard.querySelector('.card__like-button');

  imageElement.src = dataCard.link;
  imageElement.alt = dataCard.name;
  titleElement.textContent = dataCard.name;

  newCard.querySelector('.card__delete-button')
         .addEventListener('click', () => onRemoveCard(newCard));

  imageElement.addEventListener('click', () => onOpenPopup(dataCard.link, dataCard.name));

  likeToggleBtn.addEventListener('click', () => onToggleLike(likeToggleBtn));

  return newCard;
}

function removeCardNode(domElement) {
  domElement.remove();
}

function toggleCardLike(buttonLike) {
  buttonLike.classList.toggle('card__like-button_is-active');
}

export { generateCardComponent, removeCardNode, toggleCardLike };
