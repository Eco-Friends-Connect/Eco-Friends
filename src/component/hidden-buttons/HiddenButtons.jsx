import styles from './HiddenButtons.module.scss';
import { useNavigate } from "react-router-dom";
import React from 'react';

export default function HiddenButtons() {
    const navigate = useNavigate();

    const VolunteerButtonClick = () => {
        navigate("/volunteersearch");
    };

    const UserButtonClick = () => {
        navigate("/userpage");
    };


    return(
        <div className={styles.buttoncontainer}>
            <button
                onClick={VolunteerButtonClick}
                className={styles.responsivebutton}>
                VolunteerSignup
            </button>
            
            <button
                onClick={UserButtonClick}
                className={styles.responsivebutton}
                >UserPage
            </button>
        </div>
    );
}
