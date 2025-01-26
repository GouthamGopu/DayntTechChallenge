import express from "express";
import { getItems, addItem, editItem, deleteItem } from "../controllers/item.controller.js";

const router = express.Router();

router.route('/get').get(getItems);
router.route('/add').post(addItem);
router.route('/edit/:id').put(editItem);
router.route('/delete/:id').delete(deleteItem);

export default router;
