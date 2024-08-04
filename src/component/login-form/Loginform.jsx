import styles from "./Login.module.scss";
import PropTypes from "prop-types"; 
import React, {useState} from "react";
import Switch from '@mui/material/Switch';

function LoginForm({onClickSignUp, onSubmit}) {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};
        if (!formData.userName) {
            newErrors.userName = 'Please enter your User Name';
        }
        if (!formData.password) {
            newErrors.password = 'Please enter your password';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: e.target.name === 'rememberMe' ? e.target.checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(formData);
        } else {
            setErrors(validationErrors);
        }
    };


    return(
        <>
            <form className={styles.form} onChange={handleChange}>
                <h1>Log In</h1> 
                <div className={styles.inputContainer}>
                    <input className={styles.input} name="userName" placeholder={"User Name"}></input> 
                    <input className={styles.input}name="password" placeholder={"password"}></input> 
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={handleSubmit} className={styles.loginbutton} type="submit">Log In</button>   
                </div>  
                <button className={styles.signupbutton} onClick={onClickSignUp}>
                    Not a member of Eco Friends? Sign Up
                </button>
                    
                <div>
                    <div className={styles.rememberMeDiv}>
                        <Switch color="error" name="rememberMe" />
                        <label className={styles.rememberMeText} >Remember me</label>
                    </div>
                    <button className={styles.forgotBtn} type="button">Forget Password?</button>
                </div>
            </form>
        </>
    ); 
}    

LoginForm.propTypes = {
    onClickSignUp: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;