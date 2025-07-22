'use client';
import { Button } from '@/components/ui/button';
import { checkOutValidation } from '@/utils';
import {useState } from 'react';
import { MdOutlineLock } from 'react-icons/md';
import { toast } from 'sonner';
import { addressField } from './Compo/SelectAddress';
import { MdLabelImportant } from 'react-icons/md';

export interface ProcessProps {
  address: addressField;
  basicInfo: {
    fullName: string;
    email: string;
    number: string;
  };
  productInfo: string[];
  paymentInfo: {
    paymentMetodName: string | null;
    totalAmount: number | null;
    orderPlaceTime: string;
  };
}

export default function Process({ orderInfo }: { orderInfo: ProcessProps }) {
    const { address, basicInfo, productInfo } = orderInfo;

  const [isProcess, setIsprocess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleOrder = () => {
    setIsprocess(true);
    setDisabled(true);
    try {
      const result = checkOutValidation({ address, basicInfo,productInfo });
      if (result) {
        const {
          status,
          message,
          key,
        }: { status: boolean; message: string; key: string } = result;
        //result status false == all validation done
        if (status == false) {
          //call order api
        //  const responce= createOrder({basicInfo,address,productInfo,paymentInfo})
  
         toast('Order has been successfully places', {
              description:
                'Your order has been placed successfully. Thank you for shopping with us! ',
              duration: 3000,
              icon: <MdLabelImportant className="text-green-500" size={20} />,
              style: {
                backgroundColor: 'var(--popover)',
                color: 'var(--popover-foreground)',
              },
            });
     


        } else {
          setDisabled(false);
          toast.error(message, {
            description: `Please check your ${key} field.`,
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.log('Error during order processing:', error);
    } finally {
      //setIsprocess(false);
    }
  };

  return (
    <div>
      <div className="my-10">
        <Button
          disabled={disabled}
          variant="secondary"
          onClick={handleOrder}
          className="w-full hover:bg-purple-500 bg-purple-600 text-white cursor-pointer font-semibold"
        >
          {isProcess ? 'Processing...' : <>Pay now</>}
        </Button>

        <div className="py-8 px-3 max-w-xl ">
          <p className="flex items-center gap-2 font-semibold text-gray-800 text-md">
            <MdOutlineLock className="text-purple-500" size={20} />
            Secure Checkout - SSL Encrypted
          </p>
          <p className="mt-1 text-gray-400 leading-relaxed text-sm">
            Your payment information is encrypted and protected <br />
            for your safety.
          </p>
        </div>
      </div>
    </div>
  );
}
