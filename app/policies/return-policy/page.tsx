// pages/policies/ReturnRefundPolicy.tsx
'use client';
import Head from 'next/head';
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { contactInfo } from '@/constants';

export default function Page() {
  return (
    <main className="px-6 section1 max-w-4xl mx-auto">
      <Head>
        <title>Glow Niba | রিটার্ন ও রিফান্ড নীতি</title>
        <meta name="description" content="Glow Niba-তে রিটার্ন ও রিফান্ড সম্পর্কিত সম্পূর্ণ নীতিমালা এখানে প্রদান করা হয়েছে।" />
      </Head>
      <h1 className=" text-2xl md:text-3xl md:items-center gap-1 flex  font-bold mb-6"><HiOutlineReceiptRefund className='text-7xl md:text-4xl'/> রিটার্ন ও রিফান্ড নীতি (Return & Refund Policy)</h1>
      <section className="text-gray-700 leading-relaxed space-y-6">
        <p>
          Glow Niba গ্রাহকদের সর্বোচ্চ সন্তুষ্টি নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। যদি আপনি প্রাপ্ত পণ্যে সন্তুষ্ট না হন বা অন্য কোনো সমস্যা থাকে, তাহলে আমাদের রিটার্ন ও রিফান্ড নীতিমালা অনুসরণ করে সমস্যা সমাধান করতে পারবেন।
        </p>

        <h2 className="text-2xl font-semibold">১. রিটার্নের শর্তাবলী</h2>
        <p>
          রিটার্নের জন্য পণ্য নিম্নোক্ত শর্তসমূহ পূরণ করতে হবে:
          <ul className="list-disc pl-6">
            <li>ভুল বা ত্রুটিপূর্ণ পণ্য প্রাপ্ত হলে</li>
            <li>পণ্য বিজ্ঞাপিত বিবরণের সাথে না মিললে</li>
            <li>পণ্য অবশ্যই অব্যবহৃত এবং অরিজিনাল অবস্থায় থাকতে হবে</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold">২. রিটার্নের সময়সীমা</h2>
        <p>
          পণ্য গ্রহণের ৭ দিনের মধ্যে রিটার্ন অনুরোধ করতে হবে। এরপরে কোন রিটার্ন গ্রহণ করা হবে না।
        </p>

        <h2 className="text-2xl font-semibold">৩. রিফান্ড নীতি</h2>
        <p>
          রিটার্ন যাচাই ও অনুমোদনের পরে রিফান্ড নিম্নোক্তভাবে প্রদান করা হবে:
          <ul className="list-disc pl-6">
            <li>মূল পেমেন্ট মাধ্যমের মাধ্যমে ফেরত প্রদান করা হবে</li>
            <li>রিফান্ড প্রক্রিয়া সম্পন্ন হতে ৭-১৪ কর্মদিবস সময় লাগতে পারে</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold">৪. রিটার্ন ও রিফান্ডের প্রক্রিয়া</h2>
        <p>
          রিটার্ন বা রিফান্ড করতে চাইলে:
          <ul className="list-disc pl-6">
            <li>আমাদের ইমেইল করুন: {contactInfo.supprtyEmail}</li>
            <li>অথবা কাস্টমার সার্ভিসে কল করুন: {contactInfo.supprtyPhone}</li>
            <li>আপনার অর্ডার নম্বর ও কেন রিটার্ন করতে চান তা উল্লেখ করুন</li>
            <li>পণ্য অবশ্যই অরিজিনাল প্যাকেজিং সহ ফেরত দিতে হবে</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold">৫. ব্যতিক্রম</h2>
        <p>
          নিম্নোক্ত ক্ষেত্রে রিটার্ন বা রিফান্ড সম্ভব হবে না:
          <ul className="list-disc pl-6">
            <li>ব্যবহৃত বা ক্ষতিগ্রস্ত পণ্য</li>
            <li>পার্সোনালাইজড বা কাস্টম অর্ডার</li>
            <li>ডিসকাউন্টেড বা সেল আইটেম</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold">৬. যোগাযোগ করুন</h2>
       <div>
       <p>
          যেকোনো রিটার্ন বা রিফান্ড সংক্রান্ত প্রশ্নের জন্য আমাদের সাথে যোগাযোগ করুন:
        </p>
        <div className='py-2 leading-8'>
            <p className='flex items-center gap-1'><MdOutlineEmail/> ইমেইল:  {contactInfo.supprtyEmail}</p>
            <p className='flex items-center gap-1'><FiPhone/> ফোন:  {contactInfo.supprtyPhone}</p>
          </div>
       </div>
      </section>
    </main>
  );
}