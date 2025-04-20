"use client";

import { motion } from "framer-motion";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "8801797575932"; // তোমার ফোন নাম্বার
  const preFilledMessage = "Hi, I want to buy from Glow Niba!"; // মেসেজ পাঠাতে চাইলে

  const detectDevice = () => {
    if (typeof window !== "undefined") {
      const platform = window.navigator.platform.toLowerCase();
      const userAgent = window.navigator.userAgent.toLowerCase();

      if (platform.includes("win")) return "Windows";
      if (platform.includes("mac")) return "Mac";
      if (userAgent.includes("android")) return "Android";
      if (/iphone|ipad|ipod/.test(userAgent)) return "iOS";

      return "Unknown";
    }
    return "Unknown";
  };

  const device = detectDevice();

  const getWhatsAppLink = () => {
    if (device === "Windows" || device === "Mac") {
      // Desktop Devices
      return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(preFilledMessage)}`;
    } else if (device === "Android" || device === "iOS") {
      // Mobile Devices
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(preFilledMessage)}`;
    } else {
      // Fallback
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(preFilledMessage)}`;
    }
  };

  const whatsappLink = getWhatsAppLink();

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 1.5,
        ease: "easeInOut",
      }}
      className="fixed font-normal bottom-8 z-50 right-5 flex items-center justify-center gap-1 py-1 px-3 bg-gray-800/80 text-white rounded-lg  text-2xl shadow-2xl shadow-gray-100 hover:bg-emerald-800/80 transition-all duration-300"
    >
      <span className="text-xl"><FaWhatsapp/></span> <span className="font-semibold text-lg">Chat with us</span>
    </motion.a>
  );
};

export default WhatsAppButton;
