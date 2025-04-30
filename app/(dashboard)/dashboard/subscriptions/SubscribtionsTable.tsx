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

  const[items,setItems]= useState<SubscriberResponseState>({ items: [], totalpage: 0 });
  const [isLoading,setIsloading]=useState(false)
  const searPara = useSearchParams().get("page");
 const currentPage = searPara ? searPara : '1';

  const limit=defaultValues.responceSubscriberLimit;
  useEffect(() => {
    const getSubscribersFun = async () => {
      setIsloading(true);
      try {
        const data = await getSubscribers(limit, parseInt(currentPage.toString()));
        if ('items' in data && 'totalpage' in data) {
          setItems({
            items: data?.items,
            totalpage: data?.totalpage,
          });
        } else {
          toast.error('Unexpected response format');
        }
      } catch (err) {
        toast.error("Error fetching subscribers.");
        console.error(err); // Debug purpose
      } finally {
        setIsloading(false);
      }
    };
  
    getSubscribersFun();
  }, [currentPage, limit]);
  

  const fakeRows = Array.from({ length: 10 });

  return (
<div className="overflow-x-auto overflow-y-auto max-h-[500px] max-w-[100%]">
{isLoading ? <div className="overflow-x-auto max-w-full">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-800 text-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-500">NO</th>
              <th className="px-4 py-2 border border-gray-500">ID</th>
              <th className="px-2 py-2 border border-gray-500">Status</th>
              <th className="px-2 py-2 border border-gray-500">Email</th>
              <th className="px-2 py-2 border border-gray-500">Date</th>
              
            </tr>
          </thead>
          <tbody>
            {fakeRows.map((_, i) => (
              <tr key={i} className="text-center">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <td key={idx} className="px-2 py-3 border border-gray-100">
                <Skeleton className="h-4 w-full mx-auto" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>:
      <>
      <div className="overflow-x-auto max-w-full">
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
          {
            items.items.map((item: subscriptionInfo, i: number) => (
              <tr key={item.subacriberId ?? i} className="text-center">
                <td className="px-4 py-2 border  border-gray-100 text-gray-700">
                  {i + 1}
                </td>
                <td className="px-4 py-2 border  border-gray-100 text-gray-700">
                  #{item.subacriberId && item.subacriberId.toString().slice(0, 6) || 'kdjhz4d'}
                </td>
                <td className="px-4 py-2 border border-gray-100 text-center">
                  <p className='w-fit mx-auto'>{Math.floor(Math.random()*10)%2==0?<RiShieldUserLine className='text-xl fill-gray-600'/>:<RiUserHeartLine className='text-xl fill-green-500' />}</p>
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
      </div>
      <div className='my-3'>
     <PaginationUI totalPage={items.totalpage} currentPage={Number(currentPage)}/>
      </div>
      </>
     
    }
    </div>
  );
}

export default SubscribtionsTable;
