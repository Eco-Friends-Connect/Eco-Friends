
// import {useState} from 'react';
import style from './circular-button.module.scss';

function CircularButton({ circularBtnProps }) {
    // btnEdgeStyles available: 'none', 'striped';
    
    return (
        <>
            {
                circularBtnProps.btnStyle === 'none' ? (
                    <button className={style.btn}>{circularBtnProps.btnTitle}</button>
                ) : (
                    <button className={style.btnStriped}>{circularBtnProps.btnTitle}</button>
                )

            }
        </>
    );
}

export default CircularButton;