import { formSelector } from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super({popupSelector});
    this._formElement = this._popupElement.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}