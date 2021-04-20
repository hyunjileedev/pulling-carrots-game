'use strict';

import Info from './info.js';
import { Field, Item } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  replay: 'replay',
});

export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotsCount(carrotsCount) {
    this.carrotsCount = carrotsCount;
    return this;
  }

  withBugsCount(bugsCount) {
    this.bugsCount = bugsCount;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.carrotsCount,
      this.bugsCount
    );
  }
}

class Game {
  constructor(gameDuration, carrotsCount, bugsCount) {
    this.gameDuration = gameDuration;
    this.carrotsCount = carrotsCount;
    this.bugsCount = bugsCount;

    this.game = document.querySelector('.game');
    this.btn = document.querySelector('.header__btn');
    this.timer = document.querySelector('.header__timer');
    this.counter = document.querySelector('.header__counter');
    this.btn.addEventListener('click', this.onBtnClick);

    this.gameInfo = new Info();
    this.gameField = new Field(this.carrotsCount, this.bugsCount);
    this.gameField.setClickListener(this.onItemClick);

    this.isFinished = true;
    this.intervalForTimer;
    this.count = carrotsCount;
  }

  setFinishListener(onFinish) {
    this.onFinish = onFinish;
  }

  setResetListener(onReset) {
    this.onReset = onReset;
  }

  onBtnClick = () => {
    if (this.isFinished) {
      this.start();
    } else {
      this.finish(Reason.replay);
    }
  };

  start() {
    this.isFinished = false;
    this.gameInfo.hide();
    this.showBtn('stop');
    this.startTimer();
    this.startCounter();
    this.gameField.displayItems();
    sound.playBg();
  }

  finish(myResult) {
    this.isFinished = true;
    this.hideBtn();
    clearInterval(this.intervalForTimer);
    this.onFinish && this.onFinish(myResult);
    sound.stopBg();
  }

  reset = () => {
    this.onReset && this.onReset();
    this.showBtn('play');
    this.resetTimer();
    this.resetCounter();
    this.gameField.reset();
    this.gameInfo.show();
  };

  showBtn(btnName) {
    this.btn.innerHTML = `<i class="fas fa-${btnName}"></i>`;
    this.btn.style.visibility = 'visible';
  }

  hideBtn() {
    this.btn.style.visibility = 'hidden';
  }

  startTimer() {
    let sec = this.gameDuration;
    this.setTimer(sec);
    this.intervalForTimer = setInterval(() => {
      this.setTimer(--sec);
      if (sec === 0) {
        sound.playBug();
        this.finish(Reason.lose);
      }
    }, 1000);
  }

  setTimer(sec) {
    const minute = Math.floor(sec / 60);
    const second = sec % 60;
    const modifiedMinute = modifyTime(minute);
    const modifiedSecond = modifyTime(second);
    this.timer.textContent = `${modifiedMinute}:${modifiedSecond}`;
  }

  resetTimer() {
    this.timer.textContent = '00:00';
  }

  startCounter() {
    this.counter.textContent = this.count;
  }

  resetCounter() {
    this.counter.textContent = '0';
    this.count = this.carrotsCount;
  }

  updateCounter() {
    this.counter.textContent = --this.count;
  }

  onItemClick = (target, item) => {
    if (this.isFinished) {
      return;
    }
    if (item === Item.carrot) {
      target.remove();
      sound.playCarrot();
      this.updateCounter();
      if (this.count === 0) {
        this.finish(Reason.win);
      }
    } else if (item === Item.bug) {
      this.finish(Reason.lose);
    }
  };
}

function modifyTime(time) {
  const modifiedTime = time < 10 ? `0${time}` : time;
  return modifiedTime;
}
