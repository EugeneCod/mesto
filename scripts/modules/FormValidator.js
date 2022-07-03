export class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._inputSelector = data.inputSelector;
    this._errorSelector = data.errorSelector;
    this._spanErrorSelector = data.spanErrorSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inactiveButtonClass = data.inactiveButtonClass;

    this._inputList = Array
      .from(this._formElement
      .querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement
      .querySelector(this._submitButtonSelector);
  }

  // сброс ошибок
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  // показать ошибку
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`${this._spanErrorSelector}${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // скрыть ошибку
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`${this._spanErrorSelector}${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // проверить валидность поля ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // проверить валидность массива полей ввода
  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  // активация и дезактивация кнопки отправки формы
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // добавить слушатели ввода
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  // активировть валидацию
  enableValidation() {
    this._setEventListeners();
  }
}