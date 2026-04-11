export const getFinalPrice = (price, discount) => {
    if (!discount) return price;
    return parseFloat((price - (price * discount) / 100).toFixed(2));
};