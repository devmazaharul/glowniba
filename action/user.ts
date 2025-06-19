'use server';
import connectDB from '@/lib/db';
import { systemLogger } from '@/lib/logger';
import User from '@/model/user';
import { userlogin, userregister, userUpdate } from '@/types/user';
import { compareHashPass, hashPassword } from '@/utils';
import { CustomError, handleError } from '@/utils/error';
import { responce, responceItems } from '@/utils/success';
import { cookies } from 'next/headers';
import { signJwt } from '../utils/token';

import randomstring from 'randomstring';
const userRegister = async ({
  name,
  email,
  number,
  password,
  address,
}: userregister) => {
  try {
    await connectDB();
    const checkUser = await User.findOne({ email });
    if (checkUser) throw new CustomError('User already have exist', 400);
    const hashPass = await hashPassword(password);
    const create = new User({
      name,
      email,
      password: hashPass,
      address,
      number,
      userId: randomstring.generate({ length: 7, charset: 'alphanumeric' }),
    });
    await create.save();
    return responce({
      message: 'Successfully account create',
      status: 200,
      data: {
        name,
        email,
        address,
        number,
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

const userLogin = async ({ email, password }: userlogin) => {
  try {
    await connectDB();
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      throw new CustomError('Invalid user please register first', 400);

    if ((await compareHashPass(password, checkUser.password)) == false)
      throw new CustomError('Invalid credentials', 400);
    const token = await signJwt({ email });

    const cookieRady = await cookies();
    cookieRady.set({
      name: 'token',
      value: token,
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return responce({
      message: 'Successfully login',
      status: 200,
      data: {
        name: checkUser.name,
        email,
        address: checkUser.address,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      systemLogger.error('Error login');
      return handleError(error.message, (error as any).status);
    }
    systemLogger.error('Error login');
    return handleError('An unknown error occurred', 500);
  }
};

const userReset = async (email: string) => {
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) throw new CustomError('Invalid email address', 400);
    //send reset mail configaration

    return responce({
      message: 'Successfully send reset link please check your email inbox',
      status: 200,
      data: {
        name: checkUser.name,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error.message, (error as any).status);
    }
    return handleError('An unknown error occurred', 500);
  }
};

const userChangePassword = async ({
  userId,
  oldpass,
  newpass,
}: {
  userId: string;
  oldpass: string;
  newpass: string;
}) => {
  try {
    if (oldpass === newpass)
      throw new CustomError(
        'Old password and new Password are same plese provide another password.'
      );
    const checkUser = await User.findById(userId);
    if (!checkUser) throw new CustomError('Invalid credentials', 400);
    checkUser.password = newpass;
    await checkUser.save();
    return responce({
      message: 'Successfully password changed',
      status: 200,
      data: {
        name: checkUser.name,
        number: checkUser.number,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error.message, (error as any).status);
    }
    return handleError('An unknown error occurred', 500);
  }
};

const userUpdateInfo = async ({
  userId,
  name,
  address,
  number,
}: userUpdate) => {
  try {
    //db connected
    await connectDB();
    const checkUser = await User.findById(userId);
    if (!checkUser) throw new CustomError('Invalid oparation', 400);
    if (checkUser.updateLimit > 5)
      throw new CustomError('You cannot update your info max 5 times.');

    checkUser.name = name || checkUser.name;
    checkUser.name = address || checkUser.address;
    checkUser.name = number || checkUser.number;
    checkUser.updateLimit++;
    await checkUser.save();
    return responce({
      message: 'Successfully updated',
      status: 200,
      data: {
        name: checkUser.name,
        number: checkUser.number,
        address: checkUser.address,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error.message, (error as any).status);
    }
    return handleError('An unknown error occurred', 500);
  }
};

const getUsers = async (limit: number = 10, page: number = 1) => {
  try {
    await connectDB();
    const skip = (page - 1) * limit;

    const usersa = await User.find({});
    const users = usersa.reverse().slice(skip, skip + limit);

    const totalItems = await User.countDocuments({});
    if (!users) throw new CustomError('No user found', 400);

    const totalPage = Math.ceil(totalItems / limit);
    return responceItems({
      message: 'Successfully get users',
      status: 200,
      items: JSON.parse(JSON.stringify(users)),
      totalitems: totalItems,
      totalpage: totalPage,
    });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error.message, (error as any).status);
    }
    return handleError('An unknown error occurred', 500);
  }
};

const userDelete = async (id: any) => {
  try {
    await User.findByIdAndDelete(id);
    return responce({
      message: 'Successfully deleted',
      status: 200,
      data: {},
    });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error.message, (error as any).status);
    }
    return handleError('An unknown error occurred', 500);
  }
};

export {
  userRegister,
  userLogin,
  userReset,
  userChangePassword,
  userUpdateInfo,
  getUsers,
  userDelete,
};
