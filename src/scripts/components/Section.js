export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, method) {
    if (method === 'prepend') {
      this._container.prepend(element);
    } else if (method === 'append') {
      this._container.append(element);
    }

  }

  renderItem(item, method) {
    this._renderer(item, method);
  }

  renderItems(items, method) {
    items.forEach((item) => {
      this._renderer(item, method);
    });
  }
}

