import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
    name: 'my',
    initialState: {
        product: [],
        productSearch: [],
        cart: [],
        productQuantityBuy: 0,
        category: '',
        user: [],
        productBuy: [],
        order: [],
        error: ''
    },
    reducers: {
        setPickProduct: (state, action) => {
            state.product = action.payload;
        },
        setPickSearchResult: (state, action) => {
            state.productSearch = action.payload;
        },
        setProductCart: (state, action) => {
            state.cart = [...state.cart,[action.payload.product, action.payload.quantity]];
        },
        setProductQuantityBuy: (state, action) => {
            state.productQuantityBuy = state.productQuantityBuy + action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setUser: (state,action) => {
            state.user = action.payload;
        },
        setProductBuy: (state, action) => {
            state.productBuy = [action.payload.product, action.payload.quantity];
        },
        setOrder: (state,action) => {
            state.order = action.payload;
        },
        setError: (state,action) => {
            state.error = action.payload;
        },
    }
})

export default reducerSlice;