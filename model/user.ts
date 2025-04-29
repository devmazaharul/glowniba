// models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userId:{type:String,required:true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' }, // "admin",  "customer"
    address: { type: String },
    number:{type:String,requied:true},
    updateLimit:{
      type:Number,
      default:5
    },
    purcessedItems: [
      { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],

  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
