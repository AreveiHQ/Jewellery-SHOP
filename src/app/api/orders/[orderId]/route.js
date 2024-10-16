// src/app/api/orders/update/[orderId]/route.js
import { NextResponse } from 'next/server';
import Order from '@/models/orderModel';
import { connect } from '@/dbConfig/dbConfig';
connect();
export async function PATCH(request, { params }) {
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
