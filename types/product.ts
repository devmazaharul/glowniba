
export interface productInformation {
  _id:string,
  productID:string,
  image:string,
  isDiscount:boolean,
  discount:number,
  name:string,
  price:number,
  slug:string,
  stock:number,
  rating:number,
  reviews:number,
  shortDescription:string,
  description:string,
  size:[],
  tags:[],
  status:string,
  featured:boolean,
  brand:string,
  category:string
  quantity?:number,
  createdAt?:any
}


export interface addproductInformation {
  image:string,
  isDiscount:boolean,
  discount:number,
  name:string,
  price:string,
  stock:string,
  rating:string,
  reviews:string,
  shortDescription:string,
  description:string,
  size:string,
  tags:string,
  status:string,
  featured:boolean,
  brand:string,
  category:string
  quantity?:number,

}

