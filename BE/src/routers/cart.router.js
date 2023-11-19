import express from "express";
import { createCart, deleteCart, getAllCart, getOneCart, updatecart } from "../controllers/cart.controller.js";


const routerCart = express.Router();

routerCart.get("/cart", getAllCart);
routerCart.get("/cart/:id", getOneCart);
routerCart.post("/cart", createCart);
routerCart.patch("/cart/:id", updatecart);
routerCart.delete("/cart/:id", deleteCart);

export default routerCart;