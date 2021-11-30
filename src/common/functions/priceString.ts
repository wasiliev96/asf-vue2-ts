const priceString = <T>(price: T, locales = ['ru'], currencyChar = '₽'): string => {
    return `${Number(price).toLocaleString(locales)} ${currencyChar}`;
}

export default priceString;
