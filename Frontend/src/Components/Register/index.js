import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import clsx from 'clsx';
import styles from './register.module.scss';
import Swal from 'sweetalert2';
import { useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

import * as accountService from '../../apiSercive/accountService';
import logo from '../../assets/images/logo.png';
function Register(){
    const [response, setResponse] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        fullName: '',
        password: '',
        address: '',
        phone: '',
        email: ''
    });

    const [error, setError] = useState({
        usernameError: '',
        fullNameError: '',
        passwordError: '',
        addressError: '',
        phoneError: '',
        emailError: ''
    });
    
    const validate = () => {
        let usernameError = '';
        let fullNameError = '';
        let addressError = '';
        let phoneError = '';
        let emailError = '';
        let passwordError = '';
        let roleError = '';
        // Email
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!formData.email) {
            emailError='Email không được để trống!';
        }else if(!emailRegex.test(formData.email)) {
            emailError='Email không đúng định dạng!';
        } else {
            emailError='';
        }
        // Phone
        const phoneRegex = /^\d{10,11}$/;
        if (!formData.phone) {
            phoneError='Số điện thoại không được để trống!';
        } else if (!phoneRegex.test(formData.phone)) {
            phoneError='Số điện thoại không đúng định dạng!';
        } else {
            phoneError='';
        }
        // FullName
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!formData.fullName) {
            fullNameError='Tên không được để trống!';
        } else if (!nameRegex.test(formData.fullName)) {
            fullNameError='Tên không đúng định dạng!';
        } else {
            fullNameError='';
        }
        // Address
        if (!formData.address) {
            addressError='Địa chỉ không được để trống!';
        } else {
            addressError='';
        }
        // Username
        if (!formData.userName) {
            usernameError='Tên đăng nhập không được để trống!';
        } else if (formData.userName.length < 6) {
            usernameError='Tên đăng nhập phải lớn hơn 6 ký tự!';
        } else {
            usernameError='';
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
        // Confirm Password
        if(!confirmPassword){
            setErrorConfirmPassword('Mật khẩu không được để trống!');
        }else if (formData.password !== confirmPassword){
            setErrorConfirmPassword('Mật khẩu không phù hợp!')
        }else{
            setErrorConfirmPassword('');
        }
        if(emailError || fullNameError || addressError || usernameError || passwordError || phoneError || errorConfirmPassword){
            setError({
                usernameError,
                fullNameError,
                passwordError,
                addressError,
                phoneError,
                emailError
            })
            return;
        }
        setIsValid(true);
    }
    const handleSubmit = e => {
        e.preventDefault();
        validate();
        if(isValid){
            setError({
                usernameError: '',
                fullNameError: '',
                passwordError: '',
                addressError: '',
                phoneError: '',
                emailError: ''
            })
            const fetchApi = async () => {
                const result = await accountService.registerAccount(formData);
                setResponse(result);
                if(result.token){
                    Swal.fire({
                        title: 'Thông báo',
                        text: 'Đăng ký thành công',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          navigate('/login');
                        }
                      });
                }else if(result.response.data.error ||  result.response.data.userMsg){
                    Swal.fire({
                        title: 'Thông báo',
                        text: `${result.response.data.error ||  result.response.data.userMsg}`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                      })
                }
                else{
                    Swal.fire({
                        title: 'Thông báo',
                        text: 'Đăng ký không thành công!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                      })
                }
            }
            fetchApi();
        }
    };
    return (
        <>
            <div className={clsx(styles.register)}>
                <div className={clsx(styles.register_head)}>
                    <div className={clsx(styles.logo)}>
                        <Link to="/">
                            <img src={logo} alt="" className={clsx(styles.logo_img)}/>
                        </Link>
                    </div>
                    <div className={clsx(styles.title)}>
                        <span>ĐĂNG KÝ</span>
                    </div>
                </div>
                <div className={clsx(styles.register_content)}>
                    <form onSubmit={handleSubmit}>
                        <div className={clsx(styles.wrap)}>
                            {/* <div className={clsx(styles.content_title)}>
                                <span>ĐĂNG KÝ</span>
                            </div> */}
                            <div className={clsx(styles.wrap_child)}>
                                <div className={clsx(styles.wrap_item_1)}>
                                    <div className={clsx(styles.content_email,styles.input)}>
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
                                            className={clsx(styles.email,styles.item)} 
                                        />
                                        {error.emailError && <span style={{color: 'red'}}>{error.emailError}</span>}
                                    </div>
                                    <div className={clsx(styles.content_phone,styles.input)}>
                                        <input 
                                            name='phone' 
                                            type="tel" 
                                            placeholder='Điện thoại' 
                                            value={formData.phone} 
                                            onChange={
                                                (e) => {
                                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                                }
                                            } 
                                            className={clsx(styles.phone,styles.item)} 
                                        />
                                        {error.phoneError && <span style={{color: 'red'}}>{error.phoneError}</span>}
                                    </div>
                                    <div className={clsx(styles.content_full_name,styles.input)}>
                                        <input 
                                            name='fullName' 
                                            type="text" 
                                            placeholder='Tên đầy đủ' 
                                            value={formData.fullName} 
                                            onChange={
                                                (e) => {
                                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                                }
                                            } 
                                            className={clsx(styles.full_name,styles.item)} 
                                        />
                                        {error.fullNameError && <span style={{color: 'red'}}>{error.fullNameError}</span>}
                                    </div>
                                    <div className={clsx(styles.content_address,styles.input)}>
                                        <input 
                                            name='address' 
                                            type="text" 
                                            placeholder='Địa chỉ' 
                                            value={formData.address} 
                                            onChange={
                                                (e) => {
                                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                                }
                                            } 
                                            className={clsx(styles.address,styles.item)} 
                                        />
                                        {error.addressError && <span style={{color: 'red'}}>{error.addressError}</span>}
                                    </div>
                                </div>
                                <div className={clsx(styles.wrap_item_2)}>
                                    <div className={clsx(styles.content_username,styles.input)}>
                                        <input 
                                            name='userName' 
                                            type="text" 
                                            placeholder='Tên đăng nhập' 
                                            value={formData.username} 
                                            onChange={
                                                (e) => {
                                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                                }
                                            } 
                                            className={clsx(styles.username,styles.item)} 
                                        />
                                        {error.usernameError && <span style={{color: 'red'}}>{error.usernameError}</span>}
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
                                    <div className={clsx(styles.content_re_password,styles.input)}>
                                        <input 
                                            name='confirmPassword' 
                                            type="password" 
                                            placeholder='Nhập lại mật khẩu' 
                                            value={confirmPassword} 
                                            onChange={
                                                (e) => setConfirmPassword(e.target.value)
                                            } 
                                            className={clsx(styles.password,styles.item)} 
                                        />
                                        {errorConfirmPassword && <span style={{color: 'red'}}>{errorConfirmPassword}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className={clsx(styles.content_btn)}>
                                <button type="submit" className={clsx(styles.btn_register)}>Đăng ký</button>
                            </div>
                            <div className={clsx(styles.content_to_register)}>
                                <span>Bạn đã có tài khoản</span>
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
export default Register;