"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "8801797575932"; // তোমার ফোন নাম্বার
  const preFilledMessage = "Hi, I want to buy from Glow Niba!"; // মেসেজ পাঠাতে চাইলে

  const [device, setDevice] = useState<"windows" | "mac" | "android" | "ios" | "unknown">("unknown");

  useEffect(() => {
    const detectDevice = () => {
      const agentname = window.navigator.userAgent.toLowerCase();
      if (agentname.includes("windows")) return "windows";
      if (agentname.includes("iphone")) return "ios";
      if (agentname.includes("mac")) return "mac";
      if (agentname.includes("android")) return "android";
      return "unknown";
    };
    setDevice(detectDevice());
  }, []);

  const getWhatsAppLink = () => {
    if (device === "windows" || device === "mac") {
      return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(preFilledMessage)}`;
    } else if (device === "android" || device === "ios") {
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(preFilledMessage)}`;
    } else {
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(preFilledMessage)}`;
    }
  };

  // Device detect না হওয়া পর্যন্ত কিছু রেন্ডার করবো না
  if (device === "unknown") return null;

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
      className="fixed font-normal bottom-8 z-50 right-5 flex items-center justify-center gap-1 py-1 px-3 bg-gray-800/80 text-white rounded-lg text-2xl shadow-2xl shadow-gray-100 hover:bg-emerald-700/80 transition-all duration-300"
    >
      <span className="text-xl"><FaWhatsapp /></span> 
      <span className="font-medium text-lg "> Chat</span>
    </motion.a>
  );
};

export default WhatsAppButton;
