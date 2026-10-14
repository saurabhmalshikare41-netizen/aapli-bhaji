import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "आपली भाजी - आपण पिकवा | घरच्या घरी विषमुक्त भाजी",
  description:
    "शारदा ग्रीन नर्सरी, पुणे यांचा पुढाकार. कोथरूड आणि हडपसर भागातील नागरिकांसाठी घरच्या बाल्कनीत १००% सेंद्रिय व विषमुक्त भाजीपाला पिकवण्याचे संपूर्ण व्यासपीठ. AI जागा स्कॅनर आणि वनस्पती डॉक्टर.",
  keywords: [
    "आपली भाजी",
    "Aapli Bhaji",
    "Shardha Green Nursery",
    "Saurabh Malshikare",
    "Pune Balcony Garden",
    "Kothrud Gardening",
    "Hadapsar Nursery",
    "विषमुक्त भाजी",
    "Organic Terrace Gardening Pune"
  ],
  authors: [{ name: "Saurabh Malshikare (Shardha Green Nursery)" }],
  openGraph: {
    title: "आपली भाजी - आपण पिकवा | घरच्या घरी विषमुक्त भाजी",
    description: "पुणेकरांसाठी घरच्या घरी १००% सेंद्रिय व ताजी भाजी पिकवण्याचे पहिले व्यासपीठ.",
    url: "https://aaplibhaji.com",
    siteName: "आपली भाजी",
    locale: "mr_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FDFAF3] text-gray-900 antialiased font-devanagari">
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
