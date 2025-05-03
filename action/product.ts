'use server'
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
    const makeSlug = (name.trim().split(" ").join("-")+"-"+makeProductId).toLocaleLowerCase();
    // Save to MongoDBa
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
      tags:tags.split(","),
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

export const getProducts = async (limit: number = 10, page: number = 1) => {
  try {
    await connectDB();

    const skip = (page - 1) * limit;

    const [items, totalItems] = await Promise.all([
      Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments()
    ]);

    if (!items.length) throw new CustomError("No products found", 400);

    const totalPages = Math.ceil(totalItems / limit);

    return responceItems({
      message: "Successfully retrieved products",
      status: 200,
      items: JSON.parse(JSON.stringify(items)),
      totalitems: totalItems,
      totalpage: totalPages
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



export const getProductbySlug = async (productslug: string) => {
  try {
    const slug = decodeURIComponent(productslug.trim())
    const findProduct = await Product.findOne({ slug });
    if (!findProduct) throw new CustomError("Invalid product slug", 400);

    return responce({
      message: "successfully get product data",
      status: 200,
      data: JSON.parse(JSON.stringify(findProduct))
    });
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