import styles from './Loader.module.css';

function Loader() {
    return (
        <section className={styles.dotsContainer}>    
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </section>
    );
}

export default Loader;