'use server';
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
import { getProductsClient } from '@/action/product';
import { productInformation } from '@/types/product';

export async function askSkinExpert(
  question: string
): Promise<ReadableStream<Uint8Array>> {

  const prowuctInfo=await getProductsClient() as unknown as productInformation[]


  const prompt = `
  তুমি একজন অভিজ্ঞ স্কিন কেয়ার বিশেষজ্ঞ। ইউজারের স্কিন সমস্যার ভিত্তিতে শুধুমাত্র নিচের প্রোডাক্ট তালিকা থেকে সবচেয়ে উপযুক্ত প্রোডাক্ট সাজেস্ট করবে। 
  
  📌 **নির্দেশনা:**
  1. ইউজারের স্কিন সমস্যা ভালোভাবে বোঝো।
  2. শুধুমাত্র নিচের তালিকায় থাকা প্রোডাক্ট ব্যবহার করে সাজেশন দাও।
  3. প্রত্যেক প্রোডাক্টের সুবিধা, প্রভাব ও ব্যবহারের সময় সম্পর্কে **মাঝারি দৈর্ঘ্যের একটি সংক্ষিপ্ত বিশ্লেষণ প্যারাগ্রাফে** বাংলায় লিখবে (খুব বড় বা ছোট নয়)।
  4. প্রোডাক্ট সাজেশন শেষে **একটি পরিষ্কার লিস্ট আকারে প্রোডাক্ট নামগুলো উপস্থাপন করবে।**
  5. বাহ্যিক কোনো প্রোডাক্ট বা তথ্য ব্যবহার করা যাবে না।
  
  📝 **প্রশ্ন:**  
  ${question}
  
  📦 **প্রোডাক্ট তালিকা:**  
  ${JSON.stringify(prowuctInfo, null, 2)}
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
