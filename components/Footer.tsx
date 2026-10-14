"use client";

import React from "react";
import Link from "next/link";
import { Sprout, Phone, Mail, MapPin, Heart, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#142916] text-white pt-16 pb-8 border-t-4 border-primary font-devanagari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-md">
                <Sprout className="w-7 h-7" />
              </div>
              <div>
                <span className="font-bold text-2xl text-white tracking-tight">आपली भाजी</span>
                <p className="text-xs text-green-300 font-medium">घरच्या घरी, विषमुक्त भाजी</p>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {t(
                "शारदा ग्रीन नर्सरीचा पुढाकार! पुणे शहरातील कोथरूड आणि हडपसर मधील फ्लॅटधारकांसाठी घरच्या बाल्कनीत १००% सेंद्रिय, विषमुक्त आणि ताजी भाजी पिकवण्याचे संपूर्ण व्यासपीठ.",
                "An initiative by Shardha Green Nursery! Helping urban apartment residents in Kothrud & Hadapsar, Pune grow 100% organic, chemical-free fresh vegetables at home."
              )}
            </p>

            <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
              <p className="text-xs text-amber-300 font-semibold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                {t("हायपरलोकल सेवा केंद्र:", "Hyperlocal Service Areas:")}
              </p>
              <p className="text-xs text-gray-200">
                • <strong>कोथरूड:</strong> पौड रोड, कर्वेनगर, वनाझ, आयडियल कॉलनी<br />
                • <strong>हडपसर:</strong> मगरपट्टा, गाडीतळ, ससाणे नगर, अमनोरा
              </p>
            </div>
          </div>

          {/* Quick Modules */}
          <div>
            <h4 className="text-base font-bold text-amber-400 mb-4 tracking-wide uppercase">
              {t("महत्त्वाचे विभाग", "Core Modules")}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/vanaspati" className="hover:text-green-300 transition-colors flex items-center gap-1.5">
                  <span>🌱</span> {t("वनस्पती माहितीकोश (३०+ झाडे)", "Plant Encyclopedia (30+ Plants)")}
                </Link>
              </li>
              <li>
                <Link href="/dokan" className="hover:text-green-300 transition-colors flex items-center gap-1.5">
                  <span>🏪</span> {t("जवळची दुकाने व थेट नकाशे", "Nearby Vendors & Live Map")}
                </Link>
              </li>
              <li>
                <Link href="/ai-scanner" className="hover:text-green-300 transition-colors flex items-center gap-1.5">
                  <span>📸</span> {t("AI बाल्कनी स्कॅनर (फोटो विश्लेषण)", "AI Balcony Space Scanner")}
                </Link>
              </li>
              <li>
                <Link href="/rog-doctor" className="hover:text-green-300 transition-colors flex items-center gap-1.5">
                  <span>🩺</span> {t("AI रोग डॉक्टर (पानांचे निदान)", "AI Rog Doctor (Disease Diagnosis)")}
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-green-300 transition-colors flex items-center gap-1.5">
                  <span>📅</span> {t("पुणे पेरणी दिनदर्शिका (१२ महिने)", "Pune Sowing Calendar")}
                </Link>
              </li>
              <li>
                <Link href="/my-bag" className="hover:text-green-300 transition-colors flex items-center gap-1.5">
                  <span>📔</span> {t("माझी बाग डायरी व आठवणारे", "My Garden Diary & Reminders")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Business & Services */}
          <div>
            <h4 className="text-base font-bold text-amber-400 mb-4 tracking-wide uppercase">
              {t("सेवा व किट्स", "Services & Kits")}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/kits" className="hover:text-green-300 transition-colors flex items-center gap-1.5">
                  <span>📦</span> {t("मासिक बीज बॉक्स (₹२९९)", "Monthly Seed Box (₹299)")}
                </Link>
              </li>
              <li>
                <Link href="/setup-service" className="hover:text-green-300 transition-colors flex items-center gap-1.5">
                  <span>🛠️</span> {t("बाल्कनी टू बास्केट सेटअप (₹१,४९९)", "Balcony to Basket Setup")}
                </Link>
              </li>
              <li>
                <Link href="/bazaar" className="hover:text-green-300 transition-colors flex items-center gap-1.5">
                  <span>🥬</span> {t("कापणी बाजार (भाजी अदलाबदल)", "Harvest Bazaar (Community OLX)")}
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-green-300 transition-colors flex items-center gap-1.5">
                  <span>🎥</span> {t("मराठी बागकाम व्हिडीओ शाळा", "Gardening Video School")}
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400 mb-1">{t("अधिकृत डोमेन:", "Official Domain:")}</p>
              <a href="https://aaplibhaji.com" className="text-sm font-semibold text-green-300 hover:underline">
                aaplibhaji.com
              </a>
            </div>
          </div>

          {/* Contact & Founder */}
          <div>
            <h4 className="text-base font-bold text-amber-400 mb-4 tracking-wide uppercase">
              {t("थेट संपर्क व मार्गदर्शन", "Contact & Guidance")}
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <span className="text-lg">👨‍🌾</span>
                <div>
                  <p className="text-white font-bold">सौरभ मालशिकारे (Saurabh Malshikare)</p>
                  <p className="text-xs text-green-300">संस्थापक, शारदा ग्रीन नर्सरी (Shardha Green Nursery)</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a 
                  href="https://wa.me/917219184212" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-300 font-bold text-white transition-colors"
                >
                  +91 7219184212 (WhatsApp Available)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:contact@aaplibhaji.com" className="hover:text-green-300 text-xs transition-colors">
                  contact@aaplibhaji.com
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300">
                  शारदा ग्रीन नर्सरी, पौड रोड, कोथरूड & सोलापूर हायवे, हडपसर, पुणे, महाराष्ट्र
                </p>
              </div>

              {/* Social SVGs */}
              <div className="pt-3 flex items-center gap-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 आपली भाजी (Aapli Bhaji). सर्व हक्क राखीव. Powered by Shardha Green Nursery, Pune.</p>
          <p className="flex items-center gap-1">
            <span>पुणेकरांसाठी प्रेमाने बनवलेले</span>
            <Heart className="w-3.5 h-3.5 text-red-400 inline fill-red-400" />
            <span>(कोथरूड & हडपसर)</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
