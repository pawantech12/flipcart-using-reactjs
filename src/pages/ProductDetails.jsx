import React, { useEffect, useState } from "react";
// import productData from "../data/ProductData";
import plus from "../img/plus.png";
import replacement from "../img/replacement.png";
import reviewprofile from "../img/review-profile.avif";
import reviewprofile2 from "../img/review-profile2.avif";
import material from "../img/material.svg";
import voltage from "../img/voltage.svg";
import wattage from "../img/wattage.svg";
import speed from "../img/speed.svg";
import noncod from "../img/non-cod.png";
import paylater from "../img/paylater.jpeg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronUp, FaStar } from "react-icons/fa";
export const ProductDetails = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { state: product } = useLocation();
  const totalSlides = product.images.length;

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

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
  const navigate = useNavigate();
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")} min ${remainingSeconds
      .toString()
      .padStart(2, "0")}sec`;
  };
  const handleAddToCart = () => {
    navigate("/checkout", { state: { product } });
  };
  const productDesc = product.desc
    .split(". ")
    .map((item) => (item.endsWith(".") ? item : item + "."));
  const handleBuyNow = () => {
    navigate("/checkout", { state: { product } });
  };
  return (
    <>
      <section className="mt-5 bg-gray-100 pb-14">
        <div className="relative w-full bg-white py-3 rounded-md">
          <div className="relative h-[40vh] overflow-hidden ">
            {product.images.map((item, index) => (
              <div
                key={index}
                className={`absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-[55%] duration-700 ease-in-out transform transition-transform ${
                  currentSlide === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <img
                  src={item}
                  className="w-full object-contain h-full"
                  alt={`Slide ${item}`}
                />
              </div>
            ))}
          </div>

          <div className=" flex justify-center mt-3 gap-2 ">
            {product.images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? "bg-zinc-400" : "bg-zinc-200"
                }`}
                aria-current={currentSlide === index}
                aria-label={`Slide ${index + 1}`}
                onClick={() => handleSlideChange(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handlePrevSlide}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-200 focus:outline-none">
              <svg
                className="w-4 h-4 text-neutral-500 dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>

          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handleNextSlide}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-200 focus:outline-none">
              <svg
                className="w-4 h-4 text-neutral-500 dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
        <div className="bg-white mt-2 rounded-md px-4 py-3 flex flex-col gap-3">
          <h4 className="text-base">{product.name}</h4>
          <img src={plus} alt="" className="w-24" />
          <div className="flex gap-4 items-center">
            <span className="text-green-700 font-bold text-xl">96% Off</span>
            <span className="text-zinc-500 font-semibold text-xl line-through">
              &#x20b9; 7,599
            </span>
            <span className="font-semibold text-xl">&#x20b9; 299.00</span>
          </div>
        </div>
        <div className="bg-white mt-[2px] py-2 rounded-md">
          <p className="font-semibold text-center ">
            Offer ends in{" "}
            <span className="text-orange-500">{formatTime(timeRemaining)}</span>
          </p>
        </div>
        <div className="bg-white mt-[2px] py-3 rounded-md">
          <img src={paylater} alt="" />
        </div>
        <div className="bg-white mt-2 py-3 rounded-md flex justify-evenly items-center px-5 gap-4">
          <div className="flex flex-col items-center text-center gap-2 w-24">
            <img src={replacement} alt="" className="w-8" />
            <h4 className="text-xs">7 days Replacement</h4>
          </div>
          <div className="flex flex-col items-center text-center gap-2 w-24">
            <img src={noncod} alt="" className="w-8" />
            <h4 className="text-xs">no Cash On Delivery</h4>
          </div>
          <div className="flex flex-col items-center text-center gap-2 w-24">
            <img src={plus} alt="" className="w-20" />
            <h4 className="text-xs">Plus (F-Assured)</h4>
          </div>
        </div>
        <div className="mt-1 bg-white py-4 px-4">
          <table>
            <tbody>
              <tr>
                <th className="text-left">Brand</th>
                <td className="ps-8 text-sm">Wonderchef</td>
              </tr>
              <tr>
                <th className="text-left">Colour</th>
                <td className="ps-8 text-sm">Black & Crimson</td>
              </tr>
              <tr>
                <th className="text-left">Product Dimensions</th>
                <td className="ps-8 text-sm">
                  8.9D x 20.1W x 11.4H Centimeters
                </td>
              </tr>
              <tr>
                <th className="text-left">Blade</th>
                <td className="ps-8 text-sm">Stainless Steel</td>
              </tr>
              <tr>
                <th className="text-left">Special Feature</th>
                <td className="ps-8 text-sm">
                  Adjustable Speed Control,Overload pro Duty,Sturdy,Rust
                  Resistant,Durable.
                </td>
              </tr>
              <tr>
                <th className="text-left">Capacity</th>
                <td className="ps-8 text-sm">1.5 litres</td>
              </tr>
              <tr>
                <th className="text-left">Controls Type</th>
                <td className="ps-8 text-sm">Knob Control</td>
              </tr>
              <tr>
                <th className="text-left">Item Weight</th>
                <td className="ps-8 text-sm">3000 Grams</td>
              </tr>
              <tr>
                <th className="text-left">Model Name</th>
                <td className="ps-8 text-sm">
                  Wonderchef Platinum 750W Mixer Grind
                </td>
              </tr>
            </tbody>
            <Link className="flex items-center gap-1 text-green-900 text-sm">
              {" "}
              <FaChevronUp />
              See Less
            </Link>
          </table>
        </div>
        <div className="mt-1 py-5 px-2 bg-white grid grid-cols-2 gap-3">
          <div className="flex gap-2">
            <figure className="w-11">
              <img src={material} alt="" />
            </figure>
            <div>
              <h5 className="font-semibold">Material</h5>
              <span className="text-sm">Stainless Steel, Copper</span>
            </div>
          </div>
          <div className="flex gap-2">
            <figure className="w-11">
              <img src={speed} alt="" />
            </figure>
            <div>
              <h5 className="font-semibold">Number</h5>
              <span className="text-sm">3</span>
            </div>
          </div>
          <div className="flex gap-2">
            <figure className="w-11">
              <img src={voltage} alt="" />
            </figure>
            <div>
              <h5 className="font-semibold">Voltage</h5>
              <span className="text-sm">230 Volts</span>
            </div>
          </div>
          <div className="flex gap-2">
            <figure className="w-11">
              <img src={wattage} alt="" />
            </figure>
            <div>
              <h5 className="font-semibold">Wattage</h5>
              <span className="text-sm">750.00</span>
            </div>
          </div>
        </div>
        <div className="mt-1 py-5 px-3 bg-white">
          <h4 className="font-semibold">About this item</h4>
          <ul className="mt-3 text-sm list-disc ps-8">
            {productDesc.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white py-4 px-4 mt-3">
          <h4 className="font-semibold text-lg">Customer Reviews</h4>
          <div className="mt-2">
            <ul className="flex items-center gap-1">
              <li>
                <FaStar className="text-yellow-500 w-54 h-4" />
              </li>
              <li>
                <FaStar className="text-yellow-500 w-4 h-4" />
              </li>
              <li>
                <FaStar className="text-yellow-500 w-4 h-4" />
              </li>
              <li>
                <FaStar className="text-yellow-500 w-4 h-4" />
              </li>
              <li>
                <FaStar className="text-neutral-300 w-4 h-4" />
              </li>
            </ul>
          </div>
          <div className="mt-3">
            <ul>
              <li className="flex  items-center gap-3">
                <span>5</span>
                <FaStar className="text-yellow-500 w-5  h-5" />
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full w-1/4"></div>
                </div>
              </li>
              <li className="flex  items-center gap-3">
                <span>4</span>
                <FaStar className="text-yellow-500 w-5  h-5" />
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full w-2/5"></div>
                </div>
              </li>
              <li className="flex  items-center gap-3">
                <span>3</span>
                <FaStar className="text-yellow-500 w-5  h-5" />
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full w-1/3"></div>
                </div>
              </li>
              <li className="flex  items-center gap-3">
                <span>2</span>
                <FaStar className="text-yellow-500 w-5  h-5" />
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full w-1/6"></div>
                </div>
              </li>
              <li className="flex  items-center gap-3">
                <span>1</span>
                <FaStar className="text-yellow-500 w-5  h-5" />
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full w-1/12"></div>
                </div>
              </li>
            </ul>
            <h4 className="font-medium mt-4">Share your thoughts</h4>
            <p className="text-zinc-500 text-sm mt-2">
              If you’ve used this product, share your thoughts with other
              customers
            </p>
            <button className="border border-gray-200 rounded-md w-full h-11 font-medium mt-3">
              Write a review
            </button>
          </div>
          <div className="mt-8">
            <ul className="flex flex-col gap-4">
              <li>
                <div className="flex flex-col gap-2 border border-gray-200 rounded-md px-4 py-5">
                  <div className="flex gap-2">
                    <figure className="w-14">
                      <img
                        src={reviewprofile}
                        alt=""
                        className="rounded-full"
                      />
                    </figure>
                    <div>
                      <h5 className="font-semibold">Emily Selman</h5>
                      <ul className="flex items-center gap-1">
                        <li>
                          <FaStar className="text-yellow-500 w-4 h-4" />
                        </li>
                        <li>
                          <FaStar className="text-yellow-500 w-4 h-4" />
                        </li>
                        <li>
                          <FaStar className="text-yellow-500 w-4 h-4" />
                        </li>
                        <li>
                          <FaStar className="text-yellow-500 w-4 h-4" />
                        </li>
                        <li>
                          <FaStar className="text-neutral-300 w-4 h-4" />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-zinc-500 italic">
                    This is the bag of my dreams. I took it on my last vacation
                    and was able to fit an absurd amount of snacks for the many
                    long and hungry flights.
                  </p>
                </div>
              </li>
              <li>
                <div className="flex flex-col gap-2 border border-gray-200 rounded-md px-4 py-5">
                  <div className="flex gap-2">
                    <figure className="w-14">
                      <img
                        src={reviewprofile2}
                        alt=""
                        className="rounded-full"
                      />
                    </figure>
                    <div>
                      <h5 className="font-semibold">Hector Gibbons</h5>
                      <ul className="flex items-center gap-1">
                        <li>
                          <FaStar className="text-yellow-500 w-4 h-4" />
                        </li>
                        <li>
                          <FaStar className="text-yellow-500 w-4 h-4" />
                        </li>
                        <li>
                          <FaStar className="text-yellow-500 w-4 h-4" />
                        </li>
                        <li>
                          <FaStar className="text-yellow-500 w-4 h-4" />
                        </li>
                        <li>
                          <FaStar className="text-neutral-300 w-4 h-4" />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-zinc-500 italic">
                    Before getting the Ruck Snack, I struggled my whole life
                    with pulverized snacks, endless crumbs, and other
                    heartbreaking snack catastrophes. Now, I can stow my snacks
                    with confidence and style!
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-white flex font-medium border border-gray-200">
          <button className="w-full bg-white py-3" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="w-full bg-[#fec200]" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </section>
    </>
  );
};
