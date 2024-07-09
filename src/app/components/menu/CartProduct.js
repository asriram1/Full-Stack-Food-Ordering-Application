import React from "react";
import { CartContext, cartProductPrice } from "@/app/components/AppContext";
import Image from "next/image";
import Trash from "@/app/components/icons/Trash";

export default function CartProduct({ index, product, onRemove }) {
  return (
    <div className="flex gap-4 mb-2 border-b py-4 items-center ">
      <div className="w-24">
        <Image src={product.image} width={240} height={240} alt={""} />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.size && (
          <div key={product.name} className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            Extras:
            {product.extras.map((extra) => (
              <div key={extra.name}>
                {" "}
                {extra.name} ${extra.price}{" "}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="font-semibold text-lg">${cartProductPrice(product)}</div>
      {!!onRemove && (
        <div>
          <button type="button" onClick={() => onRemove(index)} className="p-2">
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
