"use client";
import React, { useEffect, useState } from "react";
import SectionHeaders from "@/app/components/layout/SectionHeaders";
import UserTabs from "@/app/components/layout/UserTabs";
import { useProfile } from "@/app/components/UseProfile";
import dbTimeForHuman from "@/libs/datetime";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {loadingOrders && <div> Loading orders... </div>}
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row flex gap-6 items-center"
            >
              <div className="grow flex flex-col md:flex-row items-center gap-6">
                <div className="">
                  <div
                    className={
                      (order.paid ? "bg-green-500" : "bg-red-400") +
                      " p-2 rounded-md text-center text-white whitespace-nowrap w-24"
                    }
                  >
                    {order.paid ? "Paid" : "Not Paid"}
                  </div>
                </div>

                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow"> {order.userEmail} </div>
                    <div className="text-gray-500 text-xs">
                      {dbTimeForHuman(order.createdAt)}{" "}
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {order.cartProducts.map((p) => p.name).join(", ")}{" "}
                  </div>
                </div>
                <div></div>
              </div>

              <div className="justify-end flex gap-2 items-center">
                <Link href={"/orders/" + order._id} className="button">
                  Show Order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
