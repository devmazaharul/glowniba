import { Schema, model, models } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    name: {
      type: String,
      required: true,
    },

    instraction: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },

    shippingAddress: {
      type:{
        division:String,
        district:String,
        upazela:String,
        union:String,
      }
    },

    paymentMethod: {
       type: String,
       enum: ['bkash', 'nagad', 'cash'],
       required: true,
       default: 'cash',

     },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || model('Order', orderSchema);
export default Order;
