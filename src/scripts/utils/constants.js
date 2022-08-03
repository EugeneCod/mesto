export const openEditProfileButton = document.querySelector('.profile__edit-button');
export const openAddCardButton = document.querySelector('.profile__add-button');

export const cardTemplateSelector = '#card-template';
export const cardTemplateSelectorWidthoutDel = '#card-template-without-del';
export const cardContainerSelector = '.elements';
export const popupImageSelector = '.popup__image';
export const popupImageCaptionSelector = '.popup__image-caption';
export const popupWithImageSelector = '.popup_contain_picture';
export const popupEditProfileSelector = '.popup_contain_edit-profile';
export const popupEditAvatarSelector = '.popup_contain_edit-avatar';
export const popupAddCardsSelector = '.popup_contain_add-cards';
export const popupWithConfirmSelector = '.popup_contain_confirm';
export const formSelector = '.editing-form';
export const InputSelector = '.editing-form__input-line';

export const profileSelectors = {
  nameSelector: '.profile__name',
  aboutSelfSelector: '.profile__about-self',
  profileImageSelector: '.profile__image'
}

export const configCard = {
  cardTemplateSelector: '#card-template',
  contentTemplateSelector: '.elements__element',
  buttonLikeSelector: '.elements__button-like',
  likesCounterSelector: '.elements__likes-counter',
  buttonDeleteSelector: '.elements__button-delete',
  imageSelector: '.elements__image',
  locationSelector: '.elements__location',
  buttonLikeActiveClass: 'elements__button-like_active',
}

export const configApi = {
  host: 'https://mesto.nomoreparties.co/v1/cohort-47',
  token: 'fecf0c0a-0938-47a0-bc3a-dfac6e5ffd59'
}

export const configValidation = {
  formSelector: '.editing-form',
  inputSelector: '.editing-form__input-line',
  errorSelector: '.editing-form__input-error',
  spanErrorSelector: '.editing-form__input-error_for_',
  submitButtonSelector: '.editing-form__button',
  inputErrorClass: 'editing-form__input-line_type_error',
  errorClass: 'editing-form__input-error_active',
  inactiveButtonClass: 'editing-form__button_inactive',
}