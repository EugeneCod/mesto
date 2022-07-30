export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    console.log(this._renderedItems)
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItem(item) { 
    this._renderer(item);
}

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}