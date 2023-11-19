import express from "express";
import { createCate, getAllCate, getDetailCate, removeCate, updateCate } from "../controllers/category.controller.js";
import { checkPermission } from "../middlewares/checkPermission.js";


const routerCategory = express.Router();

routerCategory.get("/categories", getAllCate);
routerCategory.get("/categories/:id", getDetailCate);
routerCategory.post("/categories", checkPermission, createCate);
routerCategory.patch("/categories/:id", checkPermission, updateCate);
routerCategory.delete("/categories/:id", checkPermission, removeCate);

export default routerCategory;