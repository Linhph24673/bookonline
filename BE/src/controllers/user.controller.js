import User from "../models/auth.model.js";
import bcryptjs from 'bcryptjs'

import dotenv from 'dotenv';
import { userValidation } from "../validations/user.validation.js";
dotenv.config();

export const getAllUser = async (req, res) => {
    const { _sort = 'createAt', _order = 'asc', _limit = 10, _page = 1 } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === 'desc' ? -1 : 1,
        },
        // populate: [{ path: 'order' }],
    };
    try {
        const users = await User.paginate({}, options);
        if (users.length === 0) {
            return res.json({
                message: 'Không có user nào',
            });
        }
        /* loại bỏ password */
        users.docs.map((user) => {
            user.password = undefined;
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}

export const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        // .populate([
        //     { path: 'order' },
        //     { path: 'products' },
        // ]);
        if (!user) {
            return res.status(500).json({ message: 'Không tìm thấy thông tin người dùng' });
        }
        user.password = undefined;
        return res.status(200).json({
            message: 'Lấy thông tin người dùng thành công',
            user,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}
export const CreateUser = async (req, res) => {
    try {
        console.log(req.body);
        const { error } = userValidation.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((error) => error.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const { email, password } = req.body;
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.status(400).json({
                message: "Email đã tồn tại"
            })
        }
        if (!checkEmail) {
            const hashedPassword = await bcryptjs.hash(password, 15)
            const user = await User.create({
                ...req.body,
                password: hashedPassword,
                avatar: req.body.avatar ? req.body.avatar : `https://ui-avatars.com/api/?name=${req.body.username.replace(/\s+/g, '+')}`
            });
            user.password = undefined
            return res.status(200).json({
                message: "Đăng kí thành công",
                data: user
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}
export const updateUser = async (req, res) => {
    try {
        const { error } = userValidation.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((error) => error.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const result = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin người dùng' });
        }
        res.status(200).json({ user: result, });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}
export const BlockUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                message: "Người dùng không tồn tại"
            });
        }
        const userUpdate = await User.findByIdAndUpdate(
            id,
            { is_active: !user.is_active },
            { new: true })
        const actionMessage = userUpdate.is_active
            ? `Tài khoản ${user.username} đã khôi phục`
            : `Tài khoản ${user.username} đã bị khóa`;
        return res.status(200).json(
            {
                message: actionMessage,
                data: userUpdate
            });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}