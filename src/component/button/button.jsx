import style from "./button.module.scss";

function EcoButton({ children }) {
  return <button className={style.btn}>{children}</button>;
}

export default EcoButton;
