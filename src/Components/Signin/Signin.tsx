import style from "./signin.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, submitSignin } from "../Redux/Redux";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export type signInValues = {
  email: string;
  password: string;
};
const SignIn = () => {
  // let [isLoading, setIsLoading] = useState(false);

  const loading = useSelector((state: RootState) => state.app.loading);
  const token = useSelector((state: RootState) => state.app.token);
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();
  async function handleSignIn(values) {
    try {
      let response = await dispatch(submitSignin(values));
      console.log(response);
      if (response.type == "app/signin/fulfilled") {
        navigate("/home");
      }
    } catch (error) {
      navigate("/signiin");
    }
  }

  const formik = useFormik<signInValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: signInValues) => {
      handleSignIn(values);
      console.log(token);
      console.log(values);
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Phone is required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[\W_]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
    }),
  });

  return (
    <div className={`${style.myContainer}  dark:bg-[#1E201E]`}>
      <div className={`${style.innerContainer} `}>
        <form
          action=""
          className="space-y-6 p-4 bg-white/25 shadow rounded-lg w-full h-full "
          onSubmit={formik.handleSubmit}
        >
          <p className="text-4xl text-center font-bold text-black/85">SignIn</p>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className={
                formik.touched.email && formik.errors.email
                  ? style.formStyleInvalid
                  : style.formStyle
              }
              placeholder="Enter Your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={style.error}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={
                formik.touched.password && formik.errors.password
                  ? style.formStyleInvalid
                  : style.formStyle
              }
              placeholder="Enter Your Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={style.error}>{formik.errors.password}</div>
            ) : null}
            <div></div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? <span className={style.loader}></span> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
