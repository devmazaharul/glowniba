import connectDB from '@/lib/db';
import Order from '@/model/order';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const body = await req.json();
    const findOrderandUpate = await Order.findOneAndUpdate(
      { paymentId: body?.paymentId },
      {
        status: 'processing',
      }
    );
    console.log('Succesfully order places ok--------', {
      orderId: findOrderandUpate._id,
    });
    return NextResponse.json({message:"Order places"},{status:200})
  } catch {
    return NextResponse.json({ messgae: 'Error occurd' }, { status: 500 });
  }
};
