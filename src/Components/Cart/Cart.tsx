import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  deleteItem,
  getCartDetail,
  RootState,
  updateCount,
} from "../Redux/Redux";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  let loading = useSelector((state: RootState) => state.app.loading);

  let cartDetails = useSelector((state: RootState) => state.app.cartDetails);

  let updated = useSelector((state: RootState) => state.app.updated);
  let deleted = useSelector((state: RootState) => state.app.deleted);
  let isCartDeleted = useSelector((state: RootState) => state.app.deleteCart);

  let userId = useSelector((state: RootState) => state.app.userID);

  const navigate = useNavigate();
  function handleCount(id, count) {
    dispatch(updateCount({ id, count: count }));
  }

  function handleDelete(id) {
    dispatch(deleteItem({ id }));
  }
  function handleCartDelete() {
    dispatch(deleteCart());
  }
  console.log(userId);
  useEffect(() => {
    dispatch(getCartDetail());
  }, [dispatch, updated, deleted, isCartDeleted]);

  if (!cartDetails && loading) {
    return (
      <div className="min-w-full min-h-full flex justify-center items-center dark:text-white dark:bg-[#1E201E]">
        <div> Loading </div>
      </div>
    );
  }
  if (!cartDetails) {
    return (
      <div className="min-w-full min-h-full flex justify-center items-center dark:text-white dark:bg-[#1E201E]">
        <div> Your cart is currently empty. </div>
      </div>
    );
  }

  return (
    <div className="w-full dark:text-white dark:bg-[#1E201E] min-h-full p-8 flex justify-center items-center flex-col relative">
      <>
        {cartDetails.totalCartPrice > 0 ? (
          <div className="px-3 py-2 bg-slate-200/25 dark:bg-[#3C3D37] hover:shadow-md mb-3 rounded-md flex items-center justify-between">
            <p className="font-medium text-lg">
              Total Payment: {cartDetails.totalCartPrice}
            </p>
            <button
              onClick={() => navigate("/payment")}
              className="px-3 py-2 bg-cyan-700 rounded-md mx-5 text-white block font-medium"
            >
              Payment
            </button>
            <button
              className="px-3 py-2 bg-cyan-700 dark:text-white rounded-md text-white block font-medium"
              onClick={handleCartDelete}
            >
              Clear Cart
            </button>
          </div>
        ) : (
          <div>Cart is empty</div>
        )}
        {cartDetails &&
          cartDetails.products.map((item, idx) => (
            <div
              key={idx}
              className="w-[95%] dark:bg-[#3C3D37] dark:shadow-md dark:text-white dark:shadow-white/20 md:w-[50%] flex justify-between items-start mb-7 hover:shadow-xl p-3 shadow-md duration-500"
            >
              <div className="imgContainer relative w-[25%]">
                <img
                  src={item.product.imageCover}
                  alt=""
                  className="object-cover hover:scale-105 transition-transform duration-300 peer"
                />
                <div className="largeImage absolute -top-16 left-full md:-left-72 ml-2 w-[250px] h-auto opacity-0 duration-500 peer-hover:opacity-100 peer-hover:block">
                  <img
                    src={item.product.imageCover}
                    alt="Large"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="ContentContainer w-[70%] flex justify-between items-start">
                <div className="product flex flex-col flex-wrap items-start">
                  <Link to={`/productDetails/${item.product.id}`}>
                    <p className="text-xl font-medium">
                      {item.product.title.split(" ").splice(0, 3).join(" ")}
                    </p>
                  </Link>
                  <div>
                    <span>{item.product.category.name}</span>
                    <span className="mx-1">&gt;</span>
                    <span>{item.product.subcategory[0].name}</span>
                    <span className="mx-1">&gt;</span>
                    <span>{item.product.brand.name}</span>
                  </div>
                  <p className="text-xl font-medium mt-3">${item.price}</p>
                  <button
                    className="bg-cyan-700 rounded-md mx-5 px-5 mt-3 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300"
                    onClick={() => handleDelete(item.product.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="productCount flex ml-1 gap-x-2 text-2xl border border-slate-400/20 shadow-md">
                  <div
                    onClick={() => handleCount(item.product.id, item.count + 1)}
                    className="cursor-pointer hover:-translate-y-[0.5px] bg-slate-400/25 duration-500 hover:bg-slate-400/50 w-8 aspect-square text-center"
                  >
                    <button>+</button>
                  </div>
                  <div className="w-8 aspect-square text-center">
                    <p>{item.count}</p>
                  </div>
                  <div
                    onClick={
                      item.count === 1
                        ? () => handleDelete(item.product.id)
                        : () => handleCount(item.product.id, item.count - 1)
                    }
                    className="cursor-pointer bg-slate-400/25 hover:-translate-y-[0.5px] duration-500 hover:bg-slate-400/50 w-8 aspect-square text-center"
                  >
                    <button>-</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    </div>
  );
};

export default Cart;
