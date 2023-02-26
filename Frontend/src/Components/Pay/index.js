import clsx from 'clsx';
import styles from './pay.module.scss';
import Swal from 'sweetalert2';
import { useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import reducerSlice from '../../redux/reducer';

function Pay() {
    const [productPrice, setProductPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const productBuy = useSelector(state => state.productBuy);
    const user = useSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        productid: productBuy[0].productID,
        quantity: productBuy[1]
    })
    useEffect(() => {
        setProductPrice(productBuy[0].price * productBuy[1]);
        setTotalPrice(productBuy[0].price * productBuy[1])
    },[])
    const handleOrder = () => {
        setFormData({
            productid: productBuy[0].productID,
            quantity: productBuy[1]
        })
        
        const fetchApi = async () => {
            const expiresAt = localStorage.getItem('expiresAt');
            const expirationDate = new Date(expiresAt);
            const now = new Date();
            if(now < expirationDate){
                await axios({
                    method: 'post',
                    url: `http://localhost:8080/order/dathang/${user.id}?productid=${formData.productid}&quantity=${formData.quantity}`,
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                      'Content-Type': 'application/json'
                    }
                  })
                .then((res) => {
                    if(res.data == 200){
                        Swal.fire({
                            title: 'Thông báo',
                            text: 'Đặt hàng thành công',
                            icon: 'success',
                            confirmButtonText: 'OK'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              navigate('/');
                            }
                          });
                    }
                })
                .catch((error) => {
                    dispatch(reducerSlice.actions.setError(error.response.data.error ||  error.response.data.userMsg))
                    navigate("/error");
                })
            }
            else{
                Swal.fire({
                    title: 'Thông báo',
                    text: 'Đã hết phiên đăng nhập!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login');
                      localStorage.removeItem('token');
                    }
                });
            }
        }
        fetchApi();
    }
    return (
        <>
            <div className={clsx(styles.pay)}>
                <div className={clsx(styles.main)}>
                    <div className={clsx(styles.title)}>
                        <span>Thanh toán</span>
                    </div>
                    <div className={clsx(styles.content)}>
                        <div className={clsx(styles.pay_info)}>
                            <div className={clsx(styles.pay_info_title)}>
                                <span>THÔNG TIN THANH TOÁN</span>
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Họ và tên *</label>
                                <input type='text' placeholder='Nhập họ và tên' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Số điện thoại *</label>
                                <input type='text' placeholder='Nhập số điện thoại' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Địa chỉ email *</label>
                                <input type='text' placeholder='Nhập email' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Tỉnh/Thành phố *</label>
                                <input type='text' placeholder='Nhập tỉnh' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Quận/Huyện *</label>
                                <input type='text' placeholder='Nhập quận/huyện' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Xã/Phường/Thị trấn *</label>
                                <input type='text' placeholder='Nhập xã/phường/thị trấn' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_item)}>
                                <label>Địa chỉ *</label>
                                <input type='text' placeholder='Nhập địa chỉ' className={clsx(styles.pay_info_input)} />
                            </div>
                            <div className={clsx(styles.pay_info_title)}>
                                <span>THÔNG TIN BỔ SUNG</span>
                            </div>
                            <div className={clsx(styles.pay_info_more_info)}>
                                <span>Ghi chú đơn hàng (tùy chọn)</span>
                            </div>
                            <div className={clsx(styles.pay_info_more_info_text)}>
                                <textarea name="pay_more_info" className={clsx(styles.text)} placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."></textarea>
                            </div>
                        </div>
                        <div className={clsx(styles.order_info)}>
                            <div className={clsx(styles.order_info_title)}>
                                <span>ĐƠN HÀNG CỦA BẠN</span>
                            </div>
                            <table className={clsx(styles.order_info_table)}>
                                <thead>
                                    <tr className={clsx(styles.order_table_head)}>
                                        <th className={clsx(styles.order_head_left)}>SẢN PHẨM</th>
                                        <th className={clsx(styles.order_head_right)}>TẠM TÍNH</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className={clsx(styles.order_body_left)}>
                                            {productBuy[0].productName}
                                            <span> x {productBuy[1]}</span>
                                        </td>
                                        <td className={clsx(styles.order_body_right)}>
                                            {(productBuy[0].price * productBuy[1]).toLocaleString({useGrouping: true})}
                                            <span>đ</span>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th className={clsx(styles.order_head_left)}>
                                            Tạm tính
                                        </th>
                                        <td className={clsx(styles.order_head_right)}>
                                            {productPrice.toLocaleString({useGrouping: true})}
                                            <span>đ</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className={clsx(styles.order_head_left)}>
                                            Tổng
                                        </th>
                                        <td className={clsx(styles.order_head_right)}>
                                            {productPrice.toLocaleString({useGrouping: true})}
                                            <span>đ</span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className={clsx(styles.order_btn)} onClick={handleOrder}>
                                <button type='submit'>Đặt hàng</button>
                            </div>
                            <div className={clsx(styles.order_more)}>
                                <p>Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng website, và cho các mục đích cụ thể khác đã được mô tả trong chính sách riêng tư.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pay;