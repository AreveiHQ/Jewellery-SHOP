"use client";
import Script from "next/script";
import axios from "axios";
import {  Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {  useEffect, useState } from "react";
import { getServerCookie } from "@/utils/serverCookie";
import { Select, Option } from "@/MaterialTailwindNext";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const DeliveryForm = () => {
  const navigate  = useRouter();
  const [AddressList, setAddressList] = useState([]);
  const {address} = useSelector((state)=>state.user)
  useEffect(() => {
    
    const fetchAddress = async () => {
      const token = await getServerCookie("token");
      try {
        const { data } = await axios.get(`/api/users/address`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(data.address)
        setAddressList(data.address);
      } catch (err) {
        console.error("Error fetching address:", err);
      }
    };
     fetchAddress();

  }, []);
  const [isNewAddress, setNewAddress] = useState(true);
  const validationSchema = Yup.object().shape({
    selectedDetails:Yup.string(),
    firstName:isNewAddress?Yup.string().required("First Name is required"):Yup.string(),
    lastName:isNewAddress?Yup.string().required("Last Name is required"):Yup.string(),
    contact:isNewAddress?Yup.string().required("Contact Number is required").matches(/^[0-9]{10}$/, "Must be a valid 10-digit number"):Yup.string(),
    street:isNewAddress?  Yup.string().required("Address Line 1 is required"):Yup.string(),
    city: isNewAddress? Yup.string().required("City is required"):Yup.string(),
    state:isNewAddress? Yup.string().required("State is required"):Yup.string(),
    postalCode: isNewAddress?Yup.string().required("postalCode is required").matches(/^[0-9]{6}$/, "Must be a valid 6-digit postalCode"):Yup.string(),
    landmark: Yup.string(),
  });
  const { register, handleSubmit,control,setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const formdetails = useWatch({ control, name: 'selectedDetails' });

  const [isLoading, setIsLoading] = useState(false);

  const formatAddress = (address)=>{
    return `${address.firstName} ${address.lastName} , ${address.contact} , ${address.landmark} ${address.street} ${address.city} ${address.state} ${address.postalCode}`;
  }
  const onSubmit = async (formdata) => {

    try {

      const token = await getServerCookie('token');
      setIsLoading(true);
      // Handle payment initiation or form submission here
      const {data} = await axios.post("/api/payment/create-order" ,formdata,{
        headers: { Authorization: `Bearer ${token}` },
      });
      const {address,order} = data;
      const [name,contact,location] = address.split(',');
      console.log(data)
      console.log("Order placed successfully");
      const { key, ...restProps } = {
        key:"rzp_test_sy0ik5pd9JpjmO", // Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Jenii JP Sterling Silver",
        description: "Purchase Product",
        image: "https://cdn.bio.link/uploads/profile_pictures/2024-10-07/WpsNql0qow0baLnfnBowFm8v5fK9twVm.png", // Optional
        order_id: order.id, // Backend Order ID
        handler: async function (response) {
          // Payment successful, send data to backend
          const orderData = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount:(order.amount/100.00),
            address: location,
          };

          const result = await axios.post(
            `/api/payment/verify-payment/`,
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(result.data);
          navigate.push("/")
        },
        prefill: {
          name: contact,
          email: "useremail@example.com", // Optional
          contact: contact,
        },
        theme: {
          color: "#F37254",
        },
      };
      const razorpay = new window.Razorpay({ key, ...restProps });
      razorpay.open();
      razorpay.on("payment.failed", function (response) {
        alert("Payment failed. Please try again. Contact support for help");
      });
    } catch (error) {
      console.error("Error in submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };


  function handleAddress(val){
    console.log(val)
    setValue('selectedDetails',val)
    setNewAddress(false);
  }

  

  return (
    <> 
    <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v1/checkout.js"
  />
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 text-black space-y-4">
      {/* Delivery Section */}
      <h2 className="text-xl font-bold mb-4">Delivery</h2>
      <div class="mt-5 bg-white shadow cursor-pointer rounded-xl">
            <div class="flex">
               <div class="flex-1 py-5 pl-5 overflow-hidden">
                  <ul>
                     <li class="text-xs text-gray-600 uppercase ">Receiver</li>
                     <li>Max Mustermann</li>
                     <li>Musterstrasse 1</li>
                     <li>4020 Linz</li>
                  </ul>
               </div>
               <div class="flex-1 py-5 pl-1 overflow-hidden">
                  <ul>
                     <li class="text-xs text-gray-600 uppercase">Sender</li>
                     <li>Rick Astley</li>
                     <li>Rickrolled 11</li>
                     <li>1000 Vienna</li>
                  </ul>
               </div>
               <div class="flex-none pt-2.5 pr-2.5 pl-1">
                  <button type="button" class="px-2 py-2 font-medium tracking-wide text-black capitalize transition duration-300 ease-in-out transform rounded-xl hover:bg-gray-300 focus:outline-none active:scale-95">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M5 18.08V19h.92l9.06-9.06-.92-.92z" opacity=".3"></path>
                        <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19z"></path>
                     </svg>
                  </button>
               </div>
            </div>
         </div>

      <button type="button" class="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
               <g>
                  <rect fill="none" height="24" width="24"></rect>
               </g>
               <g>
                  <g>
                     <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                  </g>
               </g>
            </svg>
            <span class="pl-2 mx-1">Create new shipping label</span>
         </button>

         <div class="flex flex-row-reverse p-3">
               <div class="flex-initial pl-3">
                  <button type="button" class="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z" opacity=".3"></path>
                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                     </svg>
                     <span class="pl-2 mx-1">Save</span>
                  </button>
               </div>
               <div class="flex-initial">
                  <button type="button" class="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M8 9h8v10H8z" opacity=".3"></path>
                        <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
                     </svg>
                     <span class="pl-2 mx-1">Delete</span>
                  </button>
               </div>
            </div>
      <div>

        
      <Controller
                name="selectedDetails"
                control={control}
                render={({ field }) => (      
                  <Select label="Select Delivery Details" selected={() =>  <div className=" line-clamp-1">{formdetails}</div>
                }  onChange={handleAddress}>
              {address?.map((item,index) => (
                  <Option key={index} value={formatAddress(item)}>
                    <div>
                  <p >Name :{`${item.firstName} ${item.lastName} `}</p>
                  <p >Phone :{`${item.contact}  `}</p>
                  <p >Address :{` ${item.landmark} ${item.street} ${item.city} ${item.state} - ${item.postalCode} `}</p>
                  </div>
                  </Option>
                ))}
        </Select>)}/>
      {errors.addressSelect && <p className="text-red-500 text-sm">{errors.addressSelect.message}</p>}
        </div>
        
        <div style={{display:isNewAddress?'block':'none'}}>
      <div className="">
      <div>Name</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div >
        <input
          {...register("firstName")}
          type="text"
          placeholder="First Name"
          className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full ${errors.firstName ? "border-red-500" : "border-gray-100"}`}
        />
      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

        </div>
        <div>
        <input
          {...register("lastName")}
          type="text"
          placeholder="Last Name"
          className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full ${errors.lastName ? "border-red-500" : "border-gray-100"}`}
        />
      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

        </div>
        </div>
      </div>

      <div>
      <div>Number</div>
      <input
        {...register("contact")}
        type="text"
        placeholder="Contact Number"
        className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full md:w-1/2 ${errors.contact ? "border-red-500" : "border-gray-100"}`}
      />
      {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
      </div>

      <div>
      <p>Address</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
        <input
          {...register("street")}
          type="text"
          placeholder="Address Line 1, Flat No, Building Name"
          className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full ${errors.street ? "border-red-500" : "border-gray-100"}`}
        />
      {errors.street && <p className="text-red-500 text-sm">{errors.street.message}</p>}

        </div>

        <div>
        <input
          {...register("state")}
          type="text"
          placeholder="State"
          className="border bg-[#F2F2F2] text-gray-700 rounded-lg p-3 w-full"
        />
      {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <input
          {...register("landmark")}
          type="text"
          placeholder="Road, Area, Landmark"
          className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full ${errors.landmark ? "border-red-500" : "border-gray-100"}`}
        />
      {errors.landmark && <p className="text-red-500 text-sm">{errors.landmark.message}</p>}
        </div>
        <div>
        <input
          {...register("city")}
          type="text"
          placeholder="City"
          className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full ${errors.city ? "border-red-500" : "border-gray-100"}`}
        />
      {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
      </div>
      </div>


<div>
      <p>postalCode</p>
      <input
        {...register("postalCode")}
        type="text"
        placeholder="Area postalCode"
        className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full md:w-1/2 ${errors.postalCode ? "border-red-500" : "border-gray-100"}`}
      />
      {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
      </div>
      </div>
      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" />
          <span className="text-gray-700">Deliver as Gift</span>
        </label>
      </div>

      </div>

      <h2 className="text-xl font-bold mb-4">Apply Coupon</h2>
      <input
        type="text"
        placeholder="Search"
        className="border bg-[#F2F2F2] text-black rounded-lg p-3 w-full md:w-1/2 mb-6"
      />

      <button
        type="submit"
        className={`bg-[#BC264B] hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg w-full ${isLoading ? "opacity-50" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Proceed to Payment"}
      </button>
    </form>
    </>
  );
};

export default DeliveryForm;
