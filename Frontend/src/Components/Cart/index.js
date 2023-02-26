import clsx from 'clsx';
import styles from './cart.module.scss';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function Cart(){
    const [productPrice, setProductPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    const cart = useSelector((state) => state.cart);
    useEffect(() => {
        const list = cart.reduce((total,item) => {
            return total + (item[0].price * item[1]);
        },0)
        setProductPrice(list);
        setTotalPrice(productPrice);
    },[cart.length])
    return (
        <>
            <div className={clsx(styles.content_page)}>
                <div className={clsx(styles.cart_main)}>
                    <div class={clsx(styles.way)}>
                        <Link to="/" class={clsx(styles.link_way)}>Trang chủ</Link>
                        <span class={clsx(styles.icon)}><FontAwesomeIcon icon={faChevronRight}/></span>
                        <span>
                            <span>Giỏ hàng</span>
                        </span>
                    </div>
                    <div className={clsx(styles.title)}>
                        <h1>Giỏ hàng</h1>
                    </div>
            
                    <div className={clsx(styles.woocommerce)}>
                        <div className={clsx(styles.content_cart)}>
                            <div className={clsx(styles.product_cart)}>
                                    <table className={clsx(styles.table_product)}>
                                        <thead>
                                            <tr className={clsx(styles.title_table, styles.tr)}>
                                                <th style={{width: 390, alignItems: 'center', alignSelf: 'end'}} colSpan={3} className={clsx(styles.head_name)} >Sản phẩm</th>
                                                <th className={clsx(styles.head_price)}>Giá</th>
                                                <th className={clsx(styles.head_quantity)}>Số lượng</th>
                                                <th className={clsx(styles.head_total_price)}>Tạm tính</th>
                                            </tr>
                                        </thead>
                            
                                        <tbody>
                                            {
                                                cart.map((productItem,index) => {
                                                    return (
                                                        <tr className={clsx(styles.infor_table, styles.tr)}>
                                                            <td className={clsx(styles.product_remove, styles.td)} onClick={(e) => {
                                                                e.preventDefault();
                                                                cart.splice(index,1);
                                                            }}>
                                                                <span className={clsx(styles.product_remove_icon)}><FontAwesomeIcon icon={faCircleXmark} /></span>
                                                            </td>
                                                            <td className={clsx(styles.product_img,styles.td)}> 
                                                                <a href="#"><img className={clsx(styles.img_title)} src={`http://localhost:8080/getimage/product/${product.productImage}`} alt=""/></a>
                                                            </td>
                                                            <td className={clsx(styles.product_name,styles.td)}>
                                                                <a href="#" className={clsx(styles.name_product)}><div style={{width: 196, wordWrap: 'break-word'}}>{productItem[0].productName}</div></a>
                                                            </td>
                                                            <td className={clsx(styles.product_price,styles.td)}>
                                                                <span>{productItem[0].price}<span>đ</span></span>
                                                            </td>
                                                            <td className={clsx(styles.product_quantity,styles.td)}>
                                                                {/* <input type="number" name="quantity" min="1" max="10" value={productItem[1]}/>
                                                                <div className={clsx(styles.quantity_up)} onClick={() =>{
                                                                    // quantityCount > 1 && setQuantityCount(quantityCount - 1);
                                                                    // setIsShow(true);
                                                                    // productItem[1] = 10
                                                                }}>
                                                                    <span className={clsx(styles.icon)}><FontAwesomeIcon icon={faMinus} /></span>
                                                                </div>
                                                                <div className={clsx(styles.quantity_number)}>{productItem[1]}</div>
                                                                <div className={clsx(styles.quantity_down)} onClick={() => {
                                                                    // quantityCount < quantityAvailable && setQuantityCount(quantityCount + 1);
                                                                    // productItem[1] = 1
                                                                    // setIsShow(true);
                                                                }}>
                                                                    <span className={clsx(styles.icon)}><FontAwesomeIcon icon={faPlus} /></span>
                                                                </div> */}
                                                                <span>{productItem[1]}</span>
                                                            </td>
                                                            <td className={clsx(styles.product_total_price)}>
                                                                <span>{productItem[0].price * productItem[1]}<span>đ</span></span>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            
                                        </tbody>
                                    </table>

                                    <div style={{width: '100%', height: 1, backgroundColor: 'black'}}></div>
                                    <div className={clsx(styles.continue_shopping_update)}>
                                        <div className={clsx(styles.back_shop)}>
                                            <Link to="/">
                                                <button>Tiếp tục xem sản phẩm</button>
                                            </Link>
                                        </div>

                                        <div className={clsx(styles.update_cart)}>
                                            <button>Cập nhật giỏ hàng</button>
                                        </div>
                                    </div>
                            </div>
                            <div className={clsx(styles.total_price)}>
                                <div className={clsx(styles.content_price)}>
                                    <div className={clsx(styles.title_price)}>
                                        <span>Cộng giỏ hàng</span>
                                    </div>
                                    <div style={{width: '100%', height: 1, backgroundColor: 'black'}}></div>
                                    <div className={clsx(styles.tam_tinh)}>
                                        <span className={clsx(styles.left_content)}>Tạm tính:</span>
                                        <span className={clsx(styles.right_content)}>{productPrice}<span>đ</span></span>
                                    </div>
            
                                    <div className={clsx(styles.phai_tra)}>
                                        <span className={clsx(styles.left_content)}>Tổng:</span>
                                        <span className={clsx(styles.right_content)}>{productPrice}<span>đ</span></span>
                                    </div>
                                    
                                    <div className={clsx(styles.thanh_toan)}>
                                        <Link to="/thanh-toan">
                                            <button>Tiến hành thanh toán</button>
                                        </Link>
                                    </div>
                                </div>
                                <div className={clsx(styles.discount_content)}>
                                    <div className={clsx(styles.discount_title)}>
                                        <span className={clsx(styles.left_content)}>Phiếu ưu đãi:</span>
                                    </div>
                                    <hr/>
                                    <div className={clsx(styles.discountcode_input)}>
                                        <input placeholder='Mã ưu đãi' type="text" name="codediscount" id=""/>
                                    </div>

                                    <div className={clsx(styles.discount_submit)}>
                                        <button>Áp dụng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;