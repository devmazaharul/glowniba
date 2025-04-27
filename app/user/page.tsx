'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { userLogin } from '@/action/user'; // ✅ login action
import { CustomError } from '@/utils/error';
import { signInvalidation } from '@/utils/validation'; // ✅ login validation
import Spiner from '../components/others/Spiner';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Router for redirect after login

  const handleChange = (name: string, value: string) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (signInvalidation(state)) {
        const email = state.email.trim().toLowerCase();
        const password = state.password.trim();

        if (password === '') {
          return toast.warning('Please provide a password', {
            description:
              'Invalid password, please provide your current password',
          });
        }

        if (password.length < 6) {
          return toast.warning('Invalid credentials', {
            description: 'Please provide valid credentials for login',
            duration: 3000,
          });
        }

        // Call login action
        const res = await userLogin({ email, password });

        if (res.status === 200) {
          toast.success('Login Successful', {
            description: 'Welcome back!',
            duration: 5000,
          });
          // Redirect to dashboard or home page
          router.push('/dashboard');
        } else {
          throw new CustomError(res.message, res.status);
        }
      }
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        toast.warning(error.message, {
          description:
            error.status === 400
              ? 'Invalid credentials, please try again.'
              : 'Please try again later1',
          duration: 5000,
        });
      } else if (error instanceof Error) {
        toast.error(error.message, {
          description: 'Please try again later2',
          duration: 5000,
        });
      } else {
        toast.error('An unknown error occurred', {
          description: 'Please try again later3',
          duration: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="md:w-[400px] w-[80%] py-20 mx-auto">
        <div className="text-center py-3">
          <h1 className="text-xl pb-2 text-gray-700 font-semibold">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm">
            Login to continue your shopping journey with us.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input">
            <MdOutlineEmail className="text-gray-400 text-xl" />
            <input
              className="w-full outline-none"
              type="email"
              name="email"
              value={state.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
            />
          </div>

          <div className="input">
            <RiLockPasswordFill className="text-gray-400 text-xl" />
            <input
              className="w-full outline-none"
              type="password"
              name="password"
              value={state.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Password"
              aria-label="Password"
            />
          </div>

          <Button variant={'default'} className="w-full cursor-pointer py-3">
            {loading ? <Spiner /> : 'Log In'}
          </Button>
        </form>

        {/* other section */}
        <div className="flex text-sm py-3 px-1 items-center w-fit mx-auto gap-2">
          <p>Don&apos;t have an account?</p>
          <Link href={'/signup'} className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
