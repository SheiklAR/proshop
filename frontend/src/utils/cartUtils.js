export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {

    // calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    
    // calculate shipping price if shipping price over 100 then free else itemsPrice + 10
    state.shippingPrice = addDecimals(Number(state.itemsPrice) >= 100 || Number(state.itemsPrice) === 0 ? 0 : 10);
    
    // calculate tax Price
    state.taxPrice = addDecimals(Number(0.28 * state.itemsPrice).toFixed(2));
    
    // calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);
    
    localStorage.setItem('cart', JSON.stringify(state));
}
