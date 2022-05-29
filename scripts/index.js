function log(arg) {
  console.log(arg);
}

const closePopupButtons = document.querySelectorAll('.popup__close-button');
const popupEditProfile = document.querySelector('.popup_contain_edit-profile');
const popupAddCards = document.querySelector('.popup_contain_add-cards');
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

// Открытие попапа
function openPopup(popupElement) {
  popupElement.classList.add(popupIsOpenCLassName);
}

// Закрытие попапа
function closePopup() {
  const popupElement = document.querySelector(`.${popupIsOpenCLassName}`);
  popupElement.classList.remove(popupIsOpenCLassName);
}

// Сохранение изменений профиля
function saveChangeProfile() {
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}

// Размещение новой карточики и обновление первоначальноо массива
function saveAddingCard() {
  const temporalyObject = {
    name: inputLocation.value,
    link: inputLinkToTheImage.value,
  };
  const cardElement = cardTemplate.content.cloneNode(true);
  const imageElement = cardElement.querySelector('.elements__image');

  imageElement.setAttribute('src', `${temporalyObject.link}`);
  imageElement.setAttribute('alt', `${temporalyObject.name}`);
  cardElement.querySelector('.elements__location').textContent = temporalyObject.name;

  cardContainer.prepend(cardElement);
  initialCards.push(temporalyObject);
  inputLocation.value = '';
  inputLinkToTheImage.value = '';
  closePopup();
}

// Размещение карточек из массива
function addOriginalCards() {
  initialCards.forEach(function (element) {
    const cardElement = cardTemplate.content.cloneNode(true);
    const imageElement = cardElement.querySelector('.elements__image');
    imageElement.setAttribute('src', `${element.link}`);
    imageElement.setAttribute('alt', `${element.name}`);
    cardElement.querySelector('.elements__location').textContent = element.name;

    cardContainer.prepend(cardElement);
  }
  )
};


/* --------------------Назначение слушателей событий-------------------- */

// Первичное добавление карточек
document.addEventListener("DOMContentLoaded", addOriginalCards);

// Назначение кнопок закрытия попапа
for (const closePopupButton of closePopupButtons) {
  closePopupButton.addEventListener('click', () => { closePopup() });
}

// Открытие формы редактирования профиля
openEditProfileButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
});

// Отправка формы редактирования профиля
formEditProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  saveChangeProfile();
});

// Открытие формы добавления карточек
openAddCardButton.addEventListener('click', () => {openPopup(popupAddCards);});

// Отправка формы добавления карточек
formAddCards.addEventListener('submit', (event) => {
  event.preventDefault();
  saveAddingCard();
});