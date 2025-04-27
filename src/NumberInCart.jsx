import { useDispatch, useSelector } from "react-redux";

export function NumberInCart({ id }) {
  let cart = useSelector((state) => state.cart.array);
  let dispatch = useDispatch();
  let found = cart.find(function (a) {
    return a.id == id;
  });
  let number = found ? found.count : 0;

  return <span>Number in cart: {number}</span>;
}
