'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import validateProductData, { fileToBase64 } from '../../utils';
import { toast } from 'sonner';
import { addProduct } from '@/action/product';

const ProductForm = () => {
  const prObj = {
    name: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    rating: '5',
    reviews: '0',
    shortDescription: '',
    description: '',
    tags: '',
    discount: 0,
    isDiscount: false,
    status: 'new',
    featured: false,
    image: null,
    size: '',
  };
  const [productData, setProductData] = useState({ ...prObj });
  const [isLoading, setIsloading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === 'image' && 'files' in e.target && e.target.files
          ? e.target.files[0]
          : e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const error = validateProductData(productData);
      if (error) {
        for (const key in error) {
          const arr = error[key];
          toast.error(arr, {
            duration: key == 'size' ? 5000 : 2000,
            description:
              key == 'size'
                ? 'Invalid product size example [200ML,500ML] and max 20 character use total22'
                : 'Validation faild',
          });
        }
      }
      if (Object.keys(error).length == 0) {
        const base63 = await fileToBase64(productData.image);

        const res = await addProduct({ ...productData, image: base63 });
        if (res?.status == 200) {
          toast.success('Products successfully added');
          // setProductData({
          //   ...prObj,
          // });
        }
      }
    } catch {
      toast.error('Product added faild');
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white my-6 shadow-2xl shadow-gray-100 rounded-md space-y-6 border"
      >
        <h2 className="text-xl font-semibold text-gray-700">Add New Product</h2>

        {/* Image Upload */}
        <div>
          <Label>Product Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 rounded-md"
            name="image"
          />
        </div>

        {/* Name */}
        <div>
          <Label>Name</Label>
          <Input
            value={productData.name}
            onChange={handleChange}
            type="text"
            placeholder="Product Name"
            className="mt-1 rounded-md"
            required
            name="name"
          />
        </div>

        {/* Price and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Price</Label>
            <Input
              value={productData.price}
              onChange={handleChange}
              type="number"
              placeholder="520"
              className="mt-1 rounded-md"
              required
              name="price"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select
              value={productData.category}
              onValueChange={(value) =>
                setProductData((prevState) => ({
                  ...prevState,
                  category: value,
                }))
              }
            >
              <SelectTrigger className="w-full mt-1 rounded-md cursor-pointer">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunblock" className="cursor-pointer">
                  Sunblock
                </SelectItem>
                <SelectItem value="serum" className="cursor-pointer">
                  Serum
                </SelectItem>
                <SelectItem value="cleanser" className="cursor-pointer">
                  Cleanser
                </SelectItem>
                <SelectItem value="moisturizer" className="cursor-pointer">
                  Moisturizer
                </SelectItem>
                <SelectItem value="baby" className="cursor-pointer">
                  Baby
                </SelectItem>
                <SelectItem value="other" className="cursor-pointer">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Brand and Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Brand</Label>
            <Input
              type="text"
              placeholder="Jigott"
              className="mt-1 rounded-md"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Stock</Label>
            <Input
              type="number"
              placeholder="200"
              className="mt-1 rounded-md"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Rating & Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Rating</Label>
            <Select
              value={productData.rating}
              onValueChange={(value) =>
                setProductData((prevState) => ({ ...prevState, rating: value }))
              }
            >
              <SelectTrigger className="w-full mt-1 rounded-md cursor-pointer">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1" className="cursor-pointer">
                  1
                </SelectItem>
                <SelectItem value="1.5" className="cursor-pointer">
                  1.5
                </SelectItem>
                <SelectItem value="2" className="cursor-pointer">
                  2
                </SelectItem>
                <SelectItem value="2.5" className="cursor-pointer">
                  2.5
                </SelectItem>
                <SelectItem value="3" className="cursor-pointer">
                  3
                </SelectItem>
                <SelectItem value="3.5" className="cursor-pointer">
                  3.5
                </SelectItem>
                <SelectItem value="4" className="cursor-pointer">
                  4
                </SelectItem>
                <SelectItem value="4.5" className="cursor-pointer">
                  4.5
                </SelectItem>
                <SelectItem value="5" className="cursor-pointer">
                  5
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Reviews</Label>
            <Input
              type="number"
              placeholder="30"
              className="mt-1 rounded-md"
              name="reviews"
              value={productData.reviews}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <Label>Short Description</Label>
          <Textarea
            maxLength={120}
            placeholder="Up to 120 characters..."
            className="mt-1 rounded-md"
            name="shortDescription"
            value={productData.shortDescription}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea
            maxLength={1000}
            rows={5}
            placeholder="Full description..."
            className="mt-1 rounded-md"
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </div>

        {/* Tags */}
        <div className="flex items-center justify-between gap-6">
          <div className="w-full">
            <Label>Tags</Label>
            <Input
              type="text"
              placeholder="sunblock, UV, SPF"
              className="mt-1 rounded-md"
              name="tags"
              value={productData.tags}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Label className="pb-1">
              Size{' '}
              <small className="text-gray-500 ">
                (Write carefully and separate with commas. )
              </small>
            </Label>
            <Input
              type="text"
              required
              placeholder="200ML,500ML"
              className="mt-1 rounded-md lowercase"
              name="size"
              value={productData.size}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <Label>Status</Label>
          <Select
            value={productData.status}
            onValueChange={(value) =>
              setProductData((prevState) => ({ ...prevState, status: value }))
            }
          >
            <SelectTrigger className="w-full mt-1 rounded-md cursor-pointer">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new" className="cursor-pointer">
                New
              </SelectItem>
              <SelectItem value="best-selling" className="cursor-pointer">
                Best Selling
              </SelectItem>
              <SelectItem value="eid-special" className="cursor-pointer">
                Eid Special
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Featured Product */}
        <div className="flex items-center space-x-2">
          <Checkbox
            className="cursor-pointer"
            checked={productData.featured}
            onCheckedChange={() =>
              setProductData((prev) => ({ ...prev, featured: !prev.featured }))
            }
          />
          <Label>Featured</Label>
        </div>

        {/* Has Discount */}
        <div className="flex items-center space-x-2">
          <Checkbox
            className="cursor-pointer"
            checked={productData.isDiscount}
            onCheckedChange={() =>
              setProductData((prev) => ({
                ...prev,
                isDiscount: !prev.isDiscount,
              }))
            }
          />
          <Label>Has Discount</Label>
        </div>

        {/* Discount */}
        {productData.isDiscount && (
          <div>
            <Label>Discount (%)</Label>
            <Input
              type="number"
              min={0}
              max={100}
              placeholder="10"
              className="mt-1 rounded-md"
              name="discount"
              value={productData.discount}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-gray-700 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-gray-800"
          >
            {isLoading ? 'Processing...' : 'Submit Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
