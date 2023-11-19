import express from "express";
import { checkPermission } from "../middlewares/checkPermission.js";
import { createCoupon, getAllCoupon, getAllCouponActive, getDetailCoupon, removeCoupon, updateCoupon } from "../controllers/coupon.conrtoller.js";


const routerCoupon = express.Router();

routerCoupon.get("/coupon", getAllCoupon);
routerCoupon.get("/coupon-active", getAllCouponActive);
routerCoupon.get("/coupon/:id", getDetailCoupon);
routerCoupon.post("/coupon", createCoupon);
routerCoupon.patch("/coupon/:id", updateCoupon);
routerCoupon.delete("/coupon/:id", removeCoupon);

export default routerCoupon;