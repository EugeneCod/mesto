import { formSelector, inputSelector, buttonSubmitSelector} from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super({popupSelector});
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(formSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(inputSelector));
    this._buttonSubmit =  this._formElement.querySelector(buttonSubmitSelector);
    this._buttonInitialText = this._buttonSubmit.textContent;
    this.renderLoading = this.renderLoading.bind(this);
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
      this._handleFormSubmit(evt, this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = this._buttonInitialText;
    }
  } 

  close() {
    super.close();
    this._formElement.reset();
  }
}