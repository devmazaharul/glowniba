import  {Schema,model,models} from "mongoose"

const subscribeSchema = new Schema({
    subacriberId:{type:String,required:true},
    email:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})
export const Subscribe = models.Subscribe || model("Subscribe",subscribeSchema)







