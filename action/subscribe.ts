'use server';
import connectDB from '@/lib/db';
import { Subscribe } from '@/model/subscribe';
import { isValidEmail } from '@/utils';
import { CustomError, handleError } from '@/utils/error';
import { responce, responceItems } from '@/utils/success';
import { revalidatePath } from 'next/cache';
import randomstring from 'randomstring';
import Users from "@/model/user"

export const subscribeUser = async (email: string) => {
  try {
    await connectDB();
    if (!email) throw new CustomError('Invalid email address', 400);
    if (!isValidEmail(email))
      throw new CustomError('Invalid email address', 400);
    const checkExuser = await Subscribe.findOne({ email: email });
    if (checkExuser) {
      return responce({
        message: 'Thanks for subscribing',
        status: 200,
        data: {
          email,
        },
      });
    }
    const addEmailSubscribe = new Subscribe({
      email,
      subacriberId: randomstring.generate({
        length: 6,
        charset: 'alphanumeric',
      }),
    });
    await addEmailSubscribe.save();
    revalidatePath('/dashboard/subscriptions');

    return responce({
      message: 'Thanks for subscribing',
      status: 200,
      data: {
        email,
      },
    });
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      return handleError(error.message, error.status);
    } else {
      return handleError('An unknown error occurred', 500);
    }
  }
};


export const getSubscribers = async (limit: number, page: number) => {
  try {
    await connectDB();
    const skip = (page - 1) * limit;
      const res=await Subscribe.find()
      const items=res.reverse().slice(skip,skip+limit)
      const totalCount=await Subscribe.countDocuments()
    if (!items || items.length === 0) {
      throw new CustomError('No subscription data', 400);
    }

    const totalPage = Math.ceil(totalCount / limit);

    const itemsWithMember = await Promise.all(items.map(async (item) => {
      const res = await Users.findOne({ email: item.email });
      return {
        ...item._doc,
        isMember: !!res, // res যদি থাকে তাহলে true, না থাকলে false
      };
    }));
    
    return responceItems({
      message: 'Subscriptions data',
      status: 200,
      items: JSON.parse(JSON.stringify(itemsWithMember)),
      totalitems: 11,
      totalpage: totalPage,
    });
    


   

  } catch (error: unknown) {
    if (error instanceof CustomError) {
      return handleError(error.message, error.status);
    } else {
      return handleError('An unknown error occurred', 500);
    }
  }
};
