import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { toast } from "react-toastify";
import "./Dashboard.css";
import Header from "../header/Header";

const Dashboard = () => {
  const [data, setData] = useState([
    { name: "John Doe", dob: "1990-05-14", action: "" },
    { name: "Jane Smith", dob: "1985-03-22", action: "" },
    
  ]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age;
  };

  const handleEdit = (index) => {
    toast.success(`Editing item ${data[index].name}`);
    
  };

  const handleDelete = (index) => {
    toast.success(`Deleted item ${data[index].name}`);
    
  };

  const handleAdd = () => {
    toast.success("New item added");
    
  };

  return (
    <>
    <Header/>
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <Button variant="contained" color="primary" onClick={handleAdd}>Add New Item</Button>
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
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
                <TableCell>{calculateAge(item.dob)}</TableCell>
                <TableCell>{item.dob}</TableCell>
                <TableCell>
                  <div className="btn-container">
                    <Button variant="outlined" color="primary" onClick={() => handleEdit(index)}>Edit</Button>
                    <Button variant="outlined" color="secondary" 
                    className="btn" onClick={() => handleDelete(index)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
};

export default Dashboard;
