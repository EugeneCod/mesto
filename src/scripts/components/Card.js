export default class Card {
  constructor(item, cardSelector, handleCardClick) {
    this._link = item.link;
    this._name = item.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleBtnLike(evt) {
    evt.target.classList.toggle('elements__button-like_active');
  }

  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.elements__button-like').addEventListener('click', (evt) => {
      this._handleBtnLike(evt);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._element.querySelector('.elements__image');
    this._elementName = this._element.querySelector('.elements__location');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;

    return this._element;
  }
}