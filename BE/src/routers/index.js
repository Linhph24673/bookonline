import express from 'express';
import routerProduct from './product.router.js';
import routerAuth from './auth.router.js';
import routerCategory from './category.router.js';
import routerUpload from './uploadfiles.router.js';
import routerCoupon from './coupon.router.js';
import routerCart from './cart.router.js';
import routerUser from './user.router.js';

const router = express.Router();

router.use('', routerProduct);
router.use('/auth', routerAuth);
router.use('', routerCategory);
router.use('', routerUpload);
router.use('', routerCoupon);
router.use('', routerCart);
router.use('', routerUser);

export default router