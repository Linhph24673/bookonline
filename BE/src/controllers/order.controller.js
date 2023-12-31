import Order from '../models/order.model.js';
import dotenv from 'dotenv';
import { orderValidate } from '../validates/order.validate.js';
import Cart from '../models/cart.model.js';
import { generatePaymentToken } from '../configs/token.js';
dotenv.config();

export const orderController = {
  /* create */
  create: async (req, res) => {
    try {
      const body = req.body;
      const note = {
        user: body.user,
        noteOrder: body.noteOrder,
        noteShipping: body.inforOrderShipping.noteShipping,
      };
      const encodeStripe = generatePaymentToken(note);
      // console.log(body['inforOrderShipping']['shippingNote']);

      //gửi mail
      // var message="Mua hàng thành công";
      // var subject="Payment Success";
      // var email=body['inforOrderShipping']['email'];
      // console.log(email)
      // var link=""
      // axios.get('https://ketquaday99.com/api/NodeMailer/?email='+email+'&subject='+subject+'&message='+message).then(function (response) {console.log(response);});

      /* validate */
      const { error } = orderValidate.validate(body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const items = body.items;
      /* tính tổng tiền của đơn hàng người dùng vừa đặt */
      let total = 0;
      items.forEach((item) => {
        total += item.quantity * item.price;
        /* nếu mà sản phẩm có topping */
        if (item.toppings.length > 0 && item.toppings) {
          item.toppings.forEach((topping) => {
            total += topping.price;
          });
        }
      });
      /* kiểm tra xem đã có order nào chưa */
      const priceShipping = Number(body.priceShipping) || 0;
      /* tạo đơn hàng mới */
      const order = new Order({
        ...body,
        total: total + priceShipping,
        priceShipping: body.priceShipping,
        is_active: true,
      });
      /* lưu đơn hàng mới */
      const orderNew = await order.save();
      if (!orderNew) {
        return res.status(400).json({ error: 'Tạo đơn hàng thất bại' });
      }

      const cart = await Cart.deleteMany({
        user: order.user,
      });

      if (!cart) {
        return res.status(200).json({
          message: 'delete success',
          data: cart,
        });
      }

      console.log('Order', orderNew);

      return res.status(200).json({
        message: 'create order successfully',
        order: {
          orderNew,
          url: `${process.env.RETURN_URL}/products/checkout/payment-result?encode=${encodeStripe}`,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  /* get all order */
  getAll: async (req, res) => {
    try {
      const { _page = 1, _limit = 10, q } = req.query;
      const options = {
        page: _page,
        limit: _limit,
        sort: { createdAt: -1 },
        populate: [
          {
            path: 'user',
            select: '-password -products -order',
            populate: { path: 'role', select: '-users' },
          },
          { path: 'items.product' },
        ],
      };
      const query = q ? { name: { $regex: q, $options: 'i' } } : {};
      const orders = await Order.paginate(query, options);
      if (!orders) {
        return res.status(400).json({ error: 'get all order failed' });
      }
      return res.status(200).json({ ...orders });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  /* get order by id */
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id).populate([
        {
          path: 'user',
          select: '-password -products -order',
          populate: { path: 'role', select: '-users' },
        },
        {
          path: 'items.product',
          select: '-toppings -sizes -is_deleted -createdAt -updatedAt',
          populate: {
            path: 'category',
            select: '-products -is_deleted -createdAt -updatedAt',
          },
        },
      ]);
      if (!order) {
        return res.status(400).json({ error: 'get order by id failed' });
      }
      return res.status(200).json({ order });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  /* cập nhật trạng thái đơn hàng */
  updateStatus: async (id, status) => {
    try {
      const updateState = await Order.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
      ).populate([
        {
          path: 'user',
          select: '-password -products -order',
          populate: { path: 'role', select: '-users' },
        },
        { path: 'items.product' },
      ]);
      return updateState;
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  /* cập nhật trạng thái đơn hàng thành confirmed */
  confirmOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const orderConfirm = await orderController.updateStatus(id, 'confirmed');
      if (!orderConfirm) {
        return res.status(400).json({ error: 'confirm order failed' });
      }
      return res.status(200).json({ message: 'confirm order successfully', order: orderConfirm });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  /* cập nhật trạng thái đơn hàng thành delivered */
  deliveredOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const orderDelivered = await orderController.updateStatus(id, 'delivered');
      if (!orderDelivered) {
        return res.status(400).json({ error: 'delivered order failed' });
      }
      return res
        .status(200)
        .json({ message: 'delivered order successfully', order: orderDelivered });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  /* cập nhật trạng thái đơn hàng thành canceled */
  canceledOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const { reasonCancelOrder } = req.body;
      if (reasonCancelOrder == '') {
        return res.status(500).json({ error: 'Đề nghị bạn cho lý do hủy đơn' });
      }

      const orderCanceled = await Order.findByIdAndUpdate(
        id,
        {
          status: 'canceled',
          reasonCancelOrder: reasonCancelOrder,
        },
        { new: true }
      ).populate([
        {
          path: 'user',
          select: '-password -products -order',
          populate: { path: 'role', select: '-users' },
        },
        { path: 'items.product' },
      ]);

      if (!orderCanceled) {
        return res.status(400).json({ error: 'canceled order failed' });
      }
      return res.status(200).json({ message: 'canceled order successfully', order: orderCanceled });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  doneOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const orderDone = await orderController.updateStatus(id, 'done');
      if (!orderDone) {
        return res.status(400).json({ error: 'done order failed' });
      }
      return res.status(200).json({ message: 'done order successfully', order: orderDone });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  pendingOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const orderPending = await orderController.updateStatus(id, 'pending');
      if (!orderPending) {
        return res.status(400).json({ error: 'pending order failed' });
      }
      return res.status(200).json({ message: 'pending order successfully', order: orderPending });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const orderDelete = await Order.findByIdAndDelete(id);
      if (!orderDelete) {
        return res.status(400).json({ error: 'delete order failed' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getAllOrderConfirmed: async (req, res) => {
    try {
      return orderController.getOrderByStatus(req, res, 'confirmed');
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getAllOrderDelivered: async (req, res) => {
    try {
      return orderController.getOrderByStatus(req, res, 'delivered');
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getAllOrderDone: async (req, res) => {
    try {
      return orderController.getOrderByStatus(req, res, 'done');
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getAllOrderCanceled: async (req, res) => {
    try {
      return orderController.getOrderByStatus(req, res, 'canceled');
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getAllOrderPending: async (req, res) => {
    try {
      return orderController.getOrderByStatus(req, res, 'pending');
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getAllOrderByUserId: async (req, res) => {
    try {
      const { id } = req.params;
      const orders = await Order.find({ user: id });
      if (!orders) {
        return res.status(400).json({ error: 'get all order by user id failed' });
      }
      return res.status(200).json([...orders]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
