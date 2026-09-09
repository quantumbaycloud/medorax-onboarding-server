import MapSearchCard from "./MapSearchCard";
import GoogleMap from "./GoogleMap";
import { ChevronLeft, MapPin } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export default function BusinessLocationMap({ businessType, businessData, setBusinessData, onBack, isMobile = false }) {
  const mapApi = useRef(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  const selectPlace = useCallback((place) => {
    const location = place?.geometry?.location;
    if (!location) return;

    const lat = typeof location.lat === "function" ? location.lat() : Number(location.lat);
    const lng = typeof location.lng === "function" ? location.lng() : Number(location.lng);

    mapApi.current?.selectCoordinates?.(lat, lng, null);
  }, []);

  const currentLocation = useCallback(() => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Your browser does not support location services.");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        mapApi.current?.selectCoordinates?.(latitude, longitude, Math.round(accuracy));
        setLocating(false);
      },
      (error) => {
        setLocating(false);
        const messages = {
          1: "Location permission was denied. Allow location access in your browser and try again.",
          2: "Your location could not be determined. Check GPS/location services and try again.",
          3: "Location request timed out. Please try again.",
        };
        setLocationError(messages[error.code] || "Unable to fetch your current location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <GoogleMap
        businessData={businessData}
        setBusinessData={setBusinessData}
        onMapReady={(api) => {
          mapApi.current = api;
        }}
      />

      {isMobile && (
        <button
          type="button"
          onClick={onBack}
          className="absolute top-4 left-4 z-30 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {isMobile && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/90 rounded-full px-4 py-1.5 shadow-lg">
          <p className="text-xs font-semibold text-[#006B5F] flex items-center gap-2">
            <MapPin size={14} />
            {businessType === "Distributor" ? "Warehouse Location" : "Pharmacy Location"}
          </p>
        </div>
      )}

      <div className="absolute top-4 left-4 sm:left-6 z-20">
        <MapSearchCard onPlaceSelected={selectPlace} onCurrentLocation={currentLocation} />
      </div>

      {locating && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 rounded-full bg-white px-5 py-3 shadow-xl text-sm font-semibold text-slate-700">
          Finding your current location…
        </div>
      )}

      {locationError && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[min(500px,calc(100vw-32px))] rounded-xl border border-red-200 bg-white px-4 py-3 shadow-xl text-xs text-red-600">
          {locationError}
        </div>
      )}
    </div>
  );
}
