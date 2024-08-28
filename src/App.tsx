import "./App.css";
import Home from "./Components/Home/Home";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Signup from "./Components/Signup/Signup";
import { Provider } from "react-redux";
import store from "./Components/Redux/Redux";
import SignIn from "./Components/Signin/Signin";
import ProtectedRouting from "./Components/ProtectedRouting/ProtectedRouting";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import Cart from "./Components/Cart/Cart";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/Payment/Payment";
import Allorders from "./Components/Allorders/Allorders";
import WishList from "./Components/WishList/WishList";
import CandleCake from "./Components/CandleCake/CandleCake";
import Notfound from "./Components/NotFound/Notfound";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },

      {
        path: "productDetails/:id",
        element: (
          <ProtectedRouting>
            <ProductDetails />
          </ProtectedRouting>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRouting>
            <Cart />
          </ProtectedRouting>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRouting>
            <Payment />
          </ProtectedRouting>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRouting>
            <Allorders />
          </ProtectedRouting>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRouting>
            <WishList />
          </ProtectedRouting>
        ),
      },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <Signup /> },
      { path: "cake", element: <CandleCake /> },

      { path: "*", element: <Notfound /> },
    ],
  },
];

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster /> {/* Ensure this is only rendered once in the app */}
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
