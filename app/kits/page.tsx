"use client";

import React from "react";
import Image from "next/image";
import { Package, Check, PhoneCall, Sparkles, ShieldCheck, ArrowRight, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function KitsPage() {
  const { t } = useLanguage();

  const kits = [
    {
      id: "monthly-seed-box",
      name_mr: "मासिक बीज बॉक्स (Monthly Seed Box)",
      price: 299,
      originalPrice: 499,
      badge: "सर्वाधिक लोकप्रिय",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6910a455?auto=format&fit=crop&w=600&q=80",
      description_mr: "दर महिन्याच्या हवामानानुसार ५ ऋतूनुसार भाज्यांचे शुद्ध बियाणे, पोषक गांडूळखत आणि मराठी मार्गदर्शिका थेट तुमच्या दारात.",
      features: [
        "५ प्रकारची शुद्ध देशी बियाणे पॅकेट्स (पालक, मेथी, कोथिंबीर, मिरची, टोमॅटो)",
        "१ किलो उच्च दर्जाचे गांडूळखत (Vermicompost)",
        "२ कोकोपीट डिस्क (पाण्याचा निचरा होण्यासाठी)",
        "शारदा ग्रीन नर्सरीची सविस्तर मराठी लागवड मार्गदर्शिका",
        "कोथरूड व हडपसरमध्ये घरपोच मोफत डिलिव्हरी"
      ],
      whatsappMsg: "मला 'मासिक बीज बॉक्स - ₹299' ऑर्डर करायचा आहे. कृपया पत्ता व पेमेन्ट तपशील पाठवावा."
    },
    {
      id: "kitchen-starter-kit",
      name_mr: "किचन गार्डन स्टार्टर किट (Full Starter Kit)",
      price: 599,
      originalPrice: 899,
      badge: "नवशिक्यांसाठी सर्वोत्तम",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
      description_mr: "नवीन सुरुवात करणाऱ्यांसाठी परिपूर्ण किट. कुंडी, माती, बियाणे आणि खत सर्व काही एकाच बॉक्समध्ये!",
      features: [
        "३ प्रीमियम कापडी ग्रो बॅग्स (Grow Bags - १२x१२ इंच)",
        "५ किलो पोषक सेंद्रिय पॉटिंग मिक्स (तयार माती)",
        "४ प्रकारची सुलभ बियाणे (पालक, मिरची, मुळा, मेथी)",
        "१ हँड स्प्रे वॉटर बॉटल (पाणी शिंपडण्यासाठी)",
        "सौरभ सरांचे मोफत फोन मार्गदर्शन"
      ],
      whatsappMsg: "मला 'किचन गार्डन स्टार्टर किट - ₹599' ऑर्डर करायचा आहे. डिलिव्हरी कधी मिळेल?"
    },
    {
      id: "ayurvedic-combo",
      name_mr: "आयुर्वेदिक आरोग्य कॉम्बो (Medicinal Live Kit)",
      price: 449,
      originalPrice: 650,
      badge: "आरोग्य संजीवनी",
      image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=600&q=80",
      description_mr: "घरातील हवा शुद्ध ठेवणारी आणि प्रतिकारशक्ती वाढवणारी ४ जिवंत औषधी रोपे सुंदर कुंड्यांसह.",
      features: [
        "राम तुळस किंवा कृष्ण तुळस जिवंत सशक्त रोप",
        "सुवासिक गवती चहा (लेमनग्रास) रोप",
        "रसाळ देशी कोरफड (Aloe Vera) रोप",
        "थंडगार पुदिना (Mint) रोप",
        "४ टिकाऊ कुंड्या आणि सेंद्रिय खत"
      ],
      whatsappMsg: "मला 'आयुर्वेदिक आरोग्य कॉम्बो - ₹449' ऑर्डर करायचा आहे."
    },
    {
      id: "terrace-mega-kit",
      name_mr: "गच्ची भाजीपाला महा-किट (Terrace Mega Kit)",
      price: 1199,
      originalPrice: 1799,
      badge: "मोठ्या बागेसाठी",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
      description_mr: "गच्चीवर किंवा मोठ्या बाल्कनीत संपूर्ण कुटुंबासाठी रोजची भाजी पिकवण्यासाठी परिपूर्ण कॉम्बो पॅक.",
      features: [
        "६ मोठ्या १५x१५ इंची हेवी-ड्युटी ग्रो बॅग्स",
        "१० प्रकारची बियाणे (फळभाज्या + पालेभाज्या + वेलवर्गीय)",
        "१५ किलो समृद्ध गांडूळखत व नीम पेंड मिक्स",
        "१ लिटर शुद्ध कोल्ड-प्रेस्ड नीम ऑइल कीटकनाशक",
        "३ जी कटिंग व वेल मांडव सपोर्ट किट"
      ],
      whatsappMsg: "मला 'गच्ची भाजीपाला महा-किट - ₹1199' बद्दल माहिती हवी आहे."
    }
  ];

  return (
    <div className="min-h-screen py-10 bg-[#F9FAF7] font-devanagari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-primary px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-emerald-200">
            <Package className="w-3.5 h-3.5" />
            <span>शारदा ग्रीन नर्सरी प्रमाणित किट्स</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t("घरपोच बागकाम किट्स (Home Gardening Kits)", "Home Gardening Kits")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            बाहेर फिरण्याची गरज नाही! अस्सल बियाणे, सुपीक माती आणि सेंद्रिय खताचे परिपूर्ण बॉक्स थेट तुमच्या घरी मागवा. कोथरूड व हडपसरमध्ये जलद डिलिव्हरी.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-4 bg-white rounded-2xl border border-green-200 flex items-center gap-3 shadow-sm">
            <Truck className="w-6 h-6 text-primary shrink-0" />
            <div>
              <p className="font-bold text-xs text-gray-900">हायपरलोकल मोफत डिलिव्हरी</p>
              <p className="text-[11px] text-gray-500">कोथरूड आणि हडपसर परिसरात २४ तासांत</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-green-200 flex items-center gap-3 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
            <div>
              <p className="font-bold text-xs text-gray-900">१००% रुजण्याची हमी</p>
              <p className="text-[11px] text-gray-500">प्रयोगशाळा व नर्सरी प्रमाणित ताजी बियाणे</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-green-200 flex items-center gap-3 shadow-sm">
            <Sparkles className="w-6 h-6 text-primary shrink-0" />
            <div>
              <p className="font-bold text-xs text-gray-900">सौरभ सरांचे थेट मार्गदर्शन</p>
              <p className="text-[11px] text-gray-500">व्हॉट्सअॅपवर दर आठवड्याला मोफत टिप्स</p>
            </div>
          </div>
        </div>

        {/* Kits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {kits.map((kit) => (
            <div
              key={kit.id}
              className="bg-white rounded-3xl border border-gray-200 hover:border-primary shadow-sm hover:shadow-lift transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={kit.image}
                    alt={kit.name_mr}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-amber-400 text-black text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                    {kit.badge}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-2xl font-extrabold text-gray-900">
                      {kit.name_mr}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-black text-primary">₹{kit.price}</span>
                    <span className="text-sm text-gray-400 line-through">₹{kit.originalPrice}</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      बचत ₹{kit.originalPrice - kit.price}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                    {kit.description_mr}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">किटमध्ये काय समाविष्ट आहे?</p>
                    {kit.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase via WhatsApp button */}
              <div className="p-6 sm:p-8 pt-0">
                <a
                  href={`https://wa.me/917219184212?text=${encodeURIComponent(kit.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm py-4 rounded-2xl shadow-lift transition-all"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>व्हॉट्सअॅपवर ऑर्डर करा (Buy via WhatsApp)</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
