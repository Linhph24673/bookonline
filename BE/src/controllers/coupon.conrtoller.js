import Coupon from "../models/coupon.model.js";
import { CouponValidation } from "../validations/coupon.validation.js";

export const getAllCoupon = async (req, res) => {
    const { _sort = "createAt", _order = "asc", _limit = 10, _page = 1 } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order == "desc" ? -1 : 1,
        }
    };
    try {
        const { docs, totalDocs, totalPages } = await Coupon.paginate({}, options);
        if (docs.length === 0) {
            return res.status(200).json({
                message: "Không có mã giảm giá nào",
            });
        }
        return res.status(200).json({
            docs: docs, totalDocs, totalPages, _limit, _page
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const getAllCouponActive = async (req, res) => {
    try {
        const { _page = 1, _limit = 10, q } = req.query;
        const options = {
            page: _page,
            limit: _limit,
            sort: { createdAt: -1 },
        };
        const query = q
            ? { code: { $regex: new RegExp(q), $options: 'i' }, isActive: true }
            : { isActive: true };
        // lấy ra thời gian hiện tại để so sánh 
        const currentDate = new Date();
        query.startDate = { $lte: currentDate };
        query.endDate = { $gte: currentDate };
        const coupons = await Coupon.paginate(query, options);
        return res.status(200).json(coupons);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const getDetailCoupon = async function (req, res) {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) {
            return res.status(200).json({
                message: "Không có coupon nào",
            });
        }
        return res.status(200).json({ data: coupon, });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const createCoupon = async function (req, res) {
    try {
        const { error } = CouponValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const coupon = await Coupon.create(req.body);
        if (!coupon) {
            return res.status(200).json({
                message: "Thêm mã giảm giá thất bại!",
            });
        }
        return res.status(200).json({ data: coupon });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const updateCoupon = async function (req, res) {
    try {
        const { error } = CouponValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!coupon) {
            return res.status(400).json({
                message: "Cập nhật coupon không thành công",
            });
        }
        return res.status(200).json({ data: coupon });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const removeCoupon = async function (req, res) {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa coupon thành công",
            coupon,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};