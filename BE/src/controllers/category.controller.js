import Category from "../models/category.model.js";
import { categoryValidation } from "../validations/category.validation.js";
import Product from '../models/product.model.js'

export const getAllCate = async (req, res) => {
    const { _sort = "createAt", _order = "asc", _limit = 10, _page = 1 } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order == "desc" ? -1 : 1,
        },
        populate: {
            path: 'products',
            select: '-categoryId', // loại bỏ trường categoryId trong thông tin sản phẩm
        }
    };
    try {
        const { docs, totalDocs, totalPages } = await Category.paginate({}, options);
        if (docs.length === 0) {
            return res.status(200).json({
                message: "Không có category nào",
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
export const getDetailCate = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id).populate(
            "products"
        );
        if (!category) {
            return res.status(200).json({
                message: "Không có category nào",
            });
        }
        return res.status(200).json({ data: category, });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const createCate = async function (req, res) {
    try {
        const { error } = categoryValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const category = await Category.create(req.body);
        if (!category) {
            return res.json({
                message: "Thêm danh mục thất bại!",
            });
        }
        return res.json({
            message: "Thêm danh mục thành công!",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const updateCate = async function (req, res) {
    try {
        const { error } = categoryValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!category) {
            return res.json({
                message: "Cập nhật category không thành công",
            });
        }
        return res.json({
            message: "Cập nhật category thành công",
            data: category,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const removeCate = async function (req, res) {
    const categoryId = req.params.id
    await Product.deleteMany({ categoryId })
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa category thành công",
            category,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};