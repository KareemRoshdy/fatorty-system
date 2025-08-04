export const formatePrice = (price: number) => {
  const formatted = new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(price);

  return formatted;
};
