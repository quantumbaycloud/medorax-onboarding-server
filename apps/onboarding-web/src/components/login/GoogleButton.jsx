// src/components/login/GoogleButton.jsx
export default function GoogleButton() {
  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    const apiUrl = import.meta.env.VITE_API_URL;
    window.location.href = `${apiUrl}/api/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full h-12 rounded-xl border bg-white hover:border-[#0EA5A4] transition flex justify-center items-center gap-3"
    >
      <img
        src="/images/google.png"
        alt="Google"
        className="w-5"
        onError={(e) => {
          e.target.src = "https://www.google.com/favicon.ico";
        }}
      />
      <span className="font-medium">Login with Google</span>
    </button>
  );
}