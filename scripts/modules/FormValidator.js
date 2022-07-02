export class FormValidator {
  constructor (data, formElement) {
    this._formElement = formElement
    this._fieldSetSelector = data.fieldSetSelector
    this._inputSelector = data.inputSelector
    this._errorSelector = data.errorSelector
    this._spanErrorSelector = data.spanErrorSelector
    this._submitButtonSelector = data.submitButtonSelector
    this._inputErrorClass = data.inputErrorClass
    this._errorClass = data.errorClass
    this._inactiveButtonClass = data.inactiveButtonClass
  }

  // показать ошибку
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`${this._spanErrorSelector}${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // скрыть ошибку
  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`${this._spanErrorSelector}${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // проверить валидность поля ввода
  _checkInputValidity (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  // проверить валидность массива полей ввода
  _hasInvalidInput (inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  // активация и дезактивация кнопки отправки формы
  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  // добавить слушатели ввода
  _setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  // активировть валидацию
  enableValidation() {
    if (this._fieldSetSelector) {
      const fieldsetList = Array.from(this._formElement.querySelectorAll(this._fieldSetSelector));
      fieldsetList.forEach((fieldset) => {
        this._setEventListeners(fieldset);
      });
    } else {
      this._setEventListeners(this._formElement);
    }
  } 
}