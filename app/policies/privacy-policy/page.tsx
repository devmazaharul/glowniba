// pages/policies/PrivacyPolicy.tsx
'use client';
import { contactInfo } from '@/constants';
import Head from 'next/head';
import { FiPhone } from 'react-icons/fi';
import { MdOutlineEmail, MdPrivacyTip } from "react-icons/md";

export default function Page() {
  return (
    <main className="px-6 section1 max-w-4xl mx-auto">
      <Head>
        <title>Glow Niba | গোপনীয়তা নীতি</title>
        <meta name="description" content="Glow Niba-তে আমরা আপনার ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। বিস্তারিত জানতে পড়ুন।" />
      </Head>
      <h1 className="text-3xl flex items-center gap-2 font-bold mb-6"><MdPrivacyTip className='text-yellow-500 text-5xl md:text-4xl'/> গোপনীয়তা নীতি (Privacy Policy)</h1>
      <section className="text-gray-700 leading-relaxed space-y-6">
        <p>
          Glow Niba-তে আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আমরা আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষার বিষয়ে সম্পূর্ণ স্বচ্ছতা বজায় রাখি। এই গোপনীয়তা নীতিতে ব্যাখ্যা করা হয়েছে কিভাবে আমরা আপনার তথ্য সংগ্রহ করি, ব্যবহার করি এবং সুরক্ষা দেই।
        </p>

        <h2 className="text-2xl font-semibold">১. তথ্য সংগ্রহ</h2>
        <p>
          আমরা আপনার কাছ থেকে নিম্নলিখিত ধরণের তথ্য সংগ্রহ করতে পারি:
          <ul className="list-disc pl-6">
            <li>নাম, ঠিকানা, ইমেইল ঠিকানা এবং ফোন নম্বর</li>
            <li>পেমেন্ট সম্পর্কিত তথ্য</li>
            <li>আপনার অর্ডার এবং ক্রয়ের ইতিহাস</li>
            <li>আপনার ব্রাউজিং আচরণ ও ডিভাইসের তথ্য</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold">২. তথ্য ব্যবহারের উদ্দেশ্য</h2>
        <p>
          আমরা আপনার ব্যক্তিগত তথ্য ব্যবহার করি:
          <ul className="list-disc pl-6">
            <li>আপনার অর্ডার প্রসেস ও ডেলিভারি সম্পন্ন করতে</li>
            <li>আপনাকে আপডেট ও প্রমোশনাল অফার পাঠাতে</li>
            <li>আপনার গ্রাহক সেবার অভিজ্ঞতা উন্নত করতে</li>
            <li>আইনগত বাধ্যবাধকতা পূরণ করতে</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold">৩. তথ্য সুরক্ষা</h2>
        <p>
          আমরা আপনার ব্যক্তিগত তথ্য নিরাপদ রাখার জন্য উন্নত প্রযুক্তি এবং সিকিউরিটি মেজার ব্যবহার করি। তৃতীয় পক্ষের সাথে আপনার তথ্য বিনিময় করা হয় না, ব্যতীত যেখানে তা আইনি প্রয়োজনীয়তা।
        </p>

        <h2 className="text-2xl font-semibold">৪. কুকি নীতি</h2>
        <p>
          আমাদের ওয়েবসাইটে কুকিজ ব্যবহার করা হয় যাতে আপনার ব্রাউজিং অভিজ্ঞতা আরও উন্নত হয় এবং ব্যক্তিগতকৃত পরিষেবা প্রদান করা যায়। আপনি চাইলে কুকিজ বন্ধ করতে পারেন, তবে এতে ওয়েবসাইটের কিছু ফিচার কাজ নাও করতে পারে।
        </p>

        <h2 className="text-2xl font-semibold">৫. ব্যবহারকারীর অধিকার</h2>
        <p>
          আপনার নিজস্ব তথ্যের উপর আপনি অধিকার রাখেন। আপনি চাইলে আপনার তথ্য সংশোধন, আপডেট বা মুছে ফেলার অনুরোধ করতে পারেন। এ সংক্রান্ত যেকোনো অনুরোধের জন্য আমাদের সাথে যোগাযোগ করুন।
        </p>

        <h2 className="text-2xl font-semibold">৬. গোপনীয়তা নীতির পরিবর্তন</h2>
        <p>
          আমরা প্রয়োজনে আমাদের গোপনীয়তা নীতি আপডেট করতে পারি। যেকোনো পরিবর্তন আমাদের ওয়েবসাইটে প্রকাশ করা হবে এবং প্রযোজ্য হবে সেই অনুযায়ী।
        </p>

        <h2 className="text-2xl font-semibold">৭. যোগাযোগ করুন</h2>
        <p>
          আপনার যদি আমাদের গোপনীয়তা নীতি সম্পর্কে কোনো প্রশ্ন বা উদ্বেগ থাকে, তাহলে অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন:
        </p>
        <div className='py-2 leading-8'>
                  <p className='flex items-center gap-1'><MdOutlineEmail/> ইমেইল:  {contactInfo.supprtyEmail}</p>
                  <p className='flex items-center gap-1'><FiPhone/> ফোন:  {contactInfo.supprtyPhone}</p>
                </div>
      </section>
    </main>
  );
}