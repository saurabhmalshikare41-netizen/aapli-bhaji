"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Wrench, 
  CheckCircle2, 
  PhoneCall, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SetupServicePage() {
  const { t } = useLanguage();

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("कोथरूड");
  const [address, setAddress] = useState("");
  const [spaceType, setSpaceType] = useState("लहान बाल्कनी (४०-६० चौ. फूट)");
  const [preferredDate, setPreferredDate] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("बेसिक बाल्कनी (₹१,४९९)");
  const [notes, setNotes] = useState("");

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `नमस्कार सौरभ सर, मला 'बाल्कनी टू बास्केट सेटअप' सेवा बुक करायची आहे.
तपशील:
• नाव: ${name}
• संपर्क: ${phone}
• परिसर: ${area} (${address})
• जागेचा प्रकार: ${spaceType}
• निवडलेला प्लॅन: ${selectedPlan}
• अपेक्षित तारीख: ${preferredDate || "लवकरात लवकर"}
• अतिरिक्त माहिती: ${notes || "काही नाही"}

कृपया अपॉइंटमेंट कन्फर्म करावी.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/917219184212?text=${encoded}`, "_blank");
  };

  const plans = [
    {
      name: "बेसिक बाल्कनी सेटअप",
      price: "₹१,४९९",
      tag: "लहान फ्लॅटसाठी",
      popular: false,
      features: [
        "५ उच्च दर्जाच्या कुंड्या किंवा ग्रो बॅग्स",
        "लाल माती, गांडूळखत व कोकोपीटचे परिपूर्ण मिश्रण",
        "५ मोफत रोपे/बियाणे (पालक, मेथी, मिरची, टोमॅटो, तुळस)",
        "शारदा ग्रीन नर्सरी तज्ज्ञ घरी येऊन प्रत्यक्ष लावून देतील",
        "१ महिना मोफत व्हॉट्सअॅप आरोग्य सपोर्ट"
      ]
    },
    {
      name: "प्रिमियम फॅमिली बाल्कनी",
      price: "₹२,९९९",
      tag: "सर्वाधिक पसंती",
      popular: true,
      features: [
        "१० टिकाऊ हेवी-ड्युटी कुंड्या व ट्रे",
        "संपूर्ण जैविक पॉटिंग मिक्स (१००% सेंद्रिय खतासह)",
        "१० विविध भाज्या व औषधी रोपे",
        "नाजूक रोपांसाठी ५०% शेडनेट कव्हर व मांडव आधार",
        "१ लिटर सेंद्रिय नीम ऑइल कीटकनाशक किट",
        "२ महिने मोफत फॉलोअप व बाग मार्गदर्शन"
      ]
    },
    {
      name: "टेरेस फार्मिंग महा-सेटअप",
      price: "₹५,९९९",
      tag: "गच्ची व मोठ्या बागेसाठी",
      popular: false,
      features: [
        "२०+ मोठ्या ग्रो बॅग्स व आयताकृती ट्रे",
        "वेलवर्गीय भाज्यांसाठी (कारले, दोडका) मजबूत बांबू ट्रेलिस मांडव",
        "१०० किलो सुपीक गांडूळखत व लाल माती मिक्स",
        "फळभाज्या + पालेभाज्या + औषधी अशी २० पिके",
        "सौरभ मालशिकारे सरांची प्रत्यक्ष २ मोफत होम व्हिजिट्स"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-10 bg-[#F9FAF7] font-devanagari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-amber-300">
            <Wrench className="w-3.5 h-3.5" />
            <span>आम्ही येऊन प्रत्यक्ष लावून देऊ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t("बाल्कनी टू बास्केट सेटअप सेवा", "Balcony to Basket Setup Service")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            वेळ नाही किंवा बागकाम कसे करावे समजत नाही? काळजी नको! आमची तज्ज्ञ टीम तुमच्या कोथरूड किंवा हडपसरमधील घरी येऊन संपूर्ण बाल्कनी हिरवीगार करून देईल.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-8 transition-all flex flex-col justify-between relative ${
                plan.popular
                  ? "bg-gradient-to-b from-white to-emerald-50/50 border-2 border-primary shadow-lift scale-105 z-10"
                  : "bg-white border border-gray-200 shadow-sm hover:border-primary"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-xs font-black px-4 py-1 rounded-full shadow-md">
                  ★ सर्वाधिक पसंती
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  {plan.tag}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-1 mb-3">{plan.name}</h3>

                <div className="mb-6">
                  <span className="text-4xl font-black text-primary">{plan.price}</span>
                  <span className="text-xs text-gray-500 ml-1">पासून सुरू (मटेरिअलसह)</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <button
                  onClick={() => {
                    setSelectedPlan(`${plan.name} (${plan.price})`);
                    const formEl = document.getElementById("booking-form");
                    formEl?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                    plan.popular
                      ? "bg-primary hover:bg-emerald-700 text-white shadow-md"
                      : "bg-gray-100 hover:bg-green-50 text-gray-800 hover:text-primary"
                  }`}
                >
                  हा प्लॅन निवडा
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Booking Form Section */}
        <div id="booking-form" className="bg-white rounded-3xl p-6 sm:p-10 shadow-lift border border-green-200 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 pb-6 border-b border-gray-100 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                सेटअप अपॉइंटमेंट नोंदवा (Booking Form)
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                माहिती भरा आणि थेट सौरभ मालशिकारे सरांशी व्हॉट्सअॅपवर वेळ निश्चित करा.
              </p>
            </div>
          </div>

          <form onSubmit={handleBooking} className="space-y-4 text-xs font-devanagari">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">तुमचे नाव (Full Name):</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. मंदार जोशी"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">मोबाईल / व्हॉट्सअॅप नंबर:</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. 9823012345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">परिसर (पुणे):</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                >
                  <option value="कोथरूड">कोथरूड (पौड रोड, कर्वेनगर, वनाझ, आयडियल कॉलनी)</option>
                  <option value="हडपसर">हडपसर (मगरपट्टा, अमनोरा, गाडीतळ, ससाणे नगर)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">निवडलेला प्लॅन:</label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary font-bold text-primary"
                >
                  <option value="बेसिक बाल्कनी (₹१,४९९)">बेसिक बाल्कनी - ₹१,४९९</option>
                  <option value="प्रिमियम फॅमिली बाल्कनी (₹२,९९९)">प्रिमियम फॅमिली बाल्कनी - ₹२,९९९</option>
                  <option value="टेरेस फार्मिंग महा-सेटअप (₹५,९९९)">टेरेस फार्मिंग महा-सेटअप - ₹५,९९९</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">संपूर्ण पत्ता / सोसायटीचे नाव:</label>
              <input
                type="text"
                required
                placeholder="उदा. फ्लॅट ३०२, निसर्ग हाइट्स, पौड रोड, कोथरूड"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">बाल्कनीचा अंदाजे आकार:</label>
                <select
                  value={spaceType}
                  onChange={(e) => setSpaceType(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                >
                  <option value="लहान बाल्कनी (४०-६० चौ. फूट)">लहान बाल्कनी (४०-६० चौ. फूट)</option>
                  <option value="मध्यम बाल्कनी (६०-१०० चौ. फूट)">मध्यम बाल्कनी (६०-१०० चौ. फूट)</option>
                  <option value="मोठी गच्ची / टेरेस (१००+ चौ. फूट)">मोठी गच्ची / टेरेस (१००+ चौ. फूट)</option>
                  <option value="खिडकीची बाल्कनी / ग्रिल">खिडकीची बाल्कनी / ग्रिल</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">अपेक्षित तारीख (Preferred Date):</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">विशेष सूचना किंवा आवडत्या भाज्या (पर्यायी):</label>
              <textarea
                rows={2}
                placeholder="उदा. आम्हाला पालक, मेथी आणि चेरी टोमॅटो जास्त हवे आहेत."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm py-4 rounded-2xl shadow-lift transition-all"
              >
                <PhoneCall className="w-5 h-5" />
                <span>सौरभ सरांना व्हॉट्सअॅपवर बुकिंग पाठवा (+91 7219184212)</span>
              </button>
              <p className="text-[11px] text-gray-400 text-center mt-2">
                ✓ बुकिंग पूर्णपणे मोफत असून तारीख व वेळ ठरल्यानंतरच प्रत्यक्ष काम सुरू होईल.
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
