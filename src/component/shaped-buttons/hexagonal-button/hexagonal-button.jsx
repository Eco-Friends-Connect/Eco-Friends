import style from './hexagonal-button.module.css';


function HexagonalButton({ children }) {
  return (
    <button className={style.btn}>
      {children}
    </button>
  );
}

export default HexagonalButton;