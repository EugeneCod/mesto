import { formSelector, InputSelector } from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super({popupSelector});
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(formSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(InputSelector));
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((inputElement) => {
      const inputValue = inputElement.value;
      const inputName = inputElement.name;
      this._inputValues[inputName] = inputValue;
    });
    return this._inputValues;
  }

  setinputValues(data) {
    this._inputList.forEach((inputElement) => {
      inputElement.value = data[inputElement.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}