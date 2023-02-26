
import { useEffect, useState } from "react";
import clsx from 'clsx';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from './navbar.module.scss';
import WrapProduct from '../WrapProduct';
import * as productServiice from '../../apiSercive/productService';
import img1 from './images/ASUS-ROG-Zephyrus-M-GU502GU-1-510x510-1-100x100.jpg';
import reducerSlice from '../../redux/reducer';

function Navbar(){
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServiice.getAll();
            if(result.response){
                dispatch(reducerSlice.actions.setError(result.response.data.error ||  result.response.data.userMsg))
                navigate("/error");
            }else{
                if(result.length > 5){
                    const arr = result.slice(0,4);
                    setProducts(arr);
                }
                else{
                    setProducts(result);
                }
            }
        }
        fetchApi();
    },[]);
    return (
        <>
            <div className={clsx(styles.navbar)}>
                <div className={clsx(styles.navbar_product)}>
                    <div className={clsx(styles.navbar_title_wrap)}>
                        <div className={clsx(styles.navbar_title)}>
                            <span>Sản phẩm mới</span>
                        </div>
                    </div>
                    <div className={clsx(styles.navbar_content)}>
                        <ul className={clsx(styles.navbar_content_list)}>
                            {
                                products.map((product) => {
                                    return (
                                        <WrapProduct>
                                            <li className={clsx(styles.navbar_content_item)} onClick={() => {
                                                    dispatch(reducerSlice.actions.setPickProduct(product));
                                                }}>
                                                <img src={`http://localhost:8080/getimage/product/${product.productImage}`} alt="" className={clsx(styles.navbar_content_item_image)} />
                                                <div className={clsx(styles.navbar_content_item_content)}>
                                                    <span>{product.productName}</span>
                                                    <p>{product.price.toLocaleString({useGrouping: true})}đ</p>
                                                </div>
                                            </li>
                                        </WrapProduct>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className={clsx(styles.navbar_post)}>
                    <div className={clsx(styles.navbar_title_wrap)}>
                        <div className={styles.navbar_title}>
                            <span>Bài viết mới</span>
                        </div>
                    </div>
                    <div className={clsx(styles.navbar_content)}>
                        <ul className={clsx(styles.navbar_content_list)}>
                            <li className={clsx(styles.navbar_content_item)}>
                                <img src={img1} alt="" className={clsx(styles.navbar_content_item_image)} />
                                <div className={clsx(styles.navbar_content_item_content)}>
                                    <span>ASUS ROG Zephyrus M GU502GU-AZ090T Gaming</span>
                                    <p>34.600.000đ</p>
                                </div>
                            </li>
                            <li className={clsx(styles.navbar_content_item)}>
                                <img src={img1} alt="" className={clsx(styles.navbar_content_item_image)} />
                                <div className={clsx(styles.navbar_content_item_content)}>
                                    <span>ASUS ROG Zephyrus M GU502GU-AZ090T Gaming</span>
                                    <p>34.600.000đ</p>
                                </div>
                            </li>
                            <li className={clsx(styles.navbar_content_item)}>
                                <img src={img1} alt="" className={clsx(styles.navbar_content_item_image)} />
                                <div className={clsx(styles.navbar_content_item_content)}>
                                    <span>ASUS ROG Zephyrus M GU502GU-AZ090T Gaming</span>
                                    <p>34.600.000đ</p>
                                </div>
                            </li>
                            <li className={clsx(styles.navbar_content_item)}>
                                <img src={img1} alt="" className={clsx(styles.navbar_content_item_image)} />
                                <div className={clsx(styles.navbar_content_item_content)}>
                                    <span>ASUS ROG Zephyrus M GU502GU-AZ090T Gaming</span>
                                    <p>34.600.000đ</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;