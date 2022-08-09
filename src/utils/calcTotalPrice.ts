import { CartItemProps } from "../Components/CartItem"

export const calcTotalPrice = (items: CartItemProps[]) => {
    return items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
}