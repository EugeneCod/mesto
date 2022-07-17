import {popupImageSelector, popupImageCaptionSelector} from '../utils/constants.js'
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.ImageElement = this.popupElement.querySelector(popupImageSelector);
    this.CaptionElement = this.popupElement.querySelector(popupImageCaptionSelector);
  }

  open(name, link) {
    this.ImageElement.src = link;
    this.ImageElement.alt = name;
    this.CaptionElement.textContent = name;
    super.open();
  }
}