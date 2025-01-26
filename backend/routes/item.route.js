import express from "express";
import { getItems, addItem, editItem, deleteItem } from "../controllers/item.controller.js";

const router = express.Router();

router.route('/').get(getItems);
router.route('/').post(addItem);
router.route('/:id').put(editItem);
router.route('/:id').delete(deleteItem);

export default router;
