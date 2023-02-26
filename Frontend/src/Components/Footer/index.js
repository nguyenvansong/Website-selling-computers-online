import clsx from "clsx";
import styles from './footer.module.scss'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope, faHouseUser, faPhone} from '@fortawesome/free-solid-svg-icons';

import first from './images/first.png';
import express from './images/express.png';
import jcb from './images/jcb.png';
import spay from './images/spay.png';
import tragop from './images/tragop.png';
import visa from './images/visa.png';

function Footer(){
    return(
        <>
            <div class={clsx(styles.footer)}>
                <div class={clsx(styles.wrap_main)}>
                    <div class={clsx(styles.info)}>
                        <div class= {clsx(styles.info_title, styles.title)}>
                            <span class={clsx(styles.title)}>THẾ GIỚI LAPTOP</span>
                        </div>
                        <ul class={clsx(styles.list_info)}>
                            <li class={clsx(styles.list_info_item)}>
                                <FontAwesomeIcon icon={faHouseUser} />
                                <span>Cơ sở 1: 398 Bắc Từ Liêm - Hà Nội</span>
                            </li>
                            <li class={clsx(styles.list_info_item)}>
                                <FontAwesomeIcon icon={faHouseUser} />
                                <span>Cơ sở 2: 196 Hoàng Diệu- Đà Nẵng</span>
                            </li>
                            <li class={clsx(styles.list_info_item)}>
                                <FontAwesomeIcon icon={faPhone} />
                                <span>Hotline:02366 508633 - 0966 887 444 Mr. Đạt</span>
                            </li>
                            <li class={clsx(styles.list_info_item)}>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>Email : thegioilaptop@gmail.com</span>
                            </li>
                            <li class={clsx(styles.list_info_item)}>
                                <FontAwesomeIcon icon={faFacebook} />
                                <span>Facebook : fb.com/zinzinfood</span>
                            </li>
                        </ul>
                    </div>
                    <div class={clsx(styles.policy)}>
                        <div class={clsx(styles.policy_title, styles.title)}>
                            <span class={clsx(styles.title)}>CHÍNH SÁCH</span>
                        </div>
                        <ul class={clsx(styles.list_policy)}>
                            <li class={clsx(styles.policy_item)}>
                                <span>Chính sách đổi trả hàng</span>
                            </li>
                            <li class={clsx(styles.policy_item)}>
                                <span>Chính sách bảo hành hàng</span>
                            </li>
                            <li class={clsx(styles.policy_item)}>
                                <span>Chính sách mua hàng</span>
                            </li>
                            <li class={clsx(styles.policy_item)}>
                                <span>Chính sách đại lý</span>
                            </li>
                        </ul>
                    </div>
                    <div class={clsx(styles.pay)}>
                        <div class={clsx(styles.pay_title, styles.title)}>
                            <span class={clsx(styles.title)}>THANH TOÁN</span>
                        </div>
                        <ul class={clsx(styles.list_pay)}>
                            <li class={clsx(styles.pay_item)}>
                                <img src={first} alt="" class={clsx(styles.pay_item_image)}/>
                            </li>
                            <li class={clsx(styles.pay_item)}>
                                <img src={express} alt="" class={clsx(styles.pay_item_image)}/>
                            </li>
                            <li class={clsx(styles.pay_item)}>
                                <img src={jcb} alt="" class={clsx(styles.pay_item_image)}/>
                            </li>
                            <li class={clsx(styles.pay_item)}>
                                <img src={spay} alt="" class={clsx(styles.pay_item_image)}/>
                            </li>
                            <li class={clsx(styles.pay_item)}>
                                <img src={tragop} alt="" class={clsx(styles.pay_item_image)}/>
                            </li>
                            <li class={clsx(styles.pay_item)}>
                                <img src={visa} alt="" class={clsx(styles.pay_item_image)}/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class={clsx(styles.certification)}>
                    <a href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=18375" class={clsx(styles.certification_item_1)}></a>
                    <a href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=18375" class={clsx(styles.certification_item_2)}></a>
                </div>
                <div class={clsx(styles.copyright)}>
                    <span>© 2023 - Bản quyền thuộc về cửa hàng Thế giới laptop.</span>
                </div>
            </div>
        </>
    )
}
export default Footer;