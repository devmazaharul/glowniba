import { defualtValue } from "@/constants";
import bcrypt from "bcryptjs";

export const isValidName = (name: string) => {
  const nameRegexBn = /^[A-Za-z\u0980-\u09FF\s]{2,50}$/;
  return nameRegexBn.test(name);
};

export const isValidNumber = (number: string) => {
  const bdPhoneRegex = /^01[3-9]\d{8}$/;
  return bdPhoneRegex.test(number);
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const isValidAddress = (addr: string) => {
  const addressRegex = /^[A-Za-z0-9\u0980-\u09FF\s,.-/#]{5,100}$/;
  return addressRegex.test(addr);
};


export const hashPassword=async(password="")=>{
  const hash=await bcrypt.hash(password,defualtValue.saltRound)
  return hash
}

export const compareHashPass=async(password="",hash:string)=>{
  return await bcrypt.compare(password,hash)
}