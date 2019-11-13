import { Router } from 'express';
import User from './app/models/User';
import Student from './app/models/Student';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', async (req, res) => {
  // const user = await User.create({
  //   name: 'Guilherme Ortiz',
  //   email: 'guilherme@rocketseat.com.br',
  //   password_hash: '123456789',
  // });

  const user = await Student.create({
    name: 'Guilherme Ortiz',
    email: 'guilherme@rocketseat.com.br',
    age: 31,
    weight: 64.5,
    height: 1.67,
  });

  return res.json(user);
});

// posts
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/students', StudentController.store);

routes.use(authMiddleware);

// updates
routes.put('/users', UserController.update);
routes.put('/students', StudentController.update);

export default routes;
