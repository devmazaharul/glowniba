'use client';

import { userIfo } from '@/types/user';
import React, { useEffect, useState } from 'react';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import PaginationUI from '../components/Paigination';
import { getUsers } from '@/action/user';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { defaultValues } from '@/constants';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UsersTable = () => {
  const [state, setState] = useState<{ items: userIfo[]; totalpage: number }>({ items: [], totalpage: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const searPara = useSearchParams().get("page");
  const currentPage = searPara ? searPara : '1';
  const limit = defaultValues.responceUserLimit;

  useEffect(() => {
    const getUsr = async () => {
      setIsLoading(true);
      const data = await getUsers(limit, parseInt(currentPage.toString()));
      if ('items' in data && 'totalpage' in data) {
        setState({ items: data.items, totalpage: data.totalpage });
      } else {
        toast.error('Unexpected response format');
      }
      setIsLoading(false);
    };
    getUsr();
  }, [currentPage, limit]);

  const fakeRows = Array.from({ length: 10 });

  return (
    <div className="p-4">
      <div className="bg-white rounded-md shadow-2xl shadow-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800 text-white">
              <TableHead className="text-white px-4">ID</TableHead>
              <TableHead className="text-white">Orders</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Number</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Address</TableHead>
              <TableHead className="text-white text-center">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading
              ? fakeRows.map((_, i) => (
                  <TableRow key={i} className='border border-gray-100'>
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <TableCell key={idx}>
                        <Skeleton className="h-4 w-full " />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : state.items.map((item: userIfo, i: number) => (
                  <TableRow key={item._id ?? i} className="hover:bg-gray-50 border border-gray-100">
                    <TableCell>
                      <p className="bg-yellow-100 text-gray-700 px-2 rounded-md inline-block">
                        #{item._id.toString().slice(0, 5)}
                      </p>
                    </TableCell>
                    <TableCell className="text-emerald-800 text-center">
                      {Math.floor(Math.random() * 10)}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.number}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString('en-us', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>{item.address?.slice(0, 20)}</TableCell>
                    <TableCell className="text-center">
                      <BsBookmarkCheckFill className="text-green-500 mx-auto" />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        <div className="mt-4">
          <PaginationUI currentPage={Number(currentPage)} totalPage={state.totalpage} />
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
