import connectDB from "@/lib/db";
import User from "@/model/user";
import { handleError } from "@/utils/error";

const addProduct=async()=>{
  try {
    await connectDB();
    
  } catch (error) {
     if (error instanceof Error) {
          return handleError(error.message, (error as any).status);
      }
      return handleError("An unknown error occurred", 500);
  }
}


export {
  addProduct
}









