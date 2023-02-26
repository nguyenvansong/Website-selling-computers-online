import New from "../Components/New";
import Navbar from "../Components/Navbar";

import clsx from 'clsx';
import styles from './main.module.css';

function NewPage(){
    return (
        <>
            <div className={clsx(styles.wrap)}>
                <div className={clsx(styles.khuyenmai)}>
                    <New />
                </div>
                <div className={clsx(styles.navbar)}>
                    <Navbar />
                </div>
            </div>
        </>
    )
}

export default NewPage;