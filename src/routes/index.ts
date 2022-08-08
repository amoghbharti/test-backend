import { Router } from 'express';
import * as orderController from '../controller/order';

const routes = Router();

routes.get('/', (req, res) =>
  res.send(
    '<center><p><h3>Order service deployed successfully.</h3></p></center>'
  )
);
routes.post('/add', orderController.addOrder);
routes.put('/update/:id', orderController.updateOrder);
routes.put('/updateStatus/:id', orderController.updateStatus);
routes.delete('/delete/:id', orderController.deleteOrder);
routes.get('/checkCapacity/:date', orderController.checkCapacity);

export default routes;
