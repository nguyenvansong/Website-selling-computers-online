import clsx from 'clsx';
import styles from './categorycontent.module.scss';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import * as productService from '../../apiSercive/productService';
import WrapProduct from "../WrapProduct";
import reducerSlice from '../../redux/reducer';

function CategoryContent() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const navigate = useNavigate();

    // Call api to get product list
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
                    {category && 
                    <span>
                        <span className={clsx(styles.icon)}><FontAwesomeIcon icon={faChevronRight}/></span>
                        <span>{category}</span>
                    </span>}
                </div>
                <div className={clsx(styles.show_page_title)}>
                        <div className={clsx(styles.brand_title)}>
                            <p className={clsx(styles.brand_name)}>{category}</p>
                        </div>
                </div>
                <div className={clsx(styles.product)}>
                    <div className={clsx(styles.product_list)}>
                        {
                            products.map((product) => {
                                if(category && product.category.categoryName === category){
                                    return (
                                        <WrapProduct>
                                            <div className={clsx(styles.product_item)} onClick={() => {
                                                dispatch(reducerSlice.actions.setPickProduct(product));
                                            }}>
                                                <img src={`http://localhost:8080/getimage/product/${product.productImage}`} alt="" className={clsx(styles.product_img)}/>
                                                <div class={clsx(styles.product_body)}>
                                                    <p className={clsx(styles.product_name)}>{product.productName}</p>
                                                    <p className={clsx(styles.product_price)}>{product.price.toLocaleString({useGrouping: true})}<span className="span-vnd">đ</span></p>
                                                </div>
                                            </div>
                                        </WrapProduct>
                                    )
                                }
                            })
                        }
                        <div className={clsx(styles.clear)}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryContent;