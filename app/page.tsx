import React from "react";
import Link from "next/link";
import Image from "next/image";
import plantsData from "@/data/plants.json";
import vendorsData from "@/data/vendors.json";
import calendarData from "@/data/calendar.json";
import bazaarData from "@/data/bazaar.json";
import WeatherWidget from "@/components/WeatherWidget";
import { 
  Scan, 
  Stethoscope, 
  Sprout, 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  ShoppingBag, 
  Sparkles, 
  PhoneCall, 
  Clock, 
  Sun, 
  CheckCircle2, 
  HeartHandshake,
  Users
} from "lucide-react";

export default function HomePage() {
  const popularPlants = plantsData.slice(0, 8);
  const currentMonth = calendarData[9]; // October as default or current
  const recentBazaar = bazaarData.slice(0, 3);
  const kothrudVendors = vendorsData.filter(v => v.area === "कोथरूड").slice(0, 3);
  const hadapsarVendors = vendorsData.filter(v => v.area === "हडपसर").slice(0, 3);

  return (
    <div className="font-devanagari">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-[#F1F8E9] to-[#FDFAF3] pt-12 pb-20 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>पुणेकरांसाठी पहिली AI तंत्रज्ञानयुक्त घरगुती बाग प्रणाली</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.2]">
                घरासमोरील मोकळ्या जागेत <span className="text-primary underline decoration-amber-400 decoration-wavy">काय लावावं?</span> फोटो काढा, <span className="bg-gradient-to-r from-leaf to-emerald-700 bg-clip-text text-transparent">AI सांगेल!</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-700 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                बाल्कनी असो वा गच्ची, आता स्वतःच्या हाताने पिकवा १००% सेंद्रिय व विषमुक्त भाजी. कोथरूड आणि हडपसरमधील शेकडो घरांमध्ये हिरवी क्रांती!
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/ai-scanner"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-primary hover:bg-emerald-700 text-white font-bold text-base px-7 py-4 rounded-2xl shadow-lift hover:scale-105 active:scale-95 transition-all"
                >
                  <Scan className="w-5 h-5" />
                  <span>AI स्कॅनर वापरून पहा</span>
                </Link>

                <Link
                  href="/rog-doctor"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-amber-50 text-emerald-900 border-2 border-emerald-600 font-bold text-base px-7 py-4 rounded-2xl shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  <Stethoscope className="w-5 h-5 text-emerald-600" />
                  <span>झाडाचा रोग ओळखा (Rog Doctor)</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-green-200/60 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-xs font-semibold text-gray-700">१००% विषमुक्त मार्गदर्शन</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-xs font-semibold text-gray-700">कोथरूड व हडपसर सेवा</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-xs font-semibold text-gray-700">२४x७ व्हॉट्सअॅप सपोर्ट</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visuals */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <div className="relative h-72 sm:h-80 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
                    alt="आपली भाजी - बाल्कनी बाग"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white">
                      <span className="bg-amber-400 text-black text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">
                        कोथरूड येथील बाल्कनी
                      </span>
                      <h3 className="text-lg font-bold mt-1.5">घरच्या कुंडीत आलेली ताजी पालक व मिरची</h3>
                    </div>
                  </div>
                </div>

                {/* Sub banner on card */}
                <div className="p-5 bg-gradient-to-r from-emerald-50 to-green-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                      ३०+
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">स्थानिक वनस्पती माहिती</p>
                      <p className="text-sm font-bold text-gray-900">सर्वोत्तम जाती व रोपे</p>
                    </div>
                  </div>
                  <Link href="/vanaspati" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    <span>सर्व पहा</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THREE EASY STEPS */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">सोपी ३ पायरी पद्धत</h2>
            <p className="text-3xl font-extrabold text-gray-900">घरी भाजी पिकवणे आता झाले अत्यंत सोपे</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-[#FDFAF3] rounded-3xl p-8 border border-green-100 shadow-sm relative group hover:border-primary transition-all">
              <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-extrabold text-xl mb-6 shadow-md shadow-green-700/20">
                १
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">जागा स्कॅन करा / रोप निवडा</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                तुमच्या बाल्कनीचा किंवा खिडकीचा फोटो टाका. आमचे AI इंजिन किती ऊन पडते ते ओळखून ५ योग्य वनस्पतींची शिफारस करेल.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FDFAF3] rounded-3xl p-8 border border-green-100 shadow-sm relative group hover:border-primary transition-all">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-extrabold text-xl mb-6 shadow-md shadow-amber-500/20">
                २
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">जवळून साहित्य मिळवा</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                कोथरूड आणि हडपसरमधील १२ अधिकृत दुकानांमधून बियाणे, कुंडी, गांडूळखत आणि माती मिळवा किंवा घरपोच किट मागवा.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FDFAF3] rounded-3xl p-8 border border-green-100 shadow-sm relative group hover:border-primary transition-all">
              <div className="w-14 h-14 rounded-2xl bg-leaf text-white flex items-center justify-center font-extrabold text-xl mb-6 shadow-md shadow-leaf/20">
                ३
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">विषमुक्त भाजीची कापणी करा</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                आमच्या डायरीमध्ये झाडाची प्रगती नोंदवा. वेळेवर खत-पाण्याचे स्मरणपत्र मिळवा आणि ३० ते ६० दिवसांत स्वतःच्या भाजीचा आस्वाद घ्या!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES EXPLORER */}
      <section className="py-16 bg-[#F9FAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">वनस्पती प्रकार</h2>
              <p className="text-3xl font-extrabold text-gray-900">तुमच्या आवडीनुसार भाजी निवडा</p>
            </div>
            <Link
              href="/vanaspati"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-emerald-700 bg-white px-4 py-2 rounded-xl border border-green-200 shadow-sm"
            >
              <span>सर्व ३०+ वनस्पती पहा</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/vanaspati?category=भाजीपाला"
              className="group bg-white rounded-3xl p-6 border border-gray-200 hover:border-primary shadow-sm hover:shadow-lift transition-all flex items-center gap-5"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-100 text-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                🍅
              </div>
              <div>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">१४ प्रकार</span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">भाजीपाला पिके</h3>
                <p className="text-xs text-gray-500">मिरची, टोमॅटो, वांगी, भेंडी, कारले</p>
              </div>
            </Link>

            <Link
              href="/vanaspati?category=पालेभाजी"
              className="group bg-white rounded-3xl p-6 border border-gray-200 hover:border-primary shadow-sm hover:shadow-lift transition-all flex items-center gap-5"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                🥬
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">७ प्रकार</span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">पालेभाज्या</h3>
                <p className="text-xs text-gray-500">पालक, मेथी, कोथिंबीर, शेपू, लाल माठ</p>
              </div>
            </Link>

            <Link
              href="/vanaspati?category=आयुर्वेदिक"
              className="group bg-white rounded-3xl p-6 border border-gray-200 hover:border-primary shadow-sm hover:shadow-lift transition-all flex items-center gap-5"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                🌿
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">१२ प्रकार</span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">आयुर्वेदिक वनस्पती</h3>
                <p className="text-xs text-gray-500">तुळस (३ प्रकार), पुदिना, कोरफड, गवती चहा</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. POPULAR PLANTS GRID (8 Cards) */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">लोकप्रिय वनस्पती</h2>
            <p className="text-3xl font-extrabold text-gray-900">पुण्यातील बाल्कनीत हमखास बहरणारी झाडे</p>
            <p className="text-sm text-gray-600 mt-2">कमी जागेत आणि पुणे हवामानात उत्कृष्ट उत्पादन देणाऱ्या वनस्पती</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPlants.map((plant) => (
              <div
                key={plant.id}
                className="group bg-white rounded-3xl border border-gray-200 hover:border-primary shadow-sm hover:shadow-lift overflow-hidden transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
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
                      <h3 className="text-xl font-bold text-gray-900">{plant.name_mr}</h3>
                      <span className="text-xs text-gray-500 font-sans italic">{plant.name_en}</span>
                    </div>
                    <p className="text-xs text-leaf font-medium mb-3">{plant.scientific_name}</p>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                      {plant.full_info_mr}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-gray-500 bg-gray-50 p-2 rounded-xl">
                      <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{plant.sunlight_needed}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/vanaspati/${plant.id}`}
                    className="w-full flex items-center justify-center gap-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-xs py-2.5 rounded-xl transition-all"
                  >
                    <span>माहिती व साहित्य पहा</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/vanaspati"
              className="inline-flex items-center gap-2 bg-primary hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md transition-all"
            >
              <span>सर्व ३०+ वनस्पती माहितीकोश उघडा</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WEATHER & SOWING CALENDAR TEASER */}
      <section className="py-16 bg-[#FDFAF3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Live Weather Widget */}
            <div className="lg:col-span-5">
              <WeatherWidget />
            </div>

            {/* Calendar Teaser */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-green-200 shadow-lift">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                <Calendar className="w-4 h-4" />
                <span>पुणे पेरणी मार्गदर्शक - चालू महिना</span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-2xl font-extrabold text-gray-900">
                  {currentMonth.month_name_mr} महिन्यात काय पेरावे?
                </h3>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                  {currentMonth.season_mr}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {currentMonth.weather_note_mr}
              </p>

              <div className="mt-5">
                <p className="text-xs font-bold text-gray-700 mb-2.5">🌱 या महिन्यात लावण्यासाठी उत्तम पिके:</p>
                <div className="flex flex-wrap gap-2">
                  {currentMonth.suitable_plants_mr.map((plantName, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200"
                    >
                      {plantName}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
                💡 <strong>तज्ज्ञ सल्ला:</strong> {currentMonth.pro_tips_mr}
              </div>

              <div className="mt-6 flex justify-end">
                <Link
                  href="/calendar"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-emerald-700"
                >
                  <span>संपूर्ण १२ महिन्यांचे कॅलेंडर पहा</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. BAZAAR TEASER: "आजच्या ताज्या कापण्या" */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                <ShoppingBag className="w-4 h-4" />
                <span>कापणी बाजार (Harvest Bazaar)</span>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900">आजच्या ताज्या कापण्या - कोथरूड & हडपसर</h2>
              <p className="text-xs text-gray-500 mt-1">शहरातील गृहबागप्रेमींनी पिकवलेली जादा ताजी भाजी थेट मिळवा</p>
            </div>

            <Link
              href="/bazaar"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-emerald-700 bg-green-50 px-4 py-2.5 rounded-xl border border-green-200"
            >
              <span>सर्व बाजारातील याद्या पहा</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBazaar.map((post) => (
              <div
                key={post.id}
                className="bg-[#FDFAF3] rounded-3xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={post.image_url}
                      alt={post.title_mr}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      📍 {post.area}
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-amber-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {post.price_mr}
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-gray-900 mb-1 leading-snug">{post.title_mr}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">{post.description_mr}</p>
                  
                  <div className="flex items-center justify-between text-[11px] text-gray-500 pb-3 border-b border-gray-200">
                    <span>👤 {post.seller_name}</span>
                    <span>📦 {post.quantity_mr}</span>
                  </div>
                </div>

                <div className="pt-3">
                  <a
                    href={post.whatsapp_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs py-2.5 rounded-xl transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>विक्रेत्याशी व्हॉट्सअॅपवर संपर्क</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VENDORS MAP TEASER */}
      <section className="py-16 bg-[#F9FAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">स्थानिक खरेदी केंद्रे</h2>
            <p className="text-3xl font-extrabold text-gray-900">कोथरूड & हडपसर मधील १२ अधिकृत दुकाने</p>
            <p className="text-xs text-gray-500 mt-1">शारदा ग्रीन नर्सरी प्रमाणित उच्च दर्जाचे सेंद्रिय बियाणे, खत, लाल माती व कुंड्या</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Kothrud Box */}
            <div className="bg-white rounded-3xl p-6 border border-green-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <h3 className="text-lg font-bold text-gray-900">कोथरूड विभाग (Kothrud)</h3>
                </div>
                <span className="text-xs bg-green-100 text-green-800 font-bold px-2.5 py-1 rounded-full">
                  ६ दुकाने
                </span>
              </div>
              <div className="space-y-3">
                {kothrudVendors.map((v) => (
                  <div key={v.id} className="p-3 bg-gray-50 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900">{v.shop_name}</p>
                      <p className="text-[11px] text-gray-500">📍 {v.address.slice(0, 45)}...</p>
                    </div>
                    <a
                      href={v.whatsapp_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shrink-0"
                    >
                      संपर्क
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Hadapsar Box */}
            <div className="bg-white rounded-3xl p-6 border border-orange-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#D84315]" />
                  <h3 className="text-lg font-bold text-gray-900">हडपसर विभाग (Hadapsar)</h3>
                </div>
                <span className="text-xs bg-orange-100 text-orange-800 font-bold px-2.5 py-1 rounded-full">
                  ६ दुकाने
                </span>
              </div>
              <div className="space-y-3">
                {hadapsarVendors.map((v) => (
                  <div key={v.id} className="p-3 bg-gray-50 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900">{v.shop_name}</p>
                      <p className="text-[11px] text-gray-500">📍 {v.address.slice(0, 45)}...</p>
                    </div>
                    <a
                      href={v.whatsapp_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#D84315] hover:bg-orange-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shrink-0"
                    >
                      संपर्क
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/dokan"
              className="inline-flex items-center gap-2 bg-primary hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lift transition-all"
            >
              <MapPin className="w-4 h-4" />
              <span>थेट नकाशा (Interactive Leaflet Map) उघडा</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. KITS & SETUP SERVICE TEASER */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Seed Box Kit */}
            <div className="rounded-3xl bg-gradient-to-br from-green-50 to-emerald-100/60 p-8 border border-green-200 flex flex-col justify-between">
              <div>
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  विशेष ऑफर
                </span>
                <h3 className="text-2xl font-extrabold text-gray-900 mt-3 mb-2">मासिक बीज बॉक्स (Monthly Seed Box)</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  ५ ऋतूनुसार भाजीपाल्याचे बी + गांडूळखत + कोकोपीट डिस्क + मराठी मार्गदर्शक पुस्तिका थेट तुमच्या दारात.
                </p>
                <div className="text-3xl font-extrabold text-primary mb-6">
                  ₹२९९ <span className="text-xs text-gray-500 font-normal line-through">₹४९९</span>
                </div>
              </div>
              <Link
                href="/kits"
                className="flex items-center justify-center gap-2 bg-primary hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-2xl transition-all"
              >
                <span>बीज बॉक्स ऑर्डर करा</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Balcony Setup Service */}
            <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-orange-100/60 p-8 border border-amber-200 flex flex-col justify-between">
              <div>
                <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  होम व्हिजिट सेवा
                </span>
                <h3 className="text-2xl font-extrabold text-gray-900 mt-3 mb-2">बाल्कनी टू बास्केट सेटअप सर्व्हिस</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  सौरभ सर आणि शारदा ग्रीन नर्सरीचे तज्ज्ञ तुमच्या घरी येऊन बाल्कनीत कुंड्या, माती आणि रोपे लावून देतील.
                </p>
                <div className="text-3xl font-extrabold text-amber-700 mb-6">
                  ₹१,४९९ <span className="text-xs text-gray-600 font-normal">पासून सुरू</span>
                </div>
              </div>
              <Link
                href="/setup-service"
                className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm py-3.5 rounded-2xl transition-all"
              >
                <span>सेटअप अपॉइंटमेंट बुक करा</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS & TRUST */}
      <section className="py-16 bg-[#FDFAF3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">पुणेकरांचे अनुभव</h2>
            <p className="text-3xl font-extrabold text-gray-900">आमच्या आनंदी बागप्रेमींचे विचार</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {"★★★★★"}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed italic mb-4">
                &ldquo;कोथरूडमधील आमच्या फ्लॅटच्या बाल्कनीत टोमॅटो आणि मिरचीचे अप्रतिम पीक आले. सौरभ सरांच्या निंबोळी अर्क टिप्समुळे कीड लगेच गेली!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                  अनघा
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">अनघा पटवर्धन</p>
                  <p className="text-[10px] text-gray-500">पौड रोड, कोथरूड</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {"★★★★★"}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed italic mb-4">
                &ldquo;AI स्कॅनरने माझ्या बाल्कनीचा फोटो पाहून पालक व मेथी सुचवली. बरोबर २५ दिवसांत घरात ताजी मेथी कापली. बाजारातील भाजीपेक्षा १०० पट गोड आहे!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                  रोहित
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">रोहित शिंदे</p>
                  <p className="text-[10px] text-gray-500">मगरपट्टा, हडपसर</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {"★★★★★"}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed italic mb-4">
                &ldquo;शारदा ग्रीन नर्सरीची बाल्कनी टू बास्केट सर्व्हिस घेतली. संपूर्ण बाल्कनी हिरवीगार केली आणि रोगांवर व्हॉट्सअॅपवर लगेच मार्गदर्शन मिळते.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                  सचिन
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">सचिन कुलकर्णी</p>
                  <p className="text-[10px] text-gray-500">आयडियल कॉलनी, कोथरूड</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
