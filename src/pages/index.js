import './index.css'
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';

import {
  openEditProfileButton,
  openAddCardButton,
  initialCards,
  configValidation,
  cardTemplateSelector,
  cardContainerSelector,
  popupWithImageSelector,
  popupEditProfileSelector,
  popupAddCardsSelector,
  profileSelectors,
} from '../scripts/utils/constants.js';

const formValidators = {}

// экз. класса информацции профиля
const userInfo = new UserInfo(profileSelectors);

// экз. класса окна просмотра изображения карточки
const popupWithImage = new PopupWithImage({ popupSelector: popupWithImageSelector });

// экз. класса окна с формой редактирования профиля
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  }
});

// экз. класса окна с формой добавления карточек
const popupWithFormAddCards = new PopupWithForm({
  popupSelector: popupAddCardsSelector,
  handleFormSubmit: (formData) => {
    cardList.renderItem(formData);
  }
});

// экз. класса Section для отрисовки карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardContainerSelector);

// обработать клик по изображению карточки
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
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

// *-------------------Слушатели событий--------------------

// открытие формы редактирования профиля
openEditProfileButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  popupWithFormEditProfile.setinputValues(data);
  popupWithFormEditProfile.open();
  formValidators['editingForm'].resetValidation();
});

// открытие формы добавления карточек
openAddCardButton.addEventListener('click', () => {
  popupWithFormAddCards.open()
  formValidators['addCards'].resetValidation();
});


cardList.renderItems();
popupWithImage.setEventListeners();
popupWithFormEditProfile.setEventListeners();
popupWithFormAddCards.setEventListeners();
enableValidation(configValidation);