import Cart from "../models/cart.model.js";
import { cartValidation } from "../validations/cart.validation.js"

export const createCart = async (req, res) => {
    try {
        const { error } = cartValidation.validate(req.body)
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }
        const { products, cartTotal, totalAfterDiscount, orderBy } = req.body
        const newCart = new Cart({
            products,
            cartTotal,
            totalAfterDiscount,
            orderBy
        })
        const savedCart = await newCart.save()
        return res.status(200).json({
            docs: savedCart
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const getAllCart = async (req, res) => {
    try {
        const carts = await Cart.find()
            .populate({
                path: 'orderBy',
                select: 'username email _id'
            })
            .populate({
                path: 'products.product',
                model: 'Product',
                select: '-is_deleted -is_active -createdAt -updatedAt'
            })
        if (carts.length === 0) {
            return res.status(200).json({
                message: 'Không có dữ liệu'
            })
        }
        return res.status(200).json({
            docs: carts
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const getOneCart = async (req, res) => {
    try {
        const cartId = req.params.id
        const cart = await Cart.findById(cartId)
            .populate({
                path: 'orderBy',
                select: 'username email _id'
            })
            .populate({
                path: 'products.product',
                model: 'Product',
                select: '-is_deleted -is_active -createdAt -updatedAt'
            })
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json({ docs: cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const updatecart = async (req, res) => {
    try {
        const cartId = req.params.id
        const updateCart = await Cart.findByIdAndUpdate(
            cartId,
            { $set: req.body },
            { new: true }
        ).populate({
            path: 'orderBy',
            select: 'username email _id'
        })
            .populate({
                path: 'products.product',
                model: 'Product',
                select: '-is_deleted -is_active -createdAt -updatedAt'
            })
        if (!updateCart) {
            return res.status(404).json({
                message: 'cart not found'
            })
        }
        return res.status(200).json({ docs: updateCart })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const deleteCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        const deletedCart = await Cart.findByIdAndDelete(cartId)
        if (!deletedCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        return res.status(200).json({
            message: "delete success",
            docs: deletedCart
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}