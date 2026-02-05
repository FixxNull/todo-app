# Todo App

Full-stack Todo application with real-time CRUD operations. Backend built with Python FastAPI, MongoDB database, and React frontend with Chakra UI.

## Features

- **Create, read, update, delete todos**
- **Responsive design** 
- **Modern UI with Chakra UI & dark mode**
- **Real-time updates**
- **Todo details page**
- **Clean, intuitive interface**

## Tech Stack

| Component | Technology  |
|-----------|-------------|
| Backend   | Python 3.11, FastAPI, PyMongo |
| Frontend  | React 18, Java-Script, ChakraUI |
| Database  | MongoDB |

## Quick Start

Prerequisites

- **Python 3.11+**
- **Node.js 18+**
- **MongoDB (local or Atlas)**


1. **Clone & Install Backend**
    ```
    cd backend
    pip install -r requirements.txt
    cp .env.example .env
    # Update .env with MongoDB connection string
    uvicorn main:app --reload
    ```

2. **Install & Run Frontend**
    ```
    cd frontend
    npm install
    npm start
    ```

3.  **Open App**
    ```
    Frontend: http://localhost:3000
    Backend API: http://localhost:8000/docs
    ```

## API Endpoints

| Method |    Endpoint     |    Description   |
|--------|-----------------|------------------|
| POST   | `/todo/create/` | Create new todo  |
| GET    | `/todo/`        | Get all todos    |
| GET    | `/todo/{id}/`   | Get todo details |
| PUT    | `/todo/{id}/`   | Update todo      |
| DELETE | `/todo/{id}/`   | Delete todo      |

## Development

1. Backend

    ```
    # Run with auto-reload
    uvicorn main:app --reload
    ```
2. Frontend
    ```
    # Development server
    npm start

    # Build for production
    npm run build
    ```