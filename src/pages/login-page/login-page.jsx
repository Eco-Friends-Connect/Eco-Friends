import React from "react";
import styles from "./login-page.module.scss";
import LoginForm from "../../component/login-form/Loginform";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/signup");
    };
    function onSubmit(formData) {
        console.log(formData);
    }
    return (
    <>
        <div className={styles.page}>

        <LoginForm onSubmit={onSubmit} onClickSignUp={handleSignUp} />
        </div>
    </>
    );
}

export default LoginPage;