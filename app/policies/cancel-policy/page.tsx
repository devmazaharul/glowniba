// pages/policies/CancelPolicy.tsx
'use client';
import { contactInfo } from '@/constants';
import Head from 'next/head';
import { FiPhone } from 'react-icons/fi';
import { MdCancel, MdOutlineEmail } from "react-icons/md";

export default function Page() {
  return (
    <main className="px-6 section1 max-w-4xl mx-auto">
      <Head>
        <title>Glow Niba | অর্ডার বাতিল নীতি</title>
        <meta name="description" content="Glow Niba-তে কিভাবে অর্ডার বাতিল করা যায়, তার বিস্তারিত নীতিমালা এখানে দেয়া হয়েছে।" />
      </Head>
      <h1 className="text-3xl flex items-center gap-2 font-bold mb-6"><MdCancel className='text-red-500'/> অর্ডার বাতিল নীতি (Cancellation Policy)</h1>
      <section className="text-gray-700 leading-relaxed space-y-6">
        <p>
          Glow Niba গ্রাহকদের সুবিধার জন্য সহজ এবং স্বচ্ছ অর্ডার বাতিল নীতি প্রদান করে। আপনি যদি অর্ডার দেওয়ার পরে বাতিল করতে চান, তাহলে আমাদের নীতিমালা অনুসরণ করতে হবে।
        </p>

        <h2 className="text-2xl font-semibold">১. অর্ডার বাতিলের সময়সীমা</h2>
        <p>
          অর্ডার দেয়ার পরে ২ ঘণ্টার মধ্যে আপনি অর্ডার বাতিলের অনুরোধ করতে পারবেন। ২ ঘণ্টা পর অর্ডার প্রসেসিং শুরু হলে বাতিল করা সম্ভব নাও হতে পারে।
        </p>

        <h2 className="text-2xl font-semibold">২. বাতিলের জন্য প্রক্রিয়া</h2>
        <p>
          অর্ডার বাতিল করতে চাইলে:
          <ul className="list-disc pl-6">
            <li>আমাদের ইমেইল করুন:  {contactInfo.supprtyEmail}</li>
            <li>বা ফোন করুন: {contactInfo.supprtyPhone}</li>
            <li>আপনার অর্ডার নম্বর উল্লেখ করতে হবে</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold">৩. ফেরত নীতি</h2>
        <p>
          বাতিলকৃত অর্ডারের জন্য যদি আগেই পেমেন্ট করা হয়ে থাকে, তাহলে রিফান্ড প্রক্রিয়া শুরু হবে এবং ৭-১৪ কর্মদিবসের মধ্যে রিফান্ড সম্পন্ন হবে।
        </p>

        <h2 className="text-2xl font-semibold">৪. ব্যতিক্রম</h2>
        <p>
          নিম্নোক্ত ক্ষেত্রে অর্ডার বাতিল সম্ভব নয়:
          <ul className="list-disc pl-6">
            <li>পণ্য যদি ইতোমধ্যে শিপমেন্টের জন্য পাঠানো হয়ে থাকে</li>
            <li>কাস্টমাইজড বা পার্সোনালাইজড পণ্য</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold">৫. যোগাযোগ করুন</h2>
        <div>
          <p>  যেকোনো অর্ডার বাতিল সংক্রান্ত প্রশ্নের জন্য আমাদের সাথে যোগাযোগ করুন:</p>
          <div className='py-2 leading-8'>
            <p className='flex items-center gap-1'><MdOutlineEmail/> ইমেইল:  {contactInfo.supprtyEmail}</p>
            <p className='flex items-center gap-1'><FiPhone/> ফোন:  {contactInfo.supprtyPhone}</p>
          </div>
   
        </div>
      </section>
    </main>
  );
}