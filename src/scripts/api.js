const apiSettings = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-42",
  headers: {
    authorization: "70582f2c-93e6-41b6-a4b8-abbc21f6356d",
    "Content-Type": "application/json",
  },
};

export function getCardsData() {
  return fetch(`${apiSettings.baseUrl}/cards`, {
    headers: apiSettings.headers,
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
}

export function getProfileData() {
  return fetch(`${apiSettings.baseUrl}/users/me`, {
    headers: apiSettings.headers,
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
}

export function editeProfileData(updatedName, updatedAbout) {
  const editData = { name: updatedName, about: updatedAbout };
  return fetch(`${apiSettings.baseUrl}/users/me`, {
    headers: apiSettings.headers,
    method: "PATCH",
    body: JSON.stringify(editData),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
}

export function avatarProfileData(updatedAvatar) {
  const avatarData = { avatar: updatedAvatar };
  return fetch(`${apiSettings.baseUrl}/users/me/avatar`, {
    headers: apiSettings.headers,
    method: "PATCH",
    body: JSON.stringify(avatarData),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
}

export function addCardApi(name, link) {
  const cardData = { name, link };
  return fetch(`${apiSettings.baseUrl}/cards`, {
    headers: apiSettings.headers,
    method: "POST",
    body: JSON.stringify(cardData),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
}

export function deleteCardApi(id) {
  return fetch(`${apiSettings.baseUrl}/cards/${id}`, {
    headers: apiSettings.headers,
    method: "DELETE",
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
}

export function likeCardApi(cardId) {
  return fetch(`${apiSettings.baseUrl}/cards/likes/${cardId}`, {
    headers: apiSettings.headers,
    method: "PUT",
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
}

export function dislikeCardApi(cardId) {
  return fetch(`${apiSettings.baseUrl}/cards/likes/${cardId}`, {
    headers: apiSettings.headers,
    method: "DELETE",
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
}
