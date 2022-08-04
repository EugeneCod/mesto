export default class UserInfo {
  constructor({ config, fetchUserInfo, fetchUserAvatar }) {
    this.name = document.querySelector(config.nameSelector);
    this.about = document.querySelector(config.aboutSelfSelector);
    this.profileImage = document.querySelector(config.profileImageSelector);
    this.fetchUserInfo = fetchUserInfo;
    this.fetchUserAvatar = fetchUserAvatar;
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
    return this.fetchUserInfo(data)
    .then((dataJson) => {
      this.setUserInfoOnClient(dataJson)
    })
    .catch(err => console.log(err));
  }

  getUserAvatar() {
    return this.profileImage.src;
  }

  setUserAvatarOnClient(data) {
    this.profileImage.src = data.avatar;
  }

  setUserAvatarOnServer(data) {
    return this.fetchUserAvatar(data)
    .then((dataJson) => {
      this.setUserAvatarOnClient(dataJson)
    })
    .catch(err => console.log(err));
  }

  getUserId() {
    return this.id;
  }

  setUserId(data) {
    this.id = data._id;
  }
}

