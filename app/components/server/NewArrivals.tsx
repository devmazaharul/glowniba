import { productsData } from '@/lib/source';
import React from 'react';
import CommonCard from '../others/CommonCard';
import SectionTop from '../others/SectionTop';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NewArrivals = () => {

  const filterData=productsData.filter((item)=>{
    return item.reviews>10
  })

  return (
    <div className='section'> 

      <SectionTop title='New Arrivals' desc=' একদম নতুন যোগ হওয়া আমাদের বেস্ট স্কিন কেয়ার পণ্যগুলো দেখে নিন, যেগুলো আপনার সৌন্দর্য আরও বাড়াবে।'/>
      <div className='flex items-center justify-between py-2'>
        <p></p>
        <Link href={'/products'}>
          <Button variant={'outline'}>See all</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {filterData.slice(0,10).map((item,key)=>(
        <CommonCard item={item} color="bg-green-100 text-green-800" key={key} />
      ))}
</div>
    </div>
  );
}

export default NewArrivals;
