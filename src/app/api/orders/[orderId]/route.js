// src/app/api/orders/update/[orderId]/route.js
import { NextResponse } from 'next/server';
import Order from '@/models/orderModel';
import { connect } from '@/dbConfig/dbConfig';
import { UserAuth } from '@/utils/userAuth';
export async function PATCH(request, { params }) {
  await connect();
  try {
    const { orderId } = params;
    const { status } = await request.json();

    const updatedOrder = await Order.findOneAndUpdate(
      { 'orders._id': orderId },
      { $set: { 'orders.$.orderStatus': status } },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

import axios from 'axios';

export async function GET(request, { params }) {
  await connect();
  try {
    const { orderId } = params;
    const userId = UserAuth(request);

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const orders = await Order.find({ userId });

    if (!orders || orders.length === 0) {
      return NextResponse.json({ message: 'No orders found' }, { status: 404 });
    }

    let matchedItems = [];
    orders.forEach((order) => {
      const matchingOrder = order.orders.find((ord) => ord.orderId === orderId);
      if (matchingOrder) {
        matchedItems = matchingOrder.items;
      }
    });

    if (matchedItems.length === 0) {
      return NextResponse.json({ message: 'No items found for the specified order ID' }, { status: 404 });
    }

    // Fetch actual product data for each item
    const productDetails = await Promise.all(
      matchedItems.map(async (item) => {
        try {
          const response = await axios.get(`http://localhost:3000/api/products/${item.productId}`);
          return {
            ...item,
            productDetails: response.data,
          };
          console.log(response.data)
        } catch (error) {
          console.error(`Error fetching product ${item.productId}:`, error);
          return { ...item, productDetails: null }; // Handle failed product fetch gracefully
        }
      })
    );

    return NextResponse.json({ items: productDetails }, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
