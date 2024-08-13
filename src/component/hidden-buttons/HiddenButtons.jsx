import styles from './HiddenButtons.module.scss';

export default function HiddenButtons() {
    return(
        <div className={styles.buttoncontainer}>
            <button className={styles.responsivebutton}>Button 1</button>
            <button className={styles.responsivebutton}>Button 2</button>
        </div>
    );
}
