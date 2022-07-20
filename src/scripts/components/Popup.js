export default class Popup {
  constructor({popupSelector}) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupOpenClass = 'popup_opened';
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._buttonCLoseElement = this._popupElement.querySelector('.popup__close-button')
  }

  open() {
    this._popupElement.classList.add(this._popupOpenClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove(this._popupOpenClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }
  
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', evt => {
      if ((evt.target === evt.currentTarget)
        || (evt.target === this._buttonCLoseElement)) {
        this.close();
      }
    });
  }
}