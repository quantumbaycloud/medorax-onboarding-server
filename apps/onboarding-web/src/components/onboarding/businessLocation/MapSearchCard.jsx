import { Search, LocateFixed, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps, locationToBusinessData } from "../../../services/googleMapService";

export default function MapSearchCard({ onPlaceSelected, onCurrentLocation }) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    let listener = null;

    loadGoogleMaps()
      .then((maps) => {
        if (!mounted || !inputRef.current) return;

        // Prevent duplicate autocomplete instances in React StrictMode.
        if (autocompleteRef.current) return;

        const autocomplete = new maps.places.Autocomplete(inputRef.current, {
          fields: ["geometry", "formatted_address", "address_components", "name"],
          types: ["establishment", "geocode"],
        });

        autocompleteRef.current = autocomplete;
        listener = autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place?.geometry?.location) {
            setError("Please select a location from the search suggestions.");
            return;
          }
          setError("");
          onPlaceSelected?.(place);
        });
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setLoading(false);
        setError(err.message || "Google search could not be loaded.");
      });

    return () => {
      mounted = false;
      if (listener) listener.remove();
      autocompleteRef.current = null;
    };
  }, [onPlaceSelected]);

  return (
    <div className="w-[360px] max-w-[calc(100vw-32px)] rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl p-4 border border-white">
      <div className="flex justify-between items-center">
        <p className="text-xs tracking-[4px] uppercase text-[#006B5F] font-semibold">
          MAP SEARCH
        </p>
        <button
          type="button"
          onClick={onCurrentLocation}
          title="Use current location"
          className="w-9 h-9 rounded-full hover:bg-[#E7F7F3] flex items-center justify-center transition"
        >
          <LocateFixed size={19} className="text-[#006B5F]" />
        </button>
      </div>

      <div className="relative mt-3">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          placeholder={loading ? "Loading Google Search..." : "Search business location..."}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-slate-100 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#006B5F]/30 disabled:opacity-60"
        />
        {loading && (
          <Loader2 size={17} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#006B5F]" />
        )}
      </div>

      {error && (
        <p className="mt-2 text-[11px] leading-4 text-red-600">{error}</p>
      )}

      <button
        type="button"
        onClick={onCurrentLocation}
        className="mt-3 w-full h-10 rounded-xl border border-slate-200 text-xs font-semibold text-[#006B5F] hover:bg-[#E7F7F3] transition flex items-center justify-center gap-2"
      >
        <LocateFixed size={15} />
        Use Current Location
      </button>
    </div>
  );
}
