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

const DeliveryForm = () => {
  const navigate  = useRouter();
  const [AddressList, setAddressList] = useState([]);
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
    <> <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v1/checkout.js"
  />
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 text-black">
      {/* Delivery Section */}
      <h2 className="text-xl font-bold mb-4">Delivery</h2>
      <Controller
                name="selectedDetails"
                control={control}
                render={({ field }) => (      
                  <Select label="Select Delivery Details" selected={() =>  <div className=" line-clamp-1">{formdetails}</div>
                }  onChange={handleAddress}>
              {AddressList.map((item,index) => (
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

      <div>Name</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          {...register("firstName")}
          type="text"
          placeholder="First Name"
          className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full ${errors.firstName ? "border-red-500" : "border-gray-100"}`}
        />
        <input
          {...register("lastName")}
          type="text"
          placeholder="Last Name"
          className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full ${errors.lastName ? "border-red-500" : "border-gray-100"}`}
        />
      </div>
      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

      <div>Number</div>
      <input
        {...register("contact")}
        type="text"
        placeholder="Contact Number"
        className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full md:w-1/2 ${errors.contact ? "border-red-500" : "border-gray-100"}`}
      />
      {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}

      <div>Address</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          {...register("street")}
          type="text"
          placeholder="Address Line 1, Flat No, Building Name"
          className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full ${errors.street ? "border-red-500" : "border-gray-100"}`}
        />
        <input
          {...register("state")}
          type="text"
          placeholder="State"
          value="Gujarat"
          readOnly
          className="border bg-[#F2F2F2] text-gray-700 rounded-lg p-3 w-full"
        />
      </div>
      {errors.street && <p className="text-red-500 text-sm">{errors.street.message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          {...register("landmark")}
          type="text"
          placeholder="Road, Area, Landmark"
          className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full ${errors.landmark ? "border-red-500" : "border-gray-100"}`}
        />
        <input
          {...register("city")}
          type="text"
          placeholder="City"
          className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full ${errors.city ? "border-red-500" : "border-gray-100"}`}
        />
      </div>
      {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}

      <div>postalCode</div>
      <input
        {...register("postalCode")}
        type="text"
        placeholder="Area postalCode"
        className={`border bg-[#F2F2F2] text-black rounded-lg p-3 w-full md:w-1/2 ${errors.postalCode ? "border-red-500" : "border-gray-100"}`}
      />
      {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}

      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" />
          <span className="text-gray-700">Deliver as Gift</span>
        </label>
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
