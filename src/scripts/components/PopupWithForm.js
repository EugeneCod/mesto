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
    })
    return this._inputValues;
  }

/*   _getInputValues() {
    this._inputList = this._element.querySelectorAll('.form__input');
    
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    
    return this._formValues;
  } */

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