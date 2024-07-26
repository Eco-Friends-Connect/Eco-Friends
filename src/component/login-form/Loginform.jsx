import styles from "./Login.module.scss"; 

export default function LoginForm(){
    return(
<>
<form className={styles.form}>
<h1>
    Log In
</h1> 

<label className={styles.label} >
      <input name="userName" placeholder={"User Name"}></input> 
</label>

<label className={styles.label}>
      <input name="password" placeholder={"password"}></input> 
</label>
<br></br>
    
     <button  type="submit">Sign Up</button>
     <div className={styles.divider}></div>
     <button  type="submit">Log In</button>
    
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