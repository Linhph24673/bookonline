import express from "express";
import { BlockUser, CreateUser, getAllUser, getOneUser, updateUser } from "../controllers/user.controller.js";


const routerUser = express.Router();

routerUser.get("/user", getAllUser);
routerUser.get("/user/:id", getOneUser);
// routerUser.get("/coupon/:id", getDetailCoupon);
routerUser.post("/user", CreateUser);
routerUser.patch("/user/:id", updateUser);
routerUser.patch("/user-block/:id", BlockUser);

export default routerUser;