import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'Product'
            },
            count: Number,
            price: Number
        }
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true, versionKey: false })

cartSchema.plugin(mongoosePaginate);
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;