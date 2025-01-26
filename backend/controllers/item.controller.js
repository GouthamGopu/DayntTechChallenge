import { Item } from "../models/item.model.js";


export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    return res.status(200).json({
      message: "Items fetched successfully.",
      success: true,
      items,
    });
  } catch (error) {
    console.error("Get Items Error:", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
      success: false,
    });
  }
};


export const addItem = async (req, res) => {
  try {
    const { name, dob } = req.body;

    if (!name || !dob) {
      return res.status(400).json({
        message: "Name and Date of Birth are required!",
        success: false,
      });
    }

    const age = calculateAge(dob);

    const newItem = await Item.create({
      name,
      age,
      dob,
    });

    return res.status(201).json({
      message: "Item added successfully.",
      success: true,
      item: newItem,
    });
  } catch (error) {
    console.error("Add Item Error:", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
      success: false,
    });
  }
};


export const editItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dob } = req.body;

    if (!name || !dob) {
      return res.status(400).json({
        message: "Name and Date of Birth are required!",
        success: false,
      });
    }

    const age = calculateAge(dob);

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, age, dob },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "Item not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item updated successfully.",
      success: true,
      item: updatedItem,
    });
  } catch (error) {
    console.error("Edit Item Error:", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
      success: false,
    });
  }
};


export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Item not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item deleted successfully.",
      success: true,
      item: deletedItem,
    });
  } catch (error) {
    console.error("Delete Item Error:", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
      success: false,
    });
  }
};

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
