import FeatureItem from "./FeatureItem";

export default function FeatureGrid({
  features,
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {features.map((feature) => (
        <FeatureItem
          key={feature.id}
          feature={feature}
        />
      ))}
    </div>
  );
}