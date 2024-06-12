import React from "react";
import AddToCartButton from "@/app/components/menu/AddToCartButton";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, sizes, basePrice, extraIngredientPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover: shadow-black/25 transition-all">
      <div className="text-center">
        <img
          src={image}
          alt="pizza"
          className="h-auto max-h-24 block mx-auto"
        />
      </div>

      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>

      <AddToCartButton
        image={image}
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
      {/* <button
        type="button"
        onClick={onAddToCart}
        className="bg-primary mt-4 text-white rounded-full px-8 py-2"
      >
        {hasSizesOrExtras ? (
          <span> Add to Cart (Extras available) ${basePrice}</span>
        ) : (
          <span> Add to Cart ${basePrice}</span>
        )}
      </button> */}
    </div>
  );
}
