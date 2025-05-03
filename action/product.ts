'use server';
import cloudinary from '@/lib/cloudinary';
import connectDB from '@/lib/db';
import Product from '@/model/product';
import { addproductInformation } from '@/types/product';
import { CustomError, handleError } from '@/utils/error';
import { responce, responceItems } from '@/utils/success';
import { revalidatePath } from 'next/cache';
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
  size
}: addproductInformation) => {
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
      productID: makeProductId,
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
      size:size.split(",")
    });

    const savedProduct = await newProduct.save();
    revalidatePath("/dashboard/products")
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

export const getProducts=async(limit=10,page=1)=>{
  try {
    await connectDB()
    const items=await Product.find()
    const totalitems=await Product.countDocuments({})
    if(!items) throw new CustomError("No products found",400)
      const totalPage=Math.ceil(items.length/limit)
      return responceItems({
    message:"successfully get products",
    status:200,
    items: JSON.parse(JSON.stringify(items)),
    totalitems,
    totalpage:totalPage
  })
    
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error.message, (error as any).status || 500);
    } else if (error instanceof CustomError) {
      return handleError(error.message, (error as any).status || 500);
    }
    return handleError('An unknown error occurred', 500);
  }
}

export const getProductbySlug=async(productslug:string)=>{
  try { 
    const findProduct=await Product.findOne({slug:productslug});
    if(!findProduct) throw new CustomError("Invalid product slug",400)
    return responce({
      message:"successfully get product",
      status:200,
      data:JSON.parse(JSON.stringify(findProduct))
    })
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error.message, (error as any).status || 500);
    } else if (error instanceof CustomError) {
      return handleError(error.message, (error as any).status || 500);
    }
    return handleError('An unknown error occurred', 500);
  }
}

export const deleteproductByID=async(productid:string)=>{
  try {
      const res=await Product.findOne({productID:productid})
      if(!res) throw new CustomError("Product not found",400);
      await Product.deleteOne({productID:productid})
      revalidatePath("/dashboard/products")
      return responce({
        message:"product has been deleted successfully.",
        status:200,
        data:{}
      })
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error.message, (error as any).status || 500);
    } else if (error instanceof CustomError) {
      return handleError(error.message, (error as any).status || 500);
    }
    return handleError('An unknown error occurred', 500);
  }
}