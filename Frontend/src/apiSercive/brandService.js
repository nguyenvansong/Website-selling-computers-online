import * as request from '../utils/request';

export const getAll = async () => {
    try {
        const res = await request.get('brand/getAll');
        return res;
    } catch (error) {
        return error;
    }
};