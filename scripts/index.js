const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const formEditProfile = document.querySelector('.edit-profile');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about-self');
let inputName = document.querySelector('.edit-profile__input-line_assignment_name');
let inputAbout = document.querySelector('.edit-profile__input-line_assignment_about-self');

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

editButton.addEventListener ('click', openPopup);
closeButton.addEventListener ('click', closePopup);
formEditProfile.addEventListener('submit', formSubmitHandler);