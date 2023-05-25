export const currencyFormat = (price: number) => {
  const local = 'pt-br';
  const options = { currency: 'BRL', style: 'currency' };

  const valueFormatted = Intl.NumberFormat(local, options).format(price);
  return valueFormatted;
};
