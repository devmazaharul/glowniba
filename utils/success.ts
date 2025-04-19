
export const responce=({message="",status=200,data={}})=>{
  return {
    message,
    status,
    data
  }
}
export const responceProduct=(msg:string,status=200,prod=[])=>{
  return {
    message:msg,
    status,
    items:prod,
    length:prod.length
  }
}