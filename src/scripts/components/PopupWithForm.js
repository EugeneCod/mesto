import { formSelector } from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this.popupElement.querySelector(formSelector);
    this._inputList = Array.from(this.formElement.querySelectorAll(InputSelector));
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((inputElement) => {
      const inputValue = inputElement.textContent;
      const inputName = inputElement.getAttribute('name');
      this.inputValues[inputName] = inputValue;
    })
    return this.inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.formElement.addEventListener('submit', this.handleFormSubmit.bind(this, evt));
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}


/* Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.

Содержит приватный метод _getInputValues, который собирает данные всех полей формы.

Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.

Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.

Для каждого попапа создавайте свой экземпляр класса PopupWithForm. */