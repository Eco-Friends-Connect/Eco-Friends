import style from "./eco-button.module.scss";

function EcoButton({ ecoButtonProps }) {

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
  
  return (
    <>
      <button className={`${getVariant(ecoButtonProps.btnShape)} ${getColorVariant(ecoButtonProps.btnColor)} ${getAnimationStyle(ecoButtonProps.animate)}`}>
            {ecoButtonProps.btnTitle}
       </button>
    </>
  ); 
}

export default EcoButton;
