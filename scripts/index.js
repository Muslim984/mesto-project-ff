const templateCard = document.querySelector("#card-template").content;

const placeMain = document.querySelector(".places__list");

function createCard(createCard) {
  const cardElement = templateCard.querySelector(".card").cloneNode(true);
  const cardText = cardElement.querySelector(".card__title");
  cardText.textContent = createCard.name;
  const cardPicture = cardElement.querySelector(".card__image");
  cardPicture.src = createCard.link;
  cardPicture.alt = createCard.name;
  const cardButtonDelete = cardElement.querySelector(".card__delete-button");
  cardButtonDelete.addEventListener("click", () => deleteCard(cardElement));
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function renderCards() {
  initialCards.forEach(function (item) {
    const card = createCard(item, deleteCard);
    placeMain.append(card);
  });
}

renderCards();
