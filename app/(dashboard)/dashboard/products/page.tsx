'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TbShoppingBagEdit } from 'react-icons/tb';
import { deleteproductByID, getProducts } from '@/action/product';

import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton'; // 🟢 Import Skeleton
import { productInformation } from '@/types/product';
import { toast } from 'sonner';

const ProductsTable = () => {
  const [products, setProducts] = useState<productInformation[]>([]);
  const [loading, setLoading] = useState(true); // 🟢 Loading state
  useEffect(() => {
    const getproducts = async () => {
      const res = await getProducts();
      if ('items' in res) {
        setProducts(res.items.reverse());
      }
      setLoading(false); // 🟢 End loading
    };
    getproducts();
  }, []);

  const handleProductDelete = async (productid: string) => {
    try {
      const responce = await deleteproductByID(productid);
      if (responce?.status == 200) {
        setProducts(products.filter((item) => item.productID !== productid));
        toast.success('Product has been deleted');
      }
    } catch (e) {
      console.log(e);
      toast.error('Product has not deleted');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">All Products</h2>
        <Link className="py-2" href={'/dashboard/products/add'}>
          <Button className="bg-gray-700 cursor-pointer">Add</Button>
        </Link>
      </div>

      <div className="rounded-md max-h-[500px] overflow-y-scroll border shadow-2xl shadow-gray-100 border-gray-200 overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-600">
            <TableRow className="text-white">
              <TableHead className="text-gray-200">Image</TableHead>
              <TableHead className="text-gray-200">Name</TableHead>
              <TableHead className="text-gray-200">Category</TableHead>
              <TableHead className="text-gray-200">Brand</TableHead>
              <TableHead className="text-gray-200">Status</TableHead>
              <TableHead className="text-right text-gray-200">Stock</TableHead>
              <TableHead className="text-right text-gray-200">Price</TableHead>
              <TableHead className="text-right text-gray-200">
                Discount
              </TableHead>
              <TableHead className="text-center text-gray-200">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton className="h-8 w-8 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[120px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[80px]" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-[50px]" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-[60px]" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-4 w-[40px] mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-6 w-[60px] mx-auto" />
                    </TableCell>
                  </TableRow>
                ))
              : products.map((product) => (
                  <TableRow key={product.productID}>
                    <TableCell className="font-medium overflow-hidden">
                      <Image
                        src={product.image || ''}
                        className="w-8 h-8 rounded-sm bg-center"
                        width={500}
                        height={500}
                        alt={product.name}
                      />
                    </TableCell>
                    <TableCell className="font-medium overflow-hidden">
                      {product.name.slice(0, 20)}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {product.stock}
                    </TableCell>
                    <TableCell className="text-right">
                      ৳{product.price}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.discount > 0 ? (
                        <Badge variant="secondary">{product.discount}%</Badge>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-4 w-fit mx-auto">
                        <Link href={'/'} className="cursor-pointer">
                          <TbShoppingBagEdit className="text-xl" />
                        </Link>
                        <button
                          onClick={() => handleProductDelete(product.productID)}
                          className="cursor-pointer"
                        >
                          <RiDeleteBinLine className="fill-red-500 hover:fill-red-400 text-xl" />
                        </button>
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
