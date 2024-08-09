import {React,useState, useEffect} from "react";
import propTypes from "prop-types";
import EcoButton from "../eco-button/eco-button";
import styles from "./pop-out.module.scss";


function PopOut({isOpened, popOutType, onClose, children}) {
    const [show, setShow] = useState(false);

    function handleClose(event) {
        event.preventDefault();
        setShow(false);
        console.log("Closing popout");
        onClose();
    }
    // Handler to close popup on overlay click
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
        onClose();
        }
    };
    const handlePopOutType = () => {
        if(popOutType === "error") return styles["errorMessage"];
        else if(popOutType === "form") return styles["formMessage"];
        else if(popOutType === "success") return styles["successMessage"];
        return styles["successMessage"];

    };

    useEffect(() => {
        setShow(true);
    }, [isOpened]);
    
    if(!show) {return null;}
    if(!isOpened) {return null;}
    return (
    <>
        <div onClick={handleOverlayClick} className={styles["popup-overlay"]} >
            <div className={`${handlePopOutType()} ${styles["popup-content"]}`}>
                {children}
                <EcoButton onClick={handleClose} ecoButtonProps={{btnTitle: "Close", btnSize: "small", btnColor:"yellow", animate: 1}}/>
            </div>
        </div>
    </>
    );
}


PopOut.propTypes = {
    isOpened: propTypes.bool.isRequired,
    popOutType: propTypes.string.isRequired,
    onClose: propTypes.func,
    children: propTypes.node,
};

export default PopOut;