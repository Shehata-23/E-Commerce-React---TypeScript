import style from "./SignUp.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export type FormikValues = {
  name: string;
  phone: string;
  email: string;
  password: string;
  rePassword: string;
};

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik<FormikValues>({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit: (values: FormikValues) => {
      handleSubmit(values);
      console.log(values);
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Minimum chars is 5")
        .max(20, "Maximum chars is 20")
        .matches(/^[A-Za-z]+$/, "Name must only contain alphabetic characters")
        .required("Name is required"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Phone is required"),

      phone: Yup.string()
        .matches(
          /^(01\d{9}|[0-9]{2,4}\d{7,8})$/,
          "Enter a valid Egyptian phone number"
        )
        .required("Phone number is required"),

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
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
  });

  async function handleSubmit(values: FormikValues) {
    setIsLoading(true);
    console.log("Submitting payload:", values);

    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      toast.success("Success");
      setTimeout(() => navigate("/signin"), 0);
      console.log("Signup successful!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const errorData = axiosError.response.data;
          const message = errorData.message || "An error occurred";
          // toast.error(message);
          console.log(`Error message: ${message}`);
        } else {
          console.log("Error during signup:", axiosError.message);
        }
      } else {
        console.log("Error during signup:", (error as Error).message);
      }
    } finally {
      setIsLoading(false);
      console.log("Form submission process complete.");
    }
  }
  return (
    <div className={`${style.myContainer} dark:bg-[#1E201E] p-16`}>
      <div className={style.innerContainer}>
        <form
          action=""
          className="space-y-6 p-4 bg-white/25 shadow rounded-lg w-full h-full dark:bg-white/25 "
          onSubmit={formik.handleSubmit}
        >
          <p className="text-4xl text-center font-bold text-black/85 ">
            SignUp
          </p>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className={
                formik.touched.name && formik.errors.name
                  ? style.formStyleInvalid
                  : style.formStyle
              }
              placeholder="Enter Your Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className={style.error}>{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Phone
            </label>
            <input
              type="number"
              id="phone"
              className={
                formik.touched.phone && formik.errors.phone
                  ? style.formStyleInvalid
                  : style.formStyle
              }
              placeholder="Enter Your phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.phone && formik.errors.phone ? (
              <div className={style.error}>{formik.errors.phone}</div>
            ) : null}
          </div>
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
              placeholder="Enter Your Password "
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
            <label
              htmlFor="rePassword"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="rePassword"
              className={`${
                formik.touched["rePassword"] && formik.errors["rePassword"]
                  ? style.formStyleInvalid
                  : style.formStyle
              } `}
              placeholder="Confirm Your Password"
              value={formik.values["rePassword"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched["rePassword"] && formik.errors["rePassword"] ? (
              <div className={style.error}>{formik.errors["rePassword"]}</div>
            ) : null}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? <span className={style.loader}></span> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
