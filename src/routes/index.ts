import { Router } from 'express';
import * as billController from '../controller/bill';

const routes = Router();

routes.get('/', billController.getBillList);
routes.get('/:id', billController.getBillDetail);
routes.post('/', billController.addBill);
routes.put('/:id', billController.editBill);
routes.delete('/:id', billController.deleteBill);

export default routes;
