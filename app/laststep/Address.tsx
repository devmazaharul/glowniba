'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MagicCard } from '@/components/magicui/magic-card';
import { useTheme } from 'next-themes';
import PaymentMethod from './Compo/PaymentMethod';
import CheckoutProduct from './Compo/CheckoutProduct';
import SelectAddress, { addressField } from './Compo/SelectAddress';
import Process from './Process';
import { useCallback, useState } from 'react';
import { avableAblepaymentMethods } from '@/constants';

export function Address() {


  //basci info object
  const basicInfo = {
    fullName: '',
    email: '',
    number: '',
  };

  //selected payment method info
  const [selectedMethod, setSelectedMethod] = useState<string | null>('cod');
  const [totamAmount, setTotalAmount] = useState<number | null>(null);
  const [info, setInfo] = useState({ ...basicInfo });
  const [address, setAddress] = useState<addressField | null>(null);
  const [productsId, setProductsid] = useState<string[] | null>(null);

const handleTotalAmount = useCallback((amount: number) => {
  setTotalAmount(amount);
}, []);

const handleProductsId = useCallback((ids: string[]) => {
  setProductsid(ids);
}, []);



  const handleChange = (name: string, value: string) => {
    setInfo((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const orderObject = {
    address: {
      division: address?.division ?? '',
      district: address?.district ?? '',
      upazila: address?.upazila ?? '',
      union: address?.union ?? '',
    },
    basicInfo: {
      ...info,
    },
    paymentInfo: {
      paymentMetodName: selectedMethod,
      totalAmount: totamAmount,
      orderPlaceTime: new Date().toLocaleTimeString()
    },
    productInfo: productsId ?? []
  };

  const { theme } = useTheme();
  return (
    <Card className="p-0 max-w-full w-full shadow-none border-none">
      <MagicCard
        gradientColor={theme === 'dark' ? '#262626' : '#D9D9D955'}
        className="p-0"
      >
        <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
          <CardTitle>Check out</CardTitle>
          <CardDescription>
            Secure checkout and get your product easyliy
          </CardDescription>
        </CardHeader>
        <CardContent className="w-fit my-6 ">
          <div>
            <h1 className="text-md font-semibold py-2">Payment option</h1>
          </div>

          <div className="grid grid-cols-4 gap-3.5">
            {avableAblepaymentMethods.map((method) => (
              <PaymentMethod
                key={method.name}
                name={method.name}
                url={method.url}
                selected={selectedMethod === method.name}
                onSelect={() => setSelectedMethod(method.name)}
              />
            ))}
          </div>
        </CardContent>

        <div className="md:flex  justify-between ">
          <CardContent className="p-4 md:w-[50%] md:border-r md:border-dashed md:mb-2  ">
            <div>
              <h1 className="text-md font-semibold py-4">Basic info</h1>
            </div>
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full name </Label>
                  <Input
                    id="name"
                    type="texr"
                    value={info.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Jhone doe"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="number">Number </Label>
                  <Input
                    id="number"
                    type="number"
                    placeholder="017xxxx98"
                    value={info.number}
                    onChange={(e) => handleChange('number', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email address </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Jhone@gmail.com"
                    onChange={(e) => handleChange('email', e.target.value)}
                    value={info.email}
                  />
                </div>
              </div>

              <div>
                <h1 className="text-md font-semibold py-4">Address fill up</h1>
                <div>
                  <SelectAddress
                    getAddressfromProp={(address) => setAddress(address)}
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardContent className="p-4 md:w-[50%] ">
            <h1 className="text-xl font-semibold py-4">Review your cart</h1>
            <CheckoutProduct
              totalAmount={handleTotalAmount}
              productsId={handleProductsId}
            />
            <Process orderInfo={orderObject} />
          </CardContent>
        </div>
      </MagicCard>
    </Card>
  );
}
