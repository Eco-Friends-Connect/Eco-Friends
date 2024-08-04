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
        <LoginForm onSubmit={onSubmit} onClickSignUp={handleSignUp} />
    </>
    );
}

export default LoginPage;