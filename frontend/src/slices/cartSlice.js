import { createSlice } from "@reduxjs/toolkit";
import { json } from "express";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []}

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => item._id === x._id);

            if (exsistItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === item._id ? item : x);
            } else {
                state.cartItems = [...cartItems, item];
            }

            // calculate items price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

            // calculate shipping price if shipping price over 100 then free else itemsPrice + 10
            state.shippingPrice = addDecimals(state.itemsPrice >= 100 ? 0 : 10);

            // calculate tax Price
            state.taxPrice = addDecimals(Number(0.28 * state.itemsPrice).toFixed(2));

            // calculate total price
            state.totalPrice = (
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
        },

    },
})

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;