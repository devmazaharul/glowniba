'use client';

import { getUsers, userDelete } from "@/action/user";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { userIfodata } from "@/types/user";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Spiner from "../components/others/Spiner";

export default function Page() {
  const [users, setUsers] = useState<{ items: userIfodata[]; totalItems: number; totalpage: number } | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const limit = 6;

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      const response = await getUsers(limit, page);
      if (response.status === 200 && 'items' in response) {
        setUsers({
          items: response.items,
          totalItems: response.totalItems,
          totalpage: response.totalpage,
        });
      } else {
        console.error(response);
        toast.error('Failed to load users.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: string) => {
    try {
      const res = await userDelete(id);
      if (res.status === 200) {
        toast.success(res.message);

        // UI থেকে সরিয়ে ফেলা
        setUsers((prev) => prev && {
          ...prev,
          items: prev.items.filter(user => user._id !== id),
          totalItems: prev.totalItems - 1,
        });
      } else {
        toast.error(res.message || 'Failed to delete.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    }
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    if (users) {
      setCurrentPage(prev => Math.min(prev + 1, users.totalpage));
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spiner color="#000"/>
      </div>
    );
  }

  if (!users || users.items.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 text-xl">
        No users found.
      </div>
    );
  }

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
            <TableHead className="w-[50px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead className="text-right">Email</TableHead>
            <TableHead className="text-right">Address</TableHead>
            <TableHead className="text-right">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.items.map((user: userIfodata, key: number) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{(currentPage - 1) * limit + (key + 1)}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.number}</TableCell>
              <TableCell className="text-right">{user.email}</TableCell>
              <TableCell className="text-right">{user.address}</TableCell>
              <TableCell className="text-right">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Button onClick={() => handleDelete(user._id)} variant="destructive" size="sm">
                  Delete
                </Button>
              </TableCell>
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

      {/* Pagination */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <Pagination>
          <PaginationContent>

            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
                className={`cursor-pointer ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
              />
            </PaginationItem>

            <PaginationItem>
              <div className="px-4 py-2 text-gray-600 text-sm">
                Page {currentPage} of {users.totalpage}
              </div>
            </PaginationItem>

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
