export default class Api {
  constructor(configApi) {
    this._host = configApi.host;
    this._token = configApi.token;
  }

  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }
  }

  _getHeaders() {
    return {
      authorization: this._token,
      'Content-Type': 'application/json',
    }
  }

  getUserInfo() {
    return fetch(`${this._host}/users/me`, {
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  setUserInfo(data) {
    return fetch(`${this._host}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._getJsonOrError)
  }

  getCards() {
    return fetch(`${this._host}/cards`, {
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  toggleLike(isLiked, cardId) {
    let method;
    if (isLiked) {
      method = 'DELETE';
    } else {
      method = 'PUT'
    }
    return fetch(`${this._host}/cards/${cardId}/likes`, {
      method: `${method}`,
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }
}