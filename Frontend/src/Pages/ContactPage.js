import Contact from "../Components/Contact";
import Navbar from "../Components/Navbar";

import clsx from 'clsx';
import styles from './main.module.css';
function ContactPage(){
    return (
        <>
            <div className={clsx(styles.wrap)}>
                <div className={clsx(styles.contact)}>
                    <Contact />
                </div>
                <div className={clsx(styles.navbar)}>
                    <Navbar />
                </div>
            </div>
        </>
    )
};

export default ContactPage;