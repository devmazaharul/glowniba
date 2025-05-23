import { productInformation } from "./product";

export type CartStateType = {
  cart: productInformation[];
  addToCart: (product: productInformation) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
};



export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  reviews: number;
  shortDescription: string;
  description: string;
  ingredients: string[];
  image: string;
  thumbnail: string;
  tags: string[];
  discount?: string;
  isDiscount?: boolean;
  status:"new" | "old" ;
  quantity?: number;
  wishlistCount?: number;
  flashSaleEnd?: string;
  createdAt?: string;
  updatedAt?: string;
  visible?: boolean;
  shippingInfo?: string;
  returnPolicy?: string;
}



export interface commonCartType {
  name:string,
  image:string,
  shortDescription:string,
  description:string,
  rating:number,
  stock:number,
  price:number,
  brand:string
  id:string,
  reviews:number,
  isDiscount?:boolean,
  discount?:string,
  status?:string,
  tags:string[]

}


export interface subscriptionInfo{
  subacriberId:string,
  email:string,
  createdAt:string,
  isMember:boolean
}
