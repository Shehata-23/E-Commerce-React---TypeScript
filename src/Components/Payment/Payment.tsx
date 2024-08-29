import { useFormik } from "formik";
import { useEffect } from "react";
import style from "../Payment/payment.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  AppDispatch,
  cashPayment,
  getCartDetail,
  onlinePayment,
  RootState,
} from "../Redux/Redux";
import { Label, Radio } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  type paymentTypes = {
    details: string;
    city: string;
    phone: string;
    payment: string;
  };

  let navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCartDetail());
  }, [dispatch]);

  const cities = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Shubra El Kheima",
    "Port Said",
    "Suez",
    "El Mahalla El Kubra",
    "Luxor",
    "Mansoura",
    "Tanta",
    "Asyut",
    "Ismailia",
    "Faiyum",
    "Zagazig",
    "Aswan",
    "Damietta",
    "Damanhur",
    "Minya",
    "Beni Suef",
    "Qena",
    "Sohag",
    "Hurghada",
    "6th of October City",
    "Shibin El Kom",
    "Banha",
    "Kafr El Sheikh",
    "Arish",
    "Mallawi",
    "10th of Ramadan City",
    "Bilbeis",
    "Marsa Matruh",
    "Idfu",
    "Mit Ghamr",
    "El Hawamdeya",
    "Desouk",
    "Qalyub",
    "Abu Kabir",
    "Kafr El Dawwar",
    "Girga",
    "Akhmim",
    "Matareya",
    "Manfalut",
    "Quesna",
    "El Matareya",
    "Basyoun",
    "Samalut",
    "Farshut",
    "New Cairo",
    "Obour City",
  ];
  const cartDetails = useSelector((state: RootState) => state.app.cartDetails);
  const isPayed = useSelector((state: RootState) => state.app.isPayed);
  // const loading = useSelector((state: RootState) => state.app.loading);

  useEffect(() => {
    dispatch(getCartDetail());
  }, [dispatch, isPayed]);

  const formik = useFormik<paymentTypes>({
    initialValues: {
      city: "",
      details: "",
      phone: "",
      payment: "",
    },
    onSubmit: (values: paymentTypes) => {
      if (values.payment === "Cash" && cartDetails && "_id" in cartDetails) {
        async function cashpayment() {
          if (
            values.payment === "Cash" &&
            cartDetails &&
            "_id" in cartDetails
          ) {
            await dispatch(
              cashPayment({ paymentDetails: values, id: cartDetails._id })
            );
          }

          navigate("/home");
        }
        cashpayment();
      }
      if (values.payment === "online" && cartDetails && "_id" in cartDetails) {
        dispatch(
          onlinePayment({ paymentDetails: values, id: cartDetails._id })
        );
      }
      // console.log(values);
      // console.log(cartDetails);
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Minimum chars is 5")
        .max(15, "Maximum chars is 20"),

      phone: Yup.string()
        .matches(
          /^(01\d{9}|[0-9]{2,4}\d{7,8})$/,
          "Enter a valid Egyptian phone number"
        )
        .required("Phone number is required"),
    }),
  });

  return (
    <>
      <div className="min-w-full  min-h-full bg-while flex justify-center items-center dark:bg-[#1E201E] dark:text-white">
        <div className="md:w-[50%] w-[90%] flex-col justify-evenly items-center p-5 shadow-lg  dark:shadow-lg">
          <form
            action=""
            className="space-y-6 p-4 bg-white/25 shadow rounded-lg w-full h-full "
            onSubmit={formik.handleSubmit}
          >
            <p className="text-4xl text-center font-bold text-black/85 dark:text-white">
              Payment
            </p>

            <div className="">
              <label
                htmlFor="details"
                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              >
                Notes
              </label>
              <input
                type="text"
                id="details"
                className={`${
                  formik.touched.details && formik.errors.details
                    ? style.formStyleInvalid
                    : style.formStyle
                } `}
                placeholder="Enter Notes"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.details && formik.errors.details ? (
                <div className={style.error}>{formik.errors.details}</div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
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
                placeholder="Enter Your Password"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className={style.error}>{formik.errors.phone}</div>
              ) : null}
              <div></div>
            </div>

            <div className="w-full  mx-auto">
              <label
                htmlFor="egypt-cities"
                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              >
                Select a city:
              </label>
              <select
                id="egypt-cities"
                name="city"
                className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                value={formik.values.city}
                onChange={formik.handleChange}
              >
                <option value="" label="Select a city" />
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className=" flex ">
              <div className="flex items-center gap-2">
                <Radio
                  id="Cash"
                  name="payment"
                  value="Cash"
                  onChange={formik.handleChange}
                  checked={formik.values.payment === "Cash"}
                />
                <Label htmlFor="cash">Cash</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="online"
                  name="payment"
                  value="online"
                  onChange={formik.handleChange}
                  checked={formik.values.payment === "online"}
                  className="ml-5"
                />
                <Label htmlFor="online">Online Payment</Label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isPayed ? <span className={style.loader}></span> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
