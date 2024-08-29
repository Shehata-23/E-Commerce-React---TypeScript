import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  AppDispatch,
  getCartDetail,
  getProducts,
  getUserWishList,
  Product,
  removeFromWishList,
} from "../Redux/Redux";
import { RootState } from "../Redux/Redux";
import toast from "react-hot-toast";
import axios from "axios";
import style from "../Home/home.module.css";
import { Spinner } from "flowbite-react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import CandleCake from "../CandleCake/CandleCake";
import CardComponent from "../Card/Card";
import Search from "../SearchComp/Search";
import CategoriesSwiper from "../CategoriesSwiper/CategoriesSwiper";
import CarsSwiper from "../CardsSwiper/CarsSwiper";

export async function addToCartApi(id: string) {
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

  function handlewishListSetter(id: string) {
    setWishlist((prev) => ({ ...prev, [id]: true }));
  }

  function handlewishListRemover(id: string) {
    setWishlist((prev) => ({ ...prev, [id]: false }));
  }

  async function handleAddTowishList(product: Product) {

    const id = product._id

    if (WishList.find((item: Product) => item.id === id)) {
      const response = await dispatch(removeFromWishList({ id }));
      console.log(response);
      handlewishListRemover(id);
    } else {
      const response = await dispatch(addToWishList({ id }));
      console.log(response);
      handlewishListSetter(id);
    }
  }

  async function addToCart(id: string) {
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
      {/* {"Birthday Cake"} */}
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

        {/* {"Landing Part"} */}

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
            <CarsSwiper />
          </div>
        </div>
      </div>

      {/* {"SubCategories Swiper"} */}
      <div className="min-w-full min-h-screen dark:bg-[#1E201E] flex justify-center items-center flex-col">
        <CategoriesSwiper subcategories={subcategories} />
      </div>

      {/* {"searchBar"} */}
      <div className="w-full flex justify-center dark:bg-[#1E201E] items-center">
        <Search search={search} setSearch={setSearch} />
      </div>

      {/* {"Products Card"} */}
      <div className="flex flex-wrap ">
        <div className={`${style.mainContainer} dark:bg-[#1E201E] w-screen`}>
          {products.filter((item: Product) =>
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
              .map((item) => (
                <div
                  key={item._id}
                  className="w-[95%]  md:w-6/12 lg:w-3/12 flex justify-center items-center rounded-xl"
                >
                  <CardComponent
                    item={item}
                    handleAddTowishList={handleAddTowishList}
                    WishList={WishList}
                    addToCart={addToCart}
                    loadingStates={loadingStates}
                    
                  />
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
