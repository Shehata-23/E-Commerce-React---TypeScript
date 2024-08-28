import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  AppDispatch,
  getCartDetail,
  getProductDetails,
  resetProductDetails,
  RootState,
  setItemId,
  setProductDetails,
} from "../Redux/Redux";
import { useQuery, useQueryClient } from "react-query";
import "flowbite/dist/flowbite.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "../ProductDetails/details.module.css";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import axios from "axios";
import { addToCartApi } from "../Home/Home";
import toast from "react-hot-toast";

async function getData(id) {
  console.log("Starting to fetch data...");

  try {
    console.log("Fetching the data...");
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );

    if (!response.ok) {
      throw new Error(`error! status: ${response.status}`);
    }

    console.log("Processing the response...");
    const data = await response.json();

    console.log("Data fetched successfully.");
    console.log(data);
    return data;
  } catch (error) {
    console.log("An error occurred:", error.message);
    return null;
  }
}

const ProductDetails = () => {
  let [cartLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const myID = useSelector((state: RootState) => state.app.itemId);
  const productDetails = useSelector(
    (state: RootState) => state.app.productDetails
  );

  const queryKey = useMemo(() => ["productDetails", id], [id]);

  const { data, error, isLoading } = useQuery(
    queryKey,
    () => {
      dispatch(resetProductDetails());
      return getData(id);
    },

    {
      cacheTime: 5000000,
      refetchOnWindowFocus: false,
      onSuccess: () => {},
    }
  );

  useEffect(() => {
    if (data) {
      dispatch(setProductDetails(data.data));
    }
  }, [data, dispatch]);

  console.log(isLoading);
  console.log(productDetails);

  async function handleAddToCart(id) {
    setIsLoading(true);
    try {
      await addToCartApi(id);
      dispatch(getCartDetail());
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading)
    return (
      <div className="w-screen h-screen  dark:bg-[#1E201E] flex justify-center items-center">
        <p className="font-semibold dark:text-white">Loading</p>
      </div>
    );

  return (
    <div
      className={`${style.mainContainer} key={myID} dark:bg-[#1E201E] dark:text-white `}
    >
      {productDetails && (
        <div className={style.subContainer}>
          <div className={style.swipeContainer}>
            <Swiper pagination={true} modules={[Pagination]}>
              <div className={style.swipeImage}>
                {productDetails.images.map((item: string, index: number) => (
                  <SwiperSlide key={index} className={`${style.swipeImage}`}>
                    <img src={item} alt={`Product image ${index + 1}`} />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
          <div className={`${style.detailsContainer} `}>
            <p className="text-2xl font-semibold">{productDetails.title}</p>
            <div className=" pt-2">
              <span>Category </span>
              <span className="arrow"> &gt; </span>
              <span className="pe-1 category">
                {productDetails.category.name}
              </span>
              <span className="arrow"> &gt; </span>
              <span className="pe-1 category">
                {productDetails.subcategory[0].name}
              </span>
              <span className="arrow"> &gt; </span>
              <span className="brand">{productDetails.brand.name}</span>
            </div>
            <div className={style.starsContainer}>
              <div className="flex me-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className={`h-7 w-7 ${
                      index < Math.floor(productDetails.ratingsAverage)
                        ? "text-yellow-300"
                        : "text-gray-300"
                    }  duration-500 hover:scale-105`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span>{productDetails.ratingsAverage}</span>
            </div>
            <p className="mt-3 text-xl font-medium">
              {productDetails.description}
            </p>
            <div className="flex">
              <p
                className={
                  productDetails.priceAfterDiscount
                    ? style.oldPrice
                    : style.price
                }
              >
                ${productDetails.price}
              </p>
              {productDetails.priceAfterDiscount && (
                <p className={`ms-5 ${style.price}  `}>
                  ${productDetails.priceAfterDiscount}
                </p>
              )}
            </div>
            <button
              className="min-w-[25%] max-w-fit min-h[15%]  flex justify-center rounded-lg bg-cyan-700 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 disabled:opacity-50"
              onClick={() => handleAddToCart(id)}
            >
              {cartLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                >
                  {" "}
                  <svg
                    aria-hidden="true"
                    className="w-3 h-3  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </span>
              ) : (
                "Add to cart"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
