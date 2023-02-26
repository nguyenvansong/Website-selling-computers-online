import * as request from '../utils/request';

export const getAllCategory = async () => {
    try {
        const res = await request.getCategory('category/getAll');
        return res.data;
    } catch (error) {
        return error;
    }
};