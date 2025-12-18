import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = new URLSearchParams(location.search).get("email");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If email not present → block page
  if (!email) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-xl font-semibold">
          Invalid access. Email missing.
        </p>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg);
        setLoading(false);
        return;
      }

      alert("Account verified successfully!");
      navigate("/login");
    } catch (err) {
      setError("Network error!", err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 shadow-md rounded-lg w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>

        <p className="text-sm text-gray-600 text-center mb-2">
          OTP sent to <b>{email}</b>
        </p>

        <input
          type="text"
          value={otp}
          maxLength="6"
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="w-full border px-3 py-2 rounded mb-3 text-center text-xl"
          placeholder="Enter OTP"
        />

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
