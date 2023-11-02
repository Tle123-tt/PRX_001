import Layout from "./components/layout/Layout";
import { createContext, useReducer } from "react";

const initialState = {
  cart: {
    cartItems: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEN":
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };
    default:
      return state;
  }
};

export const Store = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <Store.Provider value={value}>
      <Layout />
    </Store.Provider>
  );
}

export default App;
