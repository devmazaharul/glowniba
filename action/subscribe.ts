'use server';
import connectDB from '@/lib/db';
import { systemLogger } from '@/lib/logger';
import { Subscribe } from '@/model/subscribe';
import { isValidEmail } from '@/utils';
import { CustomError, handleError } from '@/utils/error';
import { responce } from '@/utils/success';

export const subscribeUser = async (email: string) => {
  try {
    systemLogger.info('Subscribed action called');
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
      systemLogger.error('Subscribed action faild message  ' + error.message);
      return handleError(error.message, error.status);
    } else {
      systemLogger.error('Subscribed action faild');
      return handleError('An unknown error occurred', 500);
    }
  }
};
