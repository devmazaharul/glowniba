'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4 text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-gray-700 mb-4">
            Something went wrong!
          </h1>
          <p className="text-base  text-gray-400 mb-3">
            An unexpected error occurred. Please try again later .
          </p>
          <button
            onClick={() => reset()}
           className='btn_secondary'
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  );
}
