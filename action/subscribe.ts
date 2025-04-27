'use server';
import connectDB from '@/lib/db';
import { Subscribe } from '@/model/subscribe';
import { isValidEmail } from '@/utils';
import { CustomError, handleError } from '@/utils/error';
import { responce } from '@/utils/success';

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
    });
    await addEmailSubscribe.save();
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
