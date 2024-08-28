import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { signInValues } from "../Signin/Signin";
import Cookies from "js-cookie";
// import ProductDetails from "./../ProductDetails/ProductDetails";
import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

type Subcategory = {
  _id: string;
  name: string;
  slug: string;
  category: string;
};

type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

type Product = {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
};

type CartProduct = {
  count: number;
  _id: string;
  product: Product;
  price: number;
};

type CartDetails = {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
};

type AppState = {
  token: string | null;
  id: string;
  counter: number;
  loading: boolean;
  products: Product[];
  itemId: string;
  productDetails: Product;
  cartDetails: CartDetails;
  updated: boolean;
  deleted: boolean;
  deleteCart: boolean;
  isPayed: boolean;
  userID: string;
  userOerder: any;
  userWishList: any;
};

const initialState: AppState = {
  token: null,
  id: "",
  counter: 0,
  loading: false,
  products: [],
  itemId: "",
  productDetails: null,
  cartDetails: null,
  updated: true,
  deleted: true,
  deleteCart: true,
  isPayed: false,
  userID: "",
  userOerder: "",
  userWishList: "",
};

export const submitSignin = createAsyncThunk(
  "app/signin",
  async (values: signInValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log("signin");
      toast.success("Success");
      return response.data.token;
    } catch (error: any) {
      let message = "Error";
      if (error.response) {
        message = error.response.data.message || message;
      }

      return rejectWithValue(message);
    }
  }
);

export const getProducts = createAsyncThunk(
  "app/products",
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      let message = "Error";
      if (error.response) {
        message = error.response.data.message || message;
      } else if (error.message) {
        message = error.message;
      }

      return rejectWithValue(message);
    }
  }
);

export const getCartDetail = createAsyncThunk(
  "app/cartDetails",
  async function getCart(_, { rejectWithValue }) {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Error fetching cart details:",
          error.response?.data || error.message
        );
        return rejectWithValue(error.response?.data || error.message);
      } else {
        console.error("Unexpected error fetching cart details:", error);
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const updateCount = createAsyncThunk(
  "cart/updateCount",
  async ({ id, count }: { id: string; count: number }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      console.log(token);

      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: `${count}` },
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Error updating cart:",
          error.response?.data || error.message
        );
        return rejectWithValue(error.response?.data || error.message);
      } else {
        console.error("Unexpected error updating cart:", error);
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const deleteItem = createAsyncThunk(
  "cart/deleteCount",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      console.log(token);

      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Error deleting item from cart:",
          error.response?.data || error.message
        );
        return rejectWithValue(error.response?.data || error.message);
      } else {
        console.error("Unexpected error deleting item from cart:", error);
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      console.log(token);

      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Error deleting cart:",
          error.response?.data || error.message
        );
        return rejectWithValue(error.response?.data || error.message);
      } else {
        console.error("Unexpected error deleting cart:", error);
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const cashPayment = createAsyncThunk(
  "cart/cashPayment",
  async (
    { paymentDetails, id }: { paymentDetails: any; id: string },
    { rejectWithValue }
  ) => {
    console.log("Payment request initiated");
    try {
      const token = Cookies.get("token");

      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
        paymentDetails,
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Payment will be made on delivery");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Error during payment");
        console.error(
          "Error during payment:",
          error.response?.data || error.message
        );
        return rejectWithValue(error.response?.data || error.message);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Unexpected error during payment:", error);
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const onlinePayment = createAsyncThunk(
  "cart/onlinePayment",
  async (
    { paymentDetails, id }: { paymentDetails: any; id: string },
    { rejectWithValue }
  ) => {
    console.log("Payment request initiated");
    try {
      const token = Cookies.get("token");

      const redirectUrl = "url=http://localhost:5173";
      paymentDetails.redirect = redirectUrl;

      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?${redirectUrl}`,
        paymentDetails,
        {
          headers: {
            token: token,
            "Content-Type": "application/json", 
          },
        }
      );

      if (response.data.session?.url) {
        window.open(response.data.session.url);
      } else {
        console.error("Response does not contain a valid URL:", response.data);
        return rejectWithValue("Failed to retrieve payment URL.");
      }

      console.log(response);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle AxiosError
        console.error(
          "Error during payment:",
          error.response?.data || error.message
        );
        return rejectWithValue(error.response?.data || error.message);
      } else {
        // Handle other types of errors
        console.error("Unexpected error during payment:", error);
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const getUserOrders = createAsyncThunk("user/orders", async () => {
  const token = Cookies.get("token");
  const { id } = jwtDecode(token);

  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error(
      "Error during getting all orders:",
      error.response?.data || error.message
    );
  }
});

export const addToWishList = createAsyncThunk(
  "app/addwishlist",
  async ({ id }) => {
    console.log("woeked");
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: id },
        { headers: { token: token } }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error during adding to wishlist:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);

export const removeFromWishList = createAsyncThunk(
  "app/removewishlist",
  async ({ id }) => {
    console.log("woeked");
    const token = Cookies.get("token");
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,

        { headers: { token: token } }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error during adding to wishlist:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);


export const getUserWishList = createAsyncThunk("app/getwishlist", async () => {
  console.log("woeked");
  const token = Cookies.get("token");
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,

      { headers: { token: token } }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error during adding to wishlist:",
      error.response?.data || error.message
    );
    throw error;
  }
});




const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    setItemId: (state, action: PayloadAction<string>) => {
      state.itemId = action.payload;
    },
    resetProductDetails: (state) => {
      state.productDetails = null;
    },

    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSignin.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitSignin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        Cookies.set("token", state.token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("showFirstTime", true, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      })
      .addCase(submitSignin.rejected, (state) => {
        state.loading = false;
        state.token = null;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.data;
        console.log(state.products);
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.products = null;
      })
      .addCase(getCartDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userID = action.payload.cartOwner;

        state.cartDetails = action.payload;
      })
      .addCase(getCartDetail.rejected, (state) => {
        state.loading = false;
        state.cartDetails = null;
      })
      .addCase(updateCount.pending, (state) => {
        state.loading = true;
        state.updated = false;
      })
      .addCase(updateCount.fulfilled, (state) => {
        state.loading = false;

        state.updated = true;
      })
      .addCase(updateCount.rejected, (state) => {
        state.loading = false;
        state.updated = false;
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.deleted = false;
      })
      .addCase(deleteItem.fulfilled, (state) => {
        state.loading = false;

        state.deleted = true;
      })
      .addCase(deleteItem.rejected, (state) => {
        state.loading = false;
        state.deleted = false;
      })
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.deleteCart = false;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.loading = false;

        state.deleteCart = true;
      })
      .addCase(deleteCart.rejected, (state) => {
        state.loading = false;
        state.deleteCart = false;
      })
      .addCase(cashPayment.pending, (state) => {
        state.loading = true;
        state.isPayed = true;
      })
      .addCase(cashPayment.fulfilled, (state) => {
        state.loading = false;
        state.isPayed = false;
      })
      .addCase(cashPayment.rejected, (state) => {
        state.loading = false;
        state.isPayed = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOerder = action.payload;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserWishList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.userWishList = action.payload.data;
        console.log("here", state.userWishList);
      })
      .addCase(getUserWishList.rejected, (state) => {
        state.loading = false;
      });
  },
});




// store //

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export const { increment, setItemId, resetProductDetails, setProductDetails } =
  appSlice.actions;
