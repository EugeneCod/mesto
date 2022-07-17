export  const initialCards = [
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

export const cardTemplateSelector = '#card-template';
export const cardContainerSelector = '.elements';
export const popupImageSelector = '.popup__image';
export const popupImageCaptionSelector = '.popup__image-caption';
export const popupWithImageSelector = '.popup_contain_picture';
export const popupEditProfileSelector = '.popup_contain_edit-profile';
export const popupAddCardsSelector = '.popup_contain_add-cards';
export const formSelector = '.editing-form';
export const InputSelector = '.editing-form__input-line';

export const profileSelectors = {
  nameSelector: '.profile__name',
  aboutSelfSelector: '.profile__about-self'
}

/* export const filterButtons = [
  {
    buttonClass: 'filter__button_type_grid',
    isGrid: true
  },
  {
    buttonClass: 'filter__button_type_column',
    isGrid: false
  }
];

export const cardListSelector = '.card-list__items';
export const filterListSelector = '.filter';
export const filterButtonTemplate = '.filter-button';
export const cardList = document.querySelector('.card-list__items');
export const popupElement = document.querySelector('.popup');
export const popupCloseButton = document.querySelector('.popup__close');
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');
export const defaultCardButton = document.querySelector('.filter__button_type_grid');
export const horizontalCardButton = document.querySelector('.filter__button_type_column'); */