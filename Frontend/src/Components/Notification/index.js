import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from './notification.module.scss';
import { useSelector } from "react-redux";
function Notification({message}){
    const isBlock = false;
    const success = isBlock ? 'block' : 'none'
    const error = isBlock ? 'none' : 'block'
    const errorMsg = useSelector(state => state.error);
    return (
        <>
            <div className={clsx(styles.wrap_notification)}>
                <div id={clsx(styles.container)}>
                    <div id={clsx(styles.success_box)} style={{display: `${success}`}}>
                        <div className={clsx(styles.dot)}></div>
                        <div className={clsx(styles.dot,styles.two)}></div>
                        <div className={clsx(styles.face)}>
                        <div className={clsx(styles.eye)}></div>
                        <div className={clsx(styles.eye,styles.right)}></div>
                        <div className={clsx(styles.mouth,styles.happy)}></div>
                        </div>
                        <div className={clsx(styles.shadow,styles.scale)}></div>
                        <div className={clsx(styles.message)}><h1 className={clsx(styles.alert)}>Success!</h1><p>yay, everything is working.</p></div>
                        <button className={clsx(styles.button_box)}><h1 className={clsx(styles.green)}>continue</h1></button>
                    </div>
                    <div id={clsx(styles.error_box)} style={{display: `${error}`}}>
                        <div className={clsx(styles.dot)}></div>
                        <div className={clsx(styles.dot,styles.two)}></div>
                        <div className={clsx(styles.face2)}>
                        <div className={clsx(styles.eye)}></div>
                        <div className={clsx(styles.eye,styles.right)}></div>
                        <div className={clsx(styles.mouth,styles.happy)}></div>
                        </div>
                        <div className={clsx(styles.shadow,styles.move)}></div>
                        <div className={clsx(styles.message)}>
                            <h1 className={clsx(styles.alert)}>Error!</h1>
                            <p>{message || errorMsg}</p>
                        </div>
                        <button className={clsx(styles.button_box)}>
                            <Link to="/" onClick={() => {
                                localStorage.removeItem('error')
                            }}>
                                <h1 className={clsx(styles.red)}>Quay lại</h1>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notification;