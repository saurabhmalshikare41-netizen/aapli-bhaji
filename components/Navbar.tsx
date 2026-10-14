"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Sprout, 
  MapPin, 
  Scan, 
  Stethoscope, 
  CalendarDays, 
  ShoppingBag, 
  BookOpen, 
  Package, 
  Wrench, 
  Video, 
  Menu, 
  X, 
  PhoneCall,
  Globe
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/vanaspati", label_mr: "वनस्पती", label_en: "Plants", icon: Sprout },
    { href: "/dokan", label_mr: "दुकाने व नकाशे", label_en: "Vendors & Map", icon: MapPin },
    { href: "/ai-scanner", label_mr: "AI जागा स्कॅनर", label_en: "AI Space Scanner", icon: Scan, badge: "AI" },
    { href: "/rog-doctor", label_mr: "रोग डॉक्टर", label_en: "Plant Doctor", icon: Stethoscope, badge: "AI" },
    { href: "/calendar", label_mr: "पुणे कॅलेंडर", label_en: "Pune Calendar", icon: CalendarDays },
    { href: "/bazaar", label_mr: "कापणी बाजार", label_en: "Harvest Bazaar", icon: ShoppingBag },
    { href: "/my-bag", label_mr: "माझी बाग", label_en: "My Garden", icon: BookOpen },
    { href: "/kits", label_mr: "बीज किट्स", label_en: "Seed Kits", icon: Package },
    { href: "/setup-service", label_mr: "गार्डन सेवा", label_en: "Setup Service", icon: Wrench },
    { href: "/videos", label_mr: "व्हिडीओ शाळा", label_en: "Videos", icon: Video },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm">
      {/* Top micro bar for Pune Hyperlocal Announcement */}
      <div className="bg-primary text-white text-xs py-1.5 px-4 font-devanagari">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-semibold">
              <MapPin className="w-3 h-3" />
              {t("हायपरलोकल सेवा", "Hyperlocal Service")}
            </span>
            <span className="font-medium">
              {t("फक्त कोथरूड & हडपसर, पुणेकरांसाठी खास", "Exclusively for Kothrud & Hadapsar, Pune")}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/917219184212?text=नमस्कार%20सौरभ%20सर,%20मला%20आपली%20भाजी%20बद्दल%20माहिती%20हवी%20आहे" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-green-200 transition-colors flex items-center gap-1 font-semibold"
            >
              <PhoneCall className="w-3 h-3" />
              <span>+91 7219184212 (सौरभ मालशिकारे)</span>
            </a>
            <button 
              onClick={toggleLanguage} 
              className="bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded flex items-center gap-1 font-sans font-semibold text-[11px] transition-all"
              title="Toggle English / मराठी"
            >
              <Globe className="w-3 h-3" />
              <span>{language === "mr" ? "English" : "मराठी"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-leaf flex items-center justify-center text-white shadow-md shadow-green-700/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-2xl text-primary font-devanagari tracking-tight">
                  आपली भाजी
                </span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                  पुणे
                </span>
              </div>
              <p className="text-xs text-gray-500 font-devanagari font-medium -mt-0.5">
                घरच्या घरी, विषमुक्त भाजी •{" "}
                <span className="text-leaf font-semibold">By Shardha Green Nursery</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-devanagari font-medium transition-all ${
                    isActive
                      ? "text-primary bg-primary/10 font-bold"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-gray-500"}`} />
                  <span>{t(link.label_mr, link.label_en)}</span>
                  {link.badge && (
                    <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/917219184212?text=नमस्कार%20सौरभ%20सर,%20मला%20माझ्या%20बाल्कनीत%20भाजीपाला%20लावायचा%20आहे"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-devanagari font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t("सल्ला घ्या (मोफत)", "Free Consultation")}</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto font-devanagari shadow-2xl">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white font-bold"
                      : "bg-gray-50 text-gray-800 hover:bg-green-50 hover:text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{t(link.label_mr, link.label_en)}</span>
                  {link.badge && (
                    <span className="ml-auto bg-amber-400 text-black text-[9px] font-bold px-1 rounded">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 bg-gray-50"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span>{language === "mr" ? "Switch to English" : "मराठीमध्ये बदला"}</span>
            </button>
            <a
              href="https://wa.me/917219184212?text=नमस्कार%20सौरभ%20सर,%20मला%20माझ्या%20बाल्कनीत%20भाजीपाला%20लावायचा%20आहे"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#25D366] text-white font-bold text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>व्हॉट्सअॅपवर बोला (+91 7219184212)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
