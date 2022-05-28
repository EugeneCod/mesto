const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const formEditProfile = document.querySelector('.edit-profile');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about-self');
const inputName = document.querySelector('.edit-profile__input-line_assignment_name');
const inputAbout = document.querySelector('.edit-profile__input-line_assignment_about-self');


function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}

function openPopup () {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened')
}

document.addEventListener("DOMContentLoaded", addOriginalCards)

editButton.addEventListener ('click', openPopup);
closeButton.addEventListener ('click', closePopup);
formEditProfile.addEventListener('submit', formSubmitHandler);



/* --------------Функционал добавления карточек-------------- */

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


function addOriginalCards() {
  initialCards.forEach(function (element) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true);
    const cardContainer = document.querySelector('.elements');
    const imageElement = cardElement.querySelector('.elements__image');

    imageElement.setAttribute('src', `${element.link}`);
    imageElement.setAttribute('alt', `${element.name}`);
    cardElement.querySelector('.elements__location').textContent = element.name;

    cardContainer.prepend(cardElement);
  }
)};

// addOriginalCards();
