import * as request from '../utils/request';

export const getAll = async () => {
    try {
        const res = await request.get('order/getbill');
        return res;
    } catch (error) {
        return error;
    }
};

