'use strict';

export default class Info {
  constructor() {
    this.info = document.querySelector('.info');
  }

  show = () => {
    this.info.style.visibility = 'visible';
  };

  hide() {
    this.info.style.visibility = 'hidden';
  }
}
