import EcoButton from '../eco-button/eco-button';
import style from './select-option.module.scss';
import PropTypes from 'prop-types';


function SelectOption({ question, options, onOptionClick }) {
  
  return (
    <>
      <h1 className={style.question}>{question}</h1>
      <div className={style.optionsContainer}>
        {options.map((option, index) => (
          <EcoButton ecoButtonProps={{btnTitle:`${option}`}}
            key={index}
            onClick={() => {
              console.log(`Button clicked: ${option}`);
              onOptionClick(option);
            }}
          >
           
          </EcoButton>
        ))}
      </div>
    </>
  );
}


SelectOption.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOptionClick: PropTypes.func.isRequired,
};

SelectOption.defaultProps = {
  question: '',
  options: [],
  onOptionClick: () => {},
};

export default SelectOption;
