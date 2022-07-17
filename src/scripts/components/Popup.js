export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this.popupOpenClass = 'popup_opened';
  }

  open() {
    this.popupElement.classList.add(this.popupOpenClass);
  }

  close() {
    this.popupElement.classList.remove(this.popupOpenClass);
  }

  setEventListeners() {
    this.popupElement.addEventListener('click', evt => {
      if ((evt.target === evt.currentTarget)
        || (evt.target === this.popupElement.querySelector('.popup__close-button'))) {
        this.close();
      }
    });
  }
}