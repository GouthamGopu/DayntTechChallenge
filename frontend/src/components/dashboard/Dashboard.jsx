import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { toast } from "react-toastify";
import "./Dashboard.css";
import Header from "../header/Header";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {user} = useSelector(store=>store.auth);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false); 
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [editIndex, setEditIndex] = useState(null);



  

  const getItems = async () => {
    try {
      const res = await axios.get('http://localhost:8000/dt/item/get', { withCredentials: true });
      if (res.data.success) {
        setData(res.data.items);
      } 
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error(error?.response?.data?.message);
    }
  };


  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setName(data[index].name);
    setDob(data[index].dob);
    setOpen(true); 
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${data[index].name}?`);
    if (confirmDelete) {
      deleteItem(index);
    }
  };

  const deleteItem = async (index) => {
    try {
      const response = await axios.delete(`http://localhost:8000/dt/item/delete/${data[index]._id}`, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.message);
        setData(prevData => prevData.filter((item, idx) => idx !== index));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting!");
    }
  };

  const handleAdd = () => {
    setIsEditing(false);
    setName('');
    setDob('');
    setOpen(true); 
  };

  const handleSave = async () => {
    try {
      const payload = { name, dob };
      let response;
      if (isEditing) {
        response = await axios.put(`http://localhost:8000/dt/item/edit/${data[editIndex]._id}`, payload, { withCredentials: true });
      } else {
        response = await axios.post('http://localhost:8000/dt/item/add', payload, { withCredentials: true });
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(prevData => isEditing ? prevData.map((item, idx) => idx === editIndex ? response.data.item : item) : [...prevData, response.data.item]);
        setOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; 
  };
 const navigate =useNavigate();
  useEffect(()=>{
      if(!user){
          navigate("/login");
      }
      else{
        getItems();
      }
    },[user])
  

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <Button variant="contained" color="primary" onClick={handleAdd}>Add New Item</Button>
        </div>
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow className="headings">
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{formatDate(item.dob)}</TableCell>
                  <TableCell>
                    <div className="btn-container">
                      <Button variant="outlined" color="primary" onClick={() => handleEdit(index)}>Edit</Button>
                      <Button variant="outlined" color="secondary" className="btn" onClick={() => handleDelete(index)}>Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Modal for Add/Edit */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? "Edit Item" : "Add Item"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">{isEditing ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
