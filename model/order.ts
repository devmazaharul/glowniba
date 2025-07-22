import { Schema, model, models } from 'mongoose';

//  product subdocument
const productSub = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const shippingSchema = new Schema(
  {
    division: { type: String, required: true },
    district: { type: String, required: true },
    upazela: { type: String, required: true },
    union: { type: String, required: true },
  },
  { _id: false }
);

//  main order schema
const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [productSub],
    name: { type: String, required: true },
    instraction: { type: String },
    phone: { type: String, required: true },
    shippingAddress: {
      type: shippingSchema,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['bkash', 'nagad', 'cod', 'mazapay'],
      default: 'cod',
      required: true,
    },

    paymentId: {
      type: String,
      required: function (this: any) {
        return this.paymentMethod !== 'cod';
      },
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
