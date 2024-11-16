'use client'
import Footer from '@/components/HomePage/Footer';
import Header from '@/components/HomePage/Header';
import NavBar from '@/components/HomePage/Navbar';
import { getServerCookie } from '@/utils/serverCookie';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const MyOrders = () => {
  // State to store fetched orders
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = await getServerCookie("token"); // Ensure this is correctly imported or defined
      try {
        const itemsResponse = await axios.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Assuming the response structure from the screenshot
        setOrders(itemsResponse.data.orders[0].orders);
        console.log(itemsResponse.data.orders[0].orders)
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <NavBar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold">All Orders</h1>
        <h4 className='text-md text-slate-300 mb-4'>from anytime</h4>
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-600 font-medium">{order.orderStatus}</span>
                  <span className="text-gray-500 text-sm">Amount: ${order.amount}</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-1">
                    <h2 className="text-lg font-medium">Order ID: {order.orderId
                    }</h2>
                    <p className="text-gray-500">Address: {order.address}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Payment amount: Rs.{order.amount}/-
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Payment Status: {order.paymentStatus}
                    </p>
                    <div className="mt-2">
                      <p className="text-blue-500 text-sm cursor-pointer hover:underline">
                        Rate & Review
                      </p>
                    </div>
                    <div>
                      <p className="text-red-500 text-sm cursor-pointer hover:underline">
                        <Link href={`/myorderitems/${order.orderId}`}>View & Track Products Status</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
