import { defualtValue } from "@/constants";
import bcrypt from "bcryptjs";

export function isValidName(name:string) {
  const trimmedName = name.trim();
  const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  return regex.test(trimmedName) && trimmedName.length >= 3 && trimmedName.length <= 50;
}



export const isValidNumber = (number: string) => {
  const bdPhoneRegex = /^01[3-9]\d{8}$/;
  return bdPhoneRegex.test(number);
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const isValidAddress = (addr: string) => {
  //addredd regext use name number coma clone etc min 5 max 200
  const addressRegex = /^[a-zA-Z0-9\s,.'-]{5,200}$/;

  return addressRegex.test(addr);
};


export const hashPassword=async(password="")=>{
  const hash=await bcrypt.hash(password,defualtValue.saltRound)
  return hash
}

export const compareHashPass=async(password="",hash:string)=>{
  const mach= await bcrypt.compare(password,hash)
return mach
}