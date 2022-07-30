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

  setAvatar(data) {
    this.profileImage.src = data.avatar;
  }
}