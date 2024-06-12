import React from "react";
import { CartContext } from "../AppContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import MenuItemTile from "@/app/components/menu/MenuItemTile";
import Image from "next/image";

import FlyingButton from "react-flying-item";

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  async function handleAddToCartButtonClick() {
    if (showPopup) {
      addToCart(menuItem, selectedSize, selectedExtras);
      toast.success("Added to cart");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowPopup(false);
      return;
    }

    if (sizes.length === 0 && extraIngredientPrices.length === 0) {
      addToCart(menuItem);
      toast.success("Added to cart");
    } else {
      setShowPopup(true);
    }
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;

    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-4 rounded-lg max-w-md max-h-screen overflow-y-scroll"
          >
            <Image
              src={image}
              alt={name}
              width={300}
              height={300}
              className="mx-auto"
            />
            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
            <p className="text-center text-gray-500 text-sm mb-2">
              {description}
            </p>
            {sizes?.length > 0 && (
              <div className=" py-2 ">
                <h3 className="text-center text-gray-700"> Any extras? </h3>
                {sizes.map((size) => (
                  <label className="flex items-center gap-2 p-4 border rounded-md mb-1">
                    <input
                      type="radio"
                      name="size"
                      onClick={() => setSelectedSize(size)}
                      checked={selectedSize?.name === size.name}
                    />
                    {size.name} ${basePrice + size.price}
                  </label>
                ))}
              </div>
            )}
            {extraIngredientPrices.length > 0 && (
              <div className=" py-2 ">
                <h3 className="text-center text-gray-700">
                  {" "}
                  Pick your extras:{" "}
                </h3>
                {extraIngredientPrices.map((extra) => (
                  <label className="flex items-center gap-2 p-4 border rounded-md mb-1">
                    <input
                      type="checkbox"
                      name={extra.name}
                      onClick={(ev) => handleExtraThingClick(ev, extra)}
                    />
                    {extra.name} ${extra.price}
                  </label>
                ))}
              </div>
            )}
            <div className="flying-button-parent mt-4 ">
              <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
                <div onClick={handleAddToCartButtonClick} className="">
                  Add to cart ${selectedPrice}
                </div>
              </FlyingButton>
            </div>
            <button className="mt-2" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
