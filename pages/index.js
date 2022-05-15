'use strict'

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const formEditProfile = document.querySelector('.edit-profile');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about-self');
let inputName = document.querySelector('.edit-profile__input-line_assignment_name');
let inputAbout = document.querySelector('.edit-profile__input-line_assignment_about-self');

editButton.addEventListener ('click', () => 
  popup.classList.add('popup_opened'),
  inputName.value = profileName.textContent,
  inputAbout.value = profileAbout.textContent,
);

closeButton.addEventListener ('click', () => 
  popup.classList.remove('popup_opened')
);

formEditProfile.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popup.classList.remove('popup_opened');
}