// import React from 'react';
import EcoButton from '../button/button';
import propTypes from 'prop-types';
import style from "./select-option.module.scss";

function SelectOption({ question, options }) {
    return (
        <>
        <h1 className={style.question}>{question}</h1>
        
        {/* options.map((option) => (
            <Button>{option}</Button>
        )); */}
        {
            <div className={style.optionsContainer}>
            {
            options.map((option,index) =>{
                return (
                <>
                        <EcoButton key={index}>{option}</EcoButton>
                </>
                );
            })
            }
            </div>
        }
        </>
    );
}

SelectOption.propTypes = {
    question: propTypes.string,
    options: propTypes.array,
};

export default SelectOption;