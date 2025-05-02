'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RiDeleteBinLine } from "react-icons/ri";
import { TbShoppingBagEdit } from "react-icons/tb";
import { getProducts } from '@/action/product';
import { AddproductItem } from '@/types';
import Image from 'next/image';


const ProductsTable = () => {
  
  const [products,setProducts]=useState<AddproductItem[]>([])
  useEffect(()=>{
    const getproducts=async()=>{
      const res=await getProducts()
      if("items" in res){
        console.log(res.items);
        setProducts(res.items)
      }
    }
    getproducts()
  },[])


  return (
    <div className="p-6">
      <div className='flex items-center justify-between'>
      <h2 className="text-2xl font-semibold mb-4">All Products</h2>
      <div>
        <Link className=' py-2' href={"/dashboard/products/add"}>
        <Button className='bg-gray-700 cursor-pointer '>Add</Button>
        </Link>
      </div>

      </div>
      <div className="rounded-md border shadow-2xl shadow-gray-100 border-gray-200 overflow-x-auto">
        <Table >
          <TableHeader className='bg-gray-600 '>
            <TableRow className='text-white'>
              <TableHead className='text-gray-200'>Image</TableHead>
              <TableHead className='text-gray-200'>Name</TableHead>
              <TableHead className='text-gray-200'>Category</TableHead>
              <TableHead className='text-gray-200'>Brand</TableHead>
              <TableHead className='text-gray-200'>Status</TableHead>
              <TableHead className="text-right text-gray-200">Stock</TableHead>
              <TableHead className="text-right text-gray-200">Price</TableHead>
              <TableHead className="text-right text-gray-200">Discount</TableHead>
              
              <TableHead className='text-center text-gray-200'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.productID}>
                <TableCell className="font-medium overflow-hidden">
                  <Image src={product.image || ""} className='w-8 h-8 rounded-sm  bg-center' width={500} height={500} alt={product.name}/>
                </TableCell>
                <TableCell className="font-medium overflow-hidden">{product.name.slice(0,20)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className='text-left'>{product.status}</Badge>
                </TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell className="text-right">৳{product.price}</TableCell>
                <TableCell className="text-center">
                  {product.discount > 0 ? (
                    <Badge variant="secondary">{product.discount}%</Badge>
                  ) : (
                    '-'
                  )}
                </TableCell>
                
                <TableCell className="text-center ">
                  <div className="flex gap-4  w-fit mx-auto">
                    <Link href={'/'}  className='cursor-pointer' >
                            <TbShoppingBagEdit className='text-xl '/>
                    </Link>
                    <button  className='cursor-pointer'><RiDeleteBinLine className='fill-red-500 hover:fill-red-400 text-xl'/></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsTable;
