"use server"
import connectDB from "@/lib/db";
import Order from "@/model/order";
import { CustomError, handleError } from "@/utils/error";
import { responce } from "@/utils/success";



export const placeOrderUsers = async (orderDetails: any) => {
  try {
    await connectDB();
    const { name, phone, products, paymentMethod, address, instraction, totalAmount } = orderDetails;
    return {
      messsage:"successfully order placed",
      status:200
    }


  } catch (error) {
    if (error instanceof Error) {
      return handleError(error.message, (error as any).status);
    }
    return handleError("An unknown error occurred", 500);
  }
};

