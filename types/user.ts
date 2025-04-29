export interface userregister {
  name: string;
  email: string;
  password: string;
  number: string;
  address: string;
}
export interface userlogin {
  email: string;
  password: string;
}

export interface userUpdate {
  userId:string;
  name?:string;
  address?: string;
  number?: string;
}

export interface userIfo {
  _id: string;
  name: string;
  email: string;
  password: string;
  number: string;
  address: string;
  createdAt:string
}
export interface userIfodata {
  _id: string;
  name: string;
  email: string;
  number: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}