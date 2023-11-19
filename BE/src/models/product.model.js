import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 5
    },
    author: { type: String, require: true },
    publishing: { type: String, default: 'Chưa có thông tin' },
    quantity: { type: Number, require: true },
    images: [{ url: String, publicId: String, filename: String }],
    price: {
        type: Number,
        require: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String,
        require: true
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true, versionKey: false })

productSchema.plugin(mongoosePaginate)

export default mongoose.model("Product", productSchema)