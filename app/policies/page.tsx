'use client';

import Link from 'next/link';
import Head from 'next/head';
import { FcRules } from "react-icons/fc";
import { MdPayment, MdPrivacyTip } from 'react-icons/md';
import { HiOutlineReceiptRefund } from 'react-icons/hi2';
import { FaShippingFast } from 'react-icons/fa';

export default function Page() {
  return (
    <main className="px-6 section1  max-w-4xl mx-auto">
      <Head>
        <title>Glow Niba | নীতিমালাসমূহ</title>
        <meta name="description" content="Glow Niba-র সকল নীতিমালাসমূহ এক জায়গায় দেখুন। রিটার্ন, রিফান্ড, পেমেন্ট, শিপিং, ডিসক্লেইমার, প্রাইভেসি এবং আরও অনেক কিছু।" />
      </Head>

      <h1 className="text-3xl flex items-center gap-1 font-bold mb-8"><FcRules/> আমাদের নীতিমালাসমূহ</h1>
      <p className="text-gray-700 mb-6">
        আমাদের ক্রেতাদের সর্বোচ্চ নিরাপত্তা এবং স্বচ্ছতা নিশ্চিত করতে, Glow Niba নিম্নলিখিত নীতিমালা প্রণয়ন করেছে। আপনি এখানে আমাদের সমস্ত নীতিমালাসমূহের বিস্তারিত জানতে পারবেন।
      </p>

      <ul className="space-y-4 text-lg">
        <li>
          <Link  target='_blank' href="/policies/privacy-policy" className="text-gray-600 flex items-center gap-1  hover:underline">
            <MdPrivacyTip className='text-green-500'/> প্রাইভেসি নীতি (Privacy Policy)
          </Link>
        </li>
        <li>
          <Link  target='_blank' href="/policies/return-policy" className="text-gray-600 flex items-center gap-1 hover:underline">
            <HiOutlineReceiptRefund /> রিটার্ন ও রিফান্ড নীতি (Return & Refund Policy)
          </Link>
        </li>
        <li>
          <Link  target='_blank' href="/policies/terms-conditions" className="text-gray-600 hover:underline">
            📑 শর্তাবলী ও নীতিমালা (Terms & Conditions)
          </Link>
        </li>
        <li>
          <Link  target='_blank' href="/policies/payment-policy" className="text-gray-600 flex items-center gap-1 hover:underline">
            <MdPayment/> পেমেন্ট নীতি (Payment Policy)
          </Link>
        </li>
        <li>
          <Link  target='_blank' href="/policies/shipping-policy" className="text-gray-600 flex items-center gap-1 hover:underline">
            <FaShippingFast/> শিপিং ও ডেলিভারি নীতি (Shipping & Delivery Policy)
          </Link>
        </li>
        <li>
          <Link  target='_blank' href="/policies/disclaimer" className="text-gray-600 hover:underline">
            ⚠️ দায় পরিত্যাগ (Disclaimer)
          </Link>
        </li>
      </ul>
    </main>
  );
}
