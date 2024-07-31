import styles from "./Login.module.scss"; 

// import EcoButton from "../../component/eco-button/eco-button";

export default function LoginForm(){
    return(
<>
<form className={styles.form}>
<h1>
    Log In
</h1> 

<label className={styles.label} >
      <input className={styles.input} name="userName" placeholder={"User Name"}></input> 
</label>

<label className={styles.label}> 
      <input className={styles.input}name="password" placeholder={"password"}></input> 
</label>
<br></br>
    
     <button className={styles.signupbutton} type="submit">Sign Up</button>
     {/* <EcoButton  type="submit" ecoButtonProps={{btnTitle:"Sign  Up",btnColor:"dark"}} className={styles.btnSize}/> */}
     <div className={styles.divider}></div>
     <button  className={styles.loginbutton} type="submit">Log In</button>   

<br></br>
     <input className={styles.forget} type="checkbox" id="Remember me" name="Remember me" value="Remember me" />
                        <label htmlFor="Remember me"> Remember me</label>
<br></br>
     <input type="checkbox" id="Forget username/password" name="Forget username/password" value="Forget username/password" />
                        <label htmlFor="Forget username/password"> Forget username/password</label>
</form>
</>
); 
}   