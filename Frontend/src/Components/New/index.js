import clsx from 'clsx';
import styles from './new.module.scss';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import khuyenmai1 from './images/khuyenmai1.jpg';
import { Link } from 'react-router-dom';
function New(){
    return (
        <>
            <div class={clsx(styles.main)}>
                <div class={clsx(styles.way)}>
                    <p>
                        <Link to="/" class={clsx(styles.link_way)}>Trang chủ</Link>
                        <span class={clsx(styles.icon)}><FontAwesomeIcon icon={faChevronRight}/></span>
                        <span>Tin tức</span>
                    </p>
                </div>
                <div class={clsx(styles.show_page_title)}>
                    <div class={clsx(styles.brand_title)}>
                        <p class={clsx(styles.brand_name)}>TIN TỨC</p>
                    </div>
                </div>
                <div class={clsx(styles.item)}>
                    <div class={clsx(styles.discount)}>
                        <span>05</span>
                        <span>Th8</span>
                    </div>
                    <img src={khuyenmai1} alt="" class={clsx(styles.product_img)}/>
                    <div class={clsx(styles.content)}>
                        <a href="#" class={clsx(styles.content_name)}>Cận cảnh iPhone X Plus sắp ra mắt có 3 camera sau “đẹp không thể kìm lòng”</a>
                        <p class={clsx(styles.content_desc)}>Dựa trên những thông tin rò rỉ gần đây, trang LetsGoDigital dựng một bản concept chi tiết, có độ chân thực cao về hình ảnh của chiếc iPhone X Plus với cụm camera ba ống kính.</p>
                    </div>
                </div>
                <div class={clsx(styles.item)}>
                    <div class={clsx(styles.discount)}>
                        <span>05</span>
                        <span>Th8</span>
                    </div>
                    <img src={khuyenmai1} alt="" class={clsx(styles.product_img)}/>
                    <div class={clsx(styles.content)}>
                        <a href="#" class={clsx(styles.content_name)}>Cận cảnh iPhone X Plus sắp ra mắt có 3 camera sau “đẹp không thể kìm lòng”</a>
                        <p class={clsx(styles.content_desc)}>Dựa trên những thông tin rò rỉ gần đây, trang LetsGoDigital dựng một bản concept chi tiết, có độ chân thực cao về hình ảnh của chiếc iPhone X Plus với cụm camera ba ống kính.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default New;