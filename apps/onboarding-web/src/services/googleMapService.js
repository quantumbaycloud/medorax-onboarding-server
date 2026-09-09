const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
let mapsPromise = null;

export const defaultCenter = { lat: 28.6139, lng: 77.2090 };

export const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
};

/** Load Google Maps exactly once and wait until Places is available. */
export function loadGoogleMaps() {
  if (window.google?.maps?.places?.Autocomplete) {
    return Promise.resolve(window.google.maps);
  }

  if (!GOOGLE_MAPS_KEY) {
    return Promise.reject(
      new Error("Google Maps API key is missing. Add VITE_GOOGLE_MAPS_API_KEY to your frontend .env file.")
    );
  }

  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-medorax-google-maps]');

    const finish = () => {
      if (window.google?.maps?.places?.Autocomplete) {
        resolve(window.google.maps);
      } else {
        reject(
          new Error(
            "Google Places did not load. Enable Maps JavaScript API and Places API for your Google API key."
          )
        );
      }
    };

    if (existing) {
      if (window.google?.maps?.places?.Autocomplete) {
        finish();
      } else {
        existing.addEventListener("load", finish, { once: true });
        existing.addEventListener(
          "error",
          () => reject(new Error("Google Maps failed to load. Check the API key and allowed origins.")),
          { once: true }
        );
      }
      return;
    }

    const script = document.createElement("script");
    script.dataset.medoraxGoogleMaps = "true";
    script.async = true;
    script.defer = true;
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(GOOGLE_MAPS_KEY)}` +
      `&libraries=places,geometry&v=weekly`;
    script.onload = finish;
    script.onerror = () =>
      reject(new Error("Google Maps failed to load. Check your API key and Google Cloud restrictions."));
    document.head.appendChild(script);
  });

  mapsPromise.catch(() => {
    mapsPromise = null;
  });

  return mapsPromise;
}

export function parseAddressComponents(components = []) {
  const parts = {};

  components.forEach((component) => {
    const types = component.types || [];
    const value = component.long_name || "";

    if (types.includes("street_number")) parts.streetNumber = value;
    if (types.includes("route")) parts.route = value;
    if (types.includes("sublocality_level_1") || types.includes("sublocality")) {
      parts.area = value;
    }
    if (types.includes("locality")) parts.city = value;
    if (!parts.city && types.includes("administrative_area_level_2")) {
      parts.city = value;
    }
    if (types.includes("administrative_area_level_1")) parts.state = value;
    if (types.includes("country")) parts.country = value;
    if (types.includes("postal_code")) parts.pincode = value;
  });

  return parts;
}

export function locationToBusinessData(place, previous = {}) {
  const location = place?.geometry?.location;
  if (!location) return previous;

  const lat = typeof location.lat === "function" ? location.lat() : Number(location.lat);
  const lng = typeof location.lng === "function" ? location.lng() : Number(location.lng);
  const parts = parseAddressComponents(place.address_components || []);
  const addressLine1 = [parts.streetNumber, parts.route].filter(Boolean).join(" ");

  return {
    ...previous,
    latitude: lat,
    longitude: lng,
    accuracy: previous.accuracy ?? null,
    formattedAddress: place.formatted_address || place.name || previous.formattedAddress || "",
    addressLine1: addressLine1 || place.formatted_address || previous.addressLine1 || "",
    city: parts.city || previous.city || "",
    state: parts.state || previous.state || "",
    country: parts.country || previous.country || "",
    pincode: parts.pincode || previous.pincode || "",
  };
}
