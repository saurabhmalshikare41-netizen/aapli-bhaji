"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import vendorsData from "@/data/vendors.json";
import { 
  Stethoscope, 
  Upload, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw, 
  PhoneCall, 
  MapPin, 
  ExternalLink,
  Sparkles,
  AlertTriangle,
  HeartPulse,
  Leaf
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface DiseaseDiagnosis {
  disease_name_mr: string;
  plant_identified_mr: string;
  confidence_mr: string;
  symptoms_mr: string;
  cause_mr: string;
  organic_remedy_mr: string;
  chemical_remedy_mr: string;
  medicine_names_mr: string[];
  prevention_tips_mr: string;
}

export default function RogDoctorPage() {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [diagnosing, setDiagnosing] = useState<boolean>(false);
  const [result, setResult] = useState<DiseaseDiagnosis | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 4 Sample diseased leaves for instant test
  const sampleLeaves = [
    {
      title: "मिरचीवरील चुरडा-मुरडा (Leaf Curl)",
      url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "टोमॅटो पानावरील करपा (Blight)",
      url: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "पानावरील पांढरी भुरी (Powdery Mildew)",
      url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "पानांमागील मावा कीड (Aphids)",
      url: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  // Vendors that sell organic medicines/pesticides
  const medicineVendors = vendorsData
    .filter((v) => v.sells.includes("औषधे"))
    .slice(0, 4);

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

  const handleSelectSample = (url: string) => {
    setSelectedImage(url);
    setResult(null);
    setError(null);
  };

  const diagnoseImage = async () => {
    if (!selectedImage) return;

    setDiagnosing(true);
    setError(null);

    try {
      const res = await fetch("/api/diagnose-disease", {
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
        throw new Error(json.error || "निदान अयशस्वी");
      }
    } catch (err: any) {
      setError(err?.message || "रोग निदान करताना अडचण आली. कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setDiagnosing(false);
    }
  };

  const resetDoctor = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen py-10 bg-[#F9FAF7] font-devanagari">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-red-200">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>AI वनस्पती रोग डॉक्टर (Plant Pathologist)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t("झाडाचा रोग ओळखा व घरगुती उपाय मिळवा", "AI Plant Disease Doctor")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            पानावर पिवळे चट्टे, चुरडा-मुरडा किंवा कीड आहे? रोगट पानाचा फोटो टाका. आमचे AI इंजिन रोगाचे नाव, कारण, घरगुती १००% सेंद्रिय उपाय आणि जवळच्या दुकानातील औषधे सुचवेल!
          </p>
        </div>

        {/* Upload Box */}
        {!result && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-red-100 mb-10">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {!selectedImage ? (
              <div>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-red-300 hover:border-red-500 rounded-3xl p-10 text-center cursor-pointer bg-red-50/20 hover:bg-red-50/50 transition-all flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-20 h-20 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center">
                    <Stethoscope className="w-9 h-9" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      झाडाच्या पानाचा / रोगट भागाचा फोटो टाका
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      (पानाच्या दोन्ही बाजूंचा किंवा किडीचा स्पष्ट फोटो निवडा)
                    </p>
                  </div>
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-sm"
                  >
                    पानाचा फोटो निवडा
                  </button>
                </div>

                {/* Instant Sample Diseased Leaves */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-700 mb-3 text-center">
                    किंवा तात्काळ तपासणीसाठी खालील नमुना रोगट पानांवर क्लिक करा:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {sampleLeaves.map((sample, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectSample(sample.url)}
                        className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-200 hover:border-red-400 transition-all p-2 bg-gray-50 hover:bg-red-50/40"
                      >
                        <div className="relative h-24 w-full rounded-xl overflow-hidden mb-2">
                          <Image
                            src={sample.url}
                            alt={sample.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <p className="text-[11px] font-bold text-gray-800 text-center leading-snug">
                          {sample.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="relative h-72 sm:h-96 max-w-xl mx-auto rounded-2xl overflow-hidden shadow-md border-2 border-red-200">
                  <Image
                    src={selectedImage}
                    alt="Diseased Leaf"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={diagnoseImage}
                    disabled={diagnosing}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold text-base px-8 py-3.5 rounded-2xl shadow-lift transition-all"
                  >
                    {diagnosing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>AI रोग निदान करत आहे... (कृपया थांबा)</span>
                      </>
                    ) : (
                      <>
                        <Stethoscope className="w-5 h-5" />
                        <span>आता रोग निदान करा (Diagnose)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={resetDoctor}
                    disabled={diagnosing}
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

        {/* RESULTS VIEW */}
        {result && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Diagnosis Main Header */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lift border border-red-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
                      AI वनस्पती रोग तपासणी अहवाल
                    </span>
                    <h2 className="text-2xl font-extrabold text-gray-900 mt-0.5">
                      {result.disease_name_mr}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-green-200">
                    अचूकता: {result.confidence_mr}
                  </span>
                  <button
                    onClick={resetDoctor}
                    className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-red-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>दुसरे पान तपासा</span>
                  </button>
                </div>
              </div>

              {/* Symptoms & Cause Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 bg-red-50/50 rounded-2xl border border-red-100">
                  <h4 className="font-bold text-xs text-red-900 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    <span>लक्षणे (Symptoms):</span>
                  </h4>
                  <p className="text-sm text-gray-800 leading-relaxed font-medium">
                    {result.symptoms_mr}
                  </p>
                </div>

                <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
                  <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>रोगाचे कारण (Cause):</span>
                  </h4>
                  <p className="text-sm text-gray-800 leading-relaxed font-medium">
                    {result.cause_mr}
                  </p>
                </div>
              </div>
            </div>

            {/* Remedies Section: Organic vs Chemical */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Organic Remedy (घरगुती उपाय) */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-primary shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <Leaf className="w-5 h-5 text-primary" />
                  <h3>घरगुती व सेंद्रिय उपाय (Organic Remedy)</h3>
                </div>
                <p className="text-xs text-green-800 bg-green-50 px-2.5 py-1 rounded-lg inline-block font-semibold">
                  ✓ १००% विषमुक्त व भाजीसाठी पूर्णतः सुरक्षित
                </p>
                <p className="text-sm text-gray-800 leading-relaxed font-medium">
                  {result.organic_remedy_mr}
                </p>
                <div className="pt-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  💡 <strong>टीप:</strong> फवारणी नेहमी संध्याकाळी ५ नंतर करावी, जेणेकरून उन्हामुळे पानांना इजा होणार नाही.
                </div>
              </div>

              {/* Chemical / Market Medicines */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <h3>औषधांचे नाव (Recommended Medicines)</h3>
                </div>
                <p className="text-xs text-gray-500">
                  जर रोगाचे प्रमाण खूप जास्त असेल तर खालील औषधांचा वापर करावा:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {result.medicine_names_mr.map((med, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-200"
                    >
                      {med}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-700 leading-relaxed pt-2">
                  {result.chemical_remedy_mr}
                </p>
              </div>

            </div>

            {/* "औषध कुठे मिळेल?" - VENDORS LIST */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-lift">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>हे सेंद्रिय औषध कुठे मिळेल? (कोथरूड & हडपसर दुकाने)</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    शारदा ग्रीन नर्सरी प्रमाणित अस्सल नीम तेल व जैविक बुरशीनाशक मिळण्याची ठिकाणे:
                  </p>
                </div>

                <Link
                  href="/dokan"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>सर्व १२ दुकाने पहा</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {medicineVendors.map((v) => (
                  <div
                    key={v.id}
                    className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] bg-green-100 text-primary font-bold px-2 py-0.5 rounded-full">
                        {v.area}
                      </span>
                      <h4 className="font-bold text-gray-900 text-sm mt-1">{v.shop_name}</h4>
                      <p className="text-gray-500 text-[11px]">👤 {v.owner}</p>
                      <p className="text-gray-600 text-[11px] line-clamp-2 mt-1">📍 {v.address}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-3 mt-3 border-t border-gray-200">
                      <a
                        href={v.whatsapp_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] text-white text-[10px] font-bold py-1.5 rounded-lg text-center"
                      >
                        व्हॉट्सअॅप
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${v.lat},${v.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-white text-[10px] font-bold py-1.5 rounded-lg text-center"
                      >
                        नकाशा दिशा
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Saurabh Malshikare Consultation */}
              <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">👨‍🌾</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      तरीही शंका आहे? थेट सौरभ मालशिकारे सरांना विचारा!
                    </p>
                    <p className="text-xs text-gray-600">
                      पानाचा फोटो व्हॉट्सअॅपवर पाठवा, सौरभ सर स्वतः उपाय सुचवतील.
                    </p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/917219184212?text=नमस्कार%20सौरभ%20सर,%20माझ्या%20झाडावर%20${encodeURIComponent(result.disease_name_mr)}%20रोग%20दिसत%20आहे.%20कृपया%20मार्गदर्शन%20करावे.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs px-5 py-2.5 rounded-xl shrink-0 flex items-center gap-2 shadow-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>सौरभ सरांशी व्हॉट्सअॅपवर बोला</span>
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
