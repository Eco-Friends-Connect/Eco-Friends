import style from "./button.module.scss";

function EcoButton({ ecoButtonProps }) {
  return (
    <>
      {
        ecoButtonProps.btnShape === "triangle" ? (
          <button className={style.triangleBtn}>
            {ecoButtonProps.btnTitle}
          </button>
        ) : ecoButtonProps.btnShape === "hexagon" ? (
          <button className={style.hexagonBtn}>
            {ecoButtonProps.btnTitle}
          </button>
        ) : ecoButtonProps.btnShape === "circle" ? (
          <button className={style.circularBtn}>
            {ecoButtonProps.btnTitle}
          </button>
        ) : (
          <button className={style.btn}>
            {ecoButtonProps.btnTitle}
          </button>
        )
      }
    </>
  ); 
}

export default EcoButton;
