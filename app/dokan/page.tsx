"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import vendorsData from "@/data/vendors.json";
import { 
  MapPin, 
  PhoneCall, 
  Navigation, 
  Map as MapIcon, 
  List, 
  Star, 
  Search, 
  CheckCircle2, 
  ShoppingBag,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Dynamically import LeafletMap with SSR disabled to prevent window undefined errors
const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] bg-emerald-50 rounded-2xl border border-green-200 flex flex-col items-center justify-center text-primary font-devanagari gap-2">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-sm font-bold">पुणे नकाशा लोड होत आहे...</p>
    </div>
  ),
});

export default function DokanDirectoryPage() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<"both" | "map" | "list">("both");
  const [selectedArea, setSelectedArea] = useState<string>("सर्व");
  const [selectedCategory, setSelectedCategory] = useState<string>("सर्व");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const categories = ["सर्व", "बियाणे", "खत", "माती", "कुंड्या", "औषधे"];
  const areas = ["सर्व", "कोथरूड", "हडपसर"];

  const filteredVendors = vendorsData.filter((v) => {
    const areaMatch = selectedArea === "सर्व" || v.area === selectedArea;
    const catMatch =
      selectedCategory === "सर्व" || v.sells.includes(selectedCategory);
    const searchMatch =
      v.shop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.address.toLowerCase().includes(searchTerm.toLowerCase());
    return areaMatch && catMatch && searchMatch;
  });

  return (
    <div className="min-h-screen py-10 bg-[#F9FAF7] font-devanagari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-amber-300">
            <MapPin className="w-3.5 h-3.5" />
            <span>पुणे शहर विशेष - कोथरूड & हडपसर</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t("अधिकृत बागकाम दुकाने (Vendor Directory)", "Authorized Vendor Directory")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            घरच्या बागेसाठी लागणारे उत्तम दर्जाचे बियाणे, लाल माती, सेंद्रिय गांडूळखत, कुंड्या व औषधे कुठे मिळतील? थेट कॉल करा किंवा नकाशावर दिशा मिळवा.
          </p>
        </div>

        {/* Filter & View Switcher Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t("दुकान, मालक किंवा परिसर शोधा...", "Search shop or location...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {/* Area Filter */}
            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600 whitespace-nowrap">परिसर:</span>
              <div className="flex gap-1.5 w-full">
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                      selectedArea === area
                        ? "bg-primary text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* View Switcher Buttons */}
            <div className="md:col-span-3 flex justify-end gap-1.5">
              <button
                onClick={() => setViewMode("both")}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 ${
                  viewMode === "both"
                    ? "bg-emerald-800 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                title="दोन्ही दृश्य"
              >
                <span>दोन्ही</span>
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 ${
                  viewMode === "map"
                    ? "bg-emerald-800 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                title="फक्त नकाशा"
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>नकाशा</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 ${
                  viewMode === "list"
                    ? "bg-emerald-800 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                title="फक्त यादी"
              >
                <List className="w-3.5 h-3.5" />
                <span>यादी</span>
              </button>
            </div>
          </div>

          {/* Sells Categories Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-500 mr-1 flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5" /> साहित्य प्रकार:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700"
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-500 font-semibold">
              एकूण {filteredVendors.length} दुकाने
            </span>
          </div>
        </div>

        {/* MAP VIEW SECTION */}
        {(viewMode === "both" || viewMode === "map") && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-primary" />
                <span>पुणे नकाशावर दुकाने शोधा (Leaflet Map)</span>
              </h2>
              <span className="text-xs text-gray-500">
                (हिरवे मार्कर: कोथरूड | लाल मार्कर: हडपसर)
              </span>
            </div>

            <LeafletMap
              vendors={vendorsData}
              selectedArea={selectedArea}
              selectedCategory={selectedCategory}
            />
          </div>
        )}

        {/* LIST VIEW SECTION */}
        {(viewMode === "both" || viewMode === "list") && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <List className="w-5 h-5 text-primary" />
                <span>दुकानांची संपूर्ण यादी</span>
              </h2>
              <span className="text-xs text-primary font-bold">
                {filteredVendors.length} दुकाने उपलब्ध
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-white rounded-3xl border border-gray-200 hover:border-primary shadow-sm hover:shadow-lift transition-all p-5 flex flex-col justify-between"
                >
                  <div>
                    {/* Header info */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            vendor.area === "कोथरूड"
                              ? "bg-green-100 text-primary border border-green-200"
                              : "bg-orange-100 text-[#D84315] border border-orange-200"
                          }`}
                        >
                          {vendor.area} विभाग
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mt-1 leading-snug">
                          {vendor.shop_name}
                        </h3>
                        <p className="text-xs text-gray-600 font-medium">
                          👤 संचालक: <strong>{vendor.owner}</strong>
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-bold px-2 py-1 rounded-xl border border-amber-200 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{vendor.rating}</span>
                      </div>
                    </div>

                    {/* Address */}
                    <p className="text-xs text-gray-600 flex items-start gap-1.5 leading-relaxed mb-4">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{vendor.address}</span>
                    </p>

                    {/* Sells Tags */}
                    <div className="mb-4">
                      <p className="text-[11px] font-bold text-gray-500 mb-1.5">येथे मिळणारे साहित्य:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {vendor.sells.map((s, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-md"
                          >
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="pt-3 border-t border-gray-100 grid grid-cols-3 gap-2">
                    <a
                      href={`tel:${vendor.contact}`}
                      className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs py-2 rounded-xl transition-all"
                    >
                      <PhoneCall className="w-3 h-3 text-primary" />
                      <span>कॉल</span>
                    </a>

                    <a
                      href={vendor.whatsapp_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs py-2 rounded-xl transition-all shadow-sm"
                    >
                      <span>व्हॉट्सअॅप</span>
                    </a>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${vendor.lat},${vendor.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 bg-primary hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl transition-all"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>दिशा</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
