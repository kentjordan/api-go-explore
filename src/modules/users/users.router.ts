import { Router } from "express";
import UsersService from "./users.service";

const router = Router();
const service = new UsersService();

router.post('/', service.createUser);
router.get('/:id', service.getUserById);
router.get('/', service.getUsers);
router.put('/:id', service.updateUser);
router.delete('/:id', service.deleteUser);

export default router;