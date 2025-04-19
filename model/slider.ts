// models/Review.ts
import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    caption:{
      type:String,
      required:true
    },
    title:{
      type:String,
      required:true
    },
    sortdesc:{
      type:String,
      required:true
    },
    image:{
      type:String,
      required:true
    },
    
  },
  { timestamps: true }
);

const Slider = mongoose.models.Slider || mongoose.model("Slider", sliderSchema);
export default Slider;
