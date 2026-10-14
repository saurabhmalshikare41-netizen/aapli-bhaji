"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import calendarData from "@/data/calendar.json";
import plantsData from "@/data/plants.json";
import { 
  Calendar as CalendarIcon, 
  Sun, 
  Thermometer, 
  CloudSun, 
  Sparkles, 
  ArrowRight, 
  Lightbulb, 
  Clock, 
  Sprout 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PuneCalendarPage() {
  const { t } = useLanguage();
  // Default to October (month_id: 10)
  const [selectedMonthId, setSelectedMonthId] = useState<number>(10);

  const selectedMonth =
    calendarData.find((m) => m.month_id === selectedMonthId) || calendarData[9];

  // Resolve matching plant objects from plantsData
  const matchingPlants = selectedMonth.plant_ids
    .map((pid) => plantsData.find((p) => p.id === pid))
    .filter(Boolean) as typeof plantsData;

  return (
    <div className="min-h-screen py-10 bg-[#F9FAF7] font-devanagari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-primary px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-green-200">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>पुणे हवामान व ऋतुचक्र विशेष</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t("पुणे पेरणी दिनदर्शिका (Pune Sowing Calendar)", "Pune Sowing Calendar")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            कोणत्या महिन्यात कोणती भाजी लावावी? १२ महिन्यांचे संपूर्ण नियोजन, पुण्याचे स्थानिक तापमान आणि तज्ज्ञ कृषी सल्ले.
          </p>
        </div>

        {/* 12-Month Interactive Selector Strip */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-green-100 mb-8">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center sm:text-left">
            📅 महिना निवडा (Select Month):
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
            {calendarData.map((m) => {
              const isSelected = m.month_id === selectedMonthId;
              const isCurrent = m.month_id === 10; // Current Month indicator
              return (
                <button
                  key={m.month_id}
                  onClick={() => setSelectedMonthId(m.month_id)}
                  className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center relative ${
                    isSelected
                      ? "bg-primary text-white shadow-lift scale-105 z-10"
                      : "bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-primary"
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute -top-1.5 bg-amber-400 text-black text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                      चालू
                    </span>
                  )}
                  <span className="text-sm">{m.month_name_mr}</span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? "text-green-100" : "text-gray-400"}`}>
                    {m.month_id} वा महिना
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Month Detail Feature Banner */}
        <div className="bg-gradient-to-br from-emerald-800 to-green-950 text-white rounded-3xl p-6 sm:p-10 shadow-lift mb-10 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-amber-400 text-black text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                  {selectedMonth.season_mr}
                </span>
                <span className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  <Thermometer className="w-3.5 h-3.5 text-amber-300" />
                  <span>तापमान: {selectedMonth.temperature_range}</span>
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {selectedMonth.month_name_mr} महिन्यातील बागकाम नियोजन
              </h2>

              <p className="text-sm sm:text-base text-green-100 leading-relaxed font-medium">
                {selectedMonth.weather_note_mr}
              </p>

              {/* Pro tips alert */}
              <div className="p-4 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-sm flex items-start gap-3 mt-4">
                <Lightbulb className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                    पुणे कृषी तज्ज्ञ सल्ला (Shardha Green Nursery):
                  </p>
                  <p className="text-xs text-white leading-relaxed mt-0.5">
                    {selectedMonth.pro_tips_mr}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-white/10 p-6 rounded-3xl border border-white/15 backdrop-blur-md text-center">
              <p className="text-xs text-green-200 uppercase tracking-wider mb-2 font-semibold">
                या महिन्यात लावायची पिके
              </p>
              <div className="text-4xl font-black text-white mb-2">
                {selectedMonth.suitable_plants_mr.length}
              </div>
              <p className="text-xs text-green-100">
                भाजीपाला व पालेभाज्यांचे प्रकार
              </p>
              <a
                href={`https://wa.me/917219184212?text=नमस्कार%20सौरभ%20सर,%20मला%20${encodeURIComponent(selectedMonth.month_name_mr)}%20महिन्यातील%20पेरणीबद्दल%20बियाणे%20हवे%20आहे`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-1.5 w-full bg-amber-400 hover:bg-amber-500 text-black font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm"
              >
                <span>या महिन्याचे बियाणे ऑर्डर करा</span>
              </a>
            </div>

          </div>
        </div>

        {/* Suitable Plants Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <Sprout className="w-6 h-6 text-primary" />
              <span>{selectedMonth.month_name_mr} महिन्यात काय लावावे?</span>
            </h3>
            <span className="text-xs text-gray-500 font-semibold">
              (खालील कोणत्याही रोपावर क्लिक करून माहिती पहा)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {matchingPlants.map((plant) => (
              <div
                key={plant.id}
                className="group bg-white rounded-3xl border border-gray-200 hover:border-primary shadow-sm hover:shadow-lift overflow-hidden transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={plant.image_url}
                      alt={plant.name_mr}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 text-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {plant.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{plant.harvest_days} दिवस</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {plant.name_mr}
                      </h4>
                      <span className="text-xs text-gray-500 font-sans italic">{plant.name_en}</span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                      {plant.full_info_mr}
                    </p>

                    <div className="p-2.5 bg-gray-50 rounded-xl text-[11px] text-gray-600 flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{plant.sunlight_needed}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/vanaspati/${plant.id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-xs py-2.5 rounded-xl transition-all"
                  >
                    <span>कशी लावावी ते पहा</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
