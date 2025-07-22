'use client';

import { NumberTicker } from '@/components/magicui/number-ticker';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCartStore } from '@/store/addTocart';
import { useEffect } from 'react';

export default function CheckoutProduct({totalAmount,productsId}:{totalAmount:(amount:number)=>void,productsId:(id:string[])=>void}) {
  const products = useCartStore().cart;
  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.price * (curr.quantity ?? 0),
    0
  );
  const totalDiscountPrice = products.reduce((acc, curr) => {
    if (curr.isDiscount) {
      return acc + (curr.price /100)*curr.discount * (curr.quantity ?? 0);
    }
    return acc;
  }, 0);
  
useEffect(() => {
  const ids = products.map((item) => item._id.toString());
  totalAmount(totalPrice);
  productsId(ids);
}, [products, totalPrice, totalAmount, productsId]);


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
        {[...products].slice(0,4).map((invoice) => (
          <TableRow key={invoice._id} >
            <TableCell className="font-medium">{invoice.name}</TableCell>
            <TableCell className="text-center">{invoice.quantity}</TableCell>
            <TableCell>{invoice.price}</TableCell>
            <TableCell className="text-right">
              {invoice.price * parseInt(String(invoice.quantity || 0))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableBody>
        <TableRow>
          <TableCell  colSpan={4} className='text-center text-gray-300 py-6'>-------------- {products.length>4  ? `And more ${products.length-4}x products` : "x"} ------------------</TableCell>
        </TableRow>
      </TableBody>

      <TableBody className=' py-2 my-2  bg-white shadow-2xl border-b last:border-0'>
        <TableRow>
          <TableCell colSpan={3} >Subtotal</TableCell>

          <TableCell className="text-right font-semibold">
         
            <NumberTicker
              value={totalPrice}
              className="whitespace-pre-wrap font-semibold tracking-tighter text-black dark:text-white"
            />
           ৳
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} >Discount</TableCell>

          <TableCell className="text-right font-semibold">
       
            <NumberTicker
              value={totalDiscountPrice}
              className="whitespace-pre-wrap font-semibold tracking-tighter text-black dark:text-white"
            />{' '}
           ৳
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} className='font-semibold'>Total</TableCell>

          <TableCell className="text-right font-semibold">
            {' '}
            <NumberTicker
              value={totalPrice-totalDiscountPrice}
              className="whitespace-pre-wrap font-semibold tracking-tighter text-black dark:text-white"
            />{' '}
           ৳
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
