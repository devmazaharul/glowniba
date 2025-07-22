import connectDB from "@/lib/db";
import Order from "@/model/order";
import { NextRequest, NextResponse } from "next/server";


export const POST=async(req:NextRequest)=>{
 try {
  await connectDB()
  const body=await req.json()
  await Order.deleteOne({paymentId:body?.paymentId})
  console.log("Succesfully order canceld");

    return NextResponse.json({messgae:"I am from server"},{status:200})
 } catch  {
  return NextResponse.json({messgae:"Error occurd"},{status:500})
 }
}