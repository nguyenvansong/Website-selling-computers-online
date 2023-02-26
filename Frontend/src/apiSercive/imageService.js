import * as request from '../utils/request';

export const getById = async (name) => {
    try {
        const res = await request.get(`image/productid/${name}`);
        return res;
    } catch (error) {
        return error;
    }
};