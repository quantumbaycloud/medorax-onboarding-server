import GuideCard from "./GuideCard";
import SupportCard from "./SupportCard";

export default function PendingInfoCards() {
  return (
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-7
      "
    >

      <GuideCard />

      <SupportCard />

    </div>
  );
}