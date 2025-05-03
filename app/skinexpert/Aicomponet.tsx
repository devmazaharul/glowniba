'use client';

import { Button } from '@/components/ui/button';
import { askSkinExpert } from '@/utils/ai';
import { useState } from 'react';
import { toast } from 'sonner';
import SectionTop from '../components/others/SectionTop';

const AiComponent = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   

  if(!question){
    toast.error("Please write your problem.")
    return
  }

  setIsloading(true);
    try {
      e.preventDefault();
      const stream = await askSkinExpert(question);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        result += decoder.decode(value);
        setAnswer(result); // updates live
        setIsloading(false);
      setQuestion('');
      }
    } catch(err:unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error occur';
      toast.error(errorMessage);
      setQuestion('');
      setIsloading(false);
    } 
  };

  return (
    <div className="section">
      <SectionTop
        title="🛍️ Need help choosing a product?"
        desc="প্রোডাক্ট নির্বাচন নিয়ে কনফিউজড? আমাদের কে বলুন , আমরা আপনাকে সঠিক প্রোডাক্ট চয়ন করতে সহায়তা করব!"
      />
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[400px] mx-auto text-center"
      >
        <textarea value={question} required
          className="w-full h-[100px] max-h-[150px]  border border-gray-200 p-3 outline-none rounded-2xl shadow-2xl shadow-gray-100"
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="আপনি কোন ধরনের সমস্যায় ভুগছেন?"
        ></textarea>
        <Button className="cursor-pointer w-fit mx-auto">
          {isLoading ? 'Genarating...' : 'Submit'}
        </Button>
      </form>

      {answer && (
        <div className=" p-4  min-h-[100px] md:w-[70%] mx-auto my-5 whitespace-pre-wrap shadow-2xl shadow-gray-100 border border-gray-200 rounded-2xl">
          {answer || 'এখানে AI উত্তর দেখাবে...'}
        </div>
      )}
    </div>
  );
};

export default AiComponent;
