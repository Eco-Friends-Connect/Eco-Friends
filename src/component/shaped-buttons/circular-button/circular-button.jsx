
// import {useState} from 'react';
import style from './circular-button.module.scss';

function CircularButton({ children }) {
    // btnEdgeStyles available: 'none', 'striped';
    
    return (
        <>
            <button className={style.btn}>{children}</button>
        </>
    );
}

export default CircularButton;