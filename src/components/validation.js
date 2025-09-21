function showValidationMessage(input, form, selectors) {
  const errorText = form.querySelector(`.${input.id}-error`);
  input.classList.add(selectors.inputErrorClass);
  errorText.classList.add(selectors.errorClass);
  errorText.textContent = input.validationMessage;
}

function hideValidationMessage(input, form, selectors) {
  const errorText = form.querySelector(`.${input.id}-error`);
  input.classList.remove(selectors.inputErrorClass);
  errorText.classList.remove(selectors.errorClass);
  errorText.textContent = "";
}

function enableBrowserError(input) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }
}

function enablePatternError(input, form, selectors) {
  if (!input.validity.valid) {
    showValidationMessage(input, form, selectors);
  } else {
    hideValidationMessage(input, form, selectors);
  }
}

export function setDisabledBtn(isDisabled, selectors, btn) {
  if (isDisabled) {
    btn.disabled = true;
    btn.classList.add(selectors.inactiveButtonClass);
  } else {
    btn.disabled = false;
    btn.classList.remove(selectors.inactiveButtonClass);
  }
}

function callbackInputValidation(input, button, form, selectors) {
  setDisabledBtn(!form.checkValidity(), selectors, button);
  enableBrowserError(input);
  enablePatternError(input, form, selectors);
}

function inputValidation(input, button, form, selectors) {
  input.addEventListener("input", () => callbackInputValidation(input, button, form, selectors));
}

function formValidation(form, selectors) {
  const inputs = form.querySelectorAll(selectors.inputSelector);
  const button = form.querySelector(selectors.submitButtonSelector);
  inputs.forEach((input) => inputValidation(input, button, form, selectors));
}

export function enableValidation(selectors) {
  const forms = document.querySelectorAll(selectors.formSelector);
  forms.forEach((form) => {
    formValidation(form, selectors);
    const btn = form.querySelector(selectors.submitButtonSelector);
    if (btn) setDisabledBtn(!form.checkValidity(), selectors, btn);
  });
}

export function clearValidation(form, config) {
  form.querySelectorAll(config.inputSelector).forEach((input) => {
    hideValidationMessage(input, form, config);
  });
}