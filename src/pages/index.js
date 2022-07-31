import './index.css'
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirm from '../scripts/components/PopupWIthConfirm.js'
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';

import {
  openEditProfileButton,
  openAddCardButton,
  configValidation,
  cardTemplateSelector,
  cardTemplateSelectorWidthoutDel,
  cardContainerSelector,
  popupWithImageSelector,
  popupEditProfileSelector,
  popupAddCardsSelector,
  popupWithConfirmSelector,
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
    userInfo.updateUserInfo(formData);
  }
});

// экз. класса окна с формой добавления карточек
const popupWithFormAddCards = new PopupWithForm({
  popupSelector: popupAddCardsSelector,
  handleFormSubmit: (formData) => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-47/cards', {
      method: 'POST',
      headers: {
        authorization: 'fecf0c0a-0938-47a0-bc3a-dfac6e5ffd59',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        link: formData.link
      })
    })
    .then(response => response.json())
    .then(data => cardList.renderItem(data, 'prepend'))
    // cardList.renderItem(formData, 'prepend')
  }
});

// экз. класса окна с подтвержением удаления
const popupWithConfirmDel = new PopupWithConfirm({
  popupSelector: popupWithConfirmSelector,
  handleFormSubmit: (cardId, element) => {
    const promise = new Promise((resolve, reject) => {
    //   fetch(`https://mesto.nomoreparties.co/v1/cohort-47/cards/${cardId}`, {
    //   method: 'DELETE',
    //   headers: {
    //     authorization: 'fecf0c0a-0938-47a0-bc3a-dfac6e5ffd59'
    //   }
    // })
    // .then(response => response.json())
    // .then(data => console.log(data));
    console.log('Запрос на сервер выполнен.');
    resolve();
    });
    promise
      .then(cardList.deleteItem(element))
  }
});

// popupWithConfirmDel.open();
const button = document.querySelector('.profile__image');
button.addEventListener('click', () => {
  popupWithConfirmDel.open();
})

// экз. класса Section для отрисовки карточек
const cardList = new Section({
  renderer: (item, method) => {
    let templateSelector;
    if(item.owner._id === userInfo.getUserId()) {
      templateSelector = cardTemplateSelector;
    } else {
      templateSelector = cardTemplateSelectorWidthoutDel;
    }
    const card = new Card(item, templateSelector, handleCardClick, handleDeleteCard);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement, method);
  }
}, cardContainerSelector);

// обработать клик по изображению карточки
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

const handleDeleteCard = (cardId, cardElement) => {
  popupWithConfirmDel.open(cardId, cardElement);
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

// загрузить и отобразить данные профиля
const renderUserInfo = () => {
  fetch('https://mesto.nomoreparties.co/v1/cohort-47/users/me', {
    headers: {
      authorization: 'fecf0c0a-0938-47a0-bc3a-dfac6e5ffd59'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      userInfo.setUserInfo(result);
      userInfo.setUserAvatar(result);
      userInfo.setUserId(result);
    }); 
}
  
// загрузить и отобразить карточки
const renderCards = () => {
  fetch('https://mesto.nomoreparties.co/v1/cohort-47/cards', {
    headers: {
      authorization: 'fecf0c0a-0938-47a0-bc3a-dfac6e5ffd59'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      cardList.renderItems(result, 'append');
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


// cardList.renderItems();
popupWithImage.setEventListeners();
popupWithFormEditProfile.setEventListeners();
popupWithFormAddCards.setEventListeners();
popupWithConfirmDel.setEventListeners();
enableValidation(configValidation);

renderUserInfo();
renderCards();

// fetch('https://mesto.nomoreparties.co/v1/cohort-47/users/me', {
//       method: 'PATCH',
//       headers: {
//         authorization: 'fecf0c0a-0938-47a0-bc3a-dfac6e5ffd59',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         name: 'Jacques',
//         about: 'Sailor'
//       })
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))