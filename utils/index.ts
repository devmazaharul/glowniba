import { defaultValues } from '@/constants';
import bcrypt from 'bcryptjs';
import { toast } from 'sonner';
// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';

export function isValidName(name: string) {
  const trimmedName = name.trim();
  const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  return (
    regex.test(trimmedName) &&
    trimmedName.length >= 3 &&
    trimmedName.length <= 50
  );
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

export const hashPassword = async (password = '') => {
  const hash = await bcrypt.hash(password, defaultValues.saltRound);
  return hash;
};

export const compareHashPass = async (password = '', hash: string) => {
  const mach = await bcrypt.compare(password, hash);
  return mach;
};

export function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0'); // 0-based month
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}




export const checkoutValidation=({info,address}:{info:{name:string,phone:string,instraction:string},address:{division?:string,district?:string,upazela?:string,union?:string}})=>{
  const {name,phone,instraction}=info
  const {division,district,upazela,union}=address
  if(!isValidName(name)){
      toast.error("Please provide a valid name",{
        description:"Name must be at least 3 characters long and contain only letters and spaces"
      })
      return false;
    }
  if(!isValidNumber(phone)){
      toast.error("Please provide a valid BD number",{
        description:"Number must be 11 digit"
      })
      return false;
    }

  if(instraction.length>100){
      toast.error("Please provide a under 100 charecter in instraction fiedld",{
        description:"Instraction must be under 100 charecter"
      })
      return false;
    }
    if(!division || !district || !upazela || !union){
      toast.error("Please provide a valid address",{
        description:"Address must be provide all field"
      })
      return false;
    }

    return true;

}