const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const togglePlayBtn = document.querySelector('.toggle-play');
const toggleBigPlayBtn = document.querySelector('.toggle-play-big');

const remotePrev = document.querySelector('.remote-prev');
const remoteNext = document.querySelector('.remote-next');
const speedMinusBtn = document.querySelector('.speed-minus');
const speedPlusBtn = document.querySelector('.speed-plus');
const currentSpeedIndicator= document.querySelector('.current-speed');


const playerSlider = document.querySelector('.player-slider');
const muteBtn = document.querySelector('.mute-btn');
const volumeSlider = document.querySelector('.volume-slider');
const currTime = document.querySelector('.volume-slider');
const muted = document.querySelector('.muted');
const fullscreenBtn = document.querySelector('.fullscreen');


 let volumeRateBeforeMute;
 video.volume = volumeSlider.value;


togglePlayBtn.addEventListener('click', togglePlayVideo);
toggleBigPlayBtn.addEventListener('click', togglePlayVideo);
video.addEventListener('click', togglePlayVideo);
video.addEventListener('play', updateBigPlayBtn);
video.addEventListener('pause', updateBigPlayBtn);
video.addEventListener('play', updatePlayBtn);
video.addEventListener('pause', updatePlayBtn);


muteBtn.addEventListener('click', muteVideo);
// muteBtn.addEventListener('click', updateMuteBtnStyle);



function muteVideo() {
  
  if (video.volume > 0) {
    volumeRateBeforeMute = video.volume;
    video.volume = 0;
    video.muted = true;
  } else {
    video.volume = volumeRateBeforeMute;
    video.muted = false;
  }
  updateMuteBtnStyle ();
}

function updateMuteBtnStyle () {
  if (video.muted) {
    muted.style.opacity = "1";
  } else {
    muted.style.opacity = "0";
  }
}



// 100% volumeSlider
volumeSlider.addEventListener('click', scrubVolumeSlider);
video.addEventListener('timeupdate', updateVolumeSliderView);

function scrubVolumeSlider(e) {
  volumeSlider.value = (e.offsetX / volumeSlider.offsetWidth) ;
  video.volume = volumeSlider.value;
  video.volume > 0 ? video.muted = 0 : video.muted = 1;
}

function updateVolumeSliderView() {
  let value = volumeSlider.value * 100 //%
  volumeSlider.style.background = `linear-gradient(to right, #d13317 0%, #da1111 ${value}%, #fff ${value}%, white 100%)`;
}
// 100% volumeSlider


// 100% playerSlider
playerSlider.addEventListener('click', scrub);
document.addEventListener('keydown', scrubByKey);
video.addEventListener('timeupdate', updatePlayerSliderValue);
video.addEventListener('timeupdate', updatePlayerSliderView);
video.addEventListener('timeupdate', updateMuteBtnStyle);


function updatePlayerSliderValue() {
  playerSlider.value = (this.currentTime / this.duration) * 100;
}

function updatePlayerSliderView() {
  playerSlider.style.background = `linear-gradient(to right, #d13317 0%, #da1111 ${playerSlider.value}%, #fff ${playerSlider.value}%, white 100%)`;
}


