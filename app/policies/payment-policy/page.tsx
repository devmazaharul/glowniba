// pages/policies/PaymentPolicy.tsx
'use client';
import { contactInfo } from '@/constants';
import Head from 'next/head';
import { FiPhone } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { MdPayment } from "react-icons/md";

export default function Page() {
  return (
    <main className="px-6 section1  max-w-4xl mx-auto">
      <Head>
        <title>Glow Niba | পেমেন্ট নীতি (Payment Policy)</title>
        <meta name="description" content="Glow Niba-তে পেমেন্ট সম্পর্কিত নীতি এবং নির্দেশিকা জানুন।" />
      </Head>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2"><MdPayment className='text-7xl md:text-4xl'/> পেমেন্ট নীতি (Payment Policy)</h1>
      <section className="text-gray-700 leading-relaxed space-y-6">
        <p>
          Glow Niba আপনাদের জন্য সহজ, নিরাপদ এবং নিরাপত্তার সাথে পেমেন্ট প্রক্রিয়া নিশ্চিত করে থাকে। আমাদের পেমেন্ট পদ্ধতিগুলি আমাদের গ্রাহকদের স্বাচ্ছন্দ্য এবং সুবিধার্থে ডিজাইন করা হয়েছে। নীচে আমাদের পেমেন্ট নীতির বিস্তারিত তথ্য দেওয়া হলো:
        </p>

        <h2 className="text-2xl font-semibold">১. পেমেন্ট পদ্ধতি</h2>
        <div>
          Glow Niba-তে আপনি বিভিন্ন পেমেন্ট পদ্ধতির মাধ্যমে পণ্য কেনাকাটা করতে পারবেন, যেমন:
          <ul className="list-disc pl-6">
  <li>মোবাইল ব্যাংকিং (বিকাশ, নগদ)</li>
  <li>ব্যাংক পেমেন্ট (Bank Payment)</li>
  <li>নগদে পণ্য গ্রহণের সময় পরিশোধ (Cash on Delivery - COD)</li>
</ul>

        </div>

        <h2 className="text-2xl font-semibold">২. পেমেন্ট প্রক্রিয়া</h2>
        <p>
          আপনার অর্ডার চূড়ান্ত করার সময়, আপনি পছন্দের পেমেন্ট পদ্ধতি নির্বাচন করতে পারবেন। আপনার পেমেন্ট সফলভাবে সম্পন্ন হলে, আপনি একটি কনফারমেশন ইমেইল পাবেন এবং অর্ডার প্রক্রিয়া শুরু হবে।
        </p>

        <h2 className="text-2xl font-semibold">৩. পেমেন্ট সিকিউরিটি</h2>
        <p>
          Glow Niba আপনার পেমেন্ট তথ্যকে অত্যন্ত গোপনীয় এবং নিরাপদভাবে পরিচালনা করে। আমরা অত্যাধুনিক এনক্রিপশন প্রযুক্তি ব্যবহার করি আপনার তথ্য রক্ষা করতে। আমাদের পেমেন্ট গেটওয়ে সুরক্ষিত এবং  PCI DSS সার্টিফায়েড।
        </p>

        <h2 className="text-2xl font-semibold">৪. পেমেন্টে সমস্যা</h2>
        <p>
          যদি পেমেন্ট প্রক্রিয়া চলাকালীন কোনো সমস্যা হয়, আপনি আমাদের কাস্টমার সার্ভিসে যোগাযোগ করতে পারেন:
        </p>
        <div className='leading-8'>
            <p className='flex items-center gap-1'><MdOutlineEmail/> ইমেইল: {contactInfo.supprtyEmail}</p>
            <p className='flex items-center gap-1'><FiPhone/> ফোন: {contactInfo.supprtyPhone}</p>
          </div>

        <h2 className="text-2xl font-semibold">৫. পেমেন্টের পরে অর্ডার পরিবর্তন</h2>
        <p>
          একবার পেমেন্ট সফলভাবে সম্পন্ন হলে, অর্ডার পরিবর্তন বা বাতিল করা সম্ভব নাও হতে পারে। তবে, যদি কোনো সমস্যা বা ভুল পেমেন্ট হয়, দয়া করে আমাদের কাস্টমার সার্ভিসের সাথে দ্রুত যোগাযোগ করুন।
        </p>

        <h2 className="text-2xl font-semibold">৬. পেমেন্ট এবং শিপিং</h2>
        <p>
          পেমেন্ট সম্পন্ন হওয়ার পরে, আপনার অর্ডার প্রক্রিয়া শুরু হবে এবং শিপিং সময়সীমার মধ্যে পৌঁছাবে। আপনার শিপিং তথ্য এবং ট্র্যাকিং নম্বরও আপনাকে পাঠানো হবে।
        </p>

        <h2 className="text-2xl font-semibold">৭. ট্যাক্স এবং শিপিং চার্জ</h2>
        <p>
          সমস্ত পণ্যগুলির জন্য প্রযোজ্য শিপিং চার্জ এবং ট্যাক্স আপনার অর্ডারের সময় দেখানো হবে। আপনার অর্ডারের মূল্য পরিশোধের পরে, এই চার্জগুলি যুক্ত করা হবে।
        </p>

        <h2 className="text-2xl font-semibold">৮. পেমেন্ট পরিমাণ</h2>
        <p>
          আপনার অর্ডারের জন্য প্রদত্ত পেমেন্ট পরিমাণ, সঠিক পরিমাণ এবং আমাদের সিস্টেমে পেমেন্ট কনফারমেশন অনুযায়ী হবে। যেকোনো অস্বাভাবিক পেমেন্ট বা অস্বীকৃত পেমেন্টের জন্য আমাদের পেমেন্ট গেটওয়ে দল দ্রুত ব্যবস্থা নেবে।
        </p>

        <h2 className="text-2xl font-semibold">৯. যোগাযোগ করুন</h2>
        <p>
          যদি আপনার পেমেন্ট সম্পর্কিত কোনো প্রশ্ন বা উদ্বেগ থাকে, আমাদের সাথে যোগাযোগ করুন:
          
        </p>
        <div className='py-2 leading-8'>
                  <p className='flex items-center gap-1'><MdOutlineEmail/> ইমেইল:  {contactInfo.supprtyEmail}</p>
                  <p className='flex items-center gap-1'><FiPhone/> ফোন:  {contactInfo.supprtyPhone}</p>
                </div>
      </section>
    </main>
  );
}
