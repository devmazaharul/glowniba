'use server';
import cloudinary from '@/lib/cloudinary';
//import { uploaderClud } from '@/lib/cloudinary';

import connectDB from '@/lib/db';
import Product from '@/model/product';
import { AddproductItem } from '@/types';
import { CustomError, handleError } from '@/utils/error';
import { responce } from '@/utils/success';
import Randomstring from 'randomstring';

export const addProduct = async ({
  name,
  brand,
  price,
  description,
  shortDescription,
  status,
  stock,
  discount,
  isDiscount,
  image,
  rating,
  reviews,
  tags,
  category,
  featured,
}: AddproductItem) => {
  try {
    await connectDB();

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(image , {
      folder: 'products',
    });

    if (!uploadRes.secure_url) {
      throw new CustomError('Image upload failed', 400);
    }
    const makeProductId = Randomstring.generate({
      charset: 'alphanumeric',
      length: 7,
    });
    const makeSlug = name.split(' ').join('-').concat(`-${makeProductId}`);
    // Save to MongoDB
    const newProduct = new Product({
      productId: makeProductId,
      name,
      slug: makeSlug,
      brand,
      price,
      description,
      shortDescription,
      status: status || 'active',
      stock,
      discount: isDiscount ? discount : '0',
      isDiscount: isDiscount ? true : false,
      image: uploadRes.secure_url,
      rating,
      reviews,
      tags,
      category,
      featured,
    });

    const savedProduct = await newProduct.save();

    return responce({
      message: 'successfully product added',
      status: 200,
      data: {
        name,
        price,
        productId: savedProduct.productId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error.message, (error as any).status || 500);
    } else if (error instanceof CustomError) {
      return handleError(error.message, (error as any).status || 500);
    }
    return handleError('An unknown error occurred', 500);
  }
};
