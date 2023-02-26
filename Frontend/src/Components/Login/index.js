import clsx from 'clsx';
import styles from './login.module.scss';
import Swal from 'sweetalert2';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

import logo from '../../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import reducerSlice from '../../redux/reducer';
import * as accountService from '../../apiSercive/accountService';

function Login(){
    const [response1, setResponse1] = useState('');
    const [isValid, setIsValid] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        emailError: '',
        passwordError: '',
    });
    
    const validate = async () => {
        let emailError = '';
        let passwordError = '';
        // Email
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!formData.email) {
            emailError='Email không được để trống!';
        }else if(!emailRegex.test(formData.email)) {
            emailError='Email không đúng định dạng!';
        } else {
            emailError='';
        }
        // Password
        if (!formData.password) {
            passwordError='Mật khẩu không được để trống!';
        } else if (formData.password.length < 8) {
            passwordError='Mật khẩu phải lớn hơn 8 ký tự!';
        } else if (!/\d/.test(formData.password)) {
            passwordError='Mật khẩu phải chứa một ký tự số!';
        } else if (!/[A-Z]/.test(formData.password)) {
            passwordError='Mật khẩu phải chứa ít nhất một ký tự chữ hoa!';
        } else if (!/[a-z]/.test(formData.password)) {
            passwordError='Mật khẩu phải chứa ít nhất một ký tự chữ thường!';
        } else {
            passwordError='';
        }
        if(emailError || passwordError){
            setError({
                emailError,
                passwordError
            })
            return;
        }
        setIsValid(true);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // await validate();
        // if(isValid){
            setError({
                emailError: '',
                passwordError: ''
            })
            const fetchApi = async () => {
                const result1 = await accountService.login(formData);
                setResponse1(result1);
                const result2 = await accountService.getOne(result1.id);
                if(result1.token){
                    localStorage.setItem('token', result1.token);
                    localStorage.setItem('role', result2[0].accountRole);

                    const now = new Date();
                    const expiresAt = new Date(now.getTime() + 30 * 60 * 1000);

                    localStorage.setItem('expiresAt', expiresAt);
                    dispatch(reducerSlice.actions.setUser(result2[0]));
                    if(result2[0].accountRole == 'USER'){
                        toast.success('Đăng nhập thành công')
                        navigate('/');
                    }
                    if(result2[0].accountRole == 'ADMIN'){
                        toast.success('Đăng nhập thành công')
                        navigate('/admin/product');
                        window.location.reload();
                    }
                }else if(result1.response.data.error ||  result1.response.data.userMsg){
                    Swal.fire({
                        title: 'Thông báo',
                        text: `${result1.response.data.error || result1.response.data.userMsg}`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                      })
                }
                else{
                    toast.error('Đăng nhập thất bại!')
                    navigate('/login');
                }
            }
            fetchApi();
            
        // }
    };
    return (
        <>
            <div className={clsx(styles.login)}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                />
                <div className={clsx(styles.login_head)}>
                    <div className={clsx(styles.logo)}>
                    <Link to="/">
                        <img src={logo} alt="" className={clsx(styles.logo_img)}/>
                    </Link>
                    </div>
                    <div className={clsx(styles.title)}>
                        <span>ĐĂNG NHẬP</span>
                    </div>
                </div>
                <div className={clsx(styles.login_content)}>
                    <div className={clsx(styles.wrap)}>
                        <form onSubmit={handleSubmit}>
                            {/* <div className={clsx(styles.content_title)}>
                                <span>ĐĂNG NHẬP</span>
                            </div> */}
                            <div className={clsx(styles.content_username,styles.input)}>
                                <input 
                                    name='email' 
                                    type="email" 
                                    placeholder='Email' 
                                    value={formData.email} 
                                    onChange={
                                        (e) => {
                                            setFormData({ ...formData, [e.target.name]: e.target.value })
                                        }
                                    } 
                                    className={clsx(styles.username,styles.item)} 
                                />
                                {error.emailError && <span style={{color: 'red'}}>{error.emailError}</span>}
                            </div>
                            <div className={clsx(styles.content_password,styles.input)}>
                                <input 
                                    name='password' 
                                    type="password" 
                                    placeholder='Mật khẩu' 
                                    value={formData.password} 
                                    onChange={
                                        (e) => {
                                            setFormData({ ...formData, [e.target.name]: e.target.value })
                                        }
                                    }  
                                    className={clsx(styles.password,styles.item)}
                                 />
                                 {error.passwordError && <span style={{color: 'red'}}>{error.passwordError}</span>}
                            </div>
                            <div className={clsx(styles.content_btn)}>
                                <button type="submit" className={clsx(styles.btn_login)}>Đăng nhập</button>
                            </div>
                            <div className={clsx(styles.content_forgot_password)}>
                                <Link to="/forgotpassword">Quên mật khẩu</Link>
                            </div>
                            <div className={clsx(styles.content_to_register)}>
                                <span>Bạn chưa có tài khoản</span>
                                <span className={clsx(styles.content_to_register_icon)}><FontAwesomeIcon icon={faQuestion} /></span>
                                <Link to="/register" >Đăng ký</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;