"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import Cart from "@/app/components/icons/Cart";
import Hamburger from "@/app/components/icons/Hamburger";

function AuthLinks({ status, userName }) {
  if (status === "authenticated") {
    return (
      <>
        <Link href="/profile" className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary text-white px-8 rounded-full py-2"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated" || status === undefined || status === null) {
    return (
      <>
        <Link href={"/login"}>Login</Link>
        <Link
          href={"/register"}
          className="bg-primary text-white px-8 rounded-full py-2"
        >
          Register
        </Link>
      </>
    );
  }
}

export default function Header() {
  const session = useSession();
  console.log(session);
  const userData = session?.data?.user;
  let userName = userData?.name || userData?.email;
  const status = session?.status;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  if (userName && userName.includes("@")) {
    userName = userName.split("@")[0];
  }
  return (
    <>
      <header>
        <div className="flex items-center md:hidden justify-between">
          <Link className="text-primary font-semibold text-2xl" href="/">
            Tony&apos;s PIZZA
          </Link>
          <div className="flex gap-8 items-center">
            <Link href={"/cart"} className="relative">
              <Cart />{" "}
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-primary text-xs text-white py-1 px-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <button
              className="p-1 "
              onClick={() => {
                setMobileNavOpen((prev) => !prev);
              }}
            >
              <Hamburger />
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div
            onClick={() => setMobileNavOpen(false)}
            className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
          >
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
            <AuthLinks status={status} userName={userName} />
          </div>
        )}

        <div className="hidden md:flex items-center justify-between">
          <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            <Link className="text-primary font-semibold text-2xl" href="/">
              Tony&apos;s PIZZA
            </Link>
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
          <nav className="flex items-center gap-4 text-gray-500 font-semibold">
            <AuthLinks status={status} userName={userName} />
            <Link href={"/cart"} className="relative">
              <Cart />{" "}
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-primary text-xs text-white py-1 px-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
