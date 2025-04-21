'use client';

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
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const limit = 6; 

  useEffect(() => {
    async function getUsersData() {
      const response = await getUsers(limit, currentPage);
      if (response.status === 200 && 'items' in response) {
        setUsers({
          items: response.items,
          totalItems: response.totalItems,
          totalpage: response.totalpage,
        });
      } else {
        console.error(response);
      }
    }
    getUsersData();
  }, [currentPage]);

  if (!users) {
    return <div>Loading...</div>;
  }

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, users.totalpage));
  };

  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="w-fit mx-auto py-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-700">Users</h1>
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
          {users.items.length > 0 ? (
            users.items.map((user: userIfodata, key: number) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{(currentPage - 1) * limit + (key + 1)}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.number}</TableCell>
                <TableCell className="text-right">{user.email}</TableCell>
                <TableCell className="text-right">{user.address}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-700 text-white hover:bg-gray-600">
            <TableCell colSpan={4}>Total Users</TableCell>
            <TableCell className="text-right">{users.totalItems}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Pagination */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <Pagination>
          <PaginationContent>

            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
                className={`cursor-pointer ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
              />
            </PaginationItem>

            {/* Current Page Show */}
            <PaginationItem>
              <div className="px-4 py-2 text-gray-600 text-sm">
                Page {currentPage} of {users.totalpage}
              </div>
            </PaginationItem>

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                onClick={handleNext}
                className={`cursor-pointer ${currentPage === users.totalpage ? 'opacity-50 pointer-events-none' : ''}`}
              />
            </PaginationItem>

          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
