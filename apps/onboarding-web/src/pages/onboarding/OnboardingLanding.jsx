// src/pages/OnboardingLanding.jsx
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png"; // Adjust the path based on your project structure

export default function OnboardingLanding() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    function syncSize() {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(syncSize).observe(canvas);
    }
    syncSize();

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;

    float n = sin(uv.x * 2.0 + u_time * 0.2) * cos(uv.y * 2.0 + u_time * 0.3);
    n += sin(uv.x * 4.0 - u_time * 0.1) * 0.5;

    vec3 color1 = vec3(0.145, 0.388, 0.922);
    vec3 color2 = vec3(0.078, 0.722, 0.651);
    vec3 bg = vec3(0.973, 0.980, 0.988);

    vec3 finalColor = mix(bg, mix(color1, color2, uv.x), 0.06 + 0.04 * n);

    gl_FragColor = vec4(finalColor, 1.0);
}`;

    function createShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, createShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");

    let animationId;

    function render(t) {
      if (typeof ResizeObserver === "undefined") syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }

    render(0);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Medorax Technologies — The Intelligence Engine of Modern Pharmacies</title>
        <meta
          name="description"
          content="Advanced ERP ecosystem designed for high-performance healthcare environments."
        />
      </Helmet>

      <div className="min-h-screen flex items-start justify-center bg-[#f8fafc] font-['Inter','Segoe_UI',system-ui,sans-serif] text-[#0f172a] overflow-x-hidden relative pt-16 md:pt-20 pb-8">
        {/* Animated WebGL shader background */}
        <div className="fixed inset-0 z-0">
          <canvas ref={canvasRef} className="block w-full h-full" />
        </div>

        {/* Roaming cloud-like color blobs around the edges */}
        <div className="fixed inset-0 z-1 pointer-events-none overflow-hidden">
          <div className="absolute w-[280px] sm:w-[380px] md:w-[420px] h-[280px] sm:h-[380px] md:h-[420px] -top-[100px] sm:-top-[140px] -left-[80px] sm:-left-[120px] rounded-full bg-blue-500/55 blur-[50px] sm:blur-[70px] mix-blend-multiply animate-roam-a" />
          <div className="absolute w-[300px] sm:w-[430px] md:w-[480px] h-[300px] sm:h-[430px] md:h-[480px] -top-[120px] sm:-top-[160px] -right-[100px] sm:-right-[150px] rounded-full bg-teal-400/50 blur-[50px] sm:blur-[70px] mix-blend-multiply animate-roam-b" />
          <div className="absolute w-[280px] sm:w-[360px] md:w-[400px] h-[280px] sm:h-[360px] md:h-[400px] -bottom-[100px] sm:-bottom-[150px] -left-[80px] sm:-left-[100px] rounded-full bg-teal-400/45 blur-[50px] sm:blur-[70px] mix-blend-multiply animate-roam-c" />
          <div className="absolute w-[300px] sm:w-[420px] md:w-[460px] h-[300px] sm:h-[420px] md:h-[460px] -bottom-[120px] sm:-bottom-[170px] -right-[90px] sm:-right-[130px] rounded-full bg-blue-500/50 blur-[50px] sm:blur-[70px] mix-blend-multiply animate-roam-d" />
          <div className="absolute w-[200px] sm:w-[260px] md:w-[300px] h-[200px] sm:h-[260px] md:h-[300px] top-[40%] -left-[120px] sm:-left-[160px] rounded-full bg-indigo-400/40 blur-[50px] sm:blur-[70px] mix-blend-multiply animate-roam-e" />
          <div className="absolute w-[220px] sm:w-[280px] md:w-[320px] h-[220px] sm:h-[280px] md:h-[320px] top-[35%] -right-[120px] sm:-right-[170px] rounded-full bg-teal-300/40 blur-[50px] sm:blur-[70px] mix-blend-multiply animate-roam-f" />
        </div>

        {/* Page Frame */}
        <div className="relative z-2 w-full max-w-[850px] mx-4 sm:mx-6 md:mx-8 my-0 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] border border-blue-500/20 shadow-[0_0_0_4px_rgba(37,99,235,0.05),0_30px_80px_-20px_rgba(15,23,42,0.18)] bg-white/70 backdrop-blur-[18px] p-6 sm:p-8 md:p-10 lg:p-12 animate-frame-in"> 
          <div className="relative z-2 flex flex-col items-center text-center">
            
            {/* Logo and Brand Name in one line with space above */}
            <div className="flex items-center gap-2 sm:gap-3 mb-0 animate-pop-in flex-wrap justify-center">
              <img 
                src={logo} 
                alt="MEDORAX Logo" 
                className="w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10 object-contain"
              />
              <span className="text-xl sm:text-2xl font-bold tracking-tight">MEDORAX</span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.16em] sm:tracking-[0.2em] md:tracking-[0.22em] text-teal-500 uppercase ml-1 sm:ml-2">
                TECHNOLOGIES
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(28px,6vw,48px)] leading-[1.1] font-extrabold mt-5 sm:mt-6 mb-5 sm:mb-6 -tracking-[0.02em] animate-rise-in">
              The{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Intelligence Engine
              </span>
              <br />
              of Modern Pharmacies
            </h1>

            <p className="max-w-[520px] text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-8 sm:mb-10 animate-rise-in animation-delay-150 px-2 sm:px-0">
              Advanced ERP ecosystem designed for high-performance healthcare
              environments. Streamline operations, optimize inventory, and
              empower clinical decisions with real-time intelligence.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3 sm:gap-3.5 mb-5 flex-col sm:flex-row w-full sm:w-auto animate-rise-in animation-delay-250">
              <Link
                to="/register"
                className="text-[14px] sm:text-[14.5px] font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl border-none cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200 ease-in-out bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-[0_10px_24px_-8px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-8px_rgba(37,99,235,0.6)] hover:brightness-104 w-full sm:w-auto"
              >
                Create Account →
              </Link>
              <button className="text-[14px] sm:text-[14.5px] font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl border border-slate-200/10 bg-white/85 text-[#0f172a] shadow-[0_4px_14px_-6px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_20px_-6px_rgba(15,23,42,0.14)] transition-all duration-200 ease-in-out w-full sm:w-auto">
                Login
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full animate-rise-in animation-delay-350">
              <div className="bg-white/65 backdrop-blur-[6px] border border-white/80 rounded-2xl p-4 sm:p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_16px_30px_-14px_rgba(37,99,235,0.22)] hover:bg-white/85 cursor-default">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-500/15 text-teal-500 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M3 12H21M12 3C14.5 5.5 15.8 8.6 15.8 12C15.8 15.4 14.5 18.5 12 21C9.5 18.5 8.2 15.4 8.2 12C8.2 8.6 9.5 5.5 12 3Z" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold mb-1 text-[#0f172a]">Clinical Precision</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Automated compliance and safety protocols.</p>
              </div>

              <div className="bg-white/65 backdrop-blur-[6px] border border-white/80 rounded-2xl p-4 sm:p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_16px_30px_-14px_rgba(37,99,235,0.22)] hover:bg-white/85 cursor-default">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5">
                    <rect x="3" y="14" width="3.5" height="7" rx="0.8" fill="currentColor" />
                    <rect x="10.2" y="9" width="3.5" height="12" rx="0.8" fill="currentColor" />
                    <rect x="17.4" y="4" width="3.5" height="17" rx="0.8" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold mb-1 text-[#0f172a]">Real-time Insights</h3>
                <p className="text-xs text-slate-500 leading-relaxed">AI-driven forecasting for smart inventory.</p>
              </div>

              <div className="bg-white/65 backdrop-blur-[6px] border border-white/80 rounded-2xl p-4 sm:p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_16px_30px_-14px_rgba(37,99,235,0.22)] hover:bg-white/85 cursor-default">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-blue-500/15 to-teal-500/15 text-blue-600 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5">
                    <path d="M9 15L15 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M10.5 6.5L11.6 5.4C13.1 3.9 15.5 3.9 17 5.4C18.5 6.9 18.5 9.3 17 10.8L15.9 11.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M13.5 17.5L12.4 18.6C10.9 20.1 8.5 20.1 7 18.6C5.5 17.1 5.5 14.7 7 13.2L8.1 12.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold mb-1 text-[#0f172a]">Fluid Workflow</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Seamless integration with global networks.</p>
              </div>
            </div>

            {/* Footer */}
            <footer className="w-full flex flex-col sm:flex-row justify-between items-center mt-0 pt-4 border-t border-slate-200/10 text-xs text-slate-500 gap-2 sm:gap-0 text-center sm:text-left">
              <span className="text-[11px] sm:text-xs">© 2024 MEDORAX Technologies. All rights reserved.</span>
              <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
                <Link to="/privacy" className="hover:text-[#0f172a] transition-colors duration-200 text-[11px] sm:text-xs">
                  Privacy Policy
                </Link>
                <Link to="/compliance" className="hover:text-[#0f172a] transition-colors duration-200 text-[11px] sm:text-xs">
                  Compliance
                </Link>
                <Link to="/support" className="hover:text-[#0f172a] transition-colors duration-200 text-[11px] sm:text-xs">
                  Support
                </Link>
              </div>
            </footer>
          </div>
        </div>

        <style>{`
          @keyframes roam-a {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(60px, 40px) scale(1.08); }
            50% { transform: translate(30px, 90px) scale(0.96); }
            75% { transform: translate(-20px, 30px) scale(1.04); }
          }
          @keyframes roam-b {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(-50px, 50px) scale(1.05); }
            50% { transform: translate(-90px, 10px) scale(0.94); }
            75% { transform: translate(-30px, -30px) scale(1.06); }
          }
          @keyframes roam-c {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(40px, -50px) scale(1.06); }
            50% { transform: translate(90px, -20px) scale(0.95); }
            75% { transform: translate(20px, 20px) scale(1.03); }
          }
          @keyframes roam-d {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(-40px, -40px) scale(1.07); }
            50% { transform: translate(-80px, -90px) scale(0.93); }
            75% { transform: translate(-10px, -30px) scale(1.05); }
          }
          @keyframes roam-e {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(70px, 60px) scale(1.1); }
          }
          @keyframes roam-f {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-70px, 50px) scale(1.1); }
          }
          @keyframes frame-in {
            from { opacity: 0; transform: translateY(18px) scale(0.99); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes pop-in {
            from { opacity: 0; transform: scale(0.8) translateY(-8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes rise-in {
            from { opacity: 0; transform: translateY(14px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes logo-breathe {
            0%, 100% { box-shadow: 0 14px 30px -8px rgba(15,23,42,0.5), inset 0 0 0 1px rgba(255,255,255,0.04); }
            50% { box-shadow: 0 16px 40px -6px rgba(20,184,166,0.4), inset 0 0 0 1px rgba(255,255,255,0.06); }
          }
          .animate-roam-a { animation: roam-a 22s ease-in-out infinite; }
          .animate-roam-b { animation: roam-b 26s ease-in-out infinite; }
          .animate-roam-c { animation: roam-c 24s ease-in-out infinite; }
          .animate-roam-d { animation: roam-d 28s ease-in-out infinite; }
          .animate-roam-e { animation: roam-e 20s ease-in-out infinite; }
          .animate-roam-f { animation: roam-f 23s ease-in-out infinite; }
          .animate-frame-in { animation: frame-in 0.8s ease both; }
          .animate-pop-in { animation: pop-in 0.7s ease 0.15s both; }
          .animate-rise-in { animation: rise-in 0.7s ease 0.3s both; }
          .animate-logo-breathe { animation: logo-breathe 4s ease-in-out infinite; }
          .animation-delay-150 { animation-delay: 0.42s; }
          .animation-delay-250 { animation-delay: 0.54s; }
          .animation-delay-350 { animation-delay: 0.66s; }

          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation: none !important;
              transition: none !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}