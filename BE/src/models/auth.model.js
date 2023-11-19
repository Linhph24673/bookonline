import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minLength: 5,
    },
    email: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        default: 'customer'
    },
    password: {
        type: String,
        require: true
    },
    is_active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true, versionKey: false })

userSchema.plugin(mongoosePaginate);

export default mongoose.model("User", userSchema)