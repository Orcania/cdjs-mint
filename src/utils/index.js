import BigNumber from 'bignumber.js';

export const normalNum2BigNum = (num, decimals = 18) => {
    return BigNumber(num)
        .times(10 ** decimals)
        .toFixed(0)
        .toString();
};

export const BigNum2NormalNum = (num, decimals = 18, decimalPlaces = 18) => {
    return BigNumber(num)
        .div(10 ** decimals)
        .toFixed(decimalPlaces)
        .toString();
};
