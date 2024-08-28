import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartDetail,
  getUserWishList,
  removeFromWishList,
  RootState,
} from "../Redux/Redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Card } from "flowbite-react";
import style from "../WishList/wishList.module.css";
import { addToCartApi } from "../Home/Home";
import toast from "react-hot-toast";

const WishList = () => {
  const dispatch = useDispatch();
  const [loadingStates, setLoadingStates] = useState({});

  const userWishList = useSelector(
    (state: RootState) => state.app.userWishList
  );

  useEffect(() => {
    dispatch(getUserWishList());
  }, [dispatch]);

  async function handleRemoveFromWishList(id) {
    await dispatch(removeFromWishList({ id }));
    await dispatch(getUserWishList());
  }

  async function addToCart(id) {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));

    try {
      await addToCartApi(id);
      dispatch(getCartDetail());
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  }

  return (
    <div className={`${style.mainContainer} dark:bg-[#1E201E]`}>
      {userWishList.length > 0 ? (
        userWishList.map((item) => (
          <div
            key={item._id}
            className="w-[95%] md:w-6/12 lg:w-3/12 flex justify-center items-center rounded-xl mb-4"
          >
            <Card
              className={`${style.subContainer} dark:bg-[#3C3D37] dark:border-0 dark:shadow-sm dark:shadow-white/20 hover:dark:shadow-md`}
            >
              <div className="relative overflow-hidden mb-3">
                <img
                  data-testid="flowbite-card-image"
                  alt={item.title}
                  src={item.imageCover}
                  className="w-full rounded-t-lg hover:scale-105 duration-700"
                  loading="lazy"
                />
                {item.priceAfterDiscount && (
                  <div className="absolute top-0 right-0 bg-red-600/80 px-2 py-1 rounded-tr-md">
                    <p className="font-semibold text-white">SALE</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center">
                <Link
                  to={`/productDetails/${item._id}`}
                  className="text-center"
                >
                  <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {item.title.split(" ").splice(0, 2).join(" ")}
                  </h5>
                </Link>
              </div>
              <div className="mb-5 mt-2.5 flex items-center justify-center">
                {Array.from({ length: Math.floor(item.ratingsAverage) }).map(
                  (_, index) => (
                    <svg
                      key={index}
                      className="h-7 w-7 text-yellow-300 hover:text-yellow-600/80 duration-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )
                )}
                <div className="flex items-center ml-3">
                  <span className="ml-3 rounded bg-cyan-100 px-2 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                    {Math.floor(item.ratingsAverage)}
                  </span>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-3xl text-red-500 ml-4 cursor-pointer"
                    onClick={() => handleRemoveFromWishList(item._id)}
                    aria-label={`Remove ${item.title} from wishlist`}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${item.price}
                </span>
                <button
                  className="min-w-[50%] max-w-fit min-h-[25%] flex justify-center rounded-lg bg-cyan-700 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 disabled:opacity-50"
                  onClick={() => addToCart(item._id)}
                  disabled={loadingStates[item._id]}
                  aria-label={`Add ${item.title} to cart`}
                >
                  {loadingStates[item._id] ? (
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.9526 9.47021 51.9356 9.44291 55.8608 10.0344C60.8611 10.7766 65.6627 12.6346 70.0285 15.5135C74.3944 18.3925 78.2296 22.2265 81.3325 26.824C83.8821 30.4157 85.835 34.3034 87.1238 38.3454C87.8284 40.6929 90.3017 41.9697 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </Card>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center mt-40 text-gray-500 dark:text-gray-400 text-lg">
          Your Wish List is Empty
        </div>
      )}
    </div>
  );
};

export default WishList;
