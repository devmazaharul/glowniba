import { defaultValues } from '@/constants';
import bcrypt from 'bcryptjs';

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


export interface addressType{
  division:string,
  district:string,
  upazila:string,
  union:string
}
export interface basicInfoType{
  fullName:string,
  email:string,
  number:string,
}

export const checkOutValidation=({address,basicInfo,productInfo}:{
  address:addressType,
  basicInfo:basicInfoType,
  productInfo:string[]
})=>{
  const error={
    key:"",
    message:"",
    status:true
  }

  //validation basic info 
  if(!basicInfo.fullName || !isValidName(basicInfo.fullName)){
    error.key="fullName";
    error.message="Please enter a valid full name";
    return error;
  }
   if(!basicInfo.number || !isValidNumber(basicInfo.number.toString())){
    error.key="number";
    error.message="Please enter a valid phone number";
    return error;
  }
  if(!basicInfo.email || !isValidEmail(basicInfo.email)){
    error.key="email";
    error.message="Please enter a valid email address";
    return error;
  }
 
  //address validation

  if(address.district=="N/A" || address.division=="N/A" || address.upazila=="N/A" || address.union=="N/A"){
   error.key="address";
    error.message="Please provide  a valid address";
    return error;
  }

  //product validation
  if(productInfo.length==0){
     error.key="product";
    error.message="Please add  product then process";
    return error;
  }


  return {
    status:false,
    message:"All fields are valid",
    key:""
  }


}



