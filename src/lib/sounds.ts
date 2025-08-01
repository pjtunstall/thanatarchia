const quill = new Audio("/sfx/quill.mp3");
export function playQuill(): HTMLAudioElement {
  const audio = quill.cloneNode(true) as HTMLAudioElement;
  audio.play();
  return audio;
}

const raven = new Audio("/sfx/raven.mp3");
export function playRaven(): HTMLAudioElement {
  const audio = raven.cloneNode(true) as HTMLAudioElement;
  audio.play();
  return audio;
}

const wolf = new Audio("/sfx/wolf.mp3");
export function playWolf(): HTMLAudioElement {
  const audio = wolf.cloneNode(true) as HTMLAudioElement;
  audio.play();
  return audio;
}

const coinbag = new Audio("/sfx/coinbag.mp3");
export function playCoinbag() {
  (coinbag.cloneNode(true) as HTMLAudioElement).play();
}

const bell = new Audio("/sfx/bell.mp3");
export function playBell() {
  (bell.cloneNode(true) as HTMLAudioElement).play();
}

const squirrel = new Audio("/sfx/squirrel.mp3");
export function playSquirrel() {
  (squirrel.cloneNode(true) as HTMLAudioElement).play();
}
