import { Request, Response } from 'express';
import Bill from '../models/bill';

export const getBillList = async (req: Request, res: Response) => {
  try {
    const offset = parseInt(req.query.offset as string);
    const size = parseInt(req.query.size as string);

    const list = await Bill.find().skip(offset).limit(size);
    return res.json({ message: 'Bill List', data: list });
  } catch (error) {
    console.error(error);
  }
};

export const getBillDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const detail = await Bill.findById(id);

    return res.status(200).json({ message: 'Bill Detail', data: detail });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const addBill = async (req: Request, res: Response) => {
  try {
    const reqData = req.body;
    const data = await Bill.create(reqData);

    return res.json({ message: 'Bill Added', data });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const editBill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqData = req.body;
    const data = await Bill.updateOne({ ...reqData, _id: id });

    return res.json({ message: 'Bill Updated', data });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteBill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Bill.deleteOne({ _id: id });

    return res.json({ message: 'Bill Deleted' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
