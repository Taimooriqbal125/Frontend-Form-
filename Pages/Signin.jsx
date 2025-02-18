import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Features/usersigninslice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {user ? `Welcome, ${user.name}!` : "Login"}
        </h1>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const result = await dispatch(loginUser(values));
            setSubmitting(false);

            // ✅ Navigate to Home Page if login is successful
            if (result.meta.requestStatus === "fulfilled") {
              navigate("/home");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* username Field */}
              <Field
                type="username"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />

              {/* Password Field */}
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={`w-full py-2 rounded-md text-white font-semibold ${
                  loading || isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading || isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        {/* ✅ Show Error Message if login fails */}
        {error && <p className="text-red-500 text-center mt-4">{error.message || error}</p>}
      </div>
    </div>
  );
};

export default Login;
