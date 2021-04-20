'use strict';

import { Reason } from './game.js';
import * as sound from './sound.js';

export default class Msg {
  constructor() {
    this.msg = document.querySelector('.msg');
    this.result = document.querySelector('.msg__result');
    this.replay = document.querySelector('.msg__replay');
    this.cancel = document.querySelector('.msg__cancel');

    this.replay.addEventListener('click', () => {
      this.onReplayClick && this.onReplayClick();
    });

    this.cancel.addEventListener('click', () => {
      this.onCancelClick && this.onCancelClick();
    });
  }

  setReplayClickListener(onReplayClick) {
    this.onReplayClick = onReplayClick;
  }

  setCancelClickListener(onCancelClick) {
    this.onCancelClick = onCancelClick;
  }

  show = myResult => {
    switch (myResult) {
      case Reason.win:
        this.result.textContent = `🥕 YOU WIN 🥕`;
        sound.playWin();
        break;
      case Reason.lose:
        this.result.textContent = `🐛 YOU LOSE 🐛`;
        sound.playBug();
        break;
      case Reason.replay:
        this.result.textContent = `🎮 Replay? 🎮`;
        sound.playAlert();
    }
    this.msg.style.visibility = 'visible';
  };

  hide = () => {
    this.msg.style.visibility = 'hidden';
  };
}
