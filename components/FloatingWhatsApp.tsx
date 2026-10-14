"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FloatingWhatsApp() {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(
    "नमस्कार सौरभ सर! मी 'आपली भाजी' वेबसाइटवरून बोलत आहे. मला घरच्या घरी भाजीपाला लागवडीबद्दल आपल्या मार्गदर्शनाची आवश्यकता आहे."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-devanagari">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="relative bg-white text-gray-800 text-xs px-3.5 py-2 rounded-2xl shadow-lift border border-green-200 flex items-center gap-2 max-w-[220px] animate-bounce">
          <span className="text-base">👨‍🌾</span>
          <p className="font-semibold text-primary">
            {t("काही अडचण आहे? थेट सौरभ सरांना विचारा!", "Got questions? Ask Saurabh Sir directly!")}
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowTooltip(false);
            }}
            className="text-gray-400 hover:text-gray-600 ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Pulsing Floating Button */}
      <a
        href={`https://wa.me/917219184212?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3.5 rounded-full shadow-2xl whatsapp-pulse transition-all transform hover:scale-105 active:scale-95"
        aria-label="सौरभ सरांना विचारा (WhatsApp)"
      >
        <MessageCircle className="w-6 h-6 fill-white text-transparent" />
        <span className="font-bold text-sm tracking-wide">
          {t("सौरभ सरांना विचारा", "Ask Saurabh Sir")}
        </span>
      </a>
    </div>
  );
}
