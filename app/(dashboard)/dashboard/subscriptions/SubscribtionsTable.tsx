'use client';

import { subscriptionInfo } from '@/types';
import { useEffect, useState } from 'react';
import PaginationUI from '../components/Paigination';
import { useSearchParams } from 'next/navigation';
import { defaultValues } from '@/constants';
import { getSubscribers } from '@/action/subscribe';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { TbSend } from 'react-icons/tb';
import Link from 'next/link';

const SubscriptionsTable = () => {
  interface SubscriberResponseState {
    items: subscriptionInfo[];
    totalpage: number;
  }

  const [items, setItems] = useState<SubscriberResponseState>({ items: [], totalpage: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const limit = defaultValues.responceSubscriberLimit;

  useEffect(() => {
    const getSubscribersFun = async () => {
      setIsLoading(true);
      try {
        const data = await getSubscribers(limit, parseInt(currentPage));
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

  const fakeRows = Array.from({ length: 10 });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Subscribers</h2>

      <div className="border border-gray-100 shadow-2xl shadow-gray-100 rounded-md overflow-x-auto">
        <Table>
          <TableHeader className='bg-gray-700 text-center'>
            <TableRow>
              <TableHead className='text-white'>No</TableHead>
              <TableHead className='text-white'>ID</TableHead>
              <TableHead className='text-white'>Status</TableHead>
              <TableHead className='text-white'>Email</TableHead>
              <TableHead className='text-white'>Date</TableHead>
              <TableHead className='text-white'>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading
              ? fakeRows.map((_, i) => (
                  <TableRow className='border border-gray-100' key={i}>
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <TableCell key={idx}>
                        <Skeleton className="h-4 w-full mx-auto " />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : items.items.map((item, i) => (
                  <TableRow key={item.subacriberId ?? i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      #{item.subacriberId?.toString().slice(0, 6) || 'N/A'}
                    </TableCell>
                    <TableCell className="">
                      {Math.floor(Math.random() * 10) % 2 === 0 ? (
                       <p>Member</p>
                      ) : (
                        <p>Non Member</p>
                      )}
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
                    <TableCell className='text-right'>
                     <Link href={'/'}>
                     <Button className='cursor-pointer hover:bg-gray-700'><TbSend/></Button>
                     </Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {!isLoading && (
        <div className="my-4">
          <PaginationUI totalPage={items.totalpage} currentPage={Number(currentPage)} />
        </div>
      )}
    </div>
  );
};

export default SubscriptionsTable;
