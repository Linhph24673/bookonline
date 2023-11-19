import { signinValidation, signupValidation } from "../validations/auth.validation.js";
import User from "../models/auth.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const SECRET_CODE = process.env.SECRET_CODE

export const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signupValidation.validate(req.body)

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.status(400).json({
                message: "Email đã tồn tại"
            })
        }
        const hashedPassword = await bcryptjs.hash(password, 15)
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        });
        user.password = undefined
        return res.status(200).json({
            message: "Đăng kí thành công",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: "lỗi server"
        })
    }
}
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinValidation.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                datas: []
            })
        }
        const haveUser = await User.findOne({ email })
        if (!haveUser) {
            return res.status(400).json({
                message: "Email không tồn tại"
            })
        }
        const checkPass = await bcryptjs.compare(password, haveUser.password);
        if (!checkPass) {
            return res.status(400).json({
                message: "Mật khẩu không chính xác"
            })
        }

        const token = jwt.sign({
            id: haveUser.id
        }, SECRET_CODE, { expiresIn: '1d' })
        haveUser.password = undefined
        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            user: haveUser,
        })
    } catch (error) {
        return res.status(500).json({
            message: "lỗi server"
        })
    }
}