// pages/policies/ShippingPolicy.tsx
'use client';
import { contactInfo } from '@/constants';
import Head from 'next/head';
import { FiPhone } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { FaShippingFast } from "react-icons/fa";

export default function Page() {
  return (
    <main className="px-6 section1 max-w-4xl mx-auto">
      <Head>
        <title>Glow Niba | শিপিং ও ডেলিভারি নীতি</title>
        <meta name="description" content="Glow Niba-তে পণ্য শিপিং এবং ডেলিভারি সম্পর্কিত নীতি ও নির্দেশিকা জানুন।" />
      </Head>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2"><FaShippingFast className='text-7xl md:text-4xl' /> শিপিং ও ডেলিভারি নীতি (Shipping & Delivery Policy)</h1>
      <section className="text-gray-700 leading-relaxed space-y-6">
        <p>
          Glow Niba আপনার পণ্য দ্রুত এবং নিরাপদভাবে পৌঁছানোর জন্য প্রতিশ্রুতিবদ্ধ। আমাদের শিপিং এবং ডেলিভারি প্রক্রিয়া নিশ্চিত করে যে, আপনি সর্বোচ্চ সন্তুষ্টি পেতে পারেন। নিচে আমাদের শিপিং ও ডেলিভারি নীতির বিস্তারিত তথ্য দেওয়া হলো:
        </p>

        <h2 className="text-2xl font-semibold">১. শিপিং এলাকা</h2>
        <p>
          আমরা বাংলাদেশের সকল অঞ্চলে শিপিং পরিষেবা প্রদান করি। আন্তর্জাতিক শিপিং সেবা বর্তমানে উপলব্ধ নয়, তবে আমরা ভবিষ্যতে এই সেবা চালু করার পরিকল্পনা করছি।
        </p>

        <h2 className="text-2xl font-semibold">২. শিপিং সময়সীমা</h2>
        <p>
          আপনার অর্ডার পেমেন্ট সম্পন্ন হওয়ার পর, আমরা তা প্রক্রিয়া শুরু করি এবং সাধারণত ৩-৭ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়। বিশেষ অফার বা বিশাল অর্ডারের ক্ষেত্রে সময়সীমা কিছুটা বাড়তে পারে।
        </p>

        <h2 className="text-2xl font-semibold">৩. শিপিং চার্জ</h2>
        <p>
          শিপিং চার্জ আপনার অর্ডারের পরিমাণ এবং ডেলিভারি অবস্থান অনুসারে ভিন্ন হতে পারে। আপনি চেকআউট করার সময় সঠিক শিপিং চার্জ জানতে পারবেন। কিছু বিশেষ অফারে শিপিং চার্জ ফ্রি হতে পারে।
        </p>

        <h2 className="text-2xl font-semibold">৪. ডেলিভারি পদ্ধতি</h2>
        <p>
          আমরা আমাদের পণ্যগুলির ডেলিভারি দেশের শীর্ষস্থানীয় কুরিয়ার সার্ভিসের মাধ্যমে পরিচালনা করি, যেমন:
          <ul className="list-disc pl-6">
            <li>নেক্সট কুরিয়ার</li>
            <li>জিটিএক্স কুরিয়ার</li>
            <li>সাধারণ কুরিয়ার সার্ভিস</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold">৫. ডেলিভারি ট্র্যাকিং</h2>
        <p>
          আপনার অর্ডার প্রক্রিয়া শুরু হওয়ার পরে, আপনি একটি ট্র্যাকিং নম্বর পাবেন যা দিয়ে আপনি আপনার পণ্যের অবস্থা জানতে পারবেন। এটি আমাদের কুরিয়ার সার্ভিসের মাধ্যমে প্রদান করা হবে।
        </p>

        <h2 className="text-2xl font-semibold">৬. ডেলিভারি বিলম্ব</h2>
        <p>
          কিছু বিশেষ পরিস্থিতিতে যেমন আবহাওয়া, পরিবহন সমস্যা বা অনিবার্য কারণে ডেলিভারি বিলম্ব হতে পারে। আমরা সবসময় এই ধরনের সমস্যাগুলির জন্য আগাম জানিয়ে দেবো এবং যত দ্রুত সম্ভব সমস্যা সমাধান করার চেষ্টা করব।
        </p>

        <h2 className="text-2xl font-semibold">৭. অর্ডার গ্রহণের পরবর্তী প্রক্রিয়া</h2>
        <p>
          পণ্য গ্রহণের পরে, দয়া করে নিশ্চিত করুন যে এটি ক্ষতিগ্রস্ত বা ভুল নয়। যদি পণ্যটি কোনো কারণে ক্ষতিগ্রস্ত হয়, তবে রিটার্ন বা এক্সচেঞ্জের জন্য আমাদের সাথে যোগাযোগ করুন।
        </p>

        <h2 className="text-2xl font-semibold">৮. ডেলিভারি সংক্রান্ত সমস্যা</h2>
        <p>
          যদি আপনার পণ্য ডেলিভারি সংক্রান্ত কোনো সমস্যা থাকে, তাহলে দয়া করে আমাদের সাথে যোগাযোগ করুন:
        </p>
        <div className=' leading-8'>
            <p className='flex items-center gap-1'><MdOutlineEmail/> ইমেইল: {contactInfo.supprtyEmail}</p>
            <p className='flex items-center gap-1'><FiPhone/> ফোন: {contactInfo.supprtyPhone}</p>
          </div>

        <h2 className="text-2xl font-semibold">৯. পণ্য গ্রহণের পর সেবা</h2>
        <p>
          পণ্য গ্রহণের পর যদি আপনি কোনো পণ্য বা সেবা নিয়ে অসন্তুষ্ট হন, তাহলে আমাদের কাস্টমার সার্ভিসের সাথে যোগাযোগ করুন। আমরা আপনার সমস্যা সমাধানে সাহায্য করব।
        </p>

        <h2 className="text-2xl font-semibold">১০. যোগাযোগ করুন</h2>
        <p>
          যদি আপনার কাছে কোনো প্রশ্ন থাকে, অথবা পণ্য ডেলিভারি সংক্রান্ত যেকোনো সমস্যা হয়, আমাদের সাথে যোগাযোগ করুন: 
        </p>
        <div className='py-2 leading-8'>
            <p className='flex items-center gap-1'><MdOutlineEmail/> ইমেইল:  {contactInfo.supprtyEmail}</p>
            <p className='flex items-center gap-1'><FiPhone/> ফোন:  {contactInfo.supprtyPhone}</p>
          </div>
      </section>
    </main>
  );
}
