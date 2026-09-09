// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import SolutionsPage from "./pages/SolutionsPage";
import AIPlatformPage from "./pages/AIPlatformPage";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";
import ScrollToTop from "./components/ScrollToTop";
import LoginPage from './pages/login/LoginPage';

// Onboarding - Part 1 (Public)
import OnboardingLanding from "./pages/onboarding/OnboardingLanding";
import RegistrationPage from "./pages/onboarding/RegistrationPage";
import EmailVerificationPage from "./pages/onboarding/EmailVerificationPage";
import MobileVerificationPage from "./pages/onboarding/MobileVerificationPage";
import OnboardingComplete from "./pages/onboarding/OnboardingComplete";

// Onboarding - Part 2 (Protected)
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import BusinessTypePage from "./pages/onboarding/BusinessTypePage";
import BusinessLocationPage from "./pages/onboarding/BusinessLocationPage";
import DocumentsPage from "./pages/onboarding/DocumentsPage";
import BankSetupPage from "./pages/onboarding/BankSetupPage";
import PlanPaymentPage from "./pages/onboarding/PlanPaymentPage";
import ReviewSetupPage from "./pages/onboarding/ReviewSetupPage";

function Layout() {
  const location = useLocation();

  const onboardingRoutes = [
    "/onboarding",
    "/register",
    "/email-verification",
    "/mobile-verification",
    "/onboarding-complete",
    "/business-type",
    "/business-location",
    "/documents",
    "/bank-setup",
    "/plan-payment",
    "/review-setup",
  ];

  const isOnboarding = onboardingRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
    <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <ScrollToTop />
      {!isOnboarding && <Navbar />}

      <Routes>
        {/* Login - PUBLIC */}
        <Route path="/login" element={<LoginPage />} />

        {/* Website */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/ai-platform" element={<AIPlatformPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} /> 

        {/* Onboarding - Part 1 (Public Routes) */}
        <Route path="/onboarding" element={<OnboardingLanding />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/mobile-verification" element={<MobileVerificationPage />} />
        <Route path="/onboarding-complete" element={<OnboardingComplete />} />

        {/* Onboarding - Part 2 (Protected Routes) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/business-type" element={<BusinessTypePage />} />
          <Route path="/business-location" element={<BusinessLocationPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/bank-setup" element={<BankSetupPage />} />
          <Route path="/plan-payment" element={<PlanPaymentPage />} />
          <Route path="/review-setup" element={<ReviewSetupPage />} />
        </Route>
      </Routes>

      {!isOnboarding && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}