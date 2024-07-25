// import React from 'react';
import EcoButton from '../button/button';
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

export default SelectOption;