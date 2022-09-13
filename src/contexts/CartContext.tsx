import produce from "immer";
import { createContext, useEffect, useState } from "react";
import { Coffe } from "../pages/Home/components/Products/Products";

export interface CartItem extends Coffe {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartQuantity: number;
  addCoffeToCart: (coffe: CartItem) => void;
  changeCartItemQuantity: (
    cartItemName: string,
    type: "increase" | "decrease"
  ) => void;
  removeCartItem: (cartItemName: string) => void;
  cartItemsTotal: number;
  cleanCart: () => void;
}

interface cartContextProviderProps {
  children: React.ReactNode;
}

const COFFEE_ITEMS_STORAGE_KEY = "@coffeeDelivery:cartItems";

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: cartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storagedCartItems = localStorage.getItem(COFFEE_ITEMS_STORAGE_KEY);
    if (storagedCartItems) {
      return JSON.parse(storagedCartItems);
    }
    return [];
  });

  const cartQuantity = cartItems.length;

  const cartItemsTotal = cartItems.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity;
  }, 0);

  function addCoffeToCart(props: CartItem) {
    const coffeAlreadyExistsInCart = cartItems.findIndex(
      (item) => item.name === props.name
    );

    const newCart = produce(cartItems, (draft) => {
      if (coffeAlreadyExistsInCart < 0) {
        draft.push(props);
      } else [(draft[coffeAlreadyExistsInCart].quantity += props.quantity)];
    });

    setCartItems(newCart);
    console.log(newCart);
  }

  function removeCartItem(cartItemName: string) {
    const newCart = produce(cartItems, (draft) => {
      const coffeExistsInCart = cartItems.findIndex(
        (cartItem) => cartItem.name === cartItemName
      );

      if (coffeExistsInCart >= 0) {
        draft.splice(coffeExistsInCart, 1);
      }
    });
    setCartItems(newCart);
  }

  function changeCartItemQuantity(
    cartItemName: string,
    type: "increase" | "decrease"
  ) {
    const newCart = produce(cartItems, (draft) => {
      const coffeExistsInCart = cartItems.findIndex(
        (cartItem) => cartItem.name === cartItemName
      );

      if (coffeExistsInCart >= 0) {
        const item = draft[coffeExistsInCart];
        draft[coffeExistsInCart].quantity =
          type === "increase" ? item.quantity + 1 : item.quantity - 1;
      }
    });

    setCartItems(newCart);
  }

  function cleanCart() {
    setCartItems([]);
  }

  useEffect(() => {
    localStorage.setItem(COFFEE_ITEMS_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCoffeToCart,
        cartQuantity,
        changeCartItemQuantity,
        removeCartItem,
        cartItemsTotal,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
