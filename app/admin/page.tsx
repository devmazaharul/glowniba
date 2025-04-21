'use client'

import { getUsers } from "@/action/user";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { userIfodata } from "@/types/user";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState<{ items: userIfodata[]; totalItems: number; totalpage: number } | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // page state
  const limit = 6; // প্রতি পেজে কত user দেখাবে

  useEffect(() => {
    async function getUsersdata() {
      const responce = await getUsers(limit, currentPage);
      console.log(responce);
      if (responce.status === 200 && 'items' in responce) {
        setUsers({
          items: responce.items,
          totalItems: responce.totalItems,
          totalpage: responce.totalpage,
        });
      }else{
        console.log(responce);
      }
    }
    getUsersdata();
  }, [currentPage]); // page change hole data abar load hobe

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="w-fit mx-auto py-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-700">Users </h1>
        <p className="text-gray-500 text-sm">Manage your users and their information.</p>
      </div>
      
      <Table className="shadow-2xl shadow-gray-100 border border-gray-200 rounded-lg">
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead className="text-right">Email</TableHead>
            <TableHead className="text-right">Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.items.length>0 && users.items.map((user: userIfodata, key: number) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{(currentPage - 1) * limit + (key + 1)}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.number}</TableCell>
              <TableCell className="text-right">{user.email}</TableCell>
              <TableCell className="text-right">{user.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-700 text-white hover:bg-gray-600">
            <TableCell colSpan={4}>Total Users</TableCell>
            <TableCell className="text-right">{users.totalItems}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>

            {/* Previous Button */}
          <PaginationItem>
              <PaginationPrevious 
          className="cursor-pointer"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              />
            </PaginationItem>

  

            {users.totalpage && <PaginationItem>
              <PaginationNext 
             
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="cursor-pointer"
              />
            </PaginationItem>}


          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
