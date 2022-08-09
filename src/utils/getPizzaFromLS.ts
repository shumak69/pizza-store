import { calcTotalPrice } from "./calcTotalPrice";

export const getPizzaFromLS = () => {
  const data = localStorage.getItem("pizza");
  const json = data ? JSON.parse(data) : [];
  return {
    items: json,
    totalPrice: calcTotalPrice(json),
  };
};
