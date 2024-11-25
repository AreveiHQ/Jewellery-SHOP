"use client"
import React from 'react'
import { ToastContainer } from 'react-toastify';

export default function ReactToastProvider() {
  return (
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
  )
}
