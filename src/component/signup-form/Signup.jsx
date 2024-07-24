import styles from "./Signup.module.scss";

export default function SignupForm(){
    return(
<>
<form className={styles.form}>
<h1>
    Sign Up
</h1>

<label className={styles.label} >
      <input name="firstName" placeholder={"First Name"}></input> 
</label>

<label className={styles.label}>
      <input name="lastName" placeholder={"Last Name"}></input> 
</label>
<br></br>
<label className={styles.label}>
     <input name="email" placeholder={"Email Address"}></input> 
</label>
<label className={styles.label}>
     <input name="username"  placeholder={"Username"}></input> 
</label>
<br></br>
<label className={styles.label}>
     <input  name="password" type="password" placeholder={"Password"}></input> 
</label>
<label className={styles.label}>
      <input name="Re-enter Password" type="password" placeholder={"Confirm Password"}></input> 
</label>
<br></br>
<label className={styles.label}>
     
     <input  type="date" name="Birthdate"  defaultValue={"Birthdate"}></input> 
</label>
<br></br>
     <button  type="submit">Submit</button>
</form>
</>
);
}