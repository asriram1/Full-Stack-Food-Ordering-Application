"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import getSessionUser from "./getSessionUser";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;

  if (cartProduct.size) {
    price += cartProduct.size.price;
  }

  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartName, setCartName] = useState("");
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  // const session = useSession();

  useEffect(() => {
    const username = async () => {
      const username = await getSessionUser();
      console.log(username);
      return username;
    };
    username().then((user) => {
      const cartName = "cart" + user + "food-app";
      console.log(ls);
      if (ls && ls.getItem(cartName)) {
        setCartProducts(JSON.parse(ls.getItem(cartName)));
      }
    });
    // console.log(username);
    // const userData = session?.data?.user;
    // let userName = userData?.name || userData?.email;
    // const cartName = "cart" + userName;
  }, []);

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success("Product removed");
  }
  async function saveCartProductsToLocalStorage(cartProducts) {
    const username = await getSessionUser();
    const cartName = "cart" + username + "food-app";
    setCartName(cartName);
    if (ls) {
      ls.setItem(cartName, JSON.stringify(cartProducts));
    }
  }

  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }
  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
