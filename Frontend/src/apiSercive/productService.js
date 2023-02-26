import * as request from '../utils/request';

export const getAll = async () => {
    try {
        const res = await request.get('product/getAll');
        return res;
    } catch (error) {
        return error;
    }
};
export const getTop5 = async () => {
    try {
        const res = await request.get('product/gettop5');
        return res;
    } catch (error) {
        return error;
    }
};