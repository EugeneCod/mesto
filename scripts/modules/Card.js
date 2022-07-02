const popupImageView = document.querySelector('.popup_contain_picture');
const popupImage = popupImageView.querySelector('.popup__image');
const popupImageCaption = popupImageView.querySelector('.popup__image-caption');

export class Card {
  constructor(data, cardSelector) {
    this._image = data.link;
    this._location = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  _handleOpenPopup() {
    popupImage.src = this._image;
    popupImage.alt = this._location;
    popupImageCaption.textContent = this._location;
    popupImageView.classList.add('popup_opened');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleBtnLike(evt) {
    evt.target.classList.toggle('elements__button-like_active');
  }

  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });

    this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.elements__button-like').addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const elementImage = this._element.querySelector('.elements__image');
    const elementLocation = this._element.querySelector('.elements__location');

    elementImage.src = this._image;
    elementImage.alt = this._location;
    elementLocation.textContent = this._location;

    return this._element;
  }
}