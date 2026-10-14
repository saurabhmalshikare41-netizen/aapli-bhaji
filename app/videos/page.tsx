"use client";

import React, { useState } from "react";
import videosData from "@/data/videos.json";
import { Video, Clock, Filter, PlayCircle, PhoneCall, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function VideoSchoolPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("सर्व");

  const categories = ["सर्व", "पालेभाज्या", "खते व औषधे", "भाजीपाला", "बाल्कनी सेटअप"];

  const filteredVideos = videosData.filter(
    (v) => selectedCategory === "सर्व" || v.category === selectedCategory
  );

  return (
    <div className="min-h-screen py-10 bg-[#F9FAF7] font-devanagari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-red-200">
            <Video className="w-3.5 h-3.5" />
            <span>मराठी बागकाम प्रात्यक्षिक शाळा</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t("व्हिडीओ शाळा (Gardening Video School)", "Gardening Video School")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            शारदा ग्रीन नर्सरीचे संचालक सौरभ मालशिकारे यांच्याकडून घरच्या बाल्कनीत पालेभाज्या, खते आणि कीड नियंत्रणाचे सोपे व शास्त्रीय मराठी व्हिडीओ धडे.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-green-50 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-primary shadow-sm hover:shadow-lift transition-all flex flex-col justify-between"
            >
              <div>
                {/* Embedded Responsive YouTube Iframe */}
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${video.youtube_id}`}
                    title={video.title_mr}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-green-100 text-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {video.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-500 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{video.duration}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">
                    {video.title_mr}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {video.description_mr}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/917219184212?text=मी%20'${encodeURIComponent(video.title_mr)}'%20हा%20व्हिडीओ%20पाहिला,%20मला%20अधिक%20माहिती%20हवी%20आहे.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-primary/10 text-primary font-bold text-xs py-2.5 rounded-xl border border-green-200 transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>या विषयावर सौरभ सरांशी चर्चा करा</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Live Expert consultation box */}
        <div className="mt-16 bg-gradient-to-r from-emerald-800 to-green-950 text-white rounded-3xl p-8 shadow-lift flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-full uppercase">
              मोफत तज्ज्ञ सेवा
            </span>
            <h3 className="text-2xl font-extrabold text-white">
              व्हिडीओ पाहूनही काही प्रश्न किंवा अडचण आहे?
            </h3>
            <p className="text-xs text-green-100 max-w-xl">
              सौरभ मालशिकारे (शारदा ग्रीन नर्सरी) कोथरूड आणि हडपसरमधील प्रत्येक नागरिकाला वैयक्तिक मोफत मार्गदर्शन करतात.
            </p>
          </div>

          <a
            href="https://wa.me/917219184212?text=नमस्कार%20सौरभ%20सर,%20मला%20व्हिडीओमधील%20विषयावर%20मार्गदर्शन%20हवे%20होते"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm px-7 py-3.5 rounded-2xl shrink-0 flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>व्हॉट्सअॅपवर विचारा (+91 7219184212)</span>
          </a>
        </div>

      </div>
    </div>
  );
}
