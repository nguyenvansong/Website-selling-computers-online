import clsx from 'clsx';
import styles from './report.module.scss';
import { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import * as orderService from '../../apiSercive/orderService'
import * as productService from '../../apiSercive/productService'

function Report(){
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(2023);
    const [products, setProducts] = useState([]);
    const [revenue2, setRevenue2] = useState(0);
    const [revenue, setReveue] = useState({
        month1: 0,
        month2: 0,
        month3: 0,
        month4: 0,
        month5: 0,
        month6: 0,
        month7: 0,
        month8: 0,
        month9: 0,
        month10: 0,
        month11: 0,
        month12: 0,
    });

    // Call the api to get the revenue data of the months of the year
    useEffect(() => {
        const fetchApi = async () => {
            const month1 = await orderService.getRevenue(year,1) || 0;
            const month2 = await orderService.getRevenue(year,2) || 0;
            const month3 = await orderService.getRevenue(year,3) || 0;
            const month4 = await orderService.getRevenue(year,4) || 0;
            const month5 = await orderService.getRevenue(year,5) || 0;
            const month6 = await orderService.getRevenue(year,6) || 0;
            const month7 = await orderService.getRevenue(year,7) || 0;
            const month8 = await orderService.getRevenue(year,8) || 0;
            const month9 = await orderService.getRevenue(year,9) || 0;
            const month10 = await orderService.getRevenue(year,10) || 0;
            const month11 = await orderService.getRevenue(year,11) || 0;
            const month12 = await orderService.getRevenue(year,12) || 0;
            setReveue({
                month1,
                month2,
                month3,
                month4,
                month5,
                month6,
                month7,
                month8,
                month9,
                month10,
                month11,
                month12
            })
        }
        fetchApi();
    },[year])


    useEffect(() => {
        const fetchApi = async () => {
            const prevMonth = (month - 1) === 0 ? 12 : month - 1;
            const result = await orderService.getRevenue(year,month) || 0;
            const result2 = await orderService.getRevenue(year,prevMonth) || 0;
            if(result === 0 && result2 !== 0){
                setRevenue2(-100);
            }else if(result2 === 0 && result !== 0){
                setRevenue2(100);
            }else if(result === 0 && result2 === 0){
                setRevenue2(0);
            }else{
                setRevenue2(result > result2 ? (result/result2 * 100) : ("-" + result/result2 * 100));

            }
        }
        fetchApi();
    },[month,year])

    // Call the api to get the list of 5 best selling items
    useEffect(() => {
        const fetchApi = async () => {
            const result = await productService.getTop5() || [];
            setProducts(result);
        }
        fetchApi();
    },[])

    return(
        <>
            <div className={clsx(styles.dashboard)}>
        
                <div className={clsx(styles.dashboard_content)}>
        
                    <div className={clsx(styles.title_page)}>
                        <div className={clsx(styles.title)}>
                            <span>THỐNG KÊ DỮ LIỆU</span>
                        </div>

                        <div className={clsx(styles.datetime)}>
                            <select className={clsx(styles.select_datetime)} name="filtermonth" id="filtermonth" onChange={(e) => setMonth(e.target.value)}>
                                <option value="">Chọn tháng</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
        
                            <select className={clsx(styles.select_datetime)} name="filteryear" id="filteryear" onChange={(e) => setYear(e.target.value)}>
                                <option value="">Chọn năm</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                            </select>
                        </div>
                        
                    </div>

                    <div className={clsx(styles.dashboard_content_child)}>

                        {/* conten_center */}
                        <div className={clsx(styles.content_center)}>

                            <div className={clsx(styles.revenue_statistics_years)}>
                                <div className={clsx(styles.revenue_statistics_years_title)}>
                                    Doanh thu theo năm:
                                </div>
                                <div id="chart_div">
                                    <Chart
                                        width={"100%"}
                                        height={"300px"}
                                        chartType="ColumnChart"
                                        data={[    ["Month", "Doanh thu"],
                                            ["1", revenue.month1],
                                            ["2", revenue.month2],
                                            ["3", revenue.month3],
                                            ["4", revenue.month4],
                                            ["5", revenue.month5],
                                            ["6", revenue.month6],
                                            ["7", revenue.month7],
                                            ["8", revenue.month8],
                                            ["9", revenue.month9],
                                            ["10", revenue.month10],
                                            ["11", revenue.month11],
                                            ["12", revenue.month12],
                                        ]}
                                        options={{
                                            title: "Store Performance",
                                            curveType: "function",
                                            legend: { position: "bottom" }
                                        }}
                                    />
                                </div>
                            </div>

                            <hr/>

                            <div className={clsx(styles.best_product_selling)}>
                                <div className={clsx(styles.best_product_selling_title)}>Danh sách mặt hàng bán chạy nhất:</div>

                                <table className={clsx(styles.best_product_selling_table)}>
                                    <thead className={clsx(styles.best_product_selling_table_head)}>
                                        <tr>
                                            <th className={clsx(styles.best_product_selling_table_head_th1)} colspan="2">Sản phẩm</th>
                                            <th className={clsx(styles.best_product_selling_table_head_th2)}>Giá</th>
                                            <th className={clsx(styles.best_product_selling_table_head_th3)}>Số lượng</th>
                                        </tr>
                                    </thead>
                                    <tbody className={clsx(styles.best_product_selling_table_body)}>
                                        {
                                            products.map((product) => {
                                                return (
                                                    <tr className={clsx(styles.infor_table)}>
                                                        <td className={clsx(styles.product_img)}> 
                                                            <img className={clsx(styles.img_title)} src={`http://localhost:8080/getimage/product/${product.proImage}`} alt=""/>
                                                        </td>
                                                        <td className={clsx(styles.product_name)}>
                                                            <div className={clsx(styles.name_product)}>{product.proName}</div>
                                                        </td>
                                                        <td className={clsx(styles.product_price)}>
                                                            <span>{product.price.toLocaleString({useGrouping: true})}<span>đ</span></span>
                                                        </td>
                                                        <td className={clsx(styles.product_quantity)}>
                                                            <span>{product.quantity}</span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        
                                    </tbody>
                                    <hr/>
                                </table>
                            </div>
                        </div>


                        {/* content_right */}
                        <div className={clsx(styles.content_right)}>
                            <div className={clsx(styles.revenue_content)}>
                                <div className={clsx(styles.text_Revenue_total)}>
                                    <span>Ước tính doanh thu tháng:</span>
                                </div>
                                <div className={clsx(styles.revenue_total)}>
                                    <span className={clsx(styles.revenue_total_span)}></span>
                                    <span className={clsx(styles.revenue_total_span_1)}>đ</span>
                                    <span className={clsx(styles.revenue_total_span_2)}>{revenue2}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report;