export interface ProductDataInvalidation {
  name: string;
  price: string;
  category: string;
  brand: string;
  stock: string;
  rating: string;
  reviews: string;
  shortDescription: string;
  description: string;
  tags: string;
  discount: number;
  isDiscount: boolean;
  status: string;
  featured: boolean;
  image: File | null;
  size: string;
}

const validateProductData = (productData: ProductDataInvalidation) => {
  const errors: { [key: string]: string } = {};

  // Name Validation
  if (!productData.name.trim()) {
    errors.name = 'Product name is required.';
  }

  // Price Validation
  if (
    !productData.price ||
    isNaN(Number(productData.price)) ||
    Number(productData.price) <= 0
  ) {
    errors.price = 'Price must be a positive number.';
  }

  // Category Validation
  if (!productData.category) {
    errors.category = 'Category is required.';
  }

  // Brand Validation
  if (!productData.brand.trim()) {
    errors.brand = 'Brand is required.';
  }

  // Stock Validation
  if (
    !productData.stock ||
    isNaN(Number(productData.stock)) ||
    Number(productData.stock) < 0
  ) {
    errors.stock = 'Stock must be a non-negative number.';
  }

  // Rating Validation
  if (
    productData.rating &&
    (isNaN(Number(productData.rating)) ||
      Number(productData.rating) < 0 ||
      Number(productData.rating) > 5)
  ) {
    errors.rating = 'Rating must be a number between 0 and 5.';
  }

  // Reviews Validation
  if (productData.reviews && isNaN(Number(productData.reviews))) {
    errors.reviews = 'Reviews must be a valid number.';
  }

  // Short Description Validation
  if (!productData.shortDescription.trim()) {
    errors.shortDescription = 'Short description is required.';
  }

  // Description Validation
  if (!productData.description.trim()) {
    errors.description = 'Description is required.';
  }

  const tagPattern =
    /^(?:[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*)(?:,(?:[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*)){0,3}$/;

  const validateTags = (tagString: string) => {
    const isFormatValid = tagPattern.test(tagString);
    const tagCount = tagString.split(',').filter(Boolean).length;
    console.log(isFormatValid);
    if (!isFormatValid) {
      errors.tag =
        'Format invalid. Only a-z, A-Z, 0-9, -, _ allowed with comma separation.';
    }
    if (tagCount > 4) {
      errors.tag = 'Maximum 4 tags allowed.';
    }
  };

  validateTags(productData.tags);

  // Discount Validation
  if (
    productData.isDiscount &&
    (productData.discount < 0 || productData.discount > 100)
  ) {
    errors.discount = 'Discount must be between 0 and 100.';
  }

  // Image Validation (Required if no image is provided)
  if (!productData.image) {
    errors.image = 'Product image is required.';
  }

  const pattern =
    /^(?:[1-9][0-9]{0,2}(?:ml|g|pcs|pack))(?:,(?:[1-9][0-9]{0,2}(?:ml|g|pcs|pack)))*$/;
  // সব space সরিয়ে ফেলা হবে
  const cleanedSize = productData.size?.replace(/\s/g, '');
  if (!cleanedSize || !pattern.test(cleanedSize)) {
    errors.size = 'Product size invalid.';
  }

  return errors;
};

export default validateProductData;

export const fileToBase64 = (file: File | null): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
