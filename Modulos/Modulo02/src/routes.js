import { Router } from 'express';
import User from './app/models/User';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Guilherme Ortiz',
    email: 'guilherme@rocketseat.com.br',
    password_hash: '123456789',
  });

  return res.json(user);
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
