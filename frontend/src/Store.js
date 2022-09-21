import { useReducer, createContext } from "react";
// import logger from "use-reducer-logger";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };

    // case "FETCH_SUCCESS":
    //   return { ...state, products: action.payload, loading: false };
    // case "FETCH_FAILURE":
    //   return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
