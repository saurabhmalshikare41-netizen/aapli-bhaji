"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import plantsData from "@/data/plants.json";
import vendorsData from "@/data/vendors.json";
import { 
  Sprout, 
  Sun, 
  Droplets, 
  Clock, 
  Calendar, 
  ShieldAlert, 
  CheckCircle, 
  ArrowLeft, 
  PhoneCall, 
  MapPin, 
  ShoppingBag,
  ExternalLink,
  BookOpen,
  Layers,
  Sparkles,
  Heart
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PageProps {
  params: {
    id: string;
  };
}

export default function PlantDetailPage({ params }: PageProps) {
  const { id } = params;
  const { t } = useLanguage();
  const plant = plantsData.find((p) => p.id === id);

  const [activeTab, setActiveTab] = useState<
    "info" | "varieties" | "uses" | "steps" | "diseases"
  >("info");

  if (!plant) {
    notFound();
  }

  // Filter vendors that sell seeds, soil, fertilizer
  const nearbyVendors = vendorsData.slice(0, 4);

  return (
    <div className="min-h-screen py-10 bg-[#F9FAF7] font-devanagari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back breadcrumb */}
        <div className="mb-6">
          <Link
            href="/vanaspati"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-primary transition-colors bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>वनस्पती ज्ञानकोश कडे परत जा</span>
          </Link>
        </div>

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-green-100 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Plant Image */}
            <div className="lg:col-span-5">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={plant.image_url}
                  alt={plant.name_mr}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {plant.category}
                </div>
              </div>
            </div>

            {/* Plant Main Details */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                    {plant.name_mr}
                  </h1>
                  <span className="text-lg text-gray-500 font-sans italic font-normal">
                    ({plant.name_en})
                  </span>
                </div>
                <p className="text-sm text-leaf font-bold font-sans mt-0.5">
                  शास्त्रीय नाव: {plant.scientific_name}
                </p>
              </div>

              {/* Fast Quick stats pill grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl text-center">
                  <Clock className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <p className="text-[10px] text-gray-500 font-medium">कापणी दिवस</p>
                  <p className="text-xs font-bold text-gray-900">{plant.harvest_days} दिवस</p>
                </div>

                <div className="bg-amber-50 border border-amber-100 p-3 rounded-2xl text-center">
                  <Sun className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <p className="text-[10px] text-gray-500 font-medium">सूर्यप्रकाश</p>
                  <p className="text-xs font-bold text-gray-900">{plant.sunlight_needed}</p>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl text-center">
                  <Droplets className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <p className="text-[10px] text-gray-500 font-medium">पाणी</p>
                  <p className="text-xs font-bold text-gray-900">{plant.water_needed.slice(0, 18)}...</p>
                </div>

                <div className="bg-purple-50 border border-purple-100 p-3 rounded-2xl text-center">
                  <Calendar className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                  <p className="text-[10px] text-gray-500 font-medium">हंगाम</p>
                  <p className="text-xs font-bold text-gray-900">{plant.season.slice(0, 16)}...</p>
                </div>
              </div>

              {/* Hyperlocal Pune Suitability Note */}
              <div className="p-3.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 text-xs text-gray-700 leading-relaxed flex items-center gap-3">
                <span className="text-2xl shrink-0">🏡</span>
                <p>
                  <strong>पुणे बाल्कनी अनुकूलता:</strong> कोथरूड आणि हडपसरमधील फ्लॅट बाल्कनीच्या जागेसाठी हे पीक अत्यंत योग्य आहे. शारदा ग्रीन नर्सरी, पुणे प्रमाणित बियाणे वापरा.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/917219184212?text=नमस्कार%20सौरभ%20सर,%20मला%20${encodeURIComponent(plant.name_mr)}%20(चे%20बी/रोप)%20कुठे%20मिळेल?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>सौरभ सरांना विचारा ({plant.name_mr} चे बी कुठे मिळेल?)</span>
                </a>

                <Link
                  href="/my-bag"
                  className="inline-flex items-center gap-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
                >
                  <Sprout className="w-4 h-4" />
                  <span>माझ्या बागेत जोडा</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Main Content Layout with 5 Tabs and Right Vendor Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 5 TABS CONTENT (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-green-100">
            
            {/* Tabs Header Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-gray-100 scrollbar-none">
              <button
                onClick={() => setActiveTab("info")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "info"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>संपूर्ण माहिती</span>
              </button>

              <button
                onClick={() => setActiveTab("varieties")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "varieties"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>जाती / प्रकार ({plant.varieties_mr.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("uses")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "uses"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>उपयोग व फायदे</span>
              </button>

              <button
                onClick={() => setActiveTab("steps")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "steps"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Sprout className="w-4 h-4" />
                <span>कशी लावावी (Steps)</span>
              </button>

              <button
                onClick={() => setActiveTab("diseases")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "diseases"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>काळजी व रोग</span>
              </button>
            </div>

            {/* TAB 1: संपूर्ण माहिती */}
            {activeTab === "info" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span>{plant.name_mr} विषयी सविस्तर माहिती</span>
                  </h3>
                  <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                    {plant.full_info_mr.split("\n\n").map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <h4 className="font-bold text-xs text-gray-900 mb-1">🌤️ सूर्यप्रकाश आवश्यकता:</h4>
                    <p className="text-xs text-gray-600">{plant.sunlight_needed}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <h4 className="font-bold text-xs text-gray-900 mb-1">💧 पाण्याचे प्रमाण:</h4>
                    <p className="text-xs text-gray-600">{plant.water_needed}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: जाती व प्रकार */}
            {activeTab === "varieties" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  महाराष्ट्रातील लोकप्रिय व उच्च उत्पादन देणाऱ्या जाती
                </h3>
                <p className="text-xs text-gray-600">
                  या सर्व जातींचे अस्सल बियाणे कोथरूड व हडपसरमधील अधिकृत दुकानांमध्ये सहज उपलब्ध आहेत:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {plant.varieties_mr.map((v, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center gap-3"
                    >
                      <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{v}</p>
                        <p className="text-[11px] text-gray-500">घरगुती कुंडीसाठी प्रमाणित जात</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: उपयोग व फायदे */}
            {activeTab === "uses" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  आरोग्यदायी उपयोग व स्वयंपाकघरातील महत्त्व
                </h3>
                <div className="space-y-3">
                  {plant.uses_mr.map((use, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-2xl">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-800 leading-relaxed">{use}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: कशी लावावी (Steps) */}
            {activeTab === "steps" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    बीज पेरणीपासून कापणीपर्यंतची टप्प्याटप्प्याने मार्गदर्शक पद्धत
                  </h3>
                  <p className="text-xs text-gray-600 mb-4">
                    सौरभ मालशिकारे (शारदा ग्रीन नर्सरी) यांच्या शास्त्रीय अनुभवानुसार:
                  </p>
                </div>

                <div className="space-y-4">
                  {plant.growing_steps_mr.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[#FDFAF3] border border-amber-100">
                      <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">
                          पायरी {idx + 1}
                        </h4>
                        <p className="text-sm text-gray-800 leading-relaxed font-medium">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: काळजी व रोग */}
            {activeTab === "diseases" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    संभाव्य रोग, कीड व सेंद्रिय नियंत्रण उपाय
                  </h3>
                  <p className="text-xs text-gray-600 mb-4">
                    रासायनिक विषारी औषधांऐवजी घरगुती व जैविक उपायांचा वापर करा:
                  </p>
                </div>

                <div className="space-y-3">
                  {plant.common_diseases_mr.map((dis, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-red-50/60 rounded-2xl border border-red-100">
                      <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-red-900">{dis}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          सल्ला: लक्षणे दिसताच ५ मिली कडुलिंब (नीम) तेलाची संध्याकाळी फवारणी करावी.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <div className="text-xs text-gray-700">
                    <p className="font-bold text-primary">झाडाच्या पानांवर विचित्र डाग किंवा कीड दिसत आहे?</p>
                    <p>आमचा AI रोग डॉक्टर त्वरित फोटोवरून रोग ओळखू शकतो.</p>
                  </div>
                  <Link
                    href="/rog-doctor"
                    className="bg-primary text-white font-bold text-xs px-3.5 py-2 rounded-xl shrink-0 hover:bg-emerald-700 transition-all"
                  >
                    रोग ओळखा
                  </Link>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR: "या साठी लागणारे साहित्य" & "जवळचे दुकानदार" (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Required Materials Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span>या साठी लागणारे साहित्य</span>
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                {plant.name_mr} यशस्वीरित्या पिकवण्यासाठी आवश्यक असणारे साहित्य:
              </p>

              <div className="space-y-2 text-xs text-gray-700">
                <div className="p-2.5 bg-gray-50 rounded-xl flex items-center justify-between">
                  <span>🌱 {plant.name_mr} चे उत्तम बियाणे / रोप</span>
                  <span className="font-bold text-primary">उपलब्ध</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl flex items-center justify-between">
                  <span>🪴 १२-१४ इंची कुंडी / ग्रो बॅग</span>
                  <span className="font-bold text-primary">उपलब्ध</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl flex items-center justify-between">
                  <span>🍂 लाल माती + गांडूळखत पॉटिंग मिक्स</span>
                  <span className="font-bold text-primary">उपलब्ध</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl flex items-center justify-between">
                  <span>🥥 कोकोपीट (पाण्याचा निचरा)</span>
                  <span className="font-bold text-primary">उपलब्ध</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl flex items-center justify-between">
                  <span>🛡️ सेंद्रिय नीम तेल स्प्रे (रोग प्रतिबंध)</span>
                  <span className="font-bold text-primary">उपलब्ध</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <Link
                  href="/kits"
                  className="w-full flex items-center justify-center gap-1.5 bg-primary hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm"
                >
                  <span>संपूर्ण बीज किट थेट मागवा (₹२९९)</span>
                </Link>
              </div>
            </div>

            {/* Nearby Vendors Card: "जवळचे दुकानदार - [झाडाचे नाव] चे बी कुठे मिळेल?" */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-900 leading-snug">
                  जवळचे दुकानदार - {plant.name_mr}चे बी कुठे मिळेल?
                </h3>
              </div>
              <p className="text-[11px] text-gray-500 mb-4">
                कोथरूड आणि हडपसरमधील अधिकृत दुकाने:
              </p>

              <div className="space-y-3.5">
                {nearbyVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="text-[10px] bg-green-100 text-primary font-bold px-2 py-0.5 rounded-full">
                          {vendor.area}
                        </span>
                        <h4 className="font-bold text-gray-900 mt-1">{vendor.shop_name}</h4>
                        <p className="text-[11px] text-gray-500 font-sans">👤 {vendor.owner}</p>
                      </div>
                      <span className="text-amber-500 font-bold text-xs shrink-0">★ {vendor.rating}</span>
                    </div>

                    <p className="text-[11px] text-gray-600 line-clamp-1">📍 {vendor.address}</p>

                    {/* Buttons: Call, WhatsApp, Directions */}
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      <a
                        href={`tel:${vendor.contact}`}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-[10px] py-1.5 rounded-lg text-center transition-colors"
                      >
                        कॉल
                      </a>
                      <a
                        href={vendor.whatsapp_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-[10px] py-1.5 rounded-lg text-center transition-colors"
                      >
                        व्हॉट्सअॅप
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${vendor.lat},${vendor.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-emerald-700 text-white font-bold text-[10px] py-1.5 rounded-lg text-center transition-colors"
                      >
                        दिशा
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                <Link
                  href="/dokan"
                  className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>सर्व १२ दुकाने व नकाशा पहा</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
