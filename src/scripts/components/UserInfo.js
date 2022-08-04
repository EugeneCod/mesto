export default class UserInfo {
  constructor({ config }) {
    this.name = document.querySelector(config.nameSelector);
    this.about = document.querySelector(config.aboutSelfSelector);
    this.profileImage = document.querySelector(config.profileImageSelector);
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

  getUserAvatar() {
    return this.profileImage.src;
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
}

