import {initialCards} from './modules/cards.js';
import {Card} from './modules/Card.js';

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_contain_edit-profile');
const popupAddCards = document.querySelector('.popup_contain_add-cards');
const popupIsOpenClassName = 'popup_opened';

const formEditProfile = document.querySelector('.editing-form_related-to_edit-profile');
const openEditProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about-self');
const inputName = document.querySelector('.editing-form__input-line_assignment_user-name');
const inputAbout = document.querySelector('.editing-form__input-line_assignment_about-self');

const formAddCards = document.querySelector('.editing-form_related-to_add-cards');
const AddCardsButtonSubmit = formAddCards.querySelector('.editing-form__button');

const openAddCardButton = document.querySelector('.profile__add-button');
const cardTemplateSelector = '#card-template';
const cardContainer = document.querySelector('.elements');
const inputLocation = document.querySelector('.editing-form__input-line_assignment_location');
const inputLinkToTheImage = document.querySelector('.editing-form__input-line_assignment_link');

// открыть попап
const openPopup = popupElement => { 
  popupElement.classList.add(popupIsOpenClassName); 
  addEscKeyEvt();
}

// закрыть попап
const closePopup = () => {
  const popupElement = document.querySelector(`.${popupIsOpenClassName}`);
  popupElement.classList.remove(popupIsOpenClassName);
  removeEscKeyEvt();
}

// открыть форму редактирования профиля
const openEditProfileForm = () => {
  resetValidation(formEditProfile);
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

// обработать отправку формы редактирования профиля
const handleEditProfileSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}

// открыть форму добавления карточки
const openAddCardForm = () => {
  openPopup(popupAddCards);
}

// обработать отправку формы добавления карточки
const handleAddCardSubmit = evt => {
  evt.preventDefault();

  const data = {
    name: inputLocation.value,
    link: inputLinkToTheImage.value
  }

  AddCardsButtonSubmit.classList.add('editing-form__button_inactive');
  AddCardsButtonSubmit.disabled = true;
  formAddCards.reset();
  addCard(prepareCard(data));
  closePopup()
};

// добавить обработчик нажатия на клавишу 'Escape'
const addEscKeyEvt = () => {
  document.addEventListener('keydown', handleEscapeKey);
}

// удалить обработчик нажатия на клавишу 'Escape'
const removeEscKeyEvt = () => {
  document.removeEventListener('keydown', handleEscapeKey);
}

// обработать нажатие на клавишу 'Escape'
const handleEscapeKey = evt => {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

// подготовить карточку из класса Card
const prepareCard = (data) => {
  const card = new Card(data, cardTemplateSelector)
  const cardElement = card.generateCard();

  return cardElement;
}

// добавить карточку в DOM
const addCard = (cardElement) => {
  cardContainer.prepend(cardElement);
};

// Отобразить карточки из массива
const renderElements = () => {
  initialCards.forEach((item) => {
    addCard(prepareCard(item));
  });
};

// *-------------------Слушатели событий--------------------

// открытие формы добавления карточек
openAddCardButton.addEventListener('click', openAddCardForm);

// отправка формы добавления карточек
formAddCards.addEventListener('submit', handleAddCardSubmit);

// открытие формы редактирования профиля
openEditProfileButton.addEventListener('click', openEditProfileForm);

// отправка формы редактирования профиля
formEditProfile.addEventListener('submit', handleEditProfileSubmit);

// слушатель клика по области всплывающего окна
for (const popupElement of popups) {
  popupElement.addEventListener('click', evt => {
    if ((evt.target === evt.currentTarget)
      ||(evt.target === popupElement.querySelector('.popup__close-button'))) {
        closePopup();
    }
  });
}

renderElements();