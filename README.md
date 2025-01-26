# DayntTech Challenge

This project is a web application developed as part of the DayntTech Challenge. It is built using  **React**, **Material UI (MUI)**, **Redux**, and **Express**. The app has a login page, a data-driven dashboard, and user authentication. 

The project is divided into two main folders:
- **frontend**: Contains the React app with Next.js for the frontend.
- **backend**: Contains the Express app for the backend API.

## Features

- **Login System**: 
  - Login page with email and password authentication.
  - Authentication guard ensures that only logged-in users can access the dashboard.
  
- **Dashboard**:
  - A data table that displays name, age, date of birth, and action columns (edit, delete).
  - Automatically calculates age based on the date of birth.
  - CRUD operations (Add, Edit, Delete) with toast notifications for each action.

- **Registration Page**: Allows users to create an account.

## Setup Instructions

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (local or cloud)

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/GouthamGopu/DayntTechChallenge.git
```

2. For Backend

.env file

```bash
PORT=your_port
MONGO_URI=your_mongo_connection_string
SECRET_KEY=your_secret_key
```

```bash
cd backend
npm install
npm run dev
```

3.For Frontend

```bash
cd frontend
npm install
npm run dev
```
