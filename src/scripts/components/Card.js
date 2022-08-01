export default class Card {
  constructor(item, cardSelector, userId, handleCardClick, handleDeleteCard, toggleLikeServer) {
    this._link = item.link;
    this._name = item.name;
    this._arrayOfLikes = item.likes;
    this._cardId = item._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._toggleLikeServer = toggleLikeServer;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike() {
    this._likeButton.classList.toggle('elements__button-like_active');
  }

  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
      this._handleDeleteCard(this._cardId, this._element);
    });

    this._element.querySelector('.elements__button-like').addEventListener('click', () => {
      this._toggleLikeServer(this._isLiked, this._cardId)
        .then((data) => {
          this._checkLiked(data.likes);
          this._toggleLike();
          this._setLikesNumber(data.likes)
        })
        .catch((err) => { console.log(err) })
    });
  }

  _setLikesNumber(arr) {
    this._likesCounter.textContent = arr.length;
  }

  _checkLiked(array) {
    this._isLiked = array.some((item) => {
      return item._id === this._userId;
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._element.querySelector('.elements__image');
    this._elementName = this._element.querySelector('.elements__location');
    this._likesCounter = this._element.querySelector('.elements__likes-counter')
    this._likeButton = this._element.querySelector('.elements__button-like');

    this._checkLiked(this._arrayOfLikes);
    if (this._isLiked) { this._toggleLike() };
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;
    this._setLikesNumber(this._arrayOfLikes);

    return this._element;
  }
}