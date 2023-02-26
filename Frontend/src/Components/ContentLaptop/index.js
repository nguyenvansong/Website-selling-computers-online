import clsx from 'clsx';
import styles from './contentlaptop.module.scss';

import { useEffect, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import * as productService from '../../apiSercive/productService';
import WrapProduct from "../WrapProduct";
import reducerSlice from '../../redux/reducer';
import { useDispatch } from "react-redux";
function ContentLaptop({laptopType}) {
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            const result = await productService.getAll();
            if(result.response){
                dispatch(reducerSlice.actions.setError(result.response.data.error ||  result.response.data.userMsg))
                navigate("/error");
            }else{
                setProducts(result);
            }
        }
        fetchApi();
    },[]);
    
    return (
        <>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.way)}>
                    <Link to="/" className={clsx(styles.link_way)}>Trang chủ</Link>
                    <span className={clsx(styles.icon)}><FontAwesomeIcon icon={faChevronRight}/></span>
                    <Link
                        to="/laptop"
                        className={clsx(styles.link_way)}
                        >Laptop
                    </Link>
                    {laptopType != "Laptop" && 
                    <span>
                        <span className={clsx(styles.icon)}><FontAwesomeIcon icon={faChevronRight}/></span>
                        <span>{laptopType}</span>
                    </span>}
                </div>
                <div className={clsx(styles.show_page_title)}>
                        <div className={clsx(styles.brand_title)}>
                            <p className={clsx(styles.brand_name)}>{laptopType.toUpperCase()}</p>
                        </div>
                </div>
                <div className={clsx(styles.product)}>
                    <div className={clsx(styles.product_list)}>
                        {
                            products.map((product) => {
                                if(laptopType != "Laptop" && product.brand.brandName == laptopType.toLowerCase()){
                                    return (
                                        <WrapProduct>
                                            <div className={clsx(styles.product_item)} onClick={() => {
                                                dispatch(reducerSlice.actions.setPickProduct(product));
                                                }}>
                                                        <img src={`http://localhost:8080/getimage/product/${product.productImage}`} alt="" className={clsx(styles.product_img)}/>
                                                        <div className={clsx(styles.product_body)}>
                                                            <p className={clsx(styles.product_name)}>{product.productName}</p>
                                                            <p className={clsx(styles.product_price)}>{product.price.toLocaleString({useGrouping: true})}<span className="span-vnd">đ</span></p>
                                                        </div>
                                            </div>
                                        </WrapProduct>
                                    )
                                }
                                if(laptopType == "Laptop"){
                                    return (
                                        <WrapProduct>
                                            <div className={clsx(styles.product_item)} onClick={() => {
                                                dispatch(reducerSlice.actions.setPickProduct(product));
                                            }}>
                                                <img src={`http://localhost:8080/getimage/product/${product.productImage}`} alt="" className={clsx(styles.product_img)}/>
                                                <div className={clsx(styles.product_body)}>
                                                    <p className={clsx(styles.product_name)}>{product.productName}</p>
                                                    <p className={clsx(styles.product_price)}>{product.price.toLocaleString({useGrouping: true})}<span className="span-vnd">đ</span></p>
                                                </div>
                                            </div>
                                        </WrapProduct>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContentLaptop;