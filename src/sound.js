'use strict';

const bugSound = new Audio('sound/bug_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');
const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');

// 당근들을 연속적으로 빠르게 클릭 시 오디오가 재생되지 않는 현상 해결 목적
export function playCarrot() {
  const carrotSound = new Audio('sound/carrot_pull.mp3');
  carrotSound.addEventListener('ended', () => {
    carrotSound.remove();
  });
  carrotSound.play();
}

export function playBug() {
  playSound(bugSound);
}

export function playWin() {
  playSound(winSound);
}

export function playAlert() {
  playSound(alertSound);
}

export function playBg() {
  playSound(bgSound);
}

export function stopBg() {
  stopSound(bgSound);
}

function playSound(soundName) {
  soundName.currentTime = 0;
  soundName.play();
}

function stopSound(soundName) {
  soundName.pause();
}
