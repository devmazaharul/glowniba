'use client';
export const dynamic = 'force-dynamic';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
import { Skeleton } from '@/components/ui/skeleton';
import { productInformation } from '@/types/product';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import PaginationUI from '../components/Paigination';

const ProductsTable = () => {
  const [products, setProducts] = useState<productInformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);

  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const limit = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProducts(limit, currentPage);
      if ('items' in res) {
        setProducts(res.items);
        setTotalPage(res?.totalpage || 1);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [limit, currentPage]);

  const handleProductDelete = async (productID: string) => {
    try {
      const response = await deleteproductByID(productID);
      if (response?.status === 200) {
        setProducts((prev) => prev.filter((item) => item.productID !== productID));
        toast.success('Product has been deleted');
      }
    } catch (e) {
      console.error(e);
      toast.error('Product deletion failed');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">All Products</h2>
        <Link href="/dashboard/products/add">
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
              <TableHead className="text-right text-gray-200">Discount</TableHead>
              <TableHead className="text-center text-gray-200">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <TableRow key={idx}>
                    {[...Array(9)].map((_, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-4 w-[80px]" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : products.map((product) => (
                  <TableRow key={product.productID}>
                    <TableCell>
                      <Image
                        src={product.image || ''}
                        className="w-8 h-8 rounded-sm bg-center"
                        width={500}
                        height={500}
                        alt={product.name}
                      />
                    </TableCell>
                    <TableCell>{product.name.slice(0, 20)}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.status}</Badge>
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
                    <TableCell className="text-center">
                      <div className="flex gap-4 justify-center">
                        <Link href={`/dashboard/products/edit/${product.productID}`}>
                          <TbShoppingBagEdit className="text-xl cursor-pointer" />
                        </Link>


                        
 <div>
                    <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline" className="cursor-pointer border-0 shadow-none">
    <RiDeleteBinLine className="text-xl fill-red-500 hover:fill-red-400 cursor-pointer" />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This product will be permanently delete from your store.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
      <AlertDialogAction
        className="bg-gray-700 hover:bg-gray-600 cursor-pointer "
        onClick={() => {
          handleProductDelete(product.productID)
        
        }}
      >
        Yes, Remove
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </div>



                      
                        
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {!loading && (
        <div className="my-4">
          <PaginationUI currentPage={currentPage} totalPage={totalPage} />
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
