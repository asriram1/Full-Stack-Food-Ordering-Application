"use client";
import React, { useContext, useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../components/AppContext";
import Image from "next/image";
import Trash from "../components/icons/Trash";
import AddressInputs from "../components/layout/AddressInputs";
import { useProfile } from "../components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "../components/menu/CartProduct";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({
    phone: "",
    streetAddress: "",
    city: "",
    postal: "",
    state: "",
  });
  const session = useSession();
  const { status } = session;

  const { data: profileData } = useProfile();

  useEffect(() => {
    if (status === "unauthenticated") {
      return redirect("/login");
    }
    if (typeof window.location.url !== "undefined") {
      if (window.location.url.includes("canceled=1")) {
        toast.error("Payment failed.");
      }
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      return redirect("/login");
    }
    if (profileData?.city) {
      const { phone, streetAddress, city, postal, state } = profileData;
      const addressFromProfile = { phone, streetAddress, city, postal, state };
      setAddress(addressFromProfile);
    }
  }, [profileData]);
  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress({ ...address, [propName]: value });
  }
  async function proceedToCheckout(ev) {
    ev.preventDefault();
    // address & shopping cart products

    toast("Preparing your order...");
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartProducts, address }),
    });

    if (response.ok) {
      toast.success("Redirecting to payment link...");
      const link = await response.json();
      // redirect to stripe
      window.location = link;
    } else {
      toast.error("Something went wrong...");
    }
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4"> Your shopping cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart.</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={index}
                index={index}
                product={product}
                onRemove={removeCartProduct}
              />
              // <div className="flex gap-4 mb-2 border-b py-4 items-center ">
              //   <div className="w-24">
              //     <Image
              //       src={product.image}
              //       width={240}
              //       height={240}
              //       alt={""}
              //     />
              //   </div>
              //   <div className="grow">
              //     <h3 className="font-semibold">{product.name}</h3>
              //     {product.size && (
              //       <div className="text-sm">
              //         Size: <span>{product.size.name}</span>
              //       </div>
              //     )}
              //     {product.extras?.length > 0 && (
              //       <div className="text-sm text-gray-500">
              //         Extras:
              //         {product.extras.map((extra) => (
              //           <div>
              //             {" "}
              //             {extra.name} ${extra.price}{" "}
              //           </div>
              //         ))}
              //       </div>
              //     )}
              //   </div>
              //   <div className="font-semibold text-lg">
              //     ${cartProductPrice(product)}
              //   </div>
              //   <div>
              //     <button
              //       type="button"
              //       onClick={() => removeCartProduct(index)}
              //       className="p-2"
              //     >
              //       <Trash />
              //     </button>
              //   </div>
              // </div>
            ))}
          <div className="py-2 text-right pr-14 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal: <br />
              Delivery: <br />
              Total:
            </div>

            <div className=" font-semibold pl-2 text-right">
              ${subtotal} <br /> $5 <br /> ${subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form action="" onSubmit={proceedToCheckout}>
            <label>Address</label>
            {console.log(address)}
            <AddressInputs
              addressProps={{ address }}
              setAdressProps={handleAddressChange}
            />
            <button type="submit"> Pay ${subtotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
