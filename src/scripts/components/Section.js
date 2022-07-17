export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this.container.append(element);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}