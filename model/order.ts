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

    totalAmount: { type: Number, required: true },
    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      postalCode: String,
    },

    paymentMethod: { type: String, default: 'cash_on_delivery' },

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
