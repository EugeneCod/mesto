import { formSelector } from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._formElement = this._popupElement.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;

    console.log(this._popupElement);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._id, this._cardElement);
      this.close();
    });
  }

  open(id, cardElement) {
    this._cardElement = cardElement;
    this._id = id;
    super.open();
  }
}