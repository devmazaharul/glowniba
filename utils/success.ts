
export const responce=({message="",status=200,data={}})=>{
  return {
    message,
    status,
    data
  }
}
export const responceItems=({message='',status=200,items,totalitems=0,totalpage=0}:{message:string,status:number,items:any[],totalitems:number,totalpage:number})=>{
  return {
    message,
    status,
    items:items,
    totalItems:totalitems,
    totalpage:totalpage,
  }
}