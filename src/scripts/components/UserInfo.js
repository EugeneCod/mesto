export default class UserInfo {
  constructor(data) {
    this.name = document.querySelector(data.nameSelector);
    this.about = document.querySelector(data.aboutSelfSelector);
    this.profileImage = document.querySelector(data.profileImageSelector);
  }

  getUserInfo() {
    return this.userInfo = {
      name: this.name.textContent,
      about: this.about.textContent,
    };
  }

  setUserInfo(data) {
    this.name.textContent = data.name;
    this.about.textContent = data.about;
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


  updateUserInfo(data) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-47/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'fecf0c0a-0938-47a0-bc3a-dfac6e5ffd59',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(response => response.json())
    .then(data => this.setUserInfo(data))
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

