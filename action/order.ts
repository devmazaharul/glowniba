"use server"
import connectDB from "@/lib/db";
import Order from "@/model/order";
import { CustomError, handleError } from "@/utils/error";
import { responce } from "@/utils/success";

export const placeOrderUsers = async (orderDetails: any) => {
  try {
    await connectDB();
    const { name, phone, products, paymentMethod, address, instraction, totalAmount } = orderDetails;

      const orderCash = new Order({
        userId: "67e81868791299ed8d269f06",
        name,
        phone,
        instraction,
        shippingAddress: {
          ...address,
        },
        products: [...products],
        paymentMethod,
      });
      await orderCash.save();
      return responce({
        message: "Successfully placed order",
        status: 200,
        data: {
          ...address,
          paymentMethod,
        },
      });




  } catch (error) {
    if (error instanceof Error) {
      return handleError(error.message, (error as any).status);
    }
    return handleError("An unknown error occurred", 500);
  }
};

