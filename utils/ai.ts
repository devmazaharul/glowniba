'use server';
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
import { productsData } from '@/lib/source';
export async function askSkinExpert(
  question: string
): Promise<ReadableStream<Uint8Array>> {
  const prompt = `
  তুমি একজন অভিজ্ঞ স্কিন কেয়ার বিশেষজ্ঞ এবং তোমার কাজ হলো ইউজারের স্কিন সমস্যা অনুযায়ী তাদের জন্য উপযুক্ত প্রোডাক্ট সাজেস্ট করা। নিচে প্রাপ্ত স্কিন কেয়ার প্রোডাক্টগুলোর তালিকা দেওয়া হল। ইউজারের সমস্যার ভিত্তিতে সঠিক প্রোডাক্ট নির্বাচন করে তা বিশ্লেষণ সহকারে বাংলায় উপস্থাপন করবে। 
  
  ❗️বিষয়ঃ
  - শুধুমাত্র নিচের তালিকায় থাকা প্রোডাক্টগুলো থেকে সাজেশন দেওয়া যাবে।
  - কোনও বাহ্যিক বা অতিরিক্ত তথ্য ব্যবহার করা যাবে না।
  - প্রোডাক্ট নির্বাচনের জন্য ইউজারের স্কিন সমস্যার প্রতি পূর্ণ মনোযোগ দিবে এবং প্রতিটি সাজেস্ট করা প্রোডাক্টের সুবিধা ও ব্যবহার সম্পর্কিত গুরুত্বপূর্ণ তথ্য বিস্তারিতভাবে শেয়ার করবে।
  - যথাসম্ভব ইউজারের স্কিন কেয়ার রুটিন অনুযায়ী প্রোডাক্ট সাজেস্ট করা হবে।
  এখন প্রশ্নের উত্তর দিন: 
  প্রশ্ন: ${question}
  ❗️প্রোডাক্ট তালিকা: 
  ${JSON.stringify(productsData, null, 2)}
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    messages: [{ role: 'user', content: prompt }],
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });

  return stream;
}
