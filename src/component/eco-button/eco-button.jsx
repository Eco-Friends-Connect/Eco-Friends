import style from './eco-button.module.scss';
import propTypes from 'prop-types';
import React from 'react';

let ecoButtonDefaultProps = {
  // Default props
  equButtonProps:
  {
  btnShape: "",
  btnColor: "",
  animate: 0,
  btnTitle: "",
  btnSize: "",
  btnFontSize: "",},
 
  onClick: ()=>{},
  children: null,
};
function EcoButton({  ecoButtonProps = ecoButtonDefaultProps.equButtonProps, onClick=ecoButtonDefaultProps.onClick }) {

  const getVariant = (shape) => {
    switch (shape) {
      case "triangle":
        return style.triangleBtn;
      case "hexagon":
        return style.hexagonBtn;
      case "circle":
        return style.circularBtn;
      default:
        return style.btn;
    }
  };

  const getColorVariant = (color) => {
    switch (color) {
      case "dark":
        return style.darkColor;
      case "yellow":
        return style.yellowColor;
      default:
        return style.normalColor;
    }
  };
  const getAnimationStyle = (animate) => {
    switch (animate) {
      case 1:
        return style.animate1;
      case 2:
        return style.animate2;
      default:
        return '';
    }
  };

  const getSizeVariant = (size) => {
    switch (size) {
      case "tiny":
        return style.tinyBtn;
      case "small":
        return style.smallBtn;
      case "large":
        return style.largeBtn;
      case "medium":
        return style.mediumBtn;
      default:
        return style.btn;
    }
  };

  const getFontVariant = (font) => {
    switch (font) {
      case "tiny":
        return style.tinyFont;
      case "small":
        return style.smallFont;
      case "large":
        return style.largeFont;
      case "medium":
        return style.mediumFont;
      default:
        return style.normalFont;
    }
  };
  
  return (
    <>
      <button onClick={onClick} className={`${getVariant(ecoButtonProps.btnShape)} ${getColorVariant(ecoButtonProps.btnColor)} ${getAnimationStyle(ecoButtonProps.animate)} ${getSizeVariant(ecoButtonProps.btnSize)} ${getFontVariant(ecoButtonProps.btnFontSize)}`}>
            {ecoButtonProps.btnTitle} 
       </button>
    </>
  ); 
}


EcoButton.propTypes = {
  ecoButtonProps: propTypes.shape({
    btnShape: propTypes.string,
    btnColor: propTypes.string,
    animate: propTypes.number,
    btnTitle: propTypes.string,
    btnSize: propTypes.string,
    btnFontSize: propTypes.string,
  }),
  onClick: propTypes.func,
  children: propTypes.node,
};

export default EcoButton;
