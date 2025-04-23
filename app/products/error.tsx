'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error occurred:', error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong! 😔</h1>
      <p className="text-lg mb-6">Error : {error.message}</p>

      <Button variant={"outline"}
        onClick={() => reset()}
      
      >
        Try Again
      </Button>
    </div>
  );
}
