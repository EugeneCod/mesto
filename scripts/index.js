const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_contain_edit-profile');
const popupAddCards = document.querySelector('.popup_contain_add-cards');
const popupImageView = document.querySelector('.popup_contain_picture');
const popupConatinerImageView = popupImageView.querySelector('.popup__container_contain_picture');
const popupImage = popupConatinerImageView.querySelector('.popup__image');
const popupImageCaption = popupConatinerImageView.querySelector('.popup__image-caption');
const popupIsOpenCLassName = 'popup_opened';

const formEditProfile = document.querySelector('.editing-form_related-to_edit-profile');
const openEditProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about-self');
const inputName = document.querySelector('.editing-form__input-line_assignment_user-name');
const inputAbout = document.querySelector('.editing-form__input-line_assignment_about-self');

const formAddCards = document.querySelector('.editing-form_related-to_add-cards');
const openAddCardButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#card-template');
const cardContainer = document.querySelector('.elements');
const inputLocation = document.querySelector('.editing-form__input-line_assignment_location');
const inputLinkToTheImage = document.querySelector('.editing-form__input-line_assignment_link');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// сброс валидации в форме
const resetValidation = (formElement) => {
  const inputList = (formElement.querySelectorAll('.editing-form__input-line'));
  const errorList = (formElement.querySelectorAll('.editing-form__input-error'));
  const buttonElement = (formElement.querySelector('.editing-form__button'));
  for (const inputElement of inputList) {
    if (inputElement.classList.contains('editing-form__input-line_type_error')) {
      inputElement.classList.remove('editing-form__input-line_type_error');
    }
  }
  for (const errorElement of errorList) {
    if (errorElement.classList.contains('editing-form__input-error_active')) {
      errorElement.classList.remove('editing-form__input-error_active');
    }
  }
  if (buttonElement.classList.contains('editing-form__button_inactive')) {
    buttonElement.classList.remove('editing-form__button_inactive');
    buttonElement.disabled = false;
  }
}

// открыть попап
const openPopup = popupElement => { 
  popupElement.classList.add(popupIsOpenCLassName); 
  addEscKeyEvt();
}

// закрыть попап
const closePopup = () => {
  const popupElement = document.querySelector(`.${popupIsOpenCLassName}`);
  popupElement.classList.remove(popupIsOpenCLassName);
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

// подготовить карточку из шаблона
const createCardElement = (location, link) => {
  const cardElement = cardTemplate.content
    .cloneNode(true)
    .querySelector('.elements__element');
  const elementImage = cardElement.querySelector('.elements__image');

  elementImage.setAttribute('src', `${link}`);
  elementImage.setAttribute('alt', `${location}`);
  cardElement.querySelector('.elements__location').textContent = location;

  addCardButtonsListeners(cardElement);
  elementImage.addEventListener('click', () => handleImageClick(link, location));

  return cardElement;
};

// добавить карточку в DOM
const addCard = (location, link) => {
  const cardElement = createCardElement(location, link);
  cardContainer.prepend(cardElement);
};

// найти карточку, в которой произошло событие
const getCardByEvent = evt => evt.currentTarget.closest('.elements__element');

// удалить карточку из DOM
const deleteCard = evt => {
  const cardElement = getCardByEvent(evt);
  cardElement.remove();
}

// заменить класс кнопке "лайка"
const toggleBtnLikeActive = evt => {
  evt.target.classList.toggle('elements__button-like_active');
};

// открыть окно просмотра изображения из карточки
const handleImageClick = (link, location) => {
  popupImage.src = link;
  popupImage.alt = location;
  popupImageCaption.textContent = location;

  popupImage.className = 'popup__image';
  if (popupImage.naturalHeight / popupImage.naturalWidth < 0.6666666666666667) {
    popupImage.classList.add('popup__image_aspect-ratio_horisontal');
  } else {
    popupImage.classList.add('popup__image_aspect-ratio_vertical');
  }

  openPopup(popupImageView);
};

// добавить обработчики событий кнопкам карточки
const addCardButtonsListeners = cardElement => {
  cardElement.querySelector('.elements__button-delete').addEventListener('click', deleteCard);
  cardElement.querySelector('.elements__button-like').addEventListener('click', toggleBtnLikeActive);
}

// открыть форму добавления карточки
const openAddCardForm = () => {
  openPopup(popupAddCards);
}

// обработать отправку формы добавления карточки
const handleAddCardSubmit = evt => {
  evt.preventDefault();

  const location = inputLocation.value;
  const link = inputLinkToTheImage.value;

  addCard(location, link);
  formAddCards.reset();
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

// *--------------Автоматическое выполнение-----------------

// Добавить карточки из массива
initialCards.forEach(elem => {
  const location = elem.name;
  const link = elem.link;
  addCard(location, link)
});
