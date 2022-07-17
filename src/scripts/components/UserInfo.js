export default class UserInfo {
  constructor(data) {
    this.name = document.querySelector(data.nameSelector);
    this.aboutSelf = document.querySelector(data.aboutSelfSelector);
  }

  getUserInfo() {
    return this.userInfo = {
      name: this.name.textContent,
      aboutSelf: this.aboutSelf.textContent,
    };
  }

  setUserInfo(name, aboutSelf) {
    this.name.textContent = name;
    this.aboutSelf.textContent = aboutSelf;
  }
}