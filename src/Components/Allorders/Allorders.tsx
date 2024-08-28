import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartDetail, getUserOrders, RootState } from "../Redux/Redux";
import { Link } from "react-router-dom";

const Allorders = () => {
  let dispatch = useDispatch();
  let orders = useSelector((state: RootState) => state.app.userOerder);
  let loading = useSelector((state: RootState) => state.app.loading);
  useEffect(() => {
    dispatch(getUserOrders());
    dispatch(getCartDetail());
  }, [dispatch]);
  console.log("orders", orders);
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center p-5 dark:text-white dark:bg-[#1E201E]">
        <p className="dark:bg-[#1E201E] text-center text-3xl font-semibold my-6 dark:text-white">
          All Orders
        </p>
        <div className="md:w-[70%] w-[90%] flex flex-col justify-center items-center">
          {loading ? (
            <p className="text-center text-xl font-semibold">Loading...</p>
          ) : orders && orders.data && orders.data.length > 0 ? (
            orders.data.map((order) => (
              <div
                key={order._id}
                className="mb-4 p-4 border border-gray-300 rounded shadow-lg w-full md:text-lg text-sm dark:bg-[#3C3D37]"
              >
                <h3 className="font-semibold mb-2">Order ID: {order._id}</h3>
                <p className="mb-2">Total Price: ${order.totalOrderPrice}</p>
                <p className="mb-2">Payment Method: {order.paymentMethodType}</p>
                <p className="border-b dark:border-b-white border-black mb-5">
                  Delivered: {order.isDelivered ? "Yes" : "No"}
                </p>
                {order.cartItems.length > 0 ? (
                  <div className="w-full flex flex-col">
                    {order.cartItems.map((item) => (
                      <div
                        key={item.product._id}
                        className="w-full flex flex-col md:flex-row md:items-start mb-4"
                      >
                        <div className="w-full md:w-[20%] flex justify-center mb-4 md:mb-0 overflow-hidden">
                          <Link to={`/productDetails/${item.product.id}`}>
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="object-contain w-full h-full hover:scale-110 duration-200"
                            />
                          </Link>
                        </div>
                        <div className="w-full md:w-[80%] md:ms-9">
                          <p className="mb-2">Product ID: {item.product._id}</p>
                          <Link to={`/productDetails/${item.product.id}`}>
                            <p className="mb-2">Title: {item.product.title}</p>
                          </Link>
                          <p className="mb-2">Price: ${item.price}</p>
                          <p className="mb-2">Count: {item.count}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No items in this order.</p>
                )}
              </div>
            ))
          ) : (
            <p>No orders available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Allorders;
