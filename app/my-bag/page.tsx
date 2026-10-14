"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import plantsData from "@/data/plants.json";
import { 
  BookOpen, 
  Plus, 
  Calendar, 
  Clock, 
  Droplets, 
  Sparkles, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  X,
  Sprout,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface GardenPlant {
  id: string;
  plantId: string;
  plantName: string;
  plantCategory: string;
  image: string;
  plantedDate: string; // YYYY-MM-DD
  harvestDays: number;
  notes: string;
  waterCount: number;
  fertilizerCount: number;
  lastWatered?: string;
  lastFertilized?: string;
}

export default function MyGardenDiaryPage() {
  const { t } = useLanguage();
  const [plants, setPlants] = useState<GardenPlant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [selectedPlantId, setSelectedPlantId] = useState(plantsData[0].id);
  const [customPlantName, setCustomPlantName] = useState("");
  const [plantedDate, setPlantedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");

  // Load from localStorage or set initial vibrant Pune terrace garden
  useEffect(() => {
    const saved = localStorage.getItem("aapli_bhaji_garden");
    if (saved) {
      try {
        setPlants(JSON.parse(saved));
      } catch (e) {
        // use default
      }
    } else {
      // Default sample diary plants so the user sees immediate value
      const samplePlants: GardenPlant[] = [
        {
          id: "gp-1",
          plantId: "mirchi",
          plantName: "माझी पहिली मिरची (ज्वाला)",
          plantCategory: "भाजीपाला",
          image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80",
          plantedDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          harvestDays: 70,
          notes: "कोथरूड बाल्कनीत १२ इंची कुंडीत लावली. गांडूळखताचा थर दिला आहे. लहान कळ्या आल्या आहेत.",
          waterCount: 22,
          fertilizerCount: 2,
          lastWatered: "आज सकाळी ८:००",
          lastFertilized: "१४ दिवसांपूर्वी"
        },
        {
          id: "gp-2",
          plantId: "palak",
          plantName: "घरातील गावरान पालक",
          plantCategory: "पालेभाजी",
          image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
          plantedDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          harvestDays: 35,
          notes: "आयताकृती ट्रेमध्ये पेरण केली. पाने गर्द हिरवी झाली आहेत, लवकरच पहिली कापणी करणार!",
          waterCount: 18,
          fertilizerCount: 1,
          lastWatered: "काल संध्याकाळी",
          lastFertilized: "१० दिवसांपूर्वी"
        },
        {
          id: "gp-3",
          plantId: "kothimbir",
          plantName: "सुगंधी देशी कोथिंबीर",
          plantCategory: "पालेभाजी",
          image: "https://images.unsplash.com/photo-1592417817098-8f3d6910a455?auto=format&fit=crop&w=600&q=80",
          plantedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          harvestDays: 30,
          notes: "धणे दोन भाग करून भिजवून ट्रेमध्ये टाकले. मस्त लहान हिरवे कोंब बाहेर पडले आहेत.",
          waterCount: 8,
          fertilizerCount: 0,
          lastWatered: "आज सकाळी",
        }
      ];
      setPlants(samplePlants);
      localStorage.setItem("aapli_bhaji_garden", JSON.stringify(samplePlants));
    }
  }, []);

  const saveGarden = (updated: GardenPlant[]) => {
    setPlants(updated);
    localStorage.setItem("aapli_bhaji_garden", JSON.stringify(updated));
  };

  const handleAddPlant = (e: React.FormEvent) => {
    e.preventDefault();
    const refPlant = plantsData.find((p) => p.id === selectedPlantId) || plantsData[0];

    const newEntry: GardenPlant = {
      id: "gp-" + Date.now(),
      plantId: refPlant.id,
      plantName: customPlantName || `माझी नवीन ${refPlant.name_mr}`,
      plantCategory: refPlant.category,
      image: refPlant.image_url,
      plantedDate: plantedDate,
      harvestDays: refPlant.harvest_days,
      notes: notes || "शारदा ग्रीन नर्सरी मार्गदर्शनानुसार लागवड केली.",
      waterCount: 1,
      fertilizerCount: 0,
      lastWatered: "आज लागवड करताना",
    };

    const updated = [newEntry, ...plants];
    saveGarden(updated);
    setIsModalOpen(false);
    setCustomPlantName("");
    setNotes("");
  };

  const handleDelete = (id: string) => {
    const updated = plants.filter((p) => p.id !== id);
    saveGarden(updated);
  };

  const handleWater = (id: string) => {
    const updated = plants.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          waterCount: p.waterCount + 1,
          lastWatered: "आज " + new Date().toLocaleTimeString("mr-IN", { hour: "2-digit", minute: "2-digit" }),
        };
      }
      return p;
    });
    saveGarden(updated);
  };

  const handleFertilize = (id: string) => {
    const updated = plants.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          fertilizerCount: p.fertilizerCount + 1,
          lastFertilized: "आज खत दिले",
        };
      }
      return p;
    });
    saveGarden(updated);
  };

  // Helper to calculate progress percentage and elapsed days
  const getProgress = (plant: GardenPlant) => {
    const planted = new Date(plant.plantedDate).getTime();
    const now = new Date().getTime();
    const diffDays = Math.max(0, Math.floor((now - planted) / (1000 * 60 * 60 * 24)));
    const percent = Math.min(100, Math.round((diffDays / plant.harvestDays) * 100));
    return { diffDays, percent };
  };

  return (
    <div className="min-h-screen py-10 bg-[#F9FAF7] font-devanagari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-green-100 text-primary px-3.5 py-1 rounded-full text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>व्यक्तिगत बाग ट्रॅकर (Local Storage)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {t("माझी बाग डायरी (My Garden Diary)", "My Garden Diary")}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              तुमच्या बागेतील रोपांची रोजची नोंद, पाणी व खताचे स्मरणपत्र आणि कापणी प्रगती बार.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-primary hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lift transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>नवीन रोप जोडा</span>
          </button>
        </div>

        {/* Smart Reminders Bar (UI mock) */}
        <div className="bg-amber-50 rounded-3xl p-5 border border-amber-200 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                आजचे स्वयंचलित बागकाम स्मरणपत्र (Reminders):
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="bg-white text-blue-800 text-xs font-bold px-3 py-1 rounded-xl border border-blue-200 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>आज पाणी द्या: पालक, कोथिंबीर व मिरची</span>
                </span>
                <span className="bg-white text-amber-900 text-xs font-bold px-3 py-1 rounded-xl border border-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>१५ दिवस झाले: मिरचीला २ चमचे गांडूळखत घाला!</span>
                </span>
              </div>
            </div>
          </div>

          <span className="text-[11px] text-amber-800 font-semibold bg-amber-100/70 px-3 py-1.5 rounded-xl whitespace-nowrap">
            ✓ सर्व सूचना अद्ययावत
          </span>
        </div>

        {/* Plants List */}
        {plants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <Sprout className="w-16 h-16 text-primary/40 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-800">तुमच्या बागेत अद्याप कोणतेही रोप नाही</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              वर दिलेल्या &quot;नवीन रोप जोडा&quot; बटणावर क्लिक करून आजच सुरुवात करा!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white font-bold text-xs px-6 py-3 rounded-xl"
            >
              पहिले रोप जोडा
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {plants.map((plant) => {
              const { diffDays, percent } = getProgress(plant);
              const daysLeft = Math.max(0, plant.harvestDays - diffDays);

              return (
                <div
                  key={plant.id}
                  className="bg-white rounded-3xl p-6 border border-green-100 hover:border-primary shadow-sm hover:shadow-lift transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-100">
                          <Image
                            src={plant.image}
                            alt={plant.plantName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] bg-green-100 text-primary font-bold px-2 py-0.5 rounded-full">
                            {plant.plantCategory}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 mt-0.5">
                            {plant.plantName}
                          </h3>
                          <p className="text-[11px] text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>लागवड: {plant.plantedDate} ({diffDays} दिवस पूर्ण)</span>
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(plant.id)}
                        className="text-gray-300 hover:text-red-500 p-1.5 rounded-lg transition-colors"
                        title="काढून टाका"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Progress Bar (0 to Harvest) */}
                    <div className="mb-4 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                      <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                        <span className="text-gray-700">कापणी प्रगती (Growth Progress):</span>
                        <span className="text-primary">{percent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-leaf to-primary h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1.5">
                        <span>० दिवस (पेरणी)</span>
                        <span className="font-semibold text-amber-700">
                          {daysLeft === 0 ? "🎉 आता कापणीसाठी सज्ज!" : `अंदाजे ${daysLeft} दिवस शिल्लक`}
                        </span>
                        <span>{plant.harvestDays} दिवस (कापणी)</span>
                      </div>
                    </div>

                    {/* Notes */}
                    <p className="text-xs text-gray-600 bg-[#FDFAF3] p-3 rounded-xl border border-amber-100/60 leading-relaxed mb-4">
                      📝 <strong>डायरी नोंद:</strong> {plant.notes}
                    </p>

                    {/* Activity Counters */}
                    <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                      <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
                        <span className="text-blue-900 font-semibold">💧 पाणी दिले: {plant.waterCount} वेळा</span>
                        <span className="text-[10px] text-gray-500">{plant.lastWatered || "-"}</span>
                      </div>
                      <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-100 flex items-center justify-between">
                        <span className="text-amber-900 font-semibold">🍂 खत घातले: {plant.fertilizerCount} वेळा</span>
                        <span className="text-[10px] text-gray-500">{plant.lastFertilized || "-"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Logs */}
                  <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleWater(plant.id)}
                      className="flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs py-2 rounded-xl transition-all"
                    >
                      <Droplets className="w-3.5 h-3.5" />
                      <span>आज पाणी दिले</span>
                    </button>

                    <button
                      onClick={() => handleFertilize(plant.id)}
                      className="flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs py-2 rounded-xl transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>खत घातले</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODAL: नवीन रोप जोडा */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative font-devanagari max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                <div className="flex items-center gap-2">
                  <Sprout className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-gray-900">बागेत नवीन रोप जोडा</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddPlant} className="space-y-4 text-xs">
                {/* Plant Selector */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    वनस्पती निवडा (Choose Plant from Encyclopedia):
                  </label>
                  <select
                    value={selectedPlantId}
                    onChange={(e) => setSelectedPlantId(e.target.value)}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary"
                  >
                    {plantsData.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name_mr} ({p.name_en}) - {p.category} [{p.harvest_days} दिवस]
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Label */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    रोपाचे टोपणनाव (उदा. &quot;बाल्कनीतील मिरची कुंडी क्र. १&quot;):
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. माझी पहिली मिरची"
                    value={customPlantName}
                    onChange={(e) => setCustomPlantName(e.target.value)}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    लागवडीची तारीख (Planted Date):
                  </label>
                  <input
                    type="date"
                    value={plantedDate}
                    onChange={(e) => setPlantedDate(e.target.value)}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary font-sans"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    नोंद / आठवण (Notes):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="उदा. आज गांडूळखत घातले. कुंडी पश्चिमेकडील बाल्कनीत ठेवली आहे."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
                  >
                    रद्द करा
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-primary hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm"
                  >
                    डायरीत जोडा
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
