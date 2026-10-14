"use client";

import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

interface Vendor {
  id: string;
  shop_name: string;
  owner: string;
  contact: string;
  whatsapp_link: string;
  address: string;
  lat: number;
  lng: number;
  area: string;
  sells: string[];
  rating: number;
  image: string;
}

interface LeafletMapProps {
  vendors: Vendor[];
  selectedArea?: string;
  selectedCategory?: string;
}

export default function LeafletMap({
  vendors,
  selectedArea = "सर्व",
  selectedCategory = "सर्व",
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  // Filter vendors based on area and category
  const filteredVendors = vendors.filter((v) => {
    const areaMatch = selectedArea === "सर्व" || v.area === selectedArea;
    const catMatch =
      selectedCategory === "सर्व" || v.sells.includes(selectedCategory);
    return areaMatch && catMatch;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let L: any;
    import("leaflet").then((leaflet) => {
      L = leaflet.default || leaflet;

      // Fix default leaflet icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current) {
        // Center between Kothrud (73.81) and Hadapsar (73.93)
        const map = L.map(mapContainerRef.current).setView([18.508, 73.87], 12);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;

      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Create Custom SVG icons for Kothrud vs Hadapsar
      const createCustomIcon = (area: string) => {
        const color = area === "कोथरूड" ? "#2E7D32" : "#D84315";
        return L.divIcon({
          className: "custom-leaflet-icon",
          html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">🌱</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });
      };

      // Add markers
      filteredVendors.forEach((vendor) => {
        const marker = L.marker([vendor.lat, vendor.lng], {
          icon: createCustomIcon(vendor.area),
        }).addTo(map);

        const popupContent = document.createElement("div");
        popupContent.className = "p-1 font-devanagari";
        popupContent.innerHTML = `
          <div style="min-width: 220px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="background: #E8F5E9; color: #2E7D32; font-size: 11px; padding: 2px 8px; border-radius: 12px; font-weight: 600;">${vendor.area}</span>
              <span style="color: #F57F17; font-size: 12px; font-weight: bold;">★ ${vendor.rating}</span>
            </div>
            <h4 style="margin: 4px 0; font-size: 14px; font-weight: 700; color: #1B5E20;">${vendor.shop_name}</h4>
            <p style="margin: 0 0 6px 0; font-size: 12px; color: #4B5563;">👤 संचालक: ${vendor.owner}</p>
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #6B7280; line-height: 1.3;">📍 ${vendor.address}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px;">
              ${vendor.sells
                .map(
                  (s) =>
                    `<span style="background: #F3F4F6; color: #374151; font-size: 10px; padding: 2px 6px; border-radius: 4px;">${s}</span>`
                )
                .join("")}
            </div>
            <div style="display: flex; gap: 6px;">
              <a href="${vendor.whatsapp_link}" target="_blank" rel="noopener noreferrer" style="flex: 1; background: #25D366; color: white; text-align: center; padding: 6px 8px; border-radius: 6px; font-size: 11px; text-decoration: none; font-weight: 600;">व्हॉट्सअॅप</a>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${vendor.lat},${vendor.lng}" target="_blank" rel="noopener noreferrer" style="flex: 1; background: #2E7D32; color: white; text-align: center; padding: 6px 8px; border-radius: 6px; font-size: 11px; text-decoration: none; font-weight: 600;">दिशा (Map)</a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.on("click", () => setSelectedVendor(vendor));
        markersRef.current.push(marker);
      });

      // Fit bounds if markers exist
      if (filteredVendors.length > 0) {
        const group = L.featureGroup(markersRef.current);
        map.fitBounds(group.getBounds().pad(0.15));
      }
    });

    return () => {
      // Cleanup markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [filteredVendors]);

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden shadow-lift border border-green-200">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Map Legend Overlay */}
      <div className="absolute top-4 right-4 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-100 text-xs">
        <p className="font-bold text-gray-800 mb-2">📍 सेवा क्षेत्र (पुणे):</p>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-[#2E7D32] border border-white shadow-sm inline-block"></span>
          <span className="text-gray-700 font-medium">कोथरूड ({vendors.filter(v => v.area === 'कोथरूड').length} दुकाने)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#D84315] border border-white shadow-sm inline-block"></span>
          <span className="text-gray-700 font-medium">हडपसर ({vendors.filter(v => v.area === 'हडपसर').length} दुकाने)</span>
        </div>
      </div>
    </div>
  );
}
