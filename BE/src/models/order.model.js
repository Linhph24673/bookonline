import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    items: [
      {
        name: { type: String },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        image: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        toppings: [
          {
            name: { type: String, required: true },
            price: { type: Number, required: true },
          },
        ],
        size: {
          name: { type: String, required: true },
          price: { type: Number, required: true },
        },
      },
    ],
    reasonCancelOrder: { type: String },
    noteOrder: { type: String },
    total: { type: Number },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

orderSchema.plugin(mongoosePaginate);

const Order = mongoose.model('Order', orderSchema);

export default Order;
