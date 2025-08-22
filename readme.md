



# E-Commerce Project Udemy

## Overview

This is a full-stack E-Commerce web application built as a learning project. It allows users to browse products, add them to a cart, place orders, manage their profile, and for admins to manage products and orders. The project is structured with a React frontend and a Node.js/Express backend, using MongoDB as the database.

---

## Features

- User authentication and profile management
- Product listing, details, and reviews
- Shopping cart and checkout flow
- Order placement and history
- Admin dashboard for product and order management
- Payment integration with Stripe
- Invoice generation and download

---

## Technologies & Modules Used

### Backend (`/backend`)
- **Node.js**
- **Express**
- **MongoDB** (with Mongoose)
- **dotenv** (for environment variables)
- **bcryptjs** (for password hashing)
- **cloudinary** (for image uploads)
- **cookie-parser** (for cookies)
- **stripe** (for payment processing)
- **Custom middlewares** (auth, error handling)
- **Seeding scripts** for initial data

### Frontend (`/frontend`)
- **React**
- **Redux Toolkit** (for state management)
- **React Router DOM** (for routing)
- **MDBReact** (for UI components)
- **react-hot-toast** (for notifications)
- **react-star-ratings** (for product ratings)
- **html2canvas** & **jspdf** (for invoice generation)
- **axios** (for API requests)
- **Tailwind CSS** (if enabled)
- **Other helper libraries** (pagination, charts, etc.)

---

## How to Run

### Backend
1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up environment variables in `/backend/.env`.
3. Start the server:
   ```sh
   npm start
   ```

### Frontend
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. **Frontend URL:**  
   [http://localhost:5173](http://localhost:5173)

---

## Folder Structure

- `/backend` - Node.js/Express API
- `/frontend` - React client app

---



test it - https://ecommerce-application-yvm0.onrender.com