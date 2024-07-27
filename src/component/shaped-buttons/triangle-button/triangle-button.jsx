// import React from 'react';
import styles from './triangle-button.module.scss';



function TriangleButton({ children }) {
    return (
        <>
        
        <button className={styles.btn}>{children}</button>
        </>
    );
}

export default TriangleButton;
