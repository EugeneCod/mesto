import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';

import {
  openEditProfileButton,
  openAddCardButton,
  inputName,
  inputAboutSelf,
  initialCards,
  cardTemplateSelector,
  cardContainerSelector,
  popupWithImageSelector,
  popupEditProfileSelector,
  popupAddCardsSelector,
  profileSelectors,
} from '../scripts/utils/constants.js';


const userInfo = new UserInfo(profileSelectors);

const popupWithImage = new PopupWithImage({popupSelector: popupWithImageSelector});
popupWithImage.setEventListeners();

const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  }});
popupWithFormEditProfile.setEventListeners();

const popupWithFormAddCards = new PopupWithForm({
  popupSelector: popupAddCardsSelector,
  handleFormSubmit: (formData) => {
    console.log(formData);
    const card = new Card(formData, cardTemplateSelector, handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }});
popupWithFormAddCards.setEventListeners();

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardContainerSelector);


// открытие формы редактирования профиля
openEditProfileButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  inputName.value = data.name;
  inputAboutSelf.value = data.aboutSelf;
  popupWithFormEditProfile.open()
  // formValidators['editingForm'].resetValidation();
});

// открытие формы добавления карточек
openAddCardButton.addEventListener('click', () => {
  popupWithFormAddCards.open()
  // formValidators['addCards'].resetValidation();
});

cardList.renderItems();

















const config = {
  formSelector: '.editing-form',
  inputSelector: '.editing-form__input-line',
  errorSelector: '.editing-form__input-error',
  spanErrorSelector: '.editing-form__input-error_for_',
  submitButtonSelector: '.editing-form__button',
  inputErrorClass: 'editing-form__input-line_type_error',
  errorClass: 'editing-form__input-error_active',
  inactiveButtonClass: 'editing-form__button_inactive',
}

const formValidators = {}

const formEditProfile = document.querySelector('.editing-form_related-to_edit-profile')
const formEditProfileName = formEditProfile.getAttribute('name');

// const profileName = document.querySelector('.profile__name');
// const profileAbout = document.querySelector('.profile__about-self');
/* const inputName = document.querySelector('.editing-form__input-line_assignment_user-name');
const inputAboutSelf = document.querySelector('.editing-form__input-line_assignment_about-self'); */

const formAddCards = document.querySelector('.editing-form_related-to_add-cards');
const formAddCardsName = formAddCards.getAttribute('name');




const inputLocation = document.querySelector('.editing-form__input-line_assignment_location');
const inputLinkToTheImage = document.querySelector('.editing-form__input-line_assignment_link');

// открыть попап
/* const openPopup = popupElement => {
  popupElement.classList.add(popupIsOpenClassName);
  addEscKeyEvt(popupElement);
} */

// закрыть попап
/* const closePopup = popupElement => {
  popupElement.classList.remove(popupIsOpenClassName);
  removeEscKeyEvt();
} */

// открыть форму редактирования профиля
/* const openEditProfileForm = () => {
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  formValidators[formEditProfileName].resetValidation();
} */

// обработать отправку формы редактирования профиля
/* const handleEditProfileSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEditProfile);
} */



// обработать отправку формы добавления карточки
const handleAddCardSubmit = evt => {
  evt.preventDefault();

  const data = {
    name: inputLocation.value,
    link: inputLinkToTheImage.value
  }

  formAddCards.reset();
  addCard(prepareCard(data));
  closePopup(popupAddCards)
};

// добавить обработчик нажатия на клавишу 'Escape'
/* const addEscKeyEvt = () => {
  document.addEventListener('keydown', handleEscapeKey);
} */

// удалить обработчик нажатия на клавишу 'Escape'
/* const removeEscKeyEvt = () => {
  document.removeEventListener('keydown', handleEscapeKey);
} */

// обработать нажатие на клавишу 'Escape'
/* const handleEscapeKey = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
} */

// подготовить карточку из класса Card
/* const prepareCard = (data) => {
  const card = new Card(data, cardTemplateSelector, handleCardClick)
  const cardElement = card.generateCard();

  return cardElement;
} */

// добавить карточку в DOM
/* const addCard = (cardElement) => {
  cardContainer.prepend(cardElement);
}; */

// Отобразить карточки из массива
/* const renderElements = () => {
  initialCards.forEach((item) => {
    addCard(prepareCard(item));
  });
}; */

// обработать клик по картинке в карточке
/* const handleCardClick = (name, link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImageView);
} */

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



// отправка формы добавления карточек
// formAddCards.addEventListener('submit', handleAddCardSubmit);



// отправка формы редактирования профиля
// formEditProfile.addEventListener('submit', handleEditProfileSubmit);

// слушатель клика по области всплывающего окна
/* for (const popupElement of popups) {
  popupElement.addEventListener('click', evt => {
    if ((evt.target === evt.currentTarget)
      || (evt.target === popupElement.querySelector('.popup__close-button'))) {
      closePopup(popupElement);
    }
  });
} */

// renderElements();
// enableValidation(config);