import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../Features/signinSlice"; // ✅ Correct Redux slice import
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
      address: Yup.string()
      .min(6, "Name must be at least 3 characters")
      .required("Address is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
      .required("Phone number is required"),
    username: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Signup
        </h1>

        <Formik
          initialValues={{
            name: "",
            address: "",
            email: "",
            phone: "",
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const result = await dispatch(signupUser(values));
            setSubmitting(false);
           // ✅ Redirect only if signup is successful and email & phone exist
    if (result.meta.requestStatus === "fulfilled") {
      console.log("Signup Successful! Redirecting to OTP page...");

      if (result.payload.email && result.payload.phone) {
          navigate("/verifyotp"); // ✅ Navigate to OTP page
      } else {
          console.error(" Signup response is missing email or phone");
      }
  }
}}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name Field */}
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email Field */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Phone Field */}
              <div>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Username Field */}
              <div>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password Field */}
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={`w-full py-2 rounded-md text-white font-semibold ${
                  loading || isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading || isSubmitting ? "Signing up..." : "Signup"}
              </button>
            </Form>
          )}
        </Formik>

       {/* Backend Error Message */}
{error && (
  <p className="text-red-500 text-center mt-4">
    {typeof error === "string" ? error : error.message || "An error occurred"}
  </p>
)}

      </div>
    </div>
  );
};

export default Signup;
