import {popupImageSelector, popupImageCaptionSelector} from '../utils/constants.js'
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector}) {
    super({popupSelector});
    this._imageElement = this._popupElement.querySelector(popupImageSelector);
    this._captionElement = this._popupElement.querySelector(popupImageCaptionSelector);
  }

  open(name, link) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}