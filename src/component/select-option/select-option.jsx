import EcoButton from '../button/button';
import style from './select-option.module.scss';

function SelectOption({ question, options, onOptionClick }) {
  return (
    <>
      <h1 className={style.question}>{question}</h1>
      <div className={style.optionsContainer}>
        {options.map((option, index) => (
          <EcoButton
            key={index}
            onClick={() => {
              console.log(`Button clicked: ${option}`);
              onOptionClick(option);
            }}
          >
            {option}
          </EcoButton>
        ))}
      </div>
    </>
  );
}

export default SelectOption;
