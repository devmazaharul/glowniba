'use client'
import { userIfo } from '@/types/user';
import React, { useEffect, useState } from 'react';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import PaginationUI from '../components/Paigination';
import { getUsers } from '@/action/user';
import { useSearchParams } from 'next/navigation';

const UsersTable = () => {
  const [state, setState] = useState<{ items: userIfo[]; totalpage: number }>({ items: [], totalpage: 0 });
  
  const searPara=useSearchParams().get("page")
  const currentPage=searPara?searPara:'1';
const limit=3
  useEffect(()=>{
    const getUsr=async()=>{
      const data=await getUsers(limit, parseInt(currentPage.toString()))
      if ('items' in data && 'totalpage' in data) {
        setState({
          items: data.items,
          totalpage: data.totalpage,
        });
      } else {
        console.error('Unexpected response format:', data);
      }
    }
    getUsr()
  },[currentPage])


  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[500px] max-w-[100%]">
      <table className="border border-gray-400">
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
        <tbody className="text-gray-600">
          {state && state.items.map((item: userIfo) => (
            <tr key={item._id} className="text-center">
              <td className="px-4 py-2 border font-medium border-gray-100 text-gray-600">
                <p className="bg-yellow-100 px-2 rounded-md">
                  #{item._id.toString().slice(0, 5)}
                </p>
              </td>
              <td className="px-2 py-2 border border-gray-100 text-emerald-800 w-8 h-6 rounded-md text-center">
                {Math.floor(Math.random() * 10)}
              </td>
              <td className="px-2 py-2 border border-gray-100">{item.name}</td>
              <td className="px-2 py-2 border border-gray-100">{item.number}</td>
              <td className="px-2 py-2 border border-gray-100">{item.email}</td>
              <td className="px-2 py-2 border border-gray-100">
                {new Date(item.createdAt).toLocaleDateString('en-us', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
              <td className="px-2 py-2 border border-gray-100">
                {item.address?.slice(0, 20)}
              </td>
              <td className="px-4 py-2 border text-center border-gray-100">
                <BsBookmarkCheckFill className="mx-auto text-green-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-3">
       {state &&  <PaginationUI currentPage={Number(currentPage)} totalPage={state && state.totalpage} />}
      </div>
    </div>
  );

}

export default UsersTable;
