import './index.css'
import Api from '../scripts/components/Api.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js.js'
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';

import {
  openEditProfileButton,
  openAddCardButton,
  avatarElement,
  configValidation,
  configApi,
  configCard,
  configProfile,
  cardContainerSelector,
  popupWithImageSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector,
  popupAddCardsSelector,
  popupWithConfirmSelector,
} from '../scripts/utils/constants.js';

const formValidators = {}

const api = new Api(configApi);

// экз. класса информацции профиля
const userInfo = new UserInfo({
  config: configProfile,
  fetchUserInfo: (data) => {
    return api.setUserInfo(data);
  },
  fetchUserAvatar: (data) => {
    return api.setAvatar(data);
  },
});

// экз. класса окна просмотра изображения карточки
const popupWithImage = new PopupWithImage({ popupSelector: popupWithImageSelector });

// экз. класса окна с формой редактирования профиля
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: (formData) => {
    return userInfo.setUserInfoOnServer(formData)
  }
});

// экз. класса окна с формой добавления карточек
const popupWithFormAddCards = new PopupWithForm({
  popupSelector: popupAddCardsSelector,
  handleFormSubmit: (formData) => {
    return api.addCard(formData)
      .then(dataJson => cardList.renderItem(dataJson, 'prepend'))
      .catch(err => console.log(err))
  }
});

// экз. класса окна с формой редактирования аватара
const popupWithFormEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  handleFormSubmit: (formData) => {
    return userInfo.setUserAvatarOnServer(formData)
  }
});

// экз. класса окна с подтвержением удаления
const popupWithConfirmDel = new PopupWithConfirmation({
  popupSelector: popupWithConfirmSelector,
  handleFormSubmit: (cardId, element) => {
    api.deleteCard(cardId)
      .then(cardList.deleteItem(element))
  }
});

// экз. класса Section для отрисовки карточек
const cardList = new Section({
  renderer: (item, method) => {
    const userId = userInfo.getUserId();
    const card = new Card(
      item,
      configCard,
      userId,
      handleCardClick,
      handleDeleteCard,
      handleBtnLike);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement, method);
  }
}, cardContainerSelector);

// обработать клик по изображению карточки
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

// обработать клик по иконке удаления
const handleDeleteCard = (cardId, cardElement) => {
  popupWithConfirmDel.open(cardId, cardElement);
}

// обработать клик по иконке лайка
const handleBtnLike = (cardId, isLiked) => {
  return api.toggleLike(cardId, isLiked);
}

// включить влидацию для всех форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

// загрузить и отобразить данные профиля и карточки
Promise.all([
  api.getUserInfo(),
  api.getCards(),
])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfoOnClient(userData);
    userInfo.setUserAvatarOnClient(userData);
    userInfo.setUserId(userData);

    cardList.renderItems(cardsData, 'append');
  })
  .catch(err => console.log(`${err} при первичной загрузке данных`));

// *-------------------Слушатели событий--------------------

// открытие формы редактирования профиля
openEditProfileButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  popupWithFormEditProfile.setinputValues(data);
  popupWithFormEditProfile.open();
  formValidators['editingForm'].resetValidation();
});

// открытие формы редактирования аватара
avatarElement.addEventListener('click', () => {
  popupWithFormEditAvatar.open()
  formValidators['edit-avatar'].resetValidation();
});

// открытие формы добавления карточек
openAddCardButton.addEventListener('click', () => {
  popupWithFormAddCards.open()
  formValidators['addCards'].resetValidation();
});

popupWithImage.setEventListeners();
popupWithFormEditProfile.setEventListeners();
popupWithFormAddCards.setEventListeners();
popupWithConfirmDel.setEventListeners();
popupWithFormEditAvatar.setEventListeners();
enableValidation(configValidation);