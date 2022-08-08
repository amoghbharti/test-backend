import { Request, Response } from 'express';
import Order from '../models/order';
import moment from 'moment';

const maxCapacity = parseInt(process.env.MAX_CAPACITY ?? '0');
console.log(maxCapacity);

export const addOrder = async (req: Request, res: Response) => {
  try {
    const reqData = req.body;
    const givenDate = moment();

    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: givenDate.startOf('day').toDate(),
            $lte: givenDate.endOf('day').toDate(),
          },
        },
      },
      { $group: { _id: null, totalQuantity: { $sum: '$quantity' } } },
    ]);

    const currentQuantity = data[0]?.totalQuantity || 0;
    if (reqData.quantity + currentQuantity > maxCapacity) {
      return res.status(400).json({ message: 'Selected quantity is more than capacity left' });
    }

    const order = await Order.create(reqData);

    return res.status(200).json({ message: 'Order Added!', order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqData = req.body;

    const record = await Order.findOne({ _id: id });
    if (!record) {
      return res.status(204).json({ message: 'Record not Found!' });
    } else if (record.status !== 'placed') {
      return res
        .status(400)
        .json({ message: `Order status is ${record.status}, cannot be updated!` });
    }

    const data = await Order.updateOne({ _id: id }, { ...reqData, updatedAt: new Date() });

    return res.status(200).json({ message: 'Order Updated!', data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const record = await Order.findOne({ _id: id });
    if (!record) {
      return res.status(204).json({ message: 'Record not Found!' });
    } else if (record.status !== 'placed') {
      return res
        .status(400)
        .json({ message: `Order status is ${record.status}, cannot be deleted!` });
    }

    const data = await Order.deleteOne({ _id: id });

    return res.status(200).json({ message: 'Order Deleted!', data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const record = await Order.findOne({ _id: id });
    if (!record) {
      return res.status(204).json({ message: 'Record not Found!' });
    }

    const data = await Order.updateOne({ _id: id }, { status, updatedAt: new Date() });

    return res.status(200).json({ message: 'Order Status Updated!', data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const checkCapacity = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const givenDate = moment(date, 'DD-MM-YYYY');

    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: givenDate.startOf('day').toDate(),
            $lte: givenDate.endOf('day').toDate(),
          },
        },
      },
      { $group: { _id: null, totalQuantity: { $sum: '$quantity' } } },
    ]);

    if (!data[0]) {
      return res
        .status(204)
        .send({ message: 'No records found for the date!', data: { capacityLeft: maxCapacity } });
    }

    const capacityLeft = maxCapacity - data[0].totalQuantity;

    return res.status(200).json({ message: 'Capacity left fetched!', data: { capacityLeft } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
