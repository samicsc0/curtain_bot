# Curtain Management API
A Node.js/Express.js backend application built with TypeScript, following Clean Architecture principles. The application manages curtains and administrators through a RESTful API.

## Table of Contents
- [Architecture](#architecture)
- [Key Features](#key-features)
- [API Endpoints](#api-endpoints)
- [Development Setup](#development-setup)
- [Best Practices](#best-practices)
- [Environment Configuration](#environment-configuration)
- [Error Handling](#error-handling)

## Architecture
### Domain Layer
Contains business logic and rules independent of external frameworks.

#### Entities
- **Curtain**: Represents a curtain product with properties like name, category, price, etc.
- **Admin**: Represents an administrator with authentication capabilities

#### DTOs (Data Transfer Objects)
- **CurtainDTO**: Data structures for curtain-related operations
- **AdminDTO**: Data structures for admin-related operations

### Use Cases Layer
Implements application-specific business rules:

#### Curtain Use Cases
- `CreateCurtainUseCase`
- `UpdateCurtainUseCase`
- `DeleteCurtainUseCase`
- `GetAllCurtainsUseCase`
- `GetCurtainByIdUseCase`
- `UpdateCurtainStatusUseCase`
- `UpdateCurtainImageUseCase`

#### Admin Use Cases
- `CreateAdminUseCase`
- `GetAdminByIdUseCase`
- `UpdateAdminEmailUseCase`
- `UpdateAdminPasswordUseCase`

### Infrastructure Layer
- **Express Setup**
  - Routes: API endpoint definitions
  - Controllers: Request handling and response formatting
  - Middleware: Authentication, validation, and error handling
  - Validators: Request validation using Zod
- **Database**
  - Uses Prisma ORM with PostgreSQL
  - Schema includes Admin and Curtain models

## Key Features
### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Password encryption using bcrypt

### Data Validation
- Comprehensive request validation using Zod
- Input sanitization
- Type safety with TypeScript

### Error Handling
- Custom error handling implementation
- Consistent error responses
- Operational vs Programming error distinction

## API Endpoints
### Curtain Endpoints
- `POST /api/v1/curtain`: Create new curtain
- `GET /api/v1/curtain/:id`: Get curtain by ID
- `GET /api/v1/curtain`: Get all curtains
- `PATCH /api/v1/curtain/:id`: Update curtain
- `PATCH /api/v1/curtain/:id/status`: Update curtain status
- `PATCH /api/v1/curtain/:id/image`: Update curtain image
- `DELETE /api/v1/curtain/:id`: Delete curtain

### Admin Endpoints
- `POST /api/v1/admin/auth`: Admin authentication
- `POST /api/v1/admin`: Create admin
- `GET /api/v1/admin/:id`: Get admin by ID
- `GET /api/v1/admin`: Get all admins
- `PATCH /api/v1/admin/:id/email`: Update admin email
- `PATCH /api/v1/admin/:id/password`: Update admin password
- `PATCH /api/v1/admin/:id/status`: Update admin status

## Development Setup
### Prerequisites
- Node.js
- PostgreSQL
- npm/yarn

### Installation
1. Clone the repository
2. Install dependencies
3. Set up environment variables
4. Set up the database
5. Start the development server

### Available Scripts
- `npm run dev`: Start development server
- `npm run prepare`: Install husky hooks
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier


## Best Practices
1. Clean Architecture separation of concerns
2. Dependency injection
3. Repository pattern for data access
4. DTOs for data transfer
5. Comprehensive error handling
6. Request validation
7. Type safety with TypeScript
8. Code formatting and linting
9. Git hooks for code quality
10. Environment-based configuration

## Environment Configuration
Required environment variables:
```
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your-secret-key"

```

## Error Handling
The application implements a global error handling middleware that catches and formats all errors consistently:

```
interface ApiErrorResponseDTO {
    status: string;
    isOperational: boolean;
    errorCode: number;
    errorMessage: string;
}
```

### API Response Format

```
 {
  status: "Success" | "Fail";
  statusCode: number;
  message: string;
  data: T;
  page?: number;
  totalData?: number;
}
```

### Error Response Format

```
{
    "status": "Fail",
    "errorCode": 400,
    "errorMessage": "Invalid input",
    "isOperational": true
}

```
