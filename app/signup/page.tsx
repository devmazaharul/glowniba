'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { MdOutlineNumbers } from 'react-icons/md';
import { FaRegAddressBook } from 'react-icons/fa';
import { toast } from 'sonner';
import { userRegister } from '@/action/user';
import { CustomError } from '@/utils/error';
import { signupValidation } from '@/utils/validation';
import Spiner from '../components/others/Spiner';

const Page = () => {
  //signup state
  const [state, setState] = React.useState({
    email: '',
    password: '',
    name: '',
    number: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);
const [isChacked,setIschaked]=useState(false)
  const handlechange = (name: string, value: string) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      if (signupValidation(state)) {
        const name = state.name.trim().toLocaleLowerCase();
        const email = state.email.trim().toLocaleLowerCase();
        const address = state.address.trim().toLocaleLowerCase();
        const password = state.password.trim();
        const number = state.number;
        if(isChacked==false){
          toast.error("Please agree privecy and policy")
          return 
        }
        const res = await userRegister({
          name,
          email,
          address,
          number,
          password,
        });

        if (res.status === 200) {
          toast.success('Successfully account created', {
            description: 'You can now login to your account',
            duration: 5000,
          });
          setState({
            email: '',
            password: '',
            name: '',
            number: '',
            address: ''
          })
        } else {
          throw new CustomError(res.message, res.status);
        }
      }
    } catch (error) {
      if (error instanceof CustomError) {
        toast.warning(error.message, {
          description:
            error.status === 400
              ? 'Please try again with correct information or login'
              : 'Please try again later',
          duration: 5000,
        });
      } else if (error instanceof Error) {
        toast.error(error.message, {
          description: 'Please try again later',
          duration: 5000,
        });
      } else {
        toast.error('An unknown error occurred', {
          description: 'Please try again later',
          duration: 5000,
        });
      }
    } finally {
      setLoading(false);
     
    }
  };

  return (
    <div>
      <div className="md:w-[400px] py-4 w-[80%] mt-10 mx-auto">
        <div className="text-center py-3">
          <h1 className="text-xl pb-2  text-gray-700 font-semibold">
            Create Your Account
          </h1>
          <p className="text-gray-400 text-sm">
            Join us today and enjoy a personalized shopping experience with
            exclusive offers.
          </p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="input">
            <User className="text-gray-400 text-xl" />
            <input
              className="w-full outline-none"
              type="text"
              name="name"
              value={state.name}
              onChange={(e) => handlechange('name', e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="input">
            <MdOutlineEmail className="text-gray-400 text-xl" />
            <input
              className="w-full outline-none"
              type="email"
              name="email"
              value={state.email}
              onChange={(e) => handlechange('email', e.target.value)}
              placeholder="Email address"
            />
          </div>
          <div className="input">
            <MdOutlineNumbers className="text-gray-400 text-xl" />
            <input
              className="w-full outline-none"
              type="number"
              name="number"
              value={state.number}
              onChange={(e) => handlechange('number', e.target.value)}
              placeholder="Phone number"
            />
          </div>
          <div className="input">
            <FaRegAddressBook className="text-gray-400 text-xl" />
            <input
              className="w-full outline-none"
              type="text"
              name="address"
              value={state.address}
              onChange={(e) => handlechange('address', e.target.value)}
              placeholder="Address"
            />
          </div>

          <div className="input">
            <RiLockPasswordFill className="text-gray-400 text-xl" />
            <input
              className="w-full outline-none"
              type="password"
              name="password"
              value={state.password}
              onChange={(e) => handlechange('password', e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className='flex items-center gap-1 pb-2'>
            <input type="checkbox" checked={isChacked} onChange={() =>setIschaked(!isChacked)} />
            <div className='text-gray-500 text-sm'>I agree to glow niba 
           
               <Link className='text-blue-400 px-1' href={'/policies/privacy-policy'}>privecy policy</Link>  </div>
          </div>

          <Button variant={'default'} className="w-full cursor-pointer py-3">
            {loading ? <Spiner /> : ' sign up'}
          </Button>
        </form>
        {/* other section */}
        <div className="flex text-sm  py-3 px-1  items-center w-fit mx-auto gap-2">
          <p>Already have an account?</p>
          <Link href={'/user'} className="text-blue-500">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
