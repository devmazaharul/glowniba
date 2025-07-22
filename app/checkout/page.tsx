// 'use client';
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent } from '@/components/ui/card';
// import { Checkbox } from '@/components/ui/checkbox';
// import { useCartStore } from '@/store/addTocart';
// import Image from 'next/image';
// import { toast } from 'sonner';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// import {
//   districData,
//   divisionData,
//   unionData,
//   upazilaData,
// } from '@/lib/address';
// import Link from 'next/link';
// import { checkoutValidation } from '@/utils';
// import { placeOrderUsers } from '@/action/order';
// import { Space_Grotesk } from 'next/font/google';
// import { useRouter } from 'next/navigation';

// const containerVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.1,
//       duration: 0.5,
//       ease: 'easeOut',
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const fontSetup=Space_Grotesk({
//   weight:"400",
//   style:"normal",
//   subsets:["latin"]
// })


// export default function CheckoutPage() {
//   const [divisionId, setDivisionId] = useState('');
//   const [districtId, setDistrictId] = useState('');
//   const [upazilaId, setUpazilaId] = useState('');
//   const [unionId, setUnionId] = useState('');
//   const [agree, setAgree] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('cod');
//   const [loading, setLoading] = useState(false);
// const router=useRouter()
//   const { cart } = useCartStore();
//   const [info, setInfo] = useState({
//     name: '',
//     phone: '',
//     instraction: '',
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const filteredDistricts = districData.filter(
//     (item) => parseInt(item.division_id) === parseInt(divisionId)
//   );
//   const filteredUpazilas = upazilaData.filter(
//     (item) => parseInt(item.district_id) === parseInt(districtId)
//   );
//   const filteredUnions = unionData.filter(
//     (item) => parseInt(item.upazilla_id) === parseInt(upazilaId)
//   );

//   const selectedDivision = divisionData.find(
//     (item) => parseInt(item.id) === parseInt(divisionId)
//   );
//   const selectedDistrict = districData.find(
//     (item) => parseInt(item.id) === parseInt(districtId)
//   );
//   const selectedUpazila = upazilaData.find(
//     (item) => parseInt(item.id) === parseInt(upazilaId)
//   );
//   const selectedUnion = unionData.find(
//     (item) => parseInt(item.id) === parseInt(unionId)
//   );

//   const makeAddressObject =
//     divisionId && districtId && upazilaId && unionId
//       ? {
//           division: selectedDivision?.bn_name || '',
//           district: selectedDistrict?.bn_name || '',
//           upazela: selectedUpazila?.bn_name || '',
//           union: selectedUnion?.bn_name || '',
//         }
//       : undefined;

//   const totalPrice = cart.reduce((total, item) => {
//     if (item?.isDiscount) {
//       const discountPrice =
//         (item.price - (item.price * (item.discount || 0)) / 100) *
//         (item?.quantity || 0);
//       total = total + discountPrice;
//     } else {
//       total = total + item.price * (item.quantity || 0);
//     }
//     return parseInt(total.toString());
//   }, 0);

//   const handlePlaceOrder = async () => {
//     try {
//       setLoading(true);
//       if (!checkoutValidation({ info, address: makeAddressObject || {} })){
//         return
//       }
//       if (!agree) {
//         toast.warning('Please accept terms and conditions.', {
//           description: 'You must accept the terms and conditions to proceed.',
//           duration: 3000,
//         });
//         return;
//       }

// const orderproductInfo = cart.reduce<{ productId: string; quantity: number | undefined; price: number }[] >((acc, curr) => {
//         acc.push({
//           productId: curr._id,
//           quantity: curr.quantity,
//           price: curr.isDiscount
//             ? curr.price - (curr.price * (curr.discount || 0)) / 100
//             : curr.price,
//         });
//         return acc;
//       }, []);

//       const orderData = {
//         ...info,
//         address: makeAddressObject,
//         products: orderproductInfo,
//         paymentMethod,
//         totalAmount: totalPrice,
//       };

//       const responce = await placeOrderUsers(orderData);

//       if (responce?.status == 200 ) {
//         router.replace(responce?.item?.url)
//       }
//       if(responce.status==201){
//         toast.success("Order placess...")
//       }
//     } catch (err) {
//       toast.error('Failed to place order. Please try again.', {
//         description:
//           'There was an error placing your order. Please try again later.',
//         duration: 3000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (


//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-18">
//         {/* Left: Shipping Form */}
      

//         <motion.div className="space-y-4" variants={itemVariants}>
//           <Card className="shadow-2xl shadow-gray-100 border border-gray-100">
//             <CardContent>
//               <h3 className="text-lg font-semibold pb-3">Order Summary</h3>
//               <div className="max-h-[300px] overflow-scroll">
//                 {cart.map((item) => (
//                   <div
//                     key={item.productID}
//                     className="flex  justify-between text-sm m-1 px-2 leading-8"
//                   >
//                     <div className="flex items-center">
//                       <b className="pr-2 ">x {item.quantity} -</b>
//                       <span className="">{item.name}</span>
//                     </div>
//                     <span className="font-semibold ">
//                       ৳ {item.price * (item.quantity ?? 1)}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex justify-between font-semibold pt-2 border-t mt-6">
//                 <span>Total</span>
//                 <span>৳ {totalPrice}</span>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Payment Method */}
//           <Card className="shadow-2xl shadow-gray-100 border border-gray-100">
//             <CardContent className="p-4">
//               <h3 className="text-lg font-semibold text-center pb-2">
//                 Payment Method
//               </h3>
//               <div className="space-y-3 text-sm">

//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="cod"
//                     checked={paymentMethod === 'cod'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   <b>Cash on Delivery</b>
//                 </label>

//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="mazapay"
//                     checked={paymentMethod === 'mazapay'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                     <Image
   
//                     src="/mazapay.png"
//                     width={30}
//                     height={30}
//                     alt="Bkash"
//                   />
//                   <b>MazaPay</b>
//                 </label>

//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="bkash"
//                     checked={paymentMethod === 'bkash'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   <Image
   
//                     src="https://freelogopng.com/images/all_img/1656234841bkash-icon-png.png"
//                     width={30}
//                     height={30}
//                     alt="Bkash"
//                   />
//                   <b>Bkash</b>
//                 </label>

//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="nagad"
//                     checked={paymentMethod === 'nagad'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   <Image
//                     src="https://play-lh.googleusercontent.com/9ps_d6nGKQzfbsJfMaFR0RkdwzEdbZV53ReYCS09Eo5MV-GtVylFD-7IHcVktlnz9Mo"
//                     width={40}
//                     height={40}
//                     alt="Nagad"
//                   />
//                   <b>Nagad</b>
//                 </label>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Terms and Submit */}
//           <div className="flex items-center space-x-2">
//             <Checkbox
//               id="terms"
//               checked={agree}
//               onCheckedChange={() => setAgree(!agree)}
//             />
//             <label htmlFor="terms" className="text-sm cursor-pointer">
//               I agree to the{' '}
//               <Link
//                 className="text-blue-400"
//                 href={'/policies/terms-conditions'}
//               >
//                 terms and conditions
//               </Link>
//             </label>
//           </div>

//           <Button
//             onClick={handlePlaceOrder}
//             className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 "
//           >
//             {loading ? 'Processing...' : 'Place Order'}
//           </Button>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
