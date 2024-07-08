import Image from "next/image";
import Right from "../icons/Right";
import { redirect } from "next/navigation";
import Router from "next/navigation";

export default function Hero() {
  return (
    <section className="hero md:mt-4 ">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold ">
          Everything
          <br /> is better <br /> with{" "}
          <span className="text-primary">PIZZA</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete. A simple yet
          delicious joy in life.
        </p>
        <div className="flex gap-6 text-sm">
          <a
            href={"/menu"}
            className="primary font-semibold flex justify-center bg-primary uppercase flex items-center gap-2 text-white px-6 py-2 rounded-full"
          >
            Order Now
            <Right />
          </a>
          <a href={"/#about"} className="learn">
            Learn More
            <Right />
          </a>
        </div>
      </div>

      <div className="relative hidden md:block">
        <Image
          src={"/pizza.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={""}
        />
      </div>
    </section>
  );
}
