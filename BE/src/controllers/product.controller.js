import productValidation from '../validations/product.validation.js';
import Product from '../models/product.model.js'
import Category from '../models/category.model.js'

export const getAllProduct = async (req, res) => {
    const { _sort = "createAt", _order = "asc", _limit = 10, _page = 1 } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order == "desc" ? -1 : 1,
        },
    };
    try {
        const { docs, totalDocs, totalPages } = await Product.paginate({}, options);
        // const products = await Product.find().populate('categoryId');
        if (docs.length === 0) {
            return res.status(400).json({
                message: "Không có sản phẩm nào"
            })
        }
        return res.status(200).json({
            docs: docs, totalDocs, totalPages, _limit, _page
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getDetailProduct = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id).populate('categoryId');
        if (!products) {
            return res.status(400).json({
                message: "Không tìm thấy sản phẩm"
            })
        }
        return res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const Data = req.body;
        const category = Data.categoryId;
        const { error } = productValidation.validate(Data, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const existCategory = await Category.findById(category);
        // console.log(existCategory);
        if (!existCategory) {
            return res.status(400).json({
                message: "Danh mục không tồn tại hoặc không hợp lệ !"
            });
        }
        const product = await Product.create(req.body);
        const addcate = await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: { products: product._id }
        });
        if (!addcate) {
            return res.status(400).json({
                message: "Thêm danh mục cho sản phẩm không thành công !"
            })
        }
        console.log(product);
        if (!product) {
            return res.status(400).json({
                message: "Không thêm được sản phẩm"
            })
        }
        return res.status(200).json({
            message: " Thêm sản phẩm thành công",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
// xóa cứng
export const deleteRealProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Sản phẩm đã được xóa thành công",
            product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// xóa mềm
export const deleteFakeProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,
            {
                is_deleted: true
            },
            { new: true });
        console.log(product);
        return res.status(200).json(
            {
                message: 'Xóa mềm sản phẩm thành công',
                data: product
            });
    } catch (error) {
        next(error);
    }
}
// khôi phục sản phẩm
export const restoreProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,
            {
                is_deleted: false
            },
            { new: true });
        console.log(product);
        return res.status(200).json(
            {
                message: 'Khôi phục sản phẩm thành công',
                data: product
            });
    } catch (error) {
        next(error);
    }
}

// cập nhật sản phẩm
export const updateProduct = async (req, res) => {
    try {
        const { error } = productValidation.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.status(200).json({
            message: "Sản phẩm đã được cập nhật thành công",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};