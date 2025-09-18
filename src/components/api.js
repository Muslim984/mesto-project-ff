const apiSettings = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-42",
  headers: {
    authorization: "70582f2c-93e6-41b6-a4b8-abbc21f6356d",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
  return res.json();
}

function request(path, options = {}) {
  return fetch(`${apiSettings.baseUrl}${path}`, {
    headers: apiSettings.headers,
    ...options,
  }).then(getResponseData);
}

export function getCardsData() {
  return request("/cards");
}

export function getProfileData() {
  return request("/users/me");
}

export function editeProfileData(updatedName, updatedAbout) {
  return request("/users/me", {
    method: "PATCH",
    body: JSON.stringify({ name: updatedName, about: updatedAbout }),
  });
}

export function avatarProfileData(updatedAvatar) {
  return request("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({ avatar: updatedAvatar }),
  });
}

export function addCardApi(name, link) {
  return request("/cards", {
    method: "POST",
    body: JSON.stringify({ name, link }),
  });
}

export function deleteCardApi(id) {
  return request(`/cards/${id}`, { method: "DELETE" });
}

export function likeCardApi(cardId) {
  return request(`/cards/likes/${cardId}`, { method: "PUT" });
}

export function dislikeCardApi(cardId) {
  return request(`/cards/likes/${cardId}`, { method: "DELETE" });
}
