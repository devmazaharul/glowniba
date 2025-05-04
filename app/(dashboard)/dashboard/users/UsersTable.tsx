"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { userIfo } from "@/types/user";
import { getUsers } from "@/action/user";
import { useSearchParams } from "next/navigation";
import PaginationUI from "../components/Paigination";
import { toast } from "sonner";
import { defaultValues } from "@/constants";

const UsersTable = () => {
  const [state, setState] = useState<{ items: userIfo[]; totalpage: number }>({
    items: [],
    totalpage: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortKey, setSortKey] = useState<keyof userIfo | "">("");
  const [sortAsc, setSortAsc] = useState(true);

  const searPara = useSearchParams().get("page");
  const currentPage = searPara ? searPara : "1";
  const limit = defaultValues.responceUserLimit;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getUsers(limit, parseInt(currentPage));
        if ("items" in data && "totalpage" in data) {
          setState({
            items: data.items,
            totalpage: data.totalpage,
          });
        } else {
          toast.error("Unexpected response format");
        }
      } catch  {
        toast.error("Error fetching users");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [currentPage, limit]);

  const filtered =state &&  state.items
    .filter((user) =>
      `${user.name} ${user.email} ${user.number}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((user) => {
      if (status === "all") return true;
      if(status=="today"){
        const dateMake=new Date().toLocaleDateString("en-us",{
          day:"2-digit",
          month:"short",
          year:"numeric"
        })
        return new Date(user.createdAt).toLocaleDateString("en-us",{
          day:"2-digit",
          month:"short",
          year:"numeric"
        }).includes(dateMake)
      }
      
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return 0;
    });

  const toggleSort = (key: keyof userIfo) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const fakeRows = Array.from({ length: 10 });

  return (
    <div className="max-w-full">
      {/* Search & Filter */}
      <div className="flex gap-2 mx-2 my-4 items-center">
        <Input
          placeholder="Search by name, email or number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="today">today</SelectItem>
            {/* Add more statuses as needed */}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border max-h-[500px] overflow-y-scroll shadow-2xl shadow-gray-100 overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-700">
            <TableRow>
              <TableHead onClick={() => toggleSort("_id")} className={`${sortKey=="_id" ? 'text-green-400':"text-gray-200"} cursor-pointer `}>
                ID {sortKey === "_id" && sortAsc &&  "Dec"}
              </TableHead>
              <TableHead className="text-gray-200">Orders</TableHead>
              <TableHead onClick={() => toggleSort("name")}className={`${sortKey=="name"?'text-green-400':"text-gray-200"} cursor-pointer`}>
                Name {sortKey === "name" && sortAsc &&  "Sorted"}
              </TableHead>
              <TableHead className="text-gray-200">Number</TableHead>
              <TableHead className="text-gray-200 text-center">Email</TableHead>
              <TableHead className="text-gray-200">Date</TableHead>
              <TableHead className="text-gray-200">Address</TableHead>
              <TableHead className="text-gray-200"> Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? fakeRows.map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <TableCell key={idx}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : filtered.map((user) => (
                  <TableRow key={user._id} className="border border-gray-100">
                    <TableCell>
                      <span className="bg-yellow-100 px-2 py-1 rounded text-sm font-medium text-gray-700">
                        #{user._id.slice(0, 5)}
                      </span>
                    </TableCell>
                    <TableCell>{Math.floor(Math.random() * 10)}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.number}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>{user.address?.slice(0, 20)}</TableCell>
                    <TableCell className="text-center">
                      <BsBookmarkCheckFill className="text-green-500 mx-auto" />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
          {/* Pagination */}

      {!isLoading && <div className="my-4">
        <PaginationUI currentPage={Number(currentPage)} totalPage={state.totalpage} />
      </div>}
      </div>

    

    </div>
  );
};

export default UsersTable;
