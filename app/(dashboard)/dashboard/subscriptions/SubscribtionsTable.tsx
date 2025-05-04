'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { subscriptionInfo } from '@/types';
import { useEffect, useState } from 'react';
import PaginationUI from '../components/Paigination';
import { useSearchParams } from 'next/navigation';
import { defaultValues } from '@/constants';
import { getSubscribers } from '@/action/subscribe';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { TbSend } from 'react-icons/tb';
import Link from 'next/link';

const SubscriptionsTable = () => {
  interface SubscriberResponseState {
    items: subscriptionInfo[];
    totalpage: number;
  }

  const [items, setItems] = useState<SubscriberResponseState>({
    items: [],
    totalpage: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIschecked] = useState(false);
  const [status,setStatus]=useState('all')
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const limit = defaultValues.responceSubscriberLimit;

  useEffect(() => {
    const getSubscribersFun = async () => {
      setIsLoading(true);
      try {
        const data = await getSubscribers(limit, parseInt(currentPage));
        console.log(data);
        if ('items' in data && 'totalpage' in data) {
          setItems({
            items: data.items,
            totalpage: data.totalpage,
          });
         
        } else {
          toast.error('Unexpected response format');
        }
      } catch (err) {
        toast.error('Error fetching subscribers.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getSubscribersFun();
  }, [currentPage, limit]);


  const sortItems=items && items.items.filter((item)=>{
    if(status=='all')return true

    if(status=="today"){
      const dateMake=new Date().toLocaleDateString("en-us",{
        day:"2-digit",
        month:"short",
        year:"numeric"
      })
      return new Date(item.createdAt).toLocaleDateString("en-us",{
        day:"2-digit",
        month:"short",
        year:"numeric"
      }).includes(dateMake)
    }else if(status=='member'){
      return item.isMember==true
    }else if(status=='nonmember'){
      return item.isMember==false
    }
  })





  const fakeRows = Array.from({ length: 10 });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">All Subscribers</h2>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="today">today</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="nonmember">Non Member</SelectItem>
            {/* Add more statuses as needed */}
          </SelectContent>
        </Select>


        <div className="flex items-center gap-3">
          {isChecked && (
            <Button className="cursor-pointer" variant={'default'}>
              <TbSend />
            </Button>
          )}
          {items.items.length > 0 && (
            <Button
              onClick={() => setIschecked(!isChecked)}
              className="cursor-pointer"
              variant={'outline'}
            >
              {isChecked ? 'Unchecked' : ' Check all'}
            </Button>
          )}
        </div>
      </div>

      <div className="border overflow-y-scroll max-h-[500px] border-gray-100 shadow-2xl shadow-gray-100 rounded-md overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-700 text-center">
            <TableRow>
              <TableHead className="text-white">Check</TableHead>
              <TableHead className="text-white">No</TableHead>
              <TableHead className="text-white">ID</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading
              ? fakeRows.map((_, i) => (
                  <TableRow className="border border-gray-100" key={i}>
                    {Array.from({ length: 7 }).map((_, idx) => (
                      <TableCell key={idx}>
                        <Skeleton className="h-4 w-full mx-auto " />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : sortItems.map((item, i) => (
                  <TableRow key={item.subacriberId ?? i}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        className="cursor-pointer"
                      />
                    </TableCell>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      #{item.subacriberId?.toString().slice(0, 6) || 'N/A'}
                    </TableCell>
                    <TableCell className="">
                    {item.isMember?"Member":"Non Member"}
                    </TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString('en-us', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={'/'}>
                        <button
                          className={`${
                            isChecked
                              ? 'bg-gray-200 cursor-not-allowed'
                              : 'bg-gray-700 cursor-pointer'
                          } w-8 h-8  p-2 text-white rounded-md`}
                          disabled={isChecked}
                        >
                          <TbSend />
                        </button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {!isLoading && (
          <div className="my-4">
            <PaginationUI
              totalPage={items.totalpage}
              currentPage={Number(currentPage)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsTable;
