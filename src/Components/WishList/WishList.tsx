import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartDetail,
  getUserWishList,
  removeFromWishList,
  RootState,
} from "../Redux/Redux";

import style from "../WishList/wishList.module.css";
import { addToCartApi } from "../Home/Home";
import toast from "react-hot-toast";
import CardComponent from "../Card/Card";



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
           <CardComponent
                    item={item}
                    handleAddTowishList={handleRemoveFromWishList}
                    WishList={userWishList}
                    addToCart={addToCart}
                    loadingStates={loadingStates}
                    style={style}
                  />
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
