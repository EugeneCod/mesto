function log(arg) {
  console.log(arg);
}

const closePopupButtons = document.querySelectorAll('.popup__close-button');
const popupEditProfile = document.querySelector('.popup_contain_edit-profile');
const popupAddCards = document.querySelector('.popup_contain_add-cards');
const popupImageView = document.querySelector('.popup_contain_picture');
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
let cardElement;
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

// Вернуть элемент их шаблона
function returnCardElement() {
  return cardElement = cardTemplate.content.cloneNode(true);
}

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

//Удаление карточки
function cardRemove(evt) {
  const deleteButton = evt.target;
  const card = deleteButton.closest('.elements__element');
  card.remove();
}

//Удаление объекта из массива
function objectArrayRemove(evt) {
  let ObjectIndex = -1;
  const card = evt.target.closest('.elements__element');
  const imageLink = card.querySelector('.elements__image').src;
  for (let i = 0; i < initialCards.length; i++) {
    if (initialCards[i].link === imageLink) {
      ObjectIndex = i;
      break;
    }
  }
  initialCards.splice(ObjectIndex, 1);
}

// Размещение новой карточики и обновление первоначальноо массива
function saveAddingCard() {
  const temporalyObject = {
    name: inputLocation.value,
    link: inputLinkToTheImage.value,
  };
  /* ! -----------------------------------отсюда перенес const cardElement в хедер */
  returnCardElement()
  const imageElement = cardElement.querySelector('.elements__image');
  const location = cardElement.querySelector('.elements__location');

  imageElement.setAttribute('src', `${temporalyObject.link}`);
  imageElement.setAttribute('alt', `${temporalyObject.name}`);
  location.textContent = temporalyObject.name;

  // Назначение кнопки "лайка" карточки
  cardElement.querySelector('.elements__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button-like_active');
  });

  // Назначение кнопки удаления карточки из DOM и смежного объекта из массива
  cardElement.querySelector('.elements__button-delete').addEventListener('click', function (evt) {
    cardRemove();

    let ObjectIndex = -1;
    for (let i = 0; i < array.length; i++) {
      if (initialCards[i].name === location.textContent) {
        ObjectIndex = i;
        break;
      }
    }
    initialCards.splice(ObjectIndex, 1);
  });

  cardContainer.prepend(cardElement);
  initialCards.push(temporalyObject);
  inputLocation.value = '';
  inputLinkToTheImage.value = '';
  closePopup();
}

// Размещение карточек из массива
function addOriginalCards() {
  initialCards.forEach(function (element, index, array) {
    const cardElement = cardTemplate.content.cloneNode(true);
    const imageElement = cardElement.querySelector('.elements__image');
    const location = cardElement.querySelector('.elements__location');
    imageElement.setAttribute('src', `${element.link}`);
    imageElement.setAttribute('alt', `${element.name}`);
    location.textContent = element.name;

    // Назначение кнопки "лайка" карточки
    cardElement.querySelector('.elements__button-like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__button-like_active');
    });

    // Назначение кнопки удаления карточки из DOM и смежного объекта из массива
    cardElement.querySelector('.elements__button-delete').addEventListener('click', function (evt) {
      objectArrayRemove(evt);
      cardRemove(evt);
    });

    // Назначение открытия попапа для просмотра изображения
    imageElement.addEventListener('click', function (evt) {
      const popupContainer = popupImageView.querySelector('.popup__container_contain_picture');
      const viewImage = imageElement.cloneNode();
      const viewLocation = location.cloneNode(true);
      const closeButton = popupContainer.querySelector('.popup__close-button');
      log(viewLocation);
      while (!(popupContainer.lastElementChild === closeButton)) {
        popupContainer.removeChild(popupContainer.lastElementChild);
      }

      openPopup(popupImageView);
      popupContainer.insertAdjacentElement('beforeend', viewImage);
      popupContainer.insertAdjacentElement('beforeend', viewLocation);

      if (viewImage.naturalHeight / viewImage.naturalWidth < 0.6666666666666667) {
        viewImage.classList.add('elements__image_viewing-mode_horisontal');
      } else {
        viewImage.classList.add('elements__image_viewing-mode_vertical');
      }
      viewLocation.classList.add('elements__location_viewing-mode')
    });

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
openAddCardButton.addEventListener('click', () => {
  openPopup(popupAddCards);
  inputLinkToTheImage.value = '';
  inputLocation.value = '';
});

// Отправка формы добавления карточек
formAddCards.addEventListener('submit', (event) => {
  event.preventDefault();
  saveAddingCard();
});