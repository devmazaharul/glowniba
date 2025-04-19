import { responce } from "./success";


export const storageInfo=(name="")=>{
  if(typeof window!=="undefined"){
    const findTable=window.localStorage.getItem(name) || "null";
    const parsedTable = JSON.parse(findTable);
    const mainItems=parsedTable?.state?.cart;
    if(mainItems){
      return responce({
        message:"success",
        status:200,
        data:{
          items:mainItems
        }
      })
    }else{
      return responce({
        message:"Faild",
        status:400,
        data:{}
      })
    }

  }
}