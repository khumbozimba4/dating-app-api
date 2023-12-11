import express from 'express';
import UserController from '../controllers/UserController';
const router = express.Router();

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;
