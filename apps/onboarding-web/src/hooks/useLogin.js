// src/hooks/useLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../api/auth/authApi";

export default function useLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      const response = await loginUser({ email: email.trim(), password });
      console.log("✅ Login successful:", response);
      // Authentication is stored by the backend in HttpOnly cookies.
      // Never store access/refresh tokens in localStorage.
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      if (response?.user) localStorage.setItem("user", JSON.stringify(response.user));
      else localStorage.setItem("user", JSON.stringify({ userId: response?.userId, fullName: response?.fullName, email: response?.email, role: response?.role }));
      toast.success("Login Successful! 🎉");
      navigate("/business-type", { replace: true });
    } catch (error) {
      console.error("❌ Login error:", error);
      toast.error(error?.message || "Login Failed. Please try again.");
      if (Array.isArray(error?.errors)) {
        const fieldErrors = {};
        error.errors.forEach((err) => { if (err?.field) fieldErrors[err.field] = err.message; });
        setErrors(fieldErrors);
      }
    } finally { setLoading(false); }
  };

  return { email, password, loading, errors, setEmail, setPassword, handleSubmit };
}
