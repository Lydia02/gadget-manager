# Gadget Store Management API

## Introduction

The Gadget Store Management API is a comprehensive solution for managing a gadget store. The system includes functionality for administrators to manage products, employees, sales reports, and user roles. Additionally, it allows users to view products, make purchases, and view their order history.

The API is built using **Fastify** and **Prisma**, with **PostgreSQL** as the database. The architecture supports role-based access control for admins and users.

## Features

### Admin Features:
1. **Product Management:**
   - Add, edit, delete gadgets
   - Update gadget quantities
   - Change gadget prices and set discounts
   - Manage gadget specifications (e.g., screen size, color, etc.)
2. **Employee Management:**
   - Add, edit, and delete employee accounts
   - Assign roles (e.g., sales manager, marketer)
3. **Sales Reports:**
   - Generate detailed daily sales reports
4. **Store Settings:**
   - Customize store information
   - Manage payment gateway integration (future)
   - Set email/SMS notification preferences (future)

### User Features:
1. **View Inventory:**
   - Browse available products with their specifications and prices.
2. **Make Purchases:**
   - Purchase gadgets and receive an order confirmation.
3. **Order History:**
   - View past purchases and order details.

## Project Structure

```
gadget-store/
│
├── prisma/                  # Prisma schema and migration files
├── src/
│   ├── controllers/         # Controllers for business logic
│   ├── routes/              # API route definitions
│   ├── services/            # Service layer for database operations
│   ├── config/              # Configuration files (e.g., JWT)
│   └── utils/               # Utility functions (error handling, etc.)
│
├── .env                     # Environment variables (DB connection, secrets)
├── package.json             # Project dependencies and scripts
├── README.md                # This file
└── index.js                 # Entry point for Fastify server
```

## Technologies Used

- **Fastify**: For building high-performance backend APIs
- **Prisma**: ORM for managing PostgreSQL database
- **PostgreSQL**: Relational database
- **JWT**: Authentication and Authorization
- **Zod**: Schema validation
- **Nodemon**: Development utility

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gadget-store.git
   cd gadget-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables in a `.env` file:
   ```
   DATABASE_URL="postgresql://<username>:<password>@localhost:5432/gadgetstore"
   JWT_SECRET="your_secret_key"
   ```

4. Set up your database with Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication Routes

1. **User Registration**
   - **URL**: `/register`
   - **Method**: `POST`
   - **Body**:
     ```json
     {
       "firstName": "John",
       "lastName": "Doe",
       "email": "john.doe@example.com",
       "password": "password"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Registration successful, Kindly login"
     }
     ```

2. **Admin Registration**
   - **URL**: `/admin/register`
   - **Method**: `POST`
   - **Body**:
     ```json
     {
       "firstName": "Admin",
       "lastName": "Smith",
       "email": "admin@example.com",
       "password": "adminpassword",
       "role": "admin"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Registration successful, Kindly login"
     }
     ```

3. **Login**
   - **URL**: `/login`
   - **Method**: `POST`
   - **Body**:
     ```json
     {
       "email": "john.doe@example.com",
       "password": "password"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Login successful below are your details",
       "user": { ... },
       "token": "jwt_token"
     }
     ```

4. **Logout**
   - **URL**: `/logout`
   - **Method**: `POST`
   - **Headers**: `{ Authorization: 'Bearer <jwt_token>' }`
   - **Response**:
     ```json
     {
       "message": "Logout successful"
     }
     ```

### Product Management (Admin)

1. **Add Product**
   - **URL**: `/admin/products`
   - **Method**: `POST`
   - **Body**:
     ```json
     {
       "name": "iPhone 12",
       "description": "Latest iPhone model",
       "price": 999.99,
       "category": "Mobile Phones",
       "quantity": 50,
       "specifications": [
         { "name": "Color", "value": "Black" },
         { "name": "Screen Size", "value": "6.1 inches" }
       ]
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Product created successfully",
       "product": { ... }
     }
     ```

2. **Get All Products**
   - **URL**: `/products`
   - **Method**: `GET`
   - **Response**:
     ```json
     {
       "products": [
         {
           "id": 1,
           "name": "iPhone 12",
           "description": "Latest iPhone model",
           "price": 999.99,
           "category": "Mobile Phones",
           "quantity": 50
         }
       ]
     }
     ```

### Purchase and Order Management (User)

1. **Make a Purchase**
   - **URL**: `/orders`
   - **Method**: `POST`
   - **Headers**: `{ Authorization: 'Bearer <jwt_token>' }`
   - **Body**:
     ```json
     {
       "productId": 1,
       "quantity": 2
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Purchase successful",
       "order": { ... }
     }
     ```

2. **View Order History**
   - **URL**: `/orders`
   - **Method**: `GET`
   - **Headers**: `{ Authorization: 'Bearer <jwt_token>' }`
   - **Response**:
     ```json
     {
       "orders": [
         {
           "id": 1,
           "total": 1999.98,
           "items": [
             {
               "productId": 1,
               "name": "iPhone 12",
               "quantity": 2
             }
           ]
         }
       ]
     }
     ```

### Sales Reports (Admin)

1. **Daily Sales Report**
   - **URL**: `/admin/sales/daily`
   - **Method**: `GET`
   - **Headers**: `{ Authorization: 'Bearer <jwt_token>' }`
   - **Response**:
     ```json
     {
       "report": [
         {
           "productId": 1,
           "quantity": 2,
           "totalAmount": 1999.98,
           "saleDate": "2024-09-28T00:00:00.000Z"
         }
       ]
     }
     ```

## Testing with Postman

To test the API using **Postman**, follow these steps:

1. **Set Up Environment**:
   - Create a new environment in Postman with variables such as `base_url` set to `http://localhost:3000`.

2. **Testing Authentication**:
   - Use the `/register` and `/login` endpoints to create users and authenticate them.

3. **Testing Admin Routes**:
   - First, log in as an admin, then copy the JWT token from the response.
   - For each admin route (e.g., `/admin/products`, `/admin/sales/daily`), use the **Authorization** tab in Postman to add a **Bearer Token**.

4. **Testing Product and Order Endpoints**:
   - Test product creation as an admin using `/admin/products`.
   - Test purchase and order history using `/orders`.

## Future Enhancements

- **Payment Gateway Integration**: Secure payments using PayPal, Stripe, or any other gateway.
- **Email/SMS Notifications**: Automatic notifications for purchases, product updates, and sales reports.
- **Enhanced Reports**: Monthly, yearly, and filter-based sales reports.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.