function scrub (e) {
  const scrubTime = (e.offsetX / playerSlider.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function scrubByKey(numb) {
  video.currentTime = (numb * 10 * video.duration) / 100;
}

// 100% playerSlider


// 100%
function togglePlayVideo() {
  const playState = video.paused ? 'play' : 'pause';
  video[playState]();
}

// 100%
function updatePlayBtn () {
  const togglePlayBtn = document.querySelector('.toggle-play');
  if (!video.paused) {
    togglePlayBtn.style.backgroundImage = "none";
    togglePlayBtn.style.borderLeft = 'solid 7px #b3b3b3';
    togglePlayBtn.style.borderRight = 'solid 7px #b3b3b3';
  } else {
    togglePlayBtn.style.border = "none";
    togglePlayBtn.style.backgroundImage = "url(img/svg/play.svg)";
  }
}
// 100%
function updateBigPlayBtn() {
  toggleBigPlayBtn.style.opacity = video.paused ? "0.95" :  "0" ;
}


// 100%
document.addEventListener('keydown', skip);

function skip (e) {
  const skipTime = 5;

  switch (e.code) {
    case 'ArrowRight' :
    video.currentTime += skipTime;
    break;
   case 'ArrowLeft':
    video.currentTime -= skipTime;
    break;
  }
}


document.addEventListener('keydown', skipByKey);

function skipByKey (e) {
  const skipTime = 10;

  switch (e.code) {
    case 'ArrowRight' :
    video.currentTime += skipTime;
    break;
   case 'ArrowLeft':
    video.currentTime -= skipTime;
    break;
    case 'KeyL' :
    video.currentTime += skipTime;
    break;
   case 'KeyJ':
    video.currentTime -= skipTime;
    break;
  }
}

function skipMinusBtn () {
  const skipTime = 10;
  video.currentTime -= skipTime;
}

function skipPlusBtn () {
  const skipTime = 10;
  video.currentTime -= skipTime;
}




document.addEventListener('keydown', pressKey);
speedMinusBtn.addEventListener('click', changeSpeedMinus);
speedPlusBtn.addEventListener('click', changeSpeedPlus);
video.addEventListener('timeupdate', updateSpeed);

function pressKey (e) {
  if (e.code === 'Digit0' || e.code === 'Digit1' || e.code === 'Digit2' || e.code === 'Digit3' || e.code === 'Digit4' || e.code === 'Digit5' || e.code === 'Digit6' || e.code === 'Digit7' || e.code === 'Digit8' || e.code === 'Digit9' ) {
    scrubByKey(e.key);
  }

  if (e.shiftKey) {
    switch (e.code) {
      case 'KeyP':  
        showPrevVideo()
      break;
      case 'KeyN':
        showNextVideo()
      break;
      case 'Comma':   
    changeSpeedMinus()
    break;
    case 'Period':  
    changeSpeedPlus()
    break;
    }
  } else {
    switch (e.code) {
      case 'Space' :
        togglePlayVideo();
      break;
     case 'KeyM':
      muteVideo();
      break;
      case 'Space' :
        togglePlayVideo();
      break;
      case 'KeyK' :
        togglePlayVideo();
      break;
      case 'Comma':   
      changeSpeedMinus()
      break;
      case 'Period':  
      changeSpeedPlus()
      break;
      case 'KeyF':
        toggleFullscreen()
      break;
      
    }

  }
}

function changeSpeedPlus () {
  video.playbackRate += 0.25
}

function changeSpeedMinus () {
  video.playbackRate -= 0.25
}

function updateSpeed() {
  currentSpeedIndicator.innerHTML = `${video.playbackRate.toFixed(2)}`;
}


fullscreenBtn.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
  if (video.fullscreenElement) {
    video.exitFullscreen()
  } else {
    video.requestFullscreen();
  }
}
  


remoteNext.addEventListener('click', showNextVideo);
remotePrev.addEventListener('click', showPrevVideo);

let videoIndex = 1;
let totalVideo = 4;

function showNextVideo() {
  if (videoIndex === totalVideo) videoIndex = 0;
videoIndex++;
video.src = `video/${videoIndex}.mp4`;
togglePlayVideo();
}

function showPrevVideo() {
  if (videoIndex === 1) videoIndex = totalVideo + 1;
videoIndex--;
video.src = `video/${videoIndex}.mp4`;
togglePlayVideo();
}




console.log('Самооценка:');

console.log('1) Исходный проект: Чтобы предложенный таск помог в выполнении заданий stage1, для стилизации видеоплеера и добавления ему функционала можно использовать видеоплеер из задания Museum.');
console.log('Плеер сделан по Макету Музея + доп. панель снизу с доп. кнопками увеличения и уменьшения скорости и индикацией текущей скорости для увеличения функционала задания, но что бы не портить базовый макет Museum');
console.log('Выполнено полностью: 10 / 10');
console.log ('')

console.log('2) Дополнить исходный проект обязательным дополнительным функционалом, указанным в описании задания:');
console.log('Управление плеером с клавиатуры: 1) клавиша Пробел — пауза, 2) Клавиша M (англ) — отключение/включение звука, 3) Клавиша > — ускорение воспроизведения ролика, 4) Клавиша < — замедление воспроизведения ролика, 5) Клавиша F — включение/выключение полноэкранного режим. Горячие клавиши должны работать так же, как работают эти клавиши в YouTube видео ');
console.log ('Первые четыре пункта выполнены полностью. Пятый - частично, включения полноэкранного режима кнопкой F происходит, а выключение нет')
console.log ('Итого 4*2 + 1*1 = 9 / 10 баллов')

console.log ('')
console.log('3) Дополнительный функционал на выбор. Каждое качественно выполненное улучшение из предложенных в задании или своё собственное, аналогичное им по сложности, оценивается в 10 баллов');
console.log('- добавить поддержку других горячих клавиш из тех, которые поддерживаются в YouTube видео - 2 балла за каждую дополнительную горячую клавишу:');
console.log('1) Приостановить или продолжить воспроизведение - K');
console.log('2) Перемотать ролик на 10 секунд назад - J, а также стрелкой влево');
console.log('3) Перемотать ролик на 10 секунд вперед - L, а также стрелкой вправо');
console.log('4) Перейти к предыдущему видео - (Shift + P)');
console.log('5) Перейти к следующему видео - (Shift + N)');
console.log('6) Уменьшить скорость воспроизведения - (SHIFT + ,)');
console.log('7) Увеличить скорость воспроизведения - (SHIFT + .)');
console.log('8) Перейти к определенному моменту видео (например, при нажатии на цифру "7" ролик будет перемотан до временной отметки, которая соответствует 70% от длительности видео - (0..9)');
console.log('Итого: 8*2 = 16 баллов');
console.log ('')
console.log('- добавить возможность перелистывания видео');
console.log('Видео перелистываються в бесконечном режиме наэкранными кнопками назад и вперед слева и справа от кнопки плей, а также комбинациями клавиш (Shift + P) и (SHIFT + .)');
console.log('Итого 10 / 10');
console.log('')
console.log('Total: 10 + 9 + 16 + 10 = 45 / 30 баллов')




