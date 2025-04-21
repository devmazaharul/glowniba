import { userlogin, userregister } from "@/types/user";
import { isValidAddress, isValidEmail, isValidName, isValidNumber } from ".";
import { toast } from "sonner";

  export const signupValidation = (data: userregister): Boolean => {
    const { name, email, number, address, password } = data;
    if(!isValidName(name)){
      toast.error("Please provide a valid name",{
        description:"Name must be at least 3 characters long and contain only letters and spaces"
      })
      return false;
    }
    if(!isValidEmail(email)){
      toast.error("Email is not valid",{
        description:"Please provide a valid email address"
      })
      return false;
    }
    if(!isValidNumber(number)){
      toast.error("Phone number is not valid",{
        description:"Please provide a valid bd phone number"
      })
      return false;
    }
    if(!isValidAddress(address)){
      toast.error("Address is not valid",{
        description:"Please provide a valid address"
      })
      return false;
    }
    if(password.length<6){
      toast.error("Password is not valid",{
        description:"Password must be at least 6 characters long"
      })
      return false;
    }
    return true;

  };

  export const signInvalidation = (data: userlogin): Boolean => {
    const { email } = data;
    if (!isValidEmail(email)) {
      toast.error("Email is not valid", {
        description: "Please provide a valid email address",
      });
      return false;
    }
  
    return true;
  }