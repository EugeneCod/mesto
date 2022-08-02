export default class UserInfo {
  constructor({ selectors, fetchUserInfo }) {
    this.name = document.querySelector(selectors.nameSelector);
    this.about = document.querySelector(selectors.aboutSelfSelector);
    this.profileImage = document.querySelector(selectors.profileImageSelector);
    this.fetchUserInfo = fetchUserInfo;
  }

  getUserInfo() {
    return this.userInfo = {
      name: this.name.textContent,
      about: this.about.textContent,
    };
  }

  setUserInfoOnClient(data) {
    this.name.textContent = data.name;
    this.about.textContent = data.about;
  }

  setUserInfoOnServer(data) {
    this.fetchUserInfo(data)
    .then((dataJson) => {
      this.setUserInfoOnClient(dataJson)
    })
    .catch(err => console.log(err));
  }

  setUserAvatar(data) {
    this.profileImage.src = data.avatar;
  }

  getUserId() {
    return this.id;
  }

  setUserId(data) {
    this.id = data._id;
  }
  
  updateUserAvatar(data) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-47/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'fecf0c0a-0938-47a0-bc3a-dfac6e5ffd59',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(response => response.json())
    .then(data => this.setUserAvatar(data))
  }
}

