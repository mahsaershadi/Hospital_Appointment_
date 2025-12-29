# Hospital Appointment & Patient Management API

A production-ready REST API built with Node.js, Express, and PostgreSQL for managing hospital appointments and patient records.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (ADMIN, STAFF)
- **Patient Management**: CRUD operations for patient records
- **Appointment Management**: Schedule, update, and manage appointments
- **Clean Architecture**: Controller/Service/Repository layers
- **Validation**: Request validation using class-validator
- **Error Handling**: Centralized error handling with meaningful error messages

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript (ES Modules)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: class-validator, class-transformer

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   PORT=3000
   NODE_ENV=development
   
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=hospital_db
   
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=24h
   
   TYPEORM_SYNCHRONIZE=true
   TYPEORM_LOGGING=true
   ```

4. **Create the database**:
   ```sql
   CREATE DATABASE hospital_db;
   ```

5. **Run migrations** (if using migrations):
   ```bash
   npm run migration:run
   ```
   
   Or set `TYPEORM_SYNCHRONIZE=true` in `.env` to auto-sync schema (development only)

6. **Create initial admin user**:
   ```bash
   npm run create-admin
   ```
   
   Or with custom credentials:
   ```bash
   node src/scripts/createAdmin.js admin@hospital.com mypassword
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Authentication

- **POST** `/auth/login` - Login and get JWT token
  ```json
  {
    "email": "staff@hospital.com",
    "password": "password123"
  }
  ```

- **POST** `/auth/register` - Register a new staff user (Admin only)
  ```json
  {
    "email": "newstaff@hospital.com",
    "password": "password123",
    "role": "STAFF"
  }
  ```
  Headers: `Authorization: Bearer <admin_token>`

### Patients

All patient endpoints require authentication.

- **POST** `/patients` - Create a new patient
- **GET** `/patients` - Get all patients
- **GET** `/patients/:id` - Get patient by ID
- **PUT** `/patients/:id` - Update patient
- **DELETE** `/patients/:id` - Delete patient

### Appointments

All appointment endpoints require authentication.

- **POST** `/appointments` - Create a new appointment
- **GET** `/appointments` - Get all appointments
- **GET** `/appointments/:id` - Get appointment by ID
- **PUT** `/appointments/:id` - Update appointment
- **DELETE** `/appointments/:id` - Delete appointment

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Roles

- **ADMIN**: Can create staff users and access all endpoints
- **STAFF**: Can manage patients and appointments

## Example Usage

### 1. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hospital.com",
    "password": "admin123"
  }'
```

### 2. Create Patient (with token)
```bash
curl -X POST http://localhost:3000/patients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "nationalId": "1234567890",
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-15",
    "phone": "+1234567890"
  }'
```

### 3. Create Appointment
```bash
curl -X POST http://localhost:3000/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "patientId": "<patient_id>",
    "scheduledAt": "2024-12-25T10:00:00Z",
    "description": "Regular checkup"
  }'
```

## Project Structure

```
src/
├── config/          # Configuration files (database, env)
├── entities/        # TypeORM entities
├── controllers/     # Request handlers
├── services/        # Business logic
├── repositories/    # Data access layer
├── middlewares/     # Express middlewares
├── routes/          # Route definitions
├── utils/           # Utilities (DTOs, errors, JWT)
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

## Error Handling

The API returns standardized error responses:
```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "statusCode": 400
  }
}
```

## Database Schema

- **users**: User accounts (ADMIN, STAFF)
- **patients**: Patient records
- **appointments**: Appointment records (linked to patients and users)


