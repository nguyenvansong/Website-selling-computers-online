import clsx from 'clsx';
import styles from './forgotPassword.module.scss';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronRight, faQuestion } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import * as accountService from '../../apiSercive/accountService';
function ForgotPassword(){
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [response, setResponse] = useState('');

    const navigate = useNavigate();
    const validate = () => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!email) {
            setErrorEmail('Email không được để trống!');
        }else if(!emailRegex.test(email)) {
            setErrorEmail('Email không đúng định dạng!');
        } else {
            setErrorEmail('');
        }
        if(errorEmail){
            return;
        }
        setIsValid(true);
    }

    const handleSubmit = e => {
        e.preventDefault();
        // Email
        validate();
        if(isValid){
            const fetchApi = async () => {
                const result = await accountService.forgetPassword(email);
                setResponse(result);
                if(result == 'Email không có trong hệ thống'){
                    alert(result);
                }
                if(result == 'Mail Sent Successfully...'){
                    alert(result);
                    navigate('/login');
                    console.log(result);
                }
            }
            fetchApi();
        }
    };
    return (
        <>
            <div className={clsx(styles.login)}>
                <div className={clsx(styles.login_head)}>
                    <div className={clsx(styles.logo)}>
                    <Link to="/">
                        <img src={logo} alt="" className={clsx(styles.logo_img)}/>
                    </Link>
                    </div>
                    <div className={clsx(styles.title)}>
                        <span>QUÊN MẬT KHẨU</span>
                    </div>
                </div>
                <div className={clsx(styles.login_content)}>
                    <form onSubmit={handleSubmit}>
                        <div className={clsx(styles.wrap)}>
                            <div className={clsx(styles.content_title)}>
                                <span>QUÊN MẬT KHẨU</span>
                            </div>
                            <div className={clsx(styles.content_username,styles.input)}>
                                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className={clsx(styles.email,styles.item)} />
                                {errorEmail && <span style={{color: 'red'}}>{errorEmail}</span>}
                            </div>
                            <div className={clsx(styles.content_btn)}>
                                <button type="submit" className={clsx(styles.btn_login)}>Gửi</button>
                            </div>
                            <div className={clsx(styles.content_to_register)}>
                                <span>Hoặc</span>
                                <span className={clsx(styles.content_to_register_icon)}><FontAwesomeIcon icon={faQuestion} /></span>
                                <Link to="/login">Đăng nhập</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default ForgotPassword;