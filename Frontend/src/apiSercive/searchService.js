import * as request from '../utils/request';

export const search = async (name) => {

    const params = name;
    const encodedParams = encodeURIComponent(params);
    try {
        const res = await request.get(`product/search?keyword=${encodedParams}`);
        return res;
    } catch (error) {
        return error;
    }
};