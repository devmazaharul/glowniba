"use client"
import { subscriptionInfo } from "@/types";
import { useEffect, useState } from "react";
import { RiShieldUserLine, RiUserHeartLine } from "react-icons/ri";
import PaginationUI from "../components/Paigination";
import { useSearchParams } from "next/navigation";
import { defaultValues } from "@/constants";
import { getSubscribers } from "@/action/subscribe";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const SubscribtionsTable = () => {
  interface SubscriberResponseState {
    items: subscriptionInfo[];
    totalpage: number;
  }
  const [isLoading,setIsloading]=useState(false)
  const[items,setItems]= useState<SubscriberResponseState>({ items: [], totalpage: 0 });
  const searPara = useSearchParams().get("page");
  const currentPage =parseInt( searPara ? searPara : '1')
  const limit=defaultValues.responceSubscriberLimit;
  useEffect(()=>{
    setIsloading(true)
try {
  const getSubscribersFun=async()=>{
    const data=await getSubscribers(limit,currentPage)
        if ('items' in data && 'totalpage' in data) {
          setItems({
            items:data?.items,
            totalpage:data?.totalpage
          })
          } else {
            toast.error('Unexpected response format');
          }

    
}
getSubscribersFun()
} catch  {
  toast.error("Invalid action")
}finally{
  setIsloading(false)
}
   
  },[currentPage,limit])
  const fakeRows = Array.from({ length: 10 });

  return (
    <div>
{isLoading ?        <div className="overflow-x-auto max-w-full">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-800 text-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-500">ID</th>
              <th className="px-2 py-2 border border-gray-500">Orders</th>
              <th className="px-2 py-2 border border-gray-500">Name</th>
              <th className="px-2 py-2 border border-gray-500">Number</th>
              <th className="px-2 py-2 border border-gray-500">Email</th>
              <th className="px-2 py-2 border border-gray-500">Date</th>
              <th className="px-2 py-2 border border-gray-500">Address</th>
              <th className="px-2 py-2 border border-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {fakeRows.map((_, i) => (
              <tr key={i} className="text-center">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <td key={idx} className="px-2 py-3 border border-gray-100">
                    <Skeleton className="h-4 w-full mx-auto" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>:   <div className="overflow-x-auto  overflow-y-auto max-h-[500px]">
      <table className="min-w-full border border-gray-400">
        <thead className="bg-gray-700 text-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-600">No</th>

            <th className="px-4 py-2 border border-gray-600">ID</th>
            <th className="px-4 py-2 border border-gray-600">Status</th>
            <th className="px-4 py-2 border border-gray-600">Email</th>
            <th className="px-4 py-2 border border-gray-600">Date</th>
          </tr>
        </thead>
        <tbody>
          {items.items &&
            items.items.map((item: subscriptionInfo, i: number) => (
              <tr key={item.subacriberId || 0} className="text-center">
                <td className="px-4 py-2 border  border-gray-100 text-gray-700">
                  {i + 1}
                </td>
                <td className="px-4 py-2 border  border-gray-100 text-gray-700">
                  #{item.subacriberId && item.subacriberId.toString().slice(0, 6) || 55}
                </td>
                <td className="px-4 py-2 border border-gray-100 text-center">
                  <p className='w-fit mx-auto'>{Math.floor(Math.random()*10)%2==0?<RiShieldUserLine className='text-xl fill-pink-500'/>:<RiUserHeartLine className='text-xl fill-amber-500' />}</p>
                </td>
                <td className="px-4 py-2 border border-gray-100">
                  {item.email}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(item.createdAt).toLocaleDateString('en-us', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                
                
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className='my-3'>
        <PaginationUI totalPage={items.totalpage} currentPage={currentPage}/>
      </div>
    </div> }

     
    </div>
  );
}

export default SubscribtionsTable;
