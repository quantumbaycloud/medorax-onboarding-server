// src/components/login/SSOButton.jsx
import { Network } from "lucide-react";

export default function SSOButton() {
  const handleSSOLogin = () => {
    // Implement SSO login
    const apiUrl = import.meta.env.VITE_API_URL ;
    window.location.href = `${apiUrl}/api/auth/sso`;
  };

  return (
    <button
      onClick={handleSSOLogin}
      className="w-full h-12 rounded-xl border bg-white hover:border-[#0EA5A4] transition flex justify-center items-center gap-3"
    >
      <Network size={18} className="text-slate-500" />
      <span className="font-medium">Login with SSO</span>
    </button>
  );
}