import styles from "./Login.module.scss";
import PropTypes from "prop-types"; 
import React, {useState} from "react";
import Switch from '@mui/material/Switch';
import config from '../../config';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../component/auth-context';

function LoginForm({onClickSignUp, onSubmit}) { 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 
    const { login } = useAuth();

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Please enter your User Name';
        }
        if (!formData.password) {
            newErrors.password = 'Please enter your password';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        const API_URL = config.API_URL;
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch(`${API_URL}/api/post/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                });
    
                const text = await response.json();
    
                if (response.ok) {
                    console.log(text.data);
                    console.log(text.data.firstname);
                    console.log(text.data.email);
                    setMessage('User logged in successfully!');
                    login(text.data.token, text.data.firstname, formData.rememberMe);
                    if (text.data.isOrg === false) {
                        navigate('/org-dashboard');
                    } else {
                        navigate('/userpage');
                    }
                } else {
                    setMessage(text.message || 'User not logged in');
                    setErrors(text.errors || {});
                }
            } catch (error) {
                console.error('Error logging in:', error);
                setMessage('An error occurred. Please try again later.');
            }
        } else {
            setErrors(validationErrors);
        }
    }; 

    return(
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.anton}>Log In</h1>
                {message && <p>{message}</p>}
                <div className={styles.inputContainer}>
                    <input 
                        className={styles.input} 
                        name="email" 
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                    <input 
                        className={styles.input} 
                        name="password" 
                        type="password" 
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.loginbutton} type="submit">Log In</button>
                </div>
                <button className={styles.signupbutton} onClick={onClickSignUp}>
                    Not a member of Eco Friends? Sign Up
                </button>
                <div>
                    <div className={styles.rememberMeDiv}>
                        <Switch 
                            color="error" 
                            name="rememberMe" 
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                        <label className={styles.rememberMeText}>Remember me</label>
                    </div>
                    <button className={styles.forgotBtn} type="button">Forget Password?</button>
                </div>
            </form>
        </>
    ); 
}

LoginForm.propTypes = {
    onClickSignUp: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default LoginForm;
