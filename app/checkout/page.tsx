'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useCartStore } from '@/store/addTocart';
import Image from 'next/image';
import { toast } from 'sonner';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { districData, divisionData, unionData, upazilaData } from "@/lib/address";
import Link from 'next/link';
import { checkoutValidation } from '@/utils';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CheckoutPage() {
  const [divisionId, setDivisionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [upazilaId, setUpazilaId] = useState("");
  const [unionId, setUnionId] = useState("");
  const [agree, setAgree] = useState(false);

  const { cart } = useCartStore();
  const [info, setInfo] = useState({
    name: '',
    phone: '',
    instraction: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const filteredDistricts = districData.filter(
    (item) => parseInt(item.division_id) === parseInt(divisionId)
  );
  const filteredUpazilas = upazilaData.filter(
    (item) => parseInt(item.district_id) === parseInt(districtId)
  );
  const filteredUnions = unionData.filter(
    (item) => parseInt(item.upazilla_id) === parseInt(upazilaId)
  );

  const selectedDivision = divisionData.find((item) => parseInt(item.id) === parseInt(divisionId));
  const selectedDistrict = districData.find((item) => parseInt(item.id) === parseInt(districtId));
  const selectedUpazila = upazilaData.find((item) => parseInt(item.id) === parseInt(upazilaId));
  const selectedUnion = unionData.find((item) => parseInt(item.id) === parseInt(unionId));

  const makeAddressObject =
    divisionId &&
    districtId &&
    upazilaId &&
    unionId
      ? {
          division: selectedDivision?.bn_name || "",
          district: selectedDistrict?.bn_name || "",
          upazela: selectedUpazila?.bn_name || "",
          union: selectedUnion?.bn_name || "",
        }
      : undefined;

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 0),
    0
  );

  const handlePlaceOrder = async() => {
    if(!checkoutValidation({ info, address: makeAddressObject || {} })) return
    
    if (!agree) {
      toast.warning('Please accept terms and conditions.', {
        description: "You must accept the terms and conditions to proceed.",
        duration: 3000,
      });
      return;
    }
 
try {
   const orderData = {
      ...info,
      address: makeAddressObject,
      products: cart,
      totalPrice,
    };
  await placeOrderUsers({orderData});
} catch {
  toast.error('Failed to place order. Please try again.', {
    description: "There was an error placing your order. Please try again later.",
    duration: 3000,
  });
  
}
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 className="text-3xl font-bold  mt-8 mb-3" variants={itemVariants}>
        Checkout
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-18">
        {/* Left: Shipping Form */}
        <motion.div variants={itemVariants}>
          <Card className='shadow-2xl shadow-gray-100'>
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-semibold">Shipping Details</h3>
              <Input onChange={handleInputChange} name='name' value={info.name} className='h-10 border-gray-200 shadow-gray-100' placeholder="Full Name" />
              <Input onChange={handleInputChange} name='phone' value={info.phone} placeholder="Phone Number" className='h-10 border-gray-200 shadow-gray-100' />

              {/* Address Selection */}
              <div className="grid grid-cols-1 w-full sm:grid-cols-2 gap-4">
                <Select  value={divisionId} onValueChange={(value) => {
                  setDivisionId(value);
                  setDistrictId(""); setUpazilaId(""); setUnionId("");
                }}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisionData.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.bn_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={districtId} onValueChange={(value) => {
                  setDistrictId(value);
                  setUpazilaId(""); setUnionId("");
                }} disabled={!divisionId}>
                  <SelectTrigger className='w-full' >
                    <SelectValue placeholder="জেলা নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredDistricts.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.bn_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={upazilaId} onValueChange={(value) => {
                  setUpazilaId(value);
                  setUnionId("");
                }} disabled={!districtId}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredUpazilas.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.bn_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={unionId} onValueChange={setUnionId} disabled={!upazilaId}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="ইউনিয়ন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredUnions.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.bn_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

       

              <Textarea className='h-10 border-gray-200 shadow-gray-100' onChange={handleInputChange} name='instraction' value={info.instraction} placeholder="Delivery Instructions (optional)" />

       {makeAddressObject && (
                <div className="mt-4 bg-green-100 p-4 rounded-md text-sm">
                  ✅ আপনার ঠিকানা:
                  <strong className="block mt-1">
                    {selectedDivision?.bn_name} → {selectedDistrict?.bn_name} → {selectedUpazila?.bn_name} → {selectedUnion?.bn_name}
                  </strong>
                </div>
              )}

            </CardContent>
          </Card>
        </motion.div>

        {/* Right: Order Summary */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <Card className='shadow-2xl shadow-gray-100'>
            <CardContent>
              <h3 className="text-lg font-semibold pb-3">Order Summary</h3>
              {cart.map((item) => (
                <div key={item.productID} className="flex justify-between text-sm m-1 px-2 leading-8">
                  <div className='flex items-center'>
                    <b className='pr-2'>x {item.quantity} -</b>
                    <span>{item.name}</span>
                  </div>
                  <span className='font-semibold'>৳ {item.price * (item.quantity ?? 1)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold pt-2 border-t mt-6">
                <span>Total</span>
                <span>৳ {totalPrice}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className='shadow-2xl shadow-gray-100'>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-center pb-2">Payment Method</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked />
                  <b>Cash on Delivery</b>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="payment" />
                  <Image  className='rounded-xl' src="https://downloadr2.apkmirror.com/wp-content/uploads/2022/08/84/62f92578037f0.png" width={40} height={40} alt="Bkash" />
                  <b>Bkash</b>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="payment" />
                  <Image src="https://play-lh.googleusercontent.com/9ps_d6nGKQzfbsJfMaFR0RkdwzEdbZV53ReYCS09Eo5MV-GtVylFD-7IHcVktlnz9Mo" width={40} height={40} alt="Nagad" />
                  <b>Nagad</b>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Submit */}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={agree} onCheckedChange={() => setAgree(!agree)} />
            <label htmlFor="terms" className="text-sm cursor-pointer">
              I agree to the <Link className='text-blue-400' href={"/policies/terms-conditions"}>terms and conditions</Link>
            </label>
          </div>

          <Button onClick={handlePlaceOrder} className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 ">
            Place Order
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
