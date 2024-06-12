"use client";
import Image from "next/image";
import React, { useState } from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((menuItems) => {
        const bestSellers = menuItems.slice(-9);
        setBestSellers(bestSellers);
      });
    });
  }, []);
  return (
    <>
      <section className="">
        <div className="absolute left-0 right-0 w-full">
          <div className="absolute -left-0 -top-[70px] -z-10 ">
            <Image src={"/salad1.png"} width={109} height={189} alt={"salad"} />
          </div>
          <div className=" absolute right-0  -top-36 -right-0 -z-10">
            <Image
              src={"/salad2.png"}
              width={107}
              height={195}
              objectFit={"contain"}
              alt={"salad"}
            />
          </div>
        </div>
        <div className="text-center mb-4">
          <SectionHeaders
            subHeader={"Check Out"}
            mainHeader={"Our Best Sellers"}
          />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {bestSellers.length > 0 &&
            bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
        </div>
      </section>
    </>
  );
}
