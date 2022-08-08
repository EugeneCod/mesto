export default class Card {
  constructor(item, configCard, userId, handleCardClick, handleDeleteCard, toggleLikeServer) {
    this._link = item.link;
    this._name = item.name;
    this._arrayOfLikes = item.likes;
    this.cardId = item._id;
    this.config = configCard
    this._userId = userId;
    this._cardOwnerId = item.owner._id;

    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._toggleLikeServer = toggleLikeServer;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this.config.cardTemplateSelector)
      .content
      .querySelector(this.config.contentTemplateSelector)
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike() {
    this._buttonLike.classList.toggle(this.config.buttonLikeActiveClass);
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteCard(this);
    });

    this._buttonLike.addEventListener('click', () => {
      this._toggleLikeServer(this._isLiked, this.cardId)
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

  _checkRemoveDelButton() {
    if (this._cardOwnerId !== this._userId) {
      this._buttonDelete.remove();
    }
  }

  deleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector(this.config.buttonLikeSelector);
    this._buttonDelete = this._element.querySelector(this.config.buttonDeleteSelector);
    this._elementImage = this._element.querySelector(this.config.imageSelector);
    this._elementName = this._element.querySelector(this.config.locationSelector);
    this._likesCounter = this._element.querySelector(this.config.likesCounterSelector);

    this._setEventListeners();
    this._checkRemoveDelButton();
    this._checkLiked(this._arrayOfLikes);
    if (this._isLiked) { this._toggleLike() };
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;
    this._setLikesNumber(this._arrayOfLikes);

    return this._element;
  }
}