import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP } from "../Features/otpSlice";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, verified } = useSelector((state) => state.otp);
  const { user } = useSelector((state) => state.user);

  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // ✅ Redirect to signup if user data is missing (prevents errors)
  useEffect(() => {
    if (!user?.email || !user?.phone) {
      console.error("❌ User data is missing. Redirecting to Signup.");
      navigate("/signup"); // Redirect to signup
    }
  }, [user, navigate]);

  const handleVerify = (event) => {
    event.preventDefault(); // ✅ Prevent default form submission
  
    if (!user?.email || !user?.phone) {
      console.error("❌ Email and phone are missing in Redux state.");
      return;
    }
  
    if (!emailOtp && !phoneOtp) {
      console.error("❌ OTP fields cannot be empty!");
      return;
    }
  
    dispatch(
      verifyOTP({
        email: user.email,
        phone: user.phone,
        emailOtp: emailOtp.trim(), // ✅ Ensure no extra spaces
        phoneOtp: phoneOtp.trim(),
      })
    );
  };
  

  useEffect(() => {
    if (verified) {
      setSuccessMessage("OTP Verified Successfully!");
      setEmailOtp(""); // ✅ Clear input fields after success
      setPhoneOtp("");

      // ✅ Delay navigation to show success message for 2 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    }
  }, [verified, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify OTP
        </h1>

        {!user?.email || !user?.phone ? (
          <p className="text-red-500 text-center">
            User data is missing. Redirecting to Signup...
          </p>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            {/* Email OTP Field */}
            <input
              type="text"
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
              placeholder="Enter Email OTP"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {/* Phone OTP Field */}
            <input
              type="text"
              value={phoneOtp}
              onChange={(e) => setPhoneOtp(e.target.value)}
              placeholder="Enter Phone OTP"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white font-semibold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

{error && (
  <p className="text-red-500 text-center mt-4">
    {typeof error === "string" ? error : error.message || "OTP verification failed"}
  </p>
)}


        {/* ✅ Show Success Message if OTP is correct */}
        {successMessage && (
          <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;
