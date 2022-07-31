export default class Card {
  constructor(item, cardSelector, handleCardClick, handleDeleteCard) {
    this._link = item.link;
    this._name = item.name;
    this._likes = item.likes.length;
    this.id = item._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this.handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  _deleteCard() {
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
      this._handleDeleteCard(this.id);
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
    this._likesCounter = this._element.querySelector('.elements__likes-counter')

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;
    this._likesCounter.textContent = this._likes;

    return this._element;
  }
}