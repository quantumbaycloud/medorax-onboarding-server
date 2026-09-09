import { Navigation, Loader2 } from "lucide-react";
import { useState } from "react";
import { loadGoogleMaps, locationToBusinessData } from "../../../services/googleMapService";

export default function CurrentLocationButton({ setLocationData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCurrentLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError("Your browser does not support location services.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        try {
          const maps = await loadGoogleMaps();
          const geocoder = new maps.Geocoder();
          geocoder.geocode(
            { location: { lat: latitude, lng: longitude } },
            (results, status) => {
              setLocationData((prev) => {
                const base = {
                  ...prev,
                  latitude,
                  longitude,
                  accuracy: Math.round(accuracy),
                };
                if (status === "OK" && results?.[0]) {
                  return locationToBusinessData(results[0], base);
                }
                return base;
              });
              setLoading(false);
            }
          );
        } catch (err) {
          // GPS coordinates are still useful even if reverse geocoding fails.
          setLocationData((prev) => ({
            ...prev,
            latitude,
            longitude,
            accuracy: Math.round(accuracy),
          }));
          setError(err.message || "Location found, but address lookup failed.");
          setLoading(false);
        }
      },
      (geoError) => {
        setLoading(false);
        const messages = {
          1: "Location permission denied. Please allow location access in your browser.",
          2: "Unable to determine your location. Please check your device location services.",
          3: "Location request timed out. Please try again.",
        };
        setError(messages[geoError.code] || "Unable to fetch current location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleCurrentLocation}
        disabled={loading}
        className="w-full h-12 rounded-xl border border-slate-300 flex items-center justify-center gap-2 hover:border-[#006B5F] hover:text-[#006B5F] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Navigation size={18} />}
        {loading ? "Finding Location..." : "Use Current Location"}
      </button>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
