import { useEffect, useState } from "react";
import ReviewHeader from "./ReviewHeader";
import ReviewAccordion from "./ReviewAccordion";
import ReviewFooter from "./ReviewFooter";
import PendingPage from "./PendingPage";
import ApprovalSuccess from "../approval/ApprovalSuccess";
import { useReviewData } from "./ReviewDataProvider";
import client, { getApiErrorMessage } from "../../../api/client";
import { toast } from "react-hot-toast";

export default function ReviewSetupLayout({ onBack }) {
  const { reviewData, loading, refreshData } = useReviewData();
  const [currentStep, setCurrentStep] = useState("review");
  const [credentials, setCredentials] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const loadApplicationStatus = async () => {
    try {
      const { data } = await client.get("/api/onboarding/application-status");

      if (data.status === "approved") {
        setCredentials(data);
        setSubmitted(true);
        setCurrentStep("approved");
      } else if (data.status === "pending") {
        setSubmitted(true);
        setCurrentStep("pending");
      } else if (data.status === "rejected") {
        setSubmitted(false);
        setCurrentStep("review");
        toast.error(data.rejectionReason || "Application was rejected. Please update your details and resubmit.");
      } else {
        setSubmitted(false);
        setCurrentStep("review");
      }
    } catch (e) {
      console.error("Application status error", e);
    }
  };

  useEffect(() => {
    loadApplicationStatus();
  }, []);

  useEffect(() => {
    if (currentStep !== "pending") return;
    const timer = setInterval(loadApplicationStatus, 10000);
    return () => clearInterval(timer);
  }, [currentStep]);

  useEffect(() => () => {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  }, []);

  const handleSubmit = async () => {
    try {
      await refreshData();
      const { data } = await client.post("/api/onboarding/submit");

      if (data.status === "approved") {
        setCredentials(data);
        setSubmitted(true);
        setCurrentStep("approved");
        return;
      }

      setSubmitted(true);
      setCurrentStep("pending");
      toast.success("Application submitted to the Medorax admin team for verification.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Please complete payment and all onboarding requirements before submitting."));
      throw error;
    }
  };

  const handleDashboard = () => window.location.assign("/dashboard");

  if (loading) {
    return <div className="flex h-full items-center justify-center p-8">Loading your setup...</div>;
  }

  return (
    <div className="flex h-full flex-col bg-[#F8FAFC]">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1100px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {currentStep === "approved" ? (
            <ApprovalSuccess onDashboard={handleDashboard} credentials={credentials || {}} />
          ) : currentStep === "pending" ? (
            <PendingPage />
          ) : (
            <>
              <ReviewHeader />
              <div className="mt-4 sm:mt-6 lg:mt-8">
                <ReviewAccordion reviewData={reviewData} onDataUpdate={refreshData} />
              </div>
            </>
          )}
        </div>
      </div>

      {currentStep === "review" && !submitted && (
        <div className="shrink-0 border-t border-slate-200 bg-white">
          <div className="max-w-[1100px] mx-auto px-3 sm:px-6 lg:px-8">
            <ReviewFooter onBack={onBack} onSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}
