import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8080/',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};
export const getCategory = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response;
};
export const register = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response.data;
};

export const update = async (path, options = {}) => {
    const response = await request.put(path, options);
    return response.data;
};
export const reSetPassword = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response.data;
};

export const orderRequest = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response.data;
};
export default request;