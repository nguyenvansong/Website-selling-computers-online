import clsx from 'clsx';
import styles from './contact.module.scss';
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Contact(){
    return (
        <>
            <div className={clsx(styles.contact)}>
                <div class={clsx(styles.way)}>
                    <Link to="/" class={clsx(styles.link_way)}>Trang chủ</Link>
                    <span class={clsx(styles.icon)}><FontAwesomeIcon icon={faChevronRight}/></span>
                    <span>Liên hệ</span>
                </div>
                <div className={clsx(styles.contact_title)}>
                    <span>Liên hệ</span>
                </div>
                <div className={styles.contact_content}>
                    Content
                </div>
            </div>
        </>
    )
}

export default Contact;