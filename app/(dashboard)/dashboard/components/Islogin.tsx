'use client';

import { useEffect, useState } from 'react';

export default function Islogin({ children }: { children: React.ReactNode }) {
  const pass = process.env.NEXT_PUBLIC_LOGIN_PASSWORD as string;

  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userCr = prompt('Passkey');
      if (userCr == pass) {
        setisLoggedIn(true);
      }
    }
  }, [pass]);

  const handleRefraseh = () => {
    window.location.reload();
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-col min-h-screen">{children}</div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold ">You are not logged in - </h1>{' '}
          <br />
          <button className="btn_secondary" onClick={handleRefraseh}>
            refrashe
          </button>
        </div>
      )}
    </>
  );
}
