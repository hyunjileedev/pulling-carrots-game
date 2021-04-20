'use strict';

export const Item = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Field {
  constructor(carrotsCount, bugsCount) {
    this.carrotsCount = carrotsCount;
    this.bugsCount = bugsCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  displayItems() {
    for (let i = 0; i < this.carrotsCount; i++) {
      const carrot = this._createItem(Item.carrot);
      this.field.appendChild(carrot);
    }
    for (let i = 0; i < this.bugsCount; i++) {
      const bug = this._createItem(Item.bug);
      this.field.appendChild(bug);
    }
  }

  _createItem(itemName) {
    const item = document.createElement('img');
    item.setAttribute('src', `img/${itemName}.png`);
    item.setAttribute('class', `${itemName}`);

    const itemWidth = itemName === Item.carrot ? 80 : 50;
    const x1 = 0;
    const x2 = this.fieldRect.width - itemWidth;
    const y1 = 0;
    const y2 = this.fieldRect.height - itemWidth;

    item.style.position = 'absolute';
    item.style.left = `${random(x1, x2)}px`;
    item.style.top = `${random(y1, y2)}px`;

    return item;
  }

  reset() {
    this.field.innerHTML = '';
  }

  onClick = e => {
    const target = e.target;
    if (target.matches(`.${Item.carrot}`)) {
      this.onItemClick && this.onItemClick(target, Item.carrot);
    } else if (target.matches(`.${Item.bug}`)) {
      this.onItemClick && this.onItemClick(target, Item.bug);
    }
  };
}

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
