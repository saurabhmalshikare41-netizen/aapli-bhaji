"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Scan, 
  Upload, 
  Sparkles, 
  Sun, 
  Maximize2, 
  CheckCircle2, 
  ArrowRight, 
  ShoppingBag, 
  RefreshCw,
  PhoneCall,
  Wind,
  Layers,
  Sprout
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Suggestion {
  plant_id: string;
  plant_name: string;
  reason_mr: string;
  difficulty: string;
}

interface ScanResult {
  space_type_mr: string;
  size_mr: string;
  sunlight_mr: string;
  ventilation_mr: string;
  suggestions: Suggestion[];
  soil_needed_mr: string;
  fertilizer_needed_mr: string;
  pots_recommended_mr: string;
}

export default function AISpaceScannerPage() {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sample balcony photos for instant 1-click test
  const samplePhotos = [
    {
      title: "कोथरूड फ्लॅट बाल्कनी (सकाळचे ऊन)",
      url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "हडपसर मोठी गच्ची / टेरेस (पूर्ण ऊन)",
      url: "https://images.unsplash.com/photo-1592417817098-8f3d6910a455?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "खिडकीची ग्रिल जागा (अर्धवट सावली)",
      url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sampleUrl: string) => {
    setSelectedImage(sampleUrl);
    setResult(null);
    setError(null);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze-space", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: "image/jpeg",
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setResult(json.data);
      } else {
        throw new Error(json.error || "विश्लेषण अयशस्वी");
      }
    } catch (err: any) {
      setError(err?.message || "विश्लेषण करताना अडचण आली. कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setAnalyzing(false);
    }
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen py-10 bg-[#F9FAF7] font-devanagari">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-primary px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Gemini 1.5 Vision AI समर्थित</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t("AI बाल्कनी व जागा स्कॅनर", "AI Balcony & Space Scanner")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            तुमच्या बाल्कनी, गच्ची किंवा खिडकीचा फोटो अपलोड करा. आमचे कृषी AI इंजिन किती ऊन पडते, किती जागा आहे हे ओळखून पुण्याच्या हवामानासाठी ५ सर्वोत्तम वनस्पती सुचवेल!
          </p>
        </div>

        {/* Upload Zone & Interactive Area */}
        {!result && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-green-200 mb-10">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {!selectedImage ? (
              <div>
                {/* Large Dropzone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-primary/40 hover:border-primary rounded-3xl p-10 text-center cursor-pointer bg-green-50/40 hover:bg-green-50 transition-all flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center">
                    <Upload className="w-9 h-9" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      तुमच्या बाल्कनीचा / मोकळ्या जागेचा फोटो अपलोड करा
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      (कॅमेऱ्याने थेट फोटो काढा किंवा गॅलरीतून निवडा - JPG, PNG)
                    </p>
                  </div>
                  <button
                    type="button"
                    className="bg-primary hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-sm"
                  >
                    फोटो निवडा
                  </button>
                </div>

                {/* Instant Sample Photos */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-700 mb-3 text-center">
                    किंवा तात्काळ चाचणीसाठी खालील नमुना बाल्कनी फोटोंवर क्लिक करा:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {samplePhotos.map((sample, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectSample(sample.url)}
                        className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-200 hover:border-primary transition-all p-2 bg-gray-50 hover:bg-green-50/50"
                      >
                        <div className="relative h-28 w-full rounded-xl overflow-hidden mb-2">
                          <Image
                            src={sample.url}
                            alt={sample.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <p className="text-xs font-bold text-gray-800 text-center">{sample.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Selected Image Preview & Analyze Button */
              <div className="text-center space-y-6">
                <div className="relative h-72 sm:h-96 max-w-xl mx-auto rounded-2xl overflow-hidden shadow-md border-2 border-primary/20">
                  <Image
                    src={selectedImage}
                    alt="Selected balcony space"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={analyzeImage}
                    disabled={analyzing}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold text-base px-8 py-3.5 rounded-2xl shadow-lift transition-all"
                  >
                    {analyzing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>AI विश्लेषण चालू आहे... (कृपया ५ सेकंद थांबा)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>आता AI विश्लेषण सुरू करा</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={resetScanner}
                    disabled={analyzing}
                    className="w-full sm:w-auto text-xs font-bold text-gray-600 hover:text-red-600 px-4 py-3 rounded-xl border border-gray-200"
                  >
                    दुसरा फोटो निवडा
                  </button>
                </div>

                {error && (
                  <p className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 max-w-md mx-auto">
                    {error}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* RESULTS SECTION */}
        {result && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Analysis Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lift border border-green-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md">
                    <Scan className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wide">
                      AI विश्लेषण अहवाल (पुणे कृषी मानके)
                    </span>
                    <h2 className="text-2xl font-extrabold text-gray-900 mt-0.5">
                      तुमच्या बाल्कनीची सविस्तर तपासणी
                    </h2>
                  </div>
                </div>

                <button
                  onClick={resetScanner}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-primary bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl border border-gray-200 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>नवीन फोटो स्कॅन करा</span>
                </button>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-[#F1F8E9] p-4 rounded-2xl border border-green-200">
                  <Maximize2 className="w-5 h-5 text-primary mb-1" />
                  <p className="text-[11px] text-gray-600 font-semibold">जागेचा प्रकार:</p>
                  <p className="text-sm font-bold text-gray-900">{result.space_type_mr}</p>
                </div>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                  <Sun className="w-5 h-5 text-amber-600 mb-1" />
                  <p className="text-[11px] text-gray-600 font-semibold">अंदाजे सूर्यप्रकाश:</p>
                  <p className="text-sm font-bold text-gray-900">{result.sunlight_mr}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                  <Wind className="w-5 h-5 text-blue-600 mb-1" />
                  <p className="text-[11px] text-gray-600 font-semibold">अंदाजे क्षेत्रफळ:</p>
                  <p className="text-sm font-bold text-gray-900">{result.size_mr}</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
                  <Layers className="w-5 h-5 text-purple-600 mb-1" />
                  <p className="text-[11px] text-gray-600 font-semibold">हवा व वातावरण:</p>
                  <p className="text-sm font-bold text-gray-900">{result.ventilation_mr}</p>
                </div>
              </div>
            </div>

            {/* 5 Suggested Plants Cards */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-6">
                <h3 className="text-2xl font-extrabold text-gray-900">
                  🌱 या जागेसाठी ५ सर्वोत्तम वनस्पतींची शिफारस
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  उपलब्ध सूर्यप्रकाश आणि जागेनुसार ही झाडे तुमच्या बाल्कनीत भरघोस उत्पादन देतील:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {result.suggestions.map((sug, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-5 border border-green-200 hover:border-primary shadow-sm hover:shadow-lift transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="bg-emerald-100 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {sug.difficulty}
                        </span>
                      </div>

                      <h4 className="font-bold text-base text-gray-900 mb-2 leading-snug">
                        {sug.plant_name}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        {sug.reason_mr}
                      </p>
                    </div>

                    <Link
                      href={`/vanaspati/${sug.plant_id}`}
                      className="w-full inline-flex items-center justify-center gap-1 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-xs py-2 rounded-xl transition-all"
                    >
                      <span>लागवड माहिती</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Soil & Materials Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
                <span>या जागेसाठी लागणारी माती, खत व कुंड्या</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-800">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="font-bold text-gray-900 mb-1">🪴 आवश्यक कुंड्या:</p>
                  <p className="leading-relaxed text-gray-600">{result.pots_recommended_mr}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="font-bold text-gray-900 mb-1">🍂 मातीचे मिश्रण:</p>
                  <p className="leading-relaxed text-gray-600">{result.soil_needed_mr}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="font-bold text-gray-900 mb-1">💧 खताचे नियोजन:</p>
                  <p className="leading-relaxed text-gray-600">{result.fertilizer_needed_mr}</p>
                </div>
              </div>

              {/* Bottom Quick Links to vendors and kits */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-600">
                  📍 हे सर्व साहित्य कोथरूड व हडपसरमधील अधिकृत दुकानांमध्ये उपलब्ध आहे.
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href="/dokan"
                    className="inline-flex items-center gap-1.5 bg-primary text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-sm"
                  >
                    <span>जवळचे दुकानदार पहा</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/kits"
                    className="inline-flex items-center gap-1.5 bg-amber-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-amber-600 transition-all shadow-sm"
                  >
                    <span>तयार किट मागवा (₹२९९)</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
