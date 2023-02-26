import React, { useEffect, useState } from "react";
import clsx from 'clsx';
import styles from './content.module.scss';
import { useNavigate } from "react-router-dom";
import * as productService from '../../apiSercive/productService';
import WrapProduct from "../WrapProduct";

import { useDispatch } from "react-redux";
import reducerSlice from '../../redux/reducer';
function Content(){
    const [products, setProducts] = useState([]);
    const [products2, setProducts2] = useState([]);
    const [products3, setProducts3] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [currentPage3, setCurrentPage3] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productService.getAll();
            if(result.response){
                dispatch(reducerSlice.actions.setError(result.response.data.error ||  result.response.data.userMsg))
                navigate("/error");
            }
            else{
                setProducts(result);
                result.map((product) => {
                    if(product.brand.brandName === 'laptop acer'){
                        setProducts2(prev => [...prev,product]);
                    }
                    if(product.brand.brandName === 'laptop hp'){
                        setProducts3(prev => [...prev,product]);
                    }
                })
            }
        }
        fetchApi();
        
    },[]);
    
    // Calculate the index of the first and last item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const indexOfLastItem2 = currentPage2 * itemsPerPage;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage;

    const indexOfLastItem3 = currentPage3 * itemsPerPage;
    const indexOfFirstItem3 = indexOfLastItem3 - itemsPerPage;

    // Get part of the current data for the current page
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const currentItems2 = products2.slice(indexOfFirstItem2, indexOfLastItem2);
    const currentItems3 = products3.slice(indexOfFirstItem3, indexOfLastItem3);
    
    // Create a list of pages
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    const pageNumbers2 = [];
    for (let i = 1; i <= Math.ceil(products2.length / itemsPerPage); i++) {
        pageNumbers2.push(i);
    }
    const pageNumbers3 = [];
    for (let i = 1; i <= Math.ceil(products3.length / itemsPerPage); i++) {
        pageNumbers3.push(i);
    }
    
    return (
        <>
            <div className={clsx(styles.content_wrap)}>
                {/* block 1 */}
                <div className={clsx(styles.selection_block)}>
                    <div className={clsx(styles.div_title)}>
                        <div className={clsx(styles.span_title)}> 
                            <span>HÀNG HÓT MỚI VỀ</span>
                        </div>
                    </div>

                    <div className={clsx(styles.div_content)}>
                        <div className={clsx(styles.div_content_product)}>
                            {
                                currentItems.map((product) => {
                                    return (
                                        <WrapProduct>
                                            <div className={clsx(styles.product)} onClick={() => {
                                                dispatch(reducerSlice.actions.setPickProduct(product));
                                            }}>
                                                <div className={clsx(styles.box_image)}>
                                                    <img className={clsx(styles.img_product)} src={`http://localhost:8080/getimage/product/${product.productImage}`} alt="anh product"/>
                                                </div>
                                                <div className={clsx(styles.info_product)}>
                                                    <a className={clsx(styles.product_name)} href="">{product.productName}</a>
                                                    <span className={clsx(styles.span_price)}>{product.price.toLocaleString({useGrouping: true})}<span className="span-vnd">đ</span></span>
                                                </div>
                                            </div>
                                        </WrapProduct>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <ul className="pagination pagination_list">
                            {/* <button className="page-link" onClick={previous}>
                                Previous
                            </button> */}
                            {pageNumbers.map((number) => (
                                <li key={number} className="page-item">
                                <button onClick={() => setCurrentPage(number)} className="page-link" style={{width: 'auto'}}>
                                    {number}
                                </button>
                                </li>
                            ))}
                            {/* <button className="page-link" onClick={next}>
                                Next
                            </button> */}
                        </ul>
                    </div>
                </div>

                {/* block 2 */}
                <div className={clsx(styles.selection_block)}>
                    <div className={clsx(styles.div_title)}>
                        <div className={clsx(styles.span_title)}> 
                            <span>LAPTOP ACER</span>
                        </div>
                    </div>

                    <div className={clsx(styles.div_content)}>
                        <div className={clsx(styles.div_content_product)}>

                            {
                                currentItems2.map((product) => {
                                    // if(product.brand.brandName == 'laptop acer'){
                                        return (
                                            <WrapProduct>
                                                <div className={clsx(styles.product)} onClick={() => {
                                                    dispatch(reducerSlice.actions.setPickProduct(product));
                                                }}>
                                                    <div className={clsx(styles.box_image)}>
                                                        <img className={clsx(styles.img_product)} src={`http://localhost:8080/getimage/product/${product.productImage}`} alt="anh product"/>
                                                    </div>
                                                    <div className={clsx(styles.info_product)}>
                                                        <a className={clsx(styles.product_name)} href="">{product.productName}</a>
                                                        <span className={clsx(styles.span_price)}>{product.price.toLocaleString({useGrouping: true})}<span className="span-vnd">đ</span></span>
                                                    </div>
                                                </div>
                                            </WrapProduct>
                                        )
                                    // }
                                })
                            }
                            
                        </div>
                    </div>
                    <div>
                        <ul className="pagination pagination_list">
                            {/* <button className="page-link" onClick={previous}>
                                Previous
                            </button> */}
                            {pageNumbers2.map((number) => (
                                <li key={number} className="page-item">
                                <button onClick={() => setCurrentPage2(number)} className="page-link" style={{width: 'auto'}}>
                                    {number}
                                </button>
                                </li>
                            ))}
                            {/* <button className="page-link" onClick={next}>
                                Next
                            </button> */}
                        </ul>
                    </div>
                </div>

                {/* block 3 */}
                <div className={clsx(styles.selection_block)}>
                    <div className={clsx(styles.div_title)}>
                        <div className={clsx(styles.span_title)}> 
                            <span>LAPTOP HP</span>
                        </div>
                    </div>

                    <div className={clsx(styles.div_content)}>
                        <div className={clsx(styles.div_content_product)}>

                            {
                                currentItems3.map((product) => {
                                    // if(product.brand.brandName == 'laptop hp'){
                                        return (
                                            <WrapProduct>
                                                <div className={clsx(styles.product)} onClick={() => {
                                                    dispatch(reducerSlice.actions.setPickProduct(product));
                                                }}>
                                                    <div className={clsx(styles.box_image)}>
                                                        <img className={clsx(styles.img_product)} src={`http://localhost:8080/getimage/product/${product.productImage}`} alt="anh product"/>
                                                    </div>
                                                    <div className={clsx(styles.info_product)}>
                                                        <a className={clsx(styles.product_name)} href="">{product.productName}</a>
                                                        <span className={clsx(styles.span_price)}>{product.price.toLocaleString({useGrouping: true})}<span className="span-vnd">đ</span></span>
                                                    </div>
                                                </div>
                                            </WrapProduct>
                                        )
                                    // }
                                })
                            }

                        </div>
                    </div>
                    <div>
                        <ul className="pagination pagination_list">
                            {/* <button className="page-link" onClick={previous}>
                                Previous
                            </button> */}
                            {pageNumbers3.map((number) => (
                                <li key={number} className="page-item">
                                <button onClick={() => setCurrentPage3(number)} className="page-link" style={{width: 'auto'}}>
                                    {number}
                                </button>
                                </li>
                            ))}
                            {/* <button className="page-link" onClick={next}>
                                Next
                            </button> */}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content;