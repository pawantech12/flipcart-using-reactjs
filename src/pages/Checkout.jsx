import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import assured from "../img/assured.png";
import shield from "../img/sheild.webp";
import { useLocation, useNavigate } from "react-router-dom";
import upi from "../img/upi2.png";
import phonepediscount from "../img/phonediscount.png";
import paytmdiscount from "../img/paytmdiscount.png";
import phonepe from "../img/phonepe.svg";
import paytm from "../img/paytm.svg";
import gpay from "../img/gpay.svg";
import bhimupi from "../img/bhimupi.svg";
import safetylabelbadge from "../img/safety-label-badge.jpg";
import states from "../data/state";
import logo from "../img/logo.png";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState([]);

  const onSubmit = (data) => {
    setFormData([...formData, data]);
    nextStep();
  };
  console.log(formData);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const stepFormTitle = (step) => {
    if (step === 1) {
      return "Add Address";
    } else if (step === 2) {
      return "Order Summary";
    } else {
      return "Payment";
    }
  };
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  console.log("current step", step);
  const [timeRemaining, setTimeRemaining] = useState(12 * 60); // 12 minutes in seconds
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);
  if (timeRemaining == 0) {
    setTimeRemaining(12 * 60);
  }
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")} min ${remainingSeconds
      .toString()
      .padStart(2, "0")}sec`;
  };

  // payment integration
  const handlePayment = async () => {
    // Load Razorpay script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const response = await fetch(
      "https://flipcart-using-reactjs.onrender.com/payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 29900,
          currency: "INR",
        }),
      }
    );
    const data = await response.json();
    // const keyId = process.env.REACT_APP_RAZORPAY_KEY_ID;
    const options = {
      key: import.meta.env.VITE_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Budget Store",
      description: "Test payment",
      image: logo,

      order_id: data.id,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Budget Store",
        email: "your.email@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Your Address",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <div className="progress-wrapper ">
        <h4 className="flex items-center gap-2 text-lg font-medium">
          {step === 1 ? (
            <button onClick={() => navigate(-1)}>
              <GoArrowLeft className="w-6 h-6" />
            </button>
          ) : (
            <button onClick={prevStep}>
              <GoArrowLeft className="w-6 h-6" />
            </button>
          )}
          {stepFormTitle(step)}
        </h4>
        <div className="progress-line"></div>
        <ol className="flex justify-between text-gray-500 dark:text-gray-400 mt-4">
          <li className="flex flex-col items-center flex-1">
            <span
              className={`flex items-center justify-center w-5 h-5 text-xs rounded-full ring-4 ring-white border ${
                step >= 1
                  ? `${
                      step === 1
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-blue-500 bg-blue-50 text-blue-500"
                    }`
                  : "border-gray-300"
              } `}
            >
              {step > 1 ? <FaCheck className="w-2 h-2" /> : "1"}
            </span>
            <h3
              className={`text-sm ${
                step === 1 ? "font-medium" : ""
              } leading-tight mt-2`}
            >
              Address
            </h3>
          </li>
          <li className="flex flex-col items-center flex-1">
            <span
              className={`flex items-center justify-center w-5 h-5 text-xs rounded-full ring-4 ring-white border ${
                step >= 2
                  ? `${
                      step === 2
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-blue-500 bg-blue-50 text-blue-500"
                    }`
                  : "border-gray-300 bg-white"
              } font-medium`}
            >
              {step > 2 ? <FaCheck className="w-2 h-2" /> : "2"}
            </span>
            <h3
              className={`text-sm ${
                step === 2 ? "font-medium" : ""
              } leading-tight mt-2`}
            >
              Order Summary
            </h3>
          </li>
          <li className="flex flex-col items-center flex-1">
            <span
              className={`flex items-center justify-center w-5 h-5 text-xs rounded-full ring-4 ring-white border ${
                step === 3
                  ? `${
                      step === 3
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-blue-500 bg-blue-50 text-blue-500"
                    }`
                  : "border-gray-300 bg-white"
              } font-medium`}
            >
              {step > 3 ? <FaCheck /> : "3"}
            </span>
            <h3
              className={`text-sm ${
                step === 3 ? "font-medium" : ""
              } leading-tight mt-2`}
            >
              Payment
            </h3>
          </li>
        </ol>
      </div>

      {step === 1 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 text-sm flex flex-col"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 p-2 border border-gray-300 rounded h-11"
            {...register("fullName", { required: true })}
          />
          {errors.fullName && (
            <span className="text-red-500">This field is required</span>
          )}

          <input
            type="text"
            placeholder="Mobile number"
            className="w-full mb-4 p-2 border border-gray-300 rounded h-11"
            {...register("mobileNumber", { required: true })}
          />
          {errors.mobileNumber && (
            <span className="text-red-500">This field is required</span>
          )}

          <input
            type="text"
            placeholder="Pincode"
            className="w-full mb-4 p-2 border border-gray-300 rounded h-11"
            {...register("pincode", { required: true })}
          />
          {errors.pincode && (
            <span className="text-red-500">This field is required</span>
          )}

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full mb-4 p-2 border border-gray-300 rounded h-11"
              {...register("city", { required: true })}
            />
            {errors.city && (
              <span className="text-red-500">This field is required</span>
            )}

            <select
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              {...register("state", { required: true })}
            >
              <option value="">Select State</option>
              {states &&
                states.map((state, index) => {
                  return (
                    <option key={index} value="Andhra Pradesh">
                      {state.name}
                    </option>
                  );
                })}
            </select>
            {errors.state && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <input
            type="text"
            placeholder="House No., Building Name"
            className="w-full mb-4 p-2 border border-gray-300 rounded h-11"
            {...register("houseNumber", { required: true })}
          />
          {errors.houseNumber && (
            <span className="text-red-500">This field is required</span>
          )}

          <input
            type="text"
            placeholder="Road name, Area, Colony"
            className="w-full mb-4 p-2 border border-gray-300 rounded h-11"
            {...register("roadName", { required: true })}
          />
          {errors.roadName && (
            <span className="text-red-500">This field is required</span>
          )}

          <button
            type="submit"
            className={`w-full bg-orange-500 text-white p-2 rounded h-[50px] text-base mt-5 ${
              !isValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isValid}
          >
            Save Address
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="mb-16">
          {/* Order Summary Content */}
          <div className="px-4 border-t-4 border-gray-100 rounded-md py-3">
            <h4 className="font-medium text-lg">Delivered to:</h4>
            <div className="flex flex-col gap-2 mt-1">
              <h5 className="font-medium">{formData[0].fullName}</h5>
              <p className="text-xs">
                {formData[0].houseNumber}, {formData[0].roadName},{" "}
                {formData[0].city}, <span>{formData[0].state}</span>{" "}
                {formData[0].pincode}
              </p>
              <p className="text-xs">{formData[0].mobileNumber}</p>
            </div>
          </div>
          <div className="flex gap-4 px-4 py-6 border-t-4 border-gray-100">
            <div className="flex flex-col items-center">
              <figure>
                <img src={product.images[0]} alt="" className="w-16" />
              </figure>
              <span className="mt-3">Qty: 1</span>
            </div>
            <div>
              <h4 className="text-base ">
                {product.name.slice(0, 20) +
                  (product.name.length > 50 ? "..." : "")}
              </h4>
              <img src={assured} alt="" className="w-20" />
              <div className="flex gap-4 items-center mt-4">
                <span className="text-green-700 ">96% Off</span>
                <span className="text-zinc-500 text-lg line-through">
                  &#x20b9; 7,599
                </span>
                <span className="font-semibold text-lg">&#x20b9; 299.00</span>
              </div>
            </div>
          </div>
          <div className="px-4 py-6">
            <h4 className="font-medium text-lg">Price Details</h4>
            <div className="text-sm mt-3 flex flex-col">
              <div className="flex items-center justify-between py-2">
                <span>Price(1 item)</span>
                <span>&#x20b9; 7,599</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Discount</span>
                <span className="text-green-600">- &#x20b9; 7,599</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE Delivery</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t-2 border-dashed border-gray-100 mt-1">
                <span>Total Amount</span>
                <span>&#x20b9; 299</span>
              </div>
            </div>
            <p className="border-t-2 border-gray-100 pt-3 text-sm text-green-600">
              You will save - &#x20b9; 7,300 on this order
            </p>
          </div>
          <div className="flex gap-1 items-center py-5 px-6 bg-gray-100 justify-center">
            <figure>
              <img src={shield} alt="" />
            </figure>
            <h5 className="text-sm font-medium text-neutral-700">
              Safe and secure payments. Easy returns. 100% Authentic products
            </h5>
          </div>
          <div className="fixed bottom-0 left-0 right-0 h-16 bg-white flex p-3 justify-between font-medium border border-gray-200">
            <div className="flex flex-col ">
              <span className="text-zinc-500 text-xs line-through">
                &#x20b9; 7,599
              </span>
              <span className=" text-base">&#x20b9; 299.00</span>
            </div>
            <div className="">
              <button
                className="bg-[#fec200] h-full text-sm px-10 rounded-md"
                onClick={nextStep}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className=" border-t-2 border-gray-100 py-3">
            <figure>
              <img src={upi} alt="" />
            </figure>
          </div>
          <p className="font-semibold text-center border-t-2 border-gray-100 py-2">
            Offer ends in{" "}
            <span className="text-orange-500">{formatTime(timeRemaining)}</span>
          </p>
          <div className="px-2">
            <figure>
              <img src={phonepediscount} alt="" />
            </figure>
            <figure>
              <img src={paytmdiscount} alt="" />
            </figure>
          </div>
          <div className="mt-3 px-2">
            <ul className="flex flex-col gap-3 items-center">
              <li className="w-full">
                <button className="flex items-center px-16 border gap-3 h-[70px] hover:border-blue-500 transition-all ease-in-out duration-200 rounded-lg w-full border-gray-200">
                  <img src={phonepe} alt="" className="w-7 h-7" />
                  <span className="text-lg">Phonepe</span>
                </button>
              </li>
              <li className="w-full">
                <button className="flex items-center px-16 border gap-3 h-[70px] hover:border-blue-500 transition-all ease-in-out duration-200 rounded-lg w-full border-gray-200">
                  <img src={paytm} alt="" className="w-7 h-7" />
                  <span className="text-lg">Paytm</span>
                </button>
              </li>
              <li className="w-full">
                <button className="flex items-center px-16 border gap-3 h-[70px] hover:border-blue-500 transition-all ease-in-out duration-200 rounded-lg w-full border-gray-200">
                  <img src={gpay} alt="" className="w-7 h-7" />
                  <span className="text-lg">Gpay</span>
                </button>
              </li>
              <li className="w-full">
                <button className="flex items-center px-16 border gap-3 h-[70px] hover:border-blue-500 transition-all ease-in-out duration-200 rounded-lg w-full border-gray-200">
                  <img src={bhimupi} alt="" className="w-7 h-7" />
                  <span className="text-lg">All Other UPI</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="px-4 py-6">
            <h4 className="font-medium text-lg">Price Details</h4>
            <div className="text-sm mt-3 flex flex-col">
              <div className="flex items-center justify-between py-2">
                <span>Price(1 item)</span>
                <span>&#x20b9; 7,599</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE Delivery</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t-2 border-dashed border-gray-100 mt-1">
                <span>Amount Payable</span>
                <span>&#x20b9; 299</span>
              </div>
            </div>
          </div>

          <div>
            <img src={safetylabelbadge} alt="" />
          </div>
          <div className="fixed bottom-0 left-0 right-0 h-16 bg-white flex p-3 justify-between font-medium border border-gray-200">
            <div className="flex flex-col ">
              <span className="text-zinc-500 text-xs line-through">
                &#x20b9; 7,599
              </span>
              <span className=" text-base">&#x20b9; 299.00</span>
            </div>
            <div className="">
              <button
                className="bg-[#fec200] h-full text-sm px-10 rounded-md"
                onClick={handlePayment}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
