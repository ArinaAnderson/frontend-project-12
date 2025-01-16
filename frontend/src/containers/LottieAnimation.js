import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import { Howl } from 'howler';
import { hideLottieAnimation } from '../store/slices/ui.js';
// import playLottieSound from './LottieSound.js';
import Cat from '../03.12-w-sfx-FINAL.json';

const LottieAnimation = () => {
  const isLottieAnimationOn = useSelector((state) => state.ui.isLottieAnimationOn);
  const dispatch = useDispatch();
  /*
  const sound = new Howl({
    src: ['../aud_0.mp3'], // Assuming the file is in the 'public' folder
    html5: true, // Use the HTML5 audio element
    autoplay: false,
    onstart: () => {
      console.log('STARRT OF GLASS KNOCKING');
    },
  });
  */

  /*
  if (isLottieAnimationOn) {
    playLottieSound(true);
  }
  */

  const createAudio = () => {
    const a = new Howl({
      src: ['../aud_0.mp3'],
      volume: 1,
    });
    return a;
  };

  const defaultOptions = {
    autoplay: true,
    audioFactory: createAudio,
  };

  return isLottieAnimationOn && (
    <div className="lottie">
      <Lottie
        options={defaultOptions}
        loop={false}
        animationData={Cat}
        onClick={() => console.log('LOTTIE!!!')}
        onComplete={() => {
          console.log('COMPLETE');
          dispatch(hideLottieAnimation());
        }}
        onLoadedImages={() => {
          console.log('ANIMATION STARTS!!!');
        }}
      />
    </div>
  );
};

export default LottieAnimation;
