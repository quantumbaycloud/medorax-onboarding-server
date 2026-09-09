import ReviewSetupLayout from "../components/onboarding/ReviewSetupLayout";

export default function OnboardingReview() {
  const handleBack = () => {
    // Navigate back to previous step
    console.log("Go back");
  };

  return <ReviewSetupLayout onBack={handleBack} />;
}