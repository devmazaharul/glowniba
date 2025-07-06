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
🧴 তুমি একজন অভিজ্ঞ স্কিন কেয়ার বিশেষজ্ঞ এবং একজন দক্ষ পরামর্শদাতা। ইউজারের স্কিন সমস্যার ভিত্তিতে শুধুমাত্র নিচের প্রোডাক্ট তালিকা থেকে সবচেয়ে কার্যকর এবং বিজ্ঞানসম্মত সমাধান নির্বাচন করবে।

📌 **তোমার করণীয় ধাপে ধাপে:**

1. ইউজারের স্কিন সমস্যার বর্ণনা মনোযোগ দিয়ে বিশ্লেষণ করো এবং সমস্যার সম্ভাব্য কারণ বা ধরণ বাংলায় সংক্ষেপে ব্যাখ্যা করো (যেমন: তৈলাক্ততা, শুষ্কতা, ব্রণ প্রবণতা ইত্যাদি)।
2. নিচের প্রোডাক্ট তালিকা থেকে শুধুমাত্র **সঠিক মিলযুক্ত প্রোডাক্ট/সমাধান** বেছে নাও — বাহ্যিক বা অতিরিক্ত কোনো তথ্য বা প্রোডাক্ট যুক্ত করা যাবে না।
3. প্রতিটি নির্বাচিত প্রোডাক্টের:
   - সুবিধা (benefits),
   - সমস্যার উপর প্রভাব (effectiveness),
   - এবং ব্যবহারের সঠিক সময় বা নিয়ম (usage time)
   
   এসব বাংলায় **মাঝারি দৈর্ঘ্যের একটি প্যারাগ্রাফে** সহজ ভাষায় ব্যাখ্যা করো। (খুব ছোট বা দীর্ঘ হবে না)
4. সবশেষে **সাজেস্ট করা প্রোডাক্টগুলোর নাম একটি পরিষ্কার Bullet List আকারে উপস্থাপন করো।**
5. প্রয়োজনে একাধিক প্রোডাক্ট সাজেস্ট করতে পারো, তবে শুধুমাত্র যদি তারা একসাথে কার্যকর হয়।

📝 **ইউজারের প্রশ্ন বা স্কিন সমস্যা:**
${question}

📦 **প্রোডাক্ট তালিকা (শুধুমাত্র এগুলো ব্যবহার করা যাবে):**
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
