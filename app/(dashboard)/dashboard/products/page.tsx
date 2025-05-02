'use client';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RiDeleteBinLine } from "react-icons/ri";
import { TbShoppingBagEdit } from "react-icons/tb";

const products = [
  {
    id: '1',
    name: 'Jigott Sunblock SPF50+',
    category: 'sunblock',
    price: 520,
    discount: 10,
    stock: 120,
    brand: 'Jigott',
    status: 'new',
  },
  {
    id: '2',
    name: 'Vitamin C Serum',
    category: 'serum',
    price: 850,
    discount: 0,
    stock: 50,
    brand: 'GlowSkin',
    status: 'best-selling',
  },
  {
    id: '3',
    name: 'Aloe Vera Gel',
    category: 'moisturizer',
    price: 350,
    discount: 15,
    stock: 30,
    brand: 'Nature Republic',
    status: 'eid-special',
  },
];

const ProductsTable = () => {
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
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
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
