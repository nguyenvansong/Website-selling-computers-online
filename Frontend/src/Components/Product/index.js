import clsx from 'clsx';
import styles from './product.module.scss';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {Link} from 'react-router-dom';
import {useState, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCartPlus, faCheck, faChevronRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import Navbar from "../Navbar";
import * as productService from '../../apiSercive/productService';
import * as imageService from '../../apiSercive/imageService';
import reducerSlice from '../../redux/reducer';
import { productSelector } from '../../redux/selectors';

function Product(){
    const [quantityCount, setQuantityCount] = useState(1);
    const [quantityAvailable, setQuantityAvailable] = useState(5);
    const [show, setShow] = useState(false);
    const [images, setImages] = useState([]);

    const product = useSelector(productSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [showImage, setShowImage] = useState(`http://localhost:8080/getimage/product/${product.productImage}`);
    
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

    useEffect(() => {
        const fetchApi = async () => {
            const result = await imageService.getById(product.productID);
            if(result.response){
                dispatch(reducerSlice.actions.setError(result.response.data.error ||  result.response.data.userMsg))
                navigate("/error");
            }else{
                setImages(result);
            }
        }
        fetchApi();
    },[]);
      
    var settings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          }
        ]
      };
    return (
        <>
            <div className={clsx(styles.product)}>
                
                <div class={clsx(styles.way)}>
                    <Link to="/" class={clsx(styles.link_way)}>Trang chủ</Link>
                    <span class={clsx(styles.icon)}><FontAwesomeIcon icon={faChevronRight}/></span>
                    <span
                        class={clsx(styles.link_way)}
                        >Sản phẩm
                    </span>
                </div>
                <div className={clsx(styles.product_wrap)}>
                    <div className={clsx(styles.pay_notification,{
                        'active': show
                    })}>
                        <div className={clsx(styles.message)}>
                            <span className={clsx(styles.message_icon)}><FontAwesomeIcon icon={faCheck} /></span>
                            <span>“Acer Swift 7 SF714-52T-7134 Laptop – Black”</span>
                            đã được thêm vào giỏ hàng
                        </div>
                    </div>
                    <div className={clsx(styles.product_images)}>
                        <img src={showImage} className={clsx(styles.product_image_main)}/>
                        <div className={clsx(styles.product_image_list)}>
                            <Slider {...settings}>
                                {
                                    images.map((item) => {
                                        return (
                                            <div className={clsx(styles.product_image_item_wrap)}>
                                                <span><img src={`http://localhost:8080/getimage/image/${item.imageName}`} alt='' className={clsx(styles.product_image_item)} onClick={() => setShowImage(`http://localhost:8080/getimage/image/${item.imageName}`)}/></span>
                                            </div>
                                        )
                                    })
                                }
                                
                            </Slider>
                        </div>
                    </div>
                    <div className={clsx(styles.product_info)}>
                        <div className={clsx(styles.name)}>
                            <span>{product.productName || 'Laptop'}</span>
                        </div>
                        <div className={clsx(styles.price)}>
                            <div className={clsx(styles.main_price)}>
                                {(product.price - (product.price*(product.discount/100))).toLocaleString({useGrouping: true})}
                                <span>đ</span>
                            </div>
                            <div className={clsx(styles.discount_price)}>
                                <div className={clsx(styles.discount_price_text)}>
                                    {product.price.toLocaleString({useGrouping: true})}
                                    <span>đ</span>
                                </div>
                                <div className={clsx(styles.discount_percent)}>
                                    {product.discount}% GIẢM
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles.description_short)}>
                            <p>
                                Bảo hành chính hãng.<br/>
                                Windows bản quyền tích hợp.<br/>
                                Miễn phí giao hàng toàn quốc.
                            </p>
                        </div>
                        <div className={clsx(styles.quantity)}>
                            <div className={clsx(styles.title)}>
                                <span>Số lượng</span>
                            </div>
                            <div className={clsx(styles.content)}>
                                <div className={clsx(styles.quantity_up)} onClick={() =>quantityCount > 1 && setQuantityCount(quantityCount - 1)}>
                                    <span className={clsx(styles.icon)}><FontAwesomeIcon icon={faMinus} /></span>
                                </div>
                                <div className={clsx(styles.quantity_number)}>{quantityCount}</div>
                                <div className={clsx(styles.quantity_down)} onClick={() => quantityCount < quantityAvailable && setQuantityCount(quantityCount + 1)}>
                                    <span className={clsx(styles.icon)}><FontAwesomeIcon icon={faPlus} /></span>
                                </div>
                            </div>
                            <div className={clsx(styles.available)}>
                                <span>{quantityAvailable}</span>
                                Sản phẩm có sẵn
                            </div>
                        </div>
                        <div className={clsx(styles.product_btn)}>
                            <button type='submit' className={clsx(styles.add_to_cart)} onClick={() => {
                                dispatch(reducerSlice.actions.setProductCart({
                                    product: product,
                                    quantity: quantityCount
                                }));
                                setShow(true);
                            }}>
                                <span className={clsx(styles.icon)}><FontAwesomeIcon icon={faCartPlus} /></span>
                                Thêm vào giỏ hàng
                            </button>
                            <Link to="/thanh-toan" onClick={() => {
                                dispatch(reducerSlice.actions.setProductBuy({
                                    product: product,
                                    quantity: quantityCount
                                }));
                            }}>
                                <button type='submit' className={clsx(styles.buy_now)}>Mua ngay</button>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className={clsx(styles.product_more)}>
                    <div className={clsx(styles.content_left)}>
                            <div className={clsx(styles.description)}>
                                <div className={clsx(styles.title)}>
                                    <p>MÔ TẢ SẢN PHẨM</p>
                                </div>
                                <div className={clsx(styles.content)}>
                                    {product.productDecription}
                                </div>
                                
                            </div>
                            <div className={clsx(styles.product_same)}>
                                <div className={clsx(styles.title)}>
                                    <p>SẢN PHẨM TƯƠNG TỰ</p>
                                </div>
                                <div className={clsx(styles.content)}>
                                    <div className={clsx(styles.product)}>
                                        {products.map((productItem) => {
                                            if(productItem.brand.brandId && productItem.brand.brandId == product.brand.brandId){
                                                return (
                                                    <div className={clsx(styles.product_item)} onClick={() => {
                                                        dispatch(reducerSlice.actions.setPickProduct(productItem));
                                                        window.location.reload();
                                                        window.scrollTo(0, 0);
                                                    }}>
                                                        <img src={`http://localhost:8080/getimage/product/${productItem.productImage}`} alt="" className={clsx(styles.product_image)}/>
                                                        <div className={clsx(styles.product_name)}>{productItem.productName}</div>
                                                        <div className={clsx(styles.product_price)}>{productItem.price.toLocaleString({useGrouping: true})}<span>đ</span></div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className={clsx(styles.navbar)}>
                        <Navbar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Product);