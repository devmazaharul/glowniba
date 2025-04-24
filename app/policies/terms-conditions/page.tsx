// pages/policies/TermsAndConditions.tsx
'use client';
import { contactInfo } from '@/constants';
import Head from 'next/head';
import Link from 'next/link';
import { FiPhone } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';

export default function Page() {
  return (
    <main className="px-6 section1 max-w-4xl mx-auto">
      <Head>
        <title>Glow Niba | শর্তাবলী (Terms and Conditions)</title>
        <meta name="description" content="Glow Niba-তে আমাদের শর্তাবলী ও ব্যবহারের নিয়মাবলী সম্পর্কে বিস্তারিত জানুন।" />
      </Head>
      <h1 className="text-3xl font-bold mb-6">📜 শর্তাবলী (Terms and Conditions)</h1>
      <section className="text-gray-700 leading-relaxed space-y-6">
        <p>
          Glow Niba-তে স্বাগতম। আমাদের পণ্য বা সেবা ব্যবহার করার আগে, আমাদের শর্তাবলী পড়ুন এবং বুঝে নিন। এই শর্তাবলী আপনার এবং আমাদের মধ্যে একটি আইনি চুক্তি যা আমাদের পণ্য বা সেবা ব্যবহার করার শর্তাবলী নির্ধারণ করে।
        </p>

        <h2 className="text-2xl font-semibold">১. পণ্য ব্যবহার</h2>
        <p>
          আপনি Glow Niba-এর পণ্য বা সেবা ব্যবহার করে এই শর্তাবলী মেনে চলতে সম্মত হচ্ছেন। আমাদের পণ্য বা সেবা ব্যবহার করা মানে আপনি এই শর্তাবলী গ্রহণ করেছেন।
        </p>

        <h2 className="text-2xl font-semibold">২. অর্ডার প্রক্রিয়া</h2>
        <p>
          আপনার অর্ডার প্রক্রিয়া সম্পন্ন হলে, আপনাকে একটি কনফারমেশন ইমেইল পাঠানো হবে। অর্ডার প্রক্রিয়া শুরু হওয়ার পরে, আপনার অর্ডার পরিবর্তন বা বাতিল করা সম্ভব নাও হতে পারে।
        </p>

        <h2 className="text-2xl font-semibold">৩. মূল্য এবং পেমেন্ট</h2>
        <p>
          সমস্ত পণ্যের মূল্য ও শিপিং খরচ আমাদের ওয়েবসাইটে প্রদর্শিত মূল্য অনুসারে নির্ধারিত হবে। আমাদের পেমেন্ট পদ্ধতি গুলি নিরাপদ এবং নিশ্চিত পেমেন্টের নিশ্চয়তা দেয়।
        </p>

        <h2 className="text-2xl font-semibold">৪. কপিরাইট এবং মালিকানা</h2>
        <p>
          আমাদের সমস্ত পণ্য, ডিজাইন, গ্রাফিক্স এবং কন্টেন্ট আমাদের কপিরাইট অধীনে রক্ষিত। আপনি কোনভাবেই এই কনটেন্ট বা ডিজাইন কোন তৃতীয় পক্ষকে স্থানান্তর বা বিক্রি করতে পারবেন না।
        </p>

        <h2 className="text-2xl font-semibold">৫. গোপনীয়তা</h2>
        <p>
          আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখতে, আমরা আপনার তথ্য কেবল আমাদের নীতি অনুযায়ী ব্যবহার করি। আমাদের গোপনীয়তা নীতি সম্পর্কে বিস্তারিত জানতে, আপনি আমাদের <Link target='_blank' href="/policies/privacy-policy" className="text-blue-400 hover:underline">গোপনীয়তা নীতি</Link> পড়তে পারেন।
        </p>

        <h2 className="text-2xl font-semibold">৬. সীমাবদ্ধতা এবং দায়বদ্ধতা</h2>
        <p>
          Glow Niba কোনো প্রকার দায়বদ্ধতা বা ক্ষতিপূরণের জন্য দায়ী থাকবে না যা আমাদের নিয়ন্ত্রণের বাইরে বা প্রকৃতপক্ষে সম্পন্ন হয়নি। আমাদের পণ্য বা সেবা ব্যবহারের কারণে কোনো ক্ষতি বা অসুবিধা হলে, আমরা দায়বদ্ধ নই।
        </p>

        <h2 className="text-2xl font-semibold">৭. পরিবর্তন এবং আপডেট</h2>
        <p>
          আমরা আমাদের শর্তাবলী সময়ে সময়ে পরিবর্তন বা আপডেট করতে পারি। যেকোনো পরিবর্তন বা আপডেটের জন্য আপনি আমাদের ওয়েবসাইটে নির্দেশনা দেখতে পাবেন।
        </p>

        <h2 className="text-2xl font-semibold">৮. আইনি আইন</h2>
        <p>
          আমাদের শর্তাবলী বাংলাদেশের আইন অনুযায়ী পরিচালিত হবে এবং এই শর্তাবলী সম্পর্কে কোনো বিরোধ হলে বাংলাদেশের আদালতগুলি আইনি সিদ্ধান্ত গ্রহণ করতে পারবে।
        </p>

        <h2 className="text-2xl font-semibold">৯. যোগাযোগ করুন</h2>
        <p>
          শর্তাবলী সম্পর্কে কোনো প্রশ্ন বা উদ্বেগ থাকলে আমাদের সাথে যোগাযোগ করুন:
        </p>
         <div className='py-2 leading-8'>
                   <p className='flex items-center gap-1'><MdOutlineEmail/> ইমেইল:  {contactInfo.supprtyEmail}</p>
                   <p className='flex items-center gap-1'><FiPhone/> ফোন:  {contactInfo.supprtyPhone}</p>
                 </div>
      </section>
    </main>
  );
}
