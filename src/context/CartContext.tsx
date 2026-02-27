import { createContext, useReducer, type ReactNode } from "react";
import type { CartItem, ApiProduct } from "../types";

interface State {
  cart: CartItem[];
}

type Action =
  | { type: "ADD"; payload: ApiProduct }
  | { type: "DECREMENT"; payload: number };

const MAX_QUANTITY = 5;

const CartContext = createContext<any>(null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD":
      const existing = state.cart.find(i => i.id === action.payload.id);

      if (existing) {
        if (existing.quantity >= MAX_QUANTITY) return state;

        return {
          cart: state.cart.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        };
      }

      return {
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

    case "DECREMENT":
      return {
        cart: state.cart
          .map(i =>
            i.id === action.payload
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter(i => i.quantity > 0)
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { cart: [] });

  const totalPrice = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getItemQuantity = (id: number) => {
    return state.cart.find(i => i.id === id)?.quantity || 0;
  };

  return (
    <CartContext.Provider
      value={{ cart: state.cart, dispatch, totalPrice, getItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;