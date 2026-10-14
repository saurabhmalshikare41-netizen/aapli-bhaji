"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import bazaarData from "@/data/bazaar.json";
import { 
  ShoppingBag, 
  Plus, 
  MapPin, 
  PhoneCall, 
  Search, 
  Tag, 
  Filter, 
  X, 
  Heart,
  CheckCircle2,
  Clock
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BazaarPost {
  id: string;
  title_mr: string;
  seller_name: string;
  area: string;
  address_landmark: string;
  quantity_mr: string;
  price_mr: string;
  contact_phone: string;
  whatsapp_link: string;
  date: string;
  image_url: string;
  description_mr: string;
  plant_id?: string;
}

export default function HarvestBazaarPage() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BazaarPost[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>("सर्व");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string>("सर्व");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [area, setArea] = useState("कोथरूड");
  const [landmark, setLandmark] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("विनामूल्य / मोफत");
  const [phone, setPhone] = useState("+91 7219184212");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80"
  );

  useEffect(() => {
    const saved = localStorage.getItem("aapli_bhaji_bazaar_posts");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPosts([...parsed, ...bazaarData]);
      } catch (e) {
        setPosts(bazaarData);
      }
    } else {
      setPosts(bazaarData);
    }
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const waLink = `https://wa.me/${cleanPhone || "917219184212"}?text=${encodeURIComponent(
      `नमस्कार ${sellerName}, मी आपली भाजी पोर्टलवरून आपल्या '${title}' बद्दल संपर्क करत आहे.`
    )}`;

    const newPost: BazaarPost = {
      id: "bz-" + Date.now(),
      title_mr: title,
      seller_name: sellerName || "पुणेकर बागप्रेमी",
      area: area,
      address_landmark: landmark || `${area}, पुणे`,
      quantity_mr: quantity || "१ जुडी / १ किग्रॅ",
      price_mr: price || "मोफत",
      contact_phone: phone || "+91 7219184212",
      whatsapp_link: waLink,
      date: "आत्ताच पोस्ट केले",
      image_url: imageUrl,
      description_mr: description || "घरच्या बाल्कनीतील १००% सेंद्रिय व विषमुक्त ताजी भाजी.",
    };

    const updated = [newPost, ...posts];
    setPosts(updated);

    // Save only user posts in localStorage
    const userOnlyPosts = updated.filter((p) => p.id.startsWith("bz-"));
    localStorage.setItem("aapli_bhaji_bazaar_posts", JSON.stringify(userOnlyPosts));

    setIsModalOpen(false);
    setTitle("");
    setQuantity("");
    setDescription("");
  };

  const filteredPosts = posts.filter((p) => {
    const areaMatch = selectedArea === "सर्व" || p.area === selectedArea;
    const priceMatch =
      selectedPriceFilter === "सर्व" ||
      (selectedPriceFilter === "मोफत" && (p.price_mr.includes("मोफत") || p.price_mr.includes("विनामूल्य"))) ||
      (selectedPriceFilter === "सशुल्क" && !p.price_mr.includes("मोफत") && !p.price_mr.includes("विनामूल्य"));
    const searchMatch =
      p.title_mr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.seller_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description_mr.toLowerCase().includes(searchTerm.toLowerCase());
    return areaMatch && priceMatch && searchMatch;
  });

  return (
    <div className="min-h-screen py-10 bg-[#F9FAF7] font-devanagari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold mb-2 border border-amber-300">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>पुणेकर गृह-शेतकऱ्यांचा कम्युनिटी बाजार</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {t("कापणी बाजार (Harvest Bazaar)", "Harvest Bazaar")}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              बाल्कनीत जास्त भाजी पिकली? शेजाऱ्यांना द्या किंवा विका. कोथरूड व हडपसरमधील OLX शैलीतील विषमुक्त भाजी बाजार.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-primary hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lift transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>तुमची जादा भाजी पोस्ट करा</span>
          </button>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-green-100 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="भाजी, व्यक्तीचे नाव किंवा परिसर शोधा..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {/* Area Filter */}
            <div className="md:col-span-3 flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-600 whitespace-nowrap">परिसर:</span>
              <div className="flex gap-1 w-full">
                {["सर्व", "कोथरूड", "हडपसर"].map((a) => (
                  <button
                    key={a}
                    onClick={() => setSelectedArea(a)}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                      selectedArea === a
                        ? "bg-primary text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="md:col-span-3 flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-600 whitespace-nowrap">दर:</span>
              <div className="flex gap-1 w-full">
                {["सर्व", "मोफत", "सशुल्क"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPriceFilter(p)}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                      selectedPriceFilter === p
                        ? "bg-amber-500 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bazaar Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-4xl mb-3">🥬</p>
            <h3 className="text-lg font-bold text-gray-800">या निकषानुसार कोणतीही भाजी आढळली नाही</h3>
            <p className="text-xs text-gray-500 mt-1">कृपया फिल्टर बदलून पहा किंवा तुमची स्वतःची भाजी पोस्ट करा.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl border border-gray-200 hover:border-primary shadow-sm hover:shadow-lift transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src={post.image_url}
                      alt={post.title_mr}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      📍 {post.area}
                    </div>
                    <div
                      className={`absolute top-3 right-3 text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-sm ${
                        post.price_mr.includes("मोफत") || post.price_mr.includes("विनामूल्य")
                          ? "bg-emerald-500 text-white"
                          : "bg-amber-400 text-black"
                      }`}
                    >
                      {post.price_mr}
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 leading-snug mb-1">
                    {post.title_mr}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                    {post.description_mr}
                  </p>

                  <div className="space-y-1.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-2xl mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">👤 उत्पादक:</span>
                      <span className="text-gray-900 font-bold">{post.seller_name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">📦 उपलब्ध प्रमाण:</span>
                      <span className="text-primary font-bold">{post.quantity_mr}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">📍 ठिकाण:</span>
                      <span className="text-gray-700 truncate max-w-[180px]">{post.address_landmark}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-200/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.date}</span>
                      </span>
                      <span className="text-emerald-700 font-medium">✓ १००% सेंद्रिय</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Connect Button */}
                <a
                  href={post.whatsapp_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>विक्रेत्याशी व्हॉट्सअॅपवर बोला</span>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* MODAL: POST VEGGIE */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative font-devanagari max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-gray-900">तुमची जादा भाजी पोस्ट करा</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    शीर्षक (उदा. माझ्याकडे २ जुडी जास्त पालक आहे - कोथरूड):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. २ जुडी ताजी पालक शिल्लक"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">तुमचे नाव:</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. राहुल देशपांडे"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">परिसर:</label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                    >
                      <option value="कोथरूड">कोथरूड</option>
                      <option value="हडपसर">हडपसर</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">प्रमाण (Quantity):</label>
                    <input
                      type="text"
                      placeholder="उदा. २ जुडी / १ किलो"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">किंमत (किंवा मोफत):</label>
                    <input
                      type="text"
                      placeholder="उदा. विनामूल्य / ₹२० प्रति जुडी"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">व्हॉट्सअॅप नंबर:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">ठिकाण / लँडमार्क:</label>
                  <input
                    type="text"
                    placeholder="उदा. पौड रोड, मेट्रो स्टेशन जवळ"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">भाजीविषयी सविस्तर माहिती:</label>
                  <textarea
                    rows={2}
                    placeholder="उदा. घरच्या बाल्कनीत सेंद्रिय पद्धतीने पिकवलेली आहे. आज संध्याकाळी घेऊन जावे."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="pt-3 flex gap-3">
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
                    बाजारात पोस्ट करा
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
