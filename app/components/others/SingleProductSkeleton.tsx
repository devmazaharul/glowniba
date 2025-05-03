const SingleProductSkeleton = () => {
  return (
    <div className="animate-pulse w-[90%] mx-auto py-10 flex flex-col lg:flex-row gap-8">
      {/* Left Side - Image */}
      <div className="flex-1 min-w-[300px] h-[400px] bg-gray-200 rounded-md"></div>

      {/* Right Side - Info */}
      <div className="flex-1 space-y-4">
        {/* Product Name */}
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>

        {/* Price and QR - justify-between */}
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded w-24"></div>
          <div className="h-12 w-12 bg-gray-300 rounded"></div>
        </div>

        {/* Rating */}
        <div className="h-4 bg-gray-200 rounded w-32"></div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductSkeleton;
