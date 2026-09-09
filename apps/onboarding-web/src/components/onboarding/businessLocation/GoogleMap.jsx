import { useEffect, useRef, useState } from "react";
import { defaultCenter, loadGoogleMaps, locationToBusinessData } from "../../../services/googleMapService";

export default function GoogleMap({ businessData, setBusinessData, onMapReady }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);
  const mapRefObject = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let mapClickListener;
    let dragListener;

    const initialize = async () => {
      try {
        const maps = await loadGoogleMaps();
        if (cancelled || !mapRef.current) return;

        const hasCoords = Number.isFinite(Number(businessData.latitude)) && Number.isFinite(Number(businessData.longitude));
        const center = hasCoords
          ? { lat: Number(businessData.latitude), lng: Number(businessData.longitude) }
          : defaultCenter;

        const map = new maps.Map(mapRef.current, {
          center,
          zoom: hasCoords ? 16 : 5,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          gestureHandling: "greedy",
        });

        const geocoder = new maps.Geocoder();
        const marker = new maps.Marker({
          position: center,
          map,
          draggable: true,
          title: "Business location",
          animation: maps.Animation.DROP,
        });

        mapRefObject.current = map;
        geocoderRef.current = geocoder;
        markerRef.current = marker;

        const reverseGeocode = (lat, lng, accuracy = null) => {
          setBusinessData((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            accuracy,
          }));

          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (cancelled) return;
            if (status !== "OK" || !results?.length) {
              console.warn("Google reverse geocode failed:", status);
              return;
            }

            setBusinessData((prev) =>
              locationToBusinessData(results[0], {
                ...prev,
                latitude: lat,
                longitude: lng,
                accuracy,
              })
            );
          });
        };

        mapClickListener = map.addListener("click", (event) => {
          if (!event.latLng) return;
          marker.setPosition(event.latLng);
          map.panTo(event.latLng);
          reverseGeocode(event.latLng.lat(), event.latLng.lng(), null);
        });

        dragListener = marker.addListener("dragend", (event) => {
          if (!event.latLng) return;
          reverseGeocode(event.latLng.lat(), event.latLng.lng(), null);
        });

        onMapReady?.({
          map,
          marker,
          geocoder,
          reverseGeocode,
          selectCoordinates: (lat, lng, accuracy = null) => {
            const position = { lat: Number(lat), lng: Number(lng) };
            marker.setPosition(position);
            map.panTo(position);
            map.setZoom(17);
            reverseGeocode(position.lat, position.lng, accuracy);
          },
        });
      } catch (err) {
        if (!cancelled) setError(err.message || "Google Maps could not be loaded.");
      }
    };

    initialize();

    return () => {
      cancelled = true;
      mapClickListener?.remove?.();
      dragListener?.remove?.();
      mapRefObject.current = null;
      markerRef.current = null;
      geocoderRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRefObject.current || !markerRef.current) return;
    if (!Number.isFinite(Number(businessData.latitude)) || !Number.isFinite(Number(businessData.longitude))) return;

    const position = {
      lat: Number(businessData.latitude),
      lng: Number(businessData.longitude),
    };
    markerRef.current.setPosition(position);
    mapRefObject.current.panTo(position);
  }, [businessData.latitude, businessData.longitude]);

  return (
    <div ref={mapRef} className="absolute inset-0" aria-label="Google Maps business location">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/95 p-6 text-center z-10">
          <div className="max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <p className="font-semibold text-red-600">Google Maps unavailable</p>
            <p className="mt-2 text-sm text-slate-600">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
