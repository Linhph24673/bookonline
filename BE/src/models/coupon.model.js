import moment from 'moment';
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
moment().format();

const couponSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true },
        quantity: { type: Number, require: true },
        sale: { type: Number, require: true },
        desc: { type: String, required: true },
        startDate: { type: Date, default: Date.now },
        endDate: { type: Date, default: () => moment().add(7, 'days').toDate() },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true, versionKey: false }
);

couponSchema.plugin(mongoosePaginate)
export default mongoose.model("Coupon", couponSchema);