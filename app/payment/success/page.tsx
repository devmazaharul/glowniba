
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
     <div className="min-h-screen py-30 flex items-center justify-center  text-gray-800">
        <div className=" rounded-xl p-10 max-w-md w-2/3 text-center">
          {/* ✅ Success Icon */}
          <div className="mb-6 flex justify-center items-center">
            <svg
              className="w-20 h-20 text-green-500 animate-bounce"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 
                9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 
                0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 
                1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
  
          {/* ✅ Title */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
  
          {/* ✅ Message */}
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your purchase. Your order{" "}
            <span className="font-bold text-green-500">#XYZ123ABC456</span> has been confirmed.
          </p>
  
          <p className="text-md text-gray-500 mb-6">
            A confirmation email has been sent to your registered email.
          </p>
  
          {/* ✅ Buttons */}
          <div className="flex flex-col gap-4 mt-4">
            <Link href={"/products"}
              className=" font-semibold py-3 px-6 rounded-lg   transition"
              
            >
              Continue Shopping
            </Link>
     
          </div>
  
          {/* ✅ Footer */}
          <p className="text-sm text-gray-400 mt-10">
            For any questions, please contact our support team.
          </p>
        </div>

      </div>
  )
}
