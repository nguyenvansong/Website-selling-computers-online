import * as request from '../utils/request';

export const getAll = async () => {
    try {
        const res = await request.get('order/getAll');
        return res;
    } catch (error) {
        return error;
    }
};

export const getRevenue = async (year, month) => {
    try {
        const res = await request.get('orderdetail/monthlyRevenue',{
            params: {
                year,
                month
            }
        });
        return res;
    } catch (error) {
        return error;
    }
};

export const getByIdAccount = async (id) => {
    try {
        const res = await request.get(`order/xemhoadon/${id}`);
        return res;
    } catch (error) {
        return error;
    }
};
export const order = async (id,{productid,quantity}) => {
    try {
        const res = await request.orderRequest(`order/dathang/${id}?productid=${productid}&quantity=${quantity}`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        return res;
    } catch (error) {
        return error;
    }
};