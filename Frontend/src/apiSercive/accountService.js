import * as request from '../utils/request';

export const getAll = async () => {
    try {
        const res = await request.get('account/getAll',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
        });
        return res;
    } catch (error) {
        return error;
    }
};

export const getOne = async (id) => {
    try {
        const res = await request.get(`account/getbyid/${id}`);
        return res;
    } catch (error) {
        return error;
    }
};
export const login = async ({email, password}) => {
    try {
        const res = await request.register('api/v1/auth/authenticate1',{
            email,
            password
        }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const registerAccount = async ({userName, fullName, password, address, phone, email}) => {
    try {
        const res = await request.register('api/v1/auth/register',{
            userName,
            fullName,
            password,
            address,
            phone,
            email
        }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const updateAccount = async (id,{userName, fullName, password, address, phone, email}) => {
    try {
        const res = await request.update(`account/updateAccount/${id}`,{
            userName,
            fullName,
            password,
            address,
            phone,
            email
        }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const forgetPassword = async (email) => {
    try {
        const res = await request.reSetPassword('account/sendpass',{
            email
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );
        return res;
    } catch (error) {
        return error;
    }
};