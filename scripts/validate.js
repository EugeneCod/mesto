const settings = {
  formSelector: '.editing-form',
  fieldSetSelector: '.editing-form__fieldset',
  inputSelector: '.editing-form__input-line',
  errorSelector: '.editing-form__input-error',
  submitButtonSelector: '.editing-form__button',
  inputErrorClass: 'editing-form__input-line_type_error',
  errorClass: 'editing-form__input-error_active',
  inactiveButtonClass: 'editing-form__button_inactive',
}

// сброс валидации в форме
const resetValidation = (formElement) => {
  const inputList = (formElement.querySelectorAll(settings.inputSelector));
  const errorList = (formElement.querySelectorAll(settings.errorSelector));
  const buttonElement = (formElement.querySelector(settings.submitButtonSelector));
  for (const inputElement of inputList) {
    if (inputElement.classList.contains(settings.inputErrorClass)) {
      inputElement.classList.remove(settings.inputErrorClass);
    }
  }
  for (const errorElement of errorList) {
    if (errorElement.classList.contains(settings.errorClass)) {
      errorElement.classList.remove(settings.errorClass);
    }
  }
  if (buttonElement.classList.contains(settings.inactiveButtonClass)) {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

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
    const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldSetSelector));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, settings);
    });
  });
};

enableValidation(settings);