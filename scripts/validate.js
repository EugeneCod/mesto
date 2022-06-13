// показать ошибку
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.editing-form__input-error_for_${inputElement.id}`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// скрыть ошибку
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.editing-form__input-error_for_${inputElement.id}`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

// проверить валидность поля ввода
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

// проверить валидность массива полей ввода
const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}


// активация и дезактивация кнопки отправки формы
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// добавить слушатели ввода
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

// активировть валидацию
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldSetSelector));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, settings);
    });
  });
};

enableValidation({
  formSelector: '.editing-form',
  fieldSetSelector: '.editing-form__fieldset',
  inputSelector: '.editing-form__input-line',
  submitButtonSelector: '.editing-form__button',
  inactiveButtonClass: 'editing-form__button_inactive',
  inputErrorClass: 'editing-form__input-line_type_error',
  errorClass: 'editing-form__input-error_active',
});