import React, { useEffect, useState } from "react";
import { TbCategoryFilled } from "react-icons/tb";
import mobile from "../img/mobile.webp";
import fashion from "../img/fashion.webp";
import electronics from "../img/Electronics.webp";
import appliance from "../img/appliance.webp";
import furniture from "../img/furniture.webp";
import grocery from "../img/grocery.webp";
import banner1 from "../img/banner-1.jpg";
import banner2 from "../img/banner-2.jpg";
import banner3 from "../img/banner-3.jpg";
import { GoClock } from "react-icons/go";

import assured from "../img/assured.png";
import productData from "../data/ProductData";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [banner1, banner2, banner3];
  const totalSlides = banners.length;

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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const navigate = useNavigate();
  const handleProductClick = (product) => {
    navigate(`/product-details/${product.id}`, { state: product });
  };
  return (
    <>
      <section className="mt-2">
        <ul className="flex gap-6 items-center px-4 overflow-x-auto no-scrollbar w-full sm:w-[360px]">
          <li className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-full bg-blue-100 text-blue-600 p-2">
                <TbCategoryFilled className="text-2xl " />
              </div>
              <small className="text-xs font-medium">Categories</small>
            </div>
          </li>
          <li className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <img src={mobile} alt="" className="h-11" />
              <small className="text-xs font-medium">Mobile</small>
            </div>
          </li>
          <li className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <img src={fashion} alt="" className="h-11" />
              <small className="text-xs font-medium">Fashion</small>
            </div>
          </li>
          <li className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <img src={electronics} alt="" className="h-11" />
              <small className="text-xs font-medium">Electronics</small>
            </div>
          </li>
          <li className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <img src={appliance} alt="" className="h-11" />
              <small className="text-xs font-medium">Appliances</small>
            </div>
          </li>
          <li className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <img src={furniture} alt="" className="h-11" />
              <small className="text-xs font-medium">Furniture</small>
            </div>
          </li>
          <li className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <img src={grocery} alt="" className="h-11" />
              <small className="text-xs font-medium">Grocery</small>
            </div>
          </li>
        </ul>
      </section>
      <section className="relative w-full mt-2">
        <div className="relative h-40 overflow-hidden ">
          {banners.map((item, index) => (
            <div
              key={index}
              className={`absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 duration-700 ease-in-out transform transition-transform ${
                currentSlide === index
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <img
                src={item}
                className="w-full h-full object-cover"
                alt={`Slide ${item}`}
              />
            </div>
          ))}
        </div>

        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-1 rtl:space-x-reverse">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-2 h-2 rounded-full ${
                currentSlide === index
                  ? "bg-white dark:bg-gray-800"
                  : "bg-white/30 dark:bg-gray-800/30"
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
      </section>
      <section className="mt-2 px-4 py-3 flex items-center justify-around">
        <div className="flex flex-col items-center">
          <h5 className="text-sm text-blue-600">Deals of the Day</h5>
          <span className="flex items-center gap-2 text-xl text-blue-600">
            <GoClock className="text-zinc-500 w-4 h-4" />
            {formatTime(timeRemaining)}
          </span>
        </div>
        <button className="px-3 py-2 text-[12px] text-red-500 font-bold  uppercase border border-gray-200 rounded-md">
          save is live
        </button>
      </section>
      <section className="bg-gray-100 py-3">
        <div className="grid grid-cols-2 gap-2">
          {productData &&
            productData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white py-3"
                  onClick={() => handleProductClick(item)}
                >
                  <figure className="flex justify-center h-28 px-2">
                    <img
                      src={item.images[0]}
                      alt=""
                      className="object-contain"
                    />
                  </figure>
                  <div className="px-2 flex flex-col gap-1">
                    <h4 className="text-[15px]">
                      {item.name.slice(0, 20) +
                        (item.name.length > 50 ? "..." : "")}
                    </h4>
                    <div className="text-[15px] flex items-center gap-2">
                      <span className="text-green-700">96% Off</span>
                      <span className="text-zinc-400 line-through">
                        &#x20b9; 7,599
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">&#x20b9; 299.00</span>
                      <img src={assured} alt="" className="w-[70px]" />
                    </div>
                    <p className="text-center text-xs">
                      Free Delivery in Two Days
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};
