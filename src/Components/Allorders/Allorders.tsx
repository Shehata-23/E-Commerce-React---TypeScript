import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartDetail, getUserOrders, RootState } from "../Redux/Redux";
import { Link } from "react-router-dom";
import style from "../Allorders/allorderes.module.css";
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
      <div
        className={`${style.mainContainer} dark:text-white dark:bg-[#1E201E]`}
      >
        <p className={`${style.title} dark:bg-[#1E201E]  dark:text-white`}>
          All Orders
        </p>
        <div className={style.allOrdersContainer}>
          {loading ? (
            <p className={`${style.loading}`}>Loading...</p>
          ) : orders && orders.data && orders.data.length > 0 ? (
            orders.data.map((order) => (
              <div
                key={order._id}
                className={`${style.orders} dark:bg-[#3C3D37]`}
              >
                <h3 className="font-semibold mb-2">Order ID: {order._id}</h3>
                <p className="mb-2">Total Price: ${order.totalOrderPrice}</p>
                <p className="mb-2">
                  Payment Method: {order.paymentMethodType}
                </p>
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
                        <div className={`${style.imgContainer}`}>
                          <Link to={`/productDetails/${item.product.id}`}>
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className={style.imgStyle}
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
