import { Howl } from 'howler';

const playLottieSound = (isOnn) => {
  const sound = new Howl({
    src: ['../aud_0.mp3'], // Assuming the file is in the 'public' folder
    html5: true, // Use the HTML5 audio element
    autoplay: false,
    onstart: () => {
      console.log('STARRT OF GLASS KNOCKING');
    },
  });
  if (isOnn) {
    sound.play();
  }
};

export default playLottieSound;
