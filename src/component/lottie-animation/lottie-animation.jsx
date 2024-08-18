import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import propTypes from 'prop-types';

const LottieAnimation = ({animationData, animationStyle, containerRef, isLoop}) => {

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: containerRef.current, // Use the ref's current property
      renderer: 'svg',
      loop: isLoop,
      autoplay: true,
      animationData: animationData, // Pass the animation json here
    });

    return () => {
      animation.destroy(); // Cleanup on unmount
    };
  }, [animationData, containerRef, isLoop]);

  return (
  <div ref={containerRef} className={animationStyle} >

  </div>); 
};

LottieAnimation.propTypes = {
    animationData: propTypes.object.isRequired,
    animationStyle: propTypes.string.isRequired,
    containerRef: propTypes.object.isRequired,
    isLoop: propTypes.bool.isRequired
};


export default LottieAnimation;
