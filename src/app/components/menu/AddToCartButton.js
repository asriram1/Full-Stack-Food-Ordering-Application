import React from "react";
import FlyingButton from "react-flying-item";

export default function AddToCartButton({
  image,
  hasSizesOrExtras,
  onClick,
  basePrice,
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4 ">
        <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
          <div onClick={onClick}>Add to Cart ${basePrice}</div>
        </FlyingButton>
      </div>
    );
  }
  return (
    <div>
      {" "}
      <button
        type="button"
        onClick={onClick}
        className="bg-primary mt-4 text-white rounded-full px-8 py-2"
      >
        <span> Add to Cart (Extras available) ${basePrice}</span>
      </button>
    </div>
  );
}
