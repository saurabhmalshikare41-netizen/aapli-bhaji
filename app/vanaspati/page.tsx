"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import plantsData from "@/data/plants.json";
import { Search, Sprout, Clock, Sun, Droplets, Filter, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PlantsEncyclopediaPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("सर्व");
  const [selectedHarvestTime, setSelectedHarvestTime] = useState("all");

  const categories = ["सर्व", "भाजीपाला", "पालेभाजी", "आयुर्वेदिक / औषधी"];

  const filteredPlants = useMemo(() => {
    return plantsData.filter((plant) => {
      // Search
      const matchesSearch =
        plant.name_mr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientific_name.toLowerCase().includes(searchTerm.toLowerCase());

      // Category
      const matchesCategory =
        selectedCategory === "सर्व" ||
        (selectedCategory === "आयुर्वेदिक" && plant.category.includes("आयुर्वेदिक")) ||
        plant.category === selectedCategory;

      // Harvest time
      let matchesHarvest = true;
      if (selectedHarvestTime === "quick") matchesHarvest = plant.harvest_days <= 35;
      else if (selectedHarvestTime === "medium") matchesHarvest = plant.harvest_days > 35 && plant.harvest_days <= 75;
      else if (selectedHarvestTime === "long") matchesHarvest = plant.harvest_days > 75;

      return matchesSearch && matchesCategory && matchesHarvest;
    });
  }, [searchTerm, selectedCategory, selectedHarvestTime]);

  return (
    <div className="min-h-screen py-10 bg-[#F9FAF7] font-devanagari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Sprout className="w-3.5 h-3.5" />
            <span>पुणे बाल्कनी व गच्ची विशेष माहितीकोश</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t("वनस्पती ज्ञानकोश (Plant Encyclopedia)", "Plant Encyclopedia")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            घरच्या घरी सहज पिकवता येणाऱ्या ३०+ भाज्या, पालेभाज्या आणि औषधी वनस्पतींची परिपूर्ण माहिती, लावायची पद्धत व काळजी.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-green-100 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t("झाडाचे नाव शोधा (उदा. मिरची, पालक, टोमॅटो, तुळस...)", "Search plant by name...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary focus:bg-white text-sm"
              />
            </div>

            {/* Quick harvest filter */}
            <div className="md:col-span-6 flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600 whitespace-nowrap">
                <Clock className="w-3.5 h-3.5 inline mr-1 text-primary" />
                कापणी कालावधी:
              </span>
              <select
                value={selectedHarvestTime}
                onChange={(e) => setSelectedHarvestTime(e.target.value)}
                className="w-full py-3 px-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-none focus:border-primary"
              >
                <option value="all">सर्व कालावधी (All)</option>
                <option value="quick">जलद कापणी (३५ दिवसांच्या आत - उदा. पालक, मेथी, कोथिंबीर)</option>
                <option value="medium">मध्यम काळ (३५ ते ७५ दिवस - उदा. मिरची, टोमॅटो, वांगी)</option>
                <option value="long">दीर्घ काळ (७५ दिवसांपेक्षा जास्त - उदा. अश्वगंधा, कोरफड)</option>
              </select>
            </div>
          </div>

          {/* Categories Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-500 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> वर्गवारी:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-500 font-semibold">
              एकूण {filteredPlants.length} वनस्पती उपलब्ध
            </span>
          </div>
        </div>

        {/* Plants Grid */}
        {filteredPlants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-lg font-bold text-gray-800">कोणतीही वनस्पती आढळली नाही</h3>
            <p className="text-xs text-gray-500 mt-1">कृपया दुसरा शब्द टाईप करून किंवा फिल्टर बदलून पहा.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlants.map((plant) => (
              <div
                key={plant.id}
                className="group bg-white rounded-3xl border border-gray-200 hover:border-primary shadow-sm hover:shadow-lift overflow-hidden transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={plant.image_url}
                      alt={plant.name_mr}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-primary text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {plant.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{plant.harvest_days} दिवस</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {plant.name_mr}
                      </h3>
                      <span className="text-xs text-gray-500 font-sans italic">{plant.name_en}</span>
                    </div>
                    <p className="text-xs text-leaf font-medium mb-3">{plant.scientific_name}</p>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                      {plant.full_info_mr}
                    </p>

                    <div className="space-y-1.5 text-[11px] text-gray-600 bg-gray-50 p-3 rounded-2xl">
                      <div className="flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{plant.sunlight_needed}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{plant.water_needed}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/vanaspati/${plant.id}`}
                    className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-xs py-3 rounded-xl transition-all"
                  >
                    <span>सविस्तर माहिती व लागणारे साहित्य</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
