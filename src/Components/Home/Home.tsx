import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  AppDispatch,
  getCartDetail,
  getProducts,
  getUserWishList,
  removeFromWishList,
} from "../Redux/Redux";
import { RootState } from "../Redux/Redux";
import { Card, DarkThemeToggle } from "flowbite-react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import style from "../Home/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "flowbite-react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import CandleCake from "../CandleCake/CandleCake";

export async function addToCartApi(id) {
  const token = Cookies.get("token");
  try {
    let response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: id },
      { headers: { token: token } }
    );
    return response;
  } catch (error) {
    throw new Error("Failed to add to cart");
  }
}

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.app.products);
  const loading = useSelector((state: RootState) => state.app.loading);
  const WishList = useSelector((state: RootState) => state.app.userWishList);
  const [loadingStates, setLoadingStates] = useState({});
  const [isWishlist, setWishlist] = useState({});
  const [subcategories, setSubcategories] = useState([]);
  const [showComponent, setShowComponent] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/subcategories"
        );
        setSubcategories(response.data.data);
        console.log("hereeee", response.data.data);
      } catch (error) {
        console.log("error");
      }
    };

    fetchSubcategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  function handlewishListSetter(id) {
    setWishlist((prev) => ({ ...prev, [id]: true }));
  }

  function handlewishListRemover(id) {
    setWishlist((prev) => ({ ...prev, [id]: false }));
  }

  async function handleAddTowishList(id) {
    if (WishList.find((item) => item.id === id)) {
      let response = await dispatch(removeFromWishList({ id }));
      console.log(response);
      handlewishListRemover(id);
    } else {
      let response = await dispatch(addToWishList({ id }));
      console.log(response);
      handlewishListSetter(id);
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(
        getProducts("https://ecommerce.routemisr.com/api/v1/products")
      );
    };

    fetchProducts();

    dispatch(getCartDetail());
  }, [dispatch]);

  useEffect(() => {
    const getwish = async () => {
      const updatedWishList = await dispatch(getUserWishList());
      console.log("wish", updatedWishList);
    };

    getwish();
  }, [dispatch, isWishlist]);

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

  if (loading && products.length === 0) {
    return (
      <div className="min-w-full min-h-screen dark:bg-[#3C3D37] flex justify-center items-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <>
      <div className="min-w-full min-h-60 pt-14 pb-8  flex justify-center dark:bg-[#1E201E] relative dark:border-white/20 dark:border-b border-black ">
        {showComponent &&
          Cookies.get("token") &&
          Cookies.get("showFirstTime") && (
            <div className="w-[90%] border-2 dark:border-white/30 shadow-lg border-black/30  h-full md:h-[400px]  z-50  fixed sm:overflow-hidden overflow-y-scroll   -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] ">
              <div
                className=" absolute z-50 top-3 right-3 text-2xl cursor-pointer"
                onClick={() => {
                  setShowComponent(false);
                  Cookies.remove("showFirstTime");
                }}
              >
                ❌
              </div>
              <CandleCake />
            </div>
          )}

        <div className="flex md:flex-row flex-col justify-between items-center w-[90%] shadow-lg p-7 dark:text-white">
          <div className="md:w-[70%] w-[90%] md:mb-0 mb-9 ">
            <p className="text-3xl mb-5 font-bold">
              Welcome to Your One-Stop Shop!
            </p>
            <p className="text-2xl font-semibold">
              🔥 Hot Picks just for you explore our handpicked selections, find
              the latest trends, and grab the best deals before they're gone!
              Happy shopping!
            </p>
          </div>
          <div>
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="max-w-[260px] h-[340px] text-black "
            >
              <SwiperSlide
                className={`${style.swiperSlide} text-center bg-[#F8D7DA] text-black flex flex-col justify-around items-center py-4 px-3`}
              >
                <div>
                  <p className="text-lg mb-6">🛒 Shop the Latest Trends!</p>
                  <p className="text-base">
                    Discover new arrivals and trendy styles to elevate your
                    wardrobe.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className={`${style.swiperSlide} text-center bg-[#B0E0E6] text-black flex flex-col justify-around items-center py-4 px-3`}
              >
                <div>
                  <p className="text-lg mb-6">💸 Big Savings Await!</p>
                  <p className="text-base">
                    Enjoy exclusive discounts and unbeatable deals on your
                    favorite products.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className={`${style.swiperSlide} text-center bg-[#E6E6FA]  text-black flex flex-col justify-around items-center py-4 px-3`}
              >
                <div>
                  <p className="text-lg mb-6">
                    🚚 Free Shipping on Orders Over $50!
                  </p>
                  <p className="text-base">
                    Get your items delivered to your doorstep without any extra
                    cost.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className={`${style.swiperSlide} text-center bg-[#F0FFF0]  text-black flex flex-col justify-around items-center py-4 px-3`}
              >
                <div>
                  <p className="text-lg mb-6">⭐️ Customer Favorites</p>
                  <p className="text-base">
                    Check out top-rated products loved by our community!
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      <div className="min-w-full min-h-screen dark:bg-[#1E201E] flex justify-center items-center flex-col">
        <div className="w-[90%] px-11  mx-auto max-h-[500px] pt-14 pb-8   flex justify-center dark:bg-[#1E201E] dark:border-white/20 dark:border-b border-black ">
          <Swiper
            slidesPerView={3}
            grid={{
              rows: 2,
            }}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Grid, Pagination]}
            className=" p-8 dark:border dark:border-white/25 shadow-lg"
          >
            {subcategories.length > 0 ? (
              subcategories.map((item) => (
                <SwiperSlide
                  key={item._id}
                  className="shadow-md hover:-translate-y-2 duration-500 cursor-pointer text-center text-lg bg-white 
                h-[calc((100%-30px)/2)] 
                sm:h-[calc((100%-40px)/2)] 
                md:h-[calc((100%-50px)/2)] 
                lg:h-[calc((100%-60px)/2)] 
                flex items-center justify-center
                dark:bg-[#707070] dark:text-white"
                >
                  {item.name} {/* Render the subcategory name */}
                </SwiperSlide>
              ))
            ) : (
              <p>No subcategories available.</p>
            )}
          </Swiper>
        </div>
      </div>

      <div className="w-full flex justify-center dark:bg-[#1E201E] items-center">
        <form className="min-w-[60%]  mx-auto my-6 shadow-lg">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="flex flex-wrap ">
        <div className={`${style.mainContainer} dark:bg-[#1E201E] w-screen`}>
          {products.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          ).length === 0 ? (
            <div className="w-full flex justify-center items-center py-20">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                No Results
              </p>
            </div>
          ) : (
            products
              .filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, idx) => (
                <div
                  key={item._id}
                  className="w-[95%]  md:w-6/12 lg:w-3/12 flex justify-center items-center rounded-xl"
                >
                  <Card
                    className={`${style.subContainer} dark:bg-[#3C3D37] dark:border-0 dark:shadow-sm dark:shadow-white/20 hover:dark:shadow-md`}
                  >
                    <div className="imgContainer overflow-hidden mb-3 relative">
                      <img
                        data-testid="flowbite-card-image"
                        alt="Product"
                        src={item.imageCover}
                        className="rounded-t-lg hover:scale-105 duration-700 overflow-hidden w-full"
                      />
                      {item.priceAfterDiscount && (
                        <div className=" absolute flex justify-center items-center top-0 right-[75%]  bg-red-600/80 left-0 rounded-r-md">
                          <p className=" font-semibold tracking-wider text-white">
                            SALE
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col  w-full items-center">
                      <Link to={`/productDetails/${item._id}`}>
                        <h5 className="text-xl font-semibold tracking-tight  text-gray-900 dark:text-white">
                          {item.title.split(" ").splice(0, 2).join(" ")}
                        </h5>
                      </Link>
                    </div>
                    <div className="mb-5 mt-2.5 flex items-center justify-center  ">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg
                          key={index}
                          className={`h-7 w-7 ${
                            index < Math.floor(item.ratingsAverage) ? "text-yellow-300" : "text-gray-300"
                          }  duration-500 hover:scale-105`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}

                      <div className="w-full flex justify-around items-center">
                        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                          {Math.floor(item.ratingsAverage)}
                        </span>
                        {WishList ? (
                          <FontAwesomeIcon
                            icon={faHeart}
                            className={`text-3xl text-[#a8a8a8] my-4 cursor-pointer ${
                              WishList.find(
                                (wishItem) => wishItem._id === item._id
                              )
                                ? "text-red-500"
                                : ""
                            }`}
                            onClick={() => handleAddTowishList(item._id)}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faHeart}
                            className="text-3xl text-[#a8a8a8] my-4 cursor-pointer"
                            onClick={() => handleAddTowishList(item._id)}
                          />
                        )}
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
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
