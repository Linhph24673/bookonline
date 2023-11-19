import express from 'express'
import { createProduct, deleteFakeProduct, deleteRealProduct, getAllProduct, getDetailProduct, restoreProduct, updateProduct } from '../controllers/product.controller.js';
import { checkPermission } from '../middlewares/checkPermission.js';
const routerProduct = express.Router()

routerProduct.get('/products', getAllProduct);
routerProduct.get('/products/:id', getDetailProduct);
routerProduct.patch('/products/:id', updateProduct);
routerProduct.post('/products/', createProduct);
routerProduct.patch('/deleteFakeProduct/:id', deleteFakeProduct);
routerProduct.patch('/restoreProduct/:id', restoreProduct);
routerProduct.delete('/products/:id', deleteRealProduct);

export default routerProduct