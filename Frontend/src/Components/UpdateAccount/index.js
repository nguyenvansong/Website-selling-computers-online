import { useNavigate  } from 'react-router-dom';
import clsx from 'clsx';
import styles from './updateAccount.module.scss';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import reducerSlice from '../../redux/reducer';

import * as accountService from '../../apiSercive/accountService';

function UpdateAccount(){
    const [response, setResponse] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

    const [isValid, setIsValid] = useState(false);

    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        userName: user.userName,
        fullName: user.fullName,
        password: '',
        address: user.address,
        phone: user.phone,
        email: user.email
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
                const result = await accountService.updateAccount(user.id,formData);
                if(result.response){
                    dispatch(reducerSlice.actions.setError(result.response.data.error ||  result.response.data.userMsg))
                    navigate("/error");
                }else{
                    setResponse(result);
                    if(result.accountID){
                        Swal.fire({
                            title: 'Thông báo',
                            text: 'Thay đổi thành công.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              navigate('/login');
                            }
                          });
                    }
                    else{
                        toast.error('Thay đổi không thành công!')
                    }
                }
            }
            fetchApi();
        }
    };
    return (
        <>
            <div className={clsx(styles.register)}>
                <div className={clsx(styles.register_content)}>
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
                    <form onSubmit={handleSubmit}>
                        <div className={clsx(styles.wrap)}>
                            <div className={clsx(styles.content_title)}>
                                <span>THAY ĐỔI THÔNG TIN TÀI KHOẢN</span>
                            </div>
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
                            <div className={clsx(styles.content_username,styles.input)}>
                                <input 
                                    name='userName' 
                                    type="text" 
                                    placeholder='Tên đăng nhập' 
                                    value={formData.userName} 
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
                            <div className={clsx(styles.content_btn)}>
                                <button type="submit" className={clsx(styles.btn_register)}>Gửi</button>
                            </div> 
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default UpdateAccount;