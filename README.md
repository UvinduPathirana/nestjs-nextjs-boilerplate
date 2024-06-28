# Weather App

## Overview
This project is a full-stack weather dashboard application with user authentication and personalization features, developed using TypeScript, React, Next.js, NestJS, and Docker. The application allows users to create accounts, log in, and customize their weather dashboard by adding and removing cities to track weather information in real-time.

## Getting Started

### Prerequisites
- Node.js (>=14.x)
- npm or yarn
- Docker
- pgAdmin4 and postgres

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/UvinduPathirana/weather-app.git
    cd weather-app
    ```

2. Install frontend dependencies:
    ```sh
    cd frontend
    npm install 
    ```

3. Install backend dependencies:
    ```sh
    cd backend
    yarn install
    ```

### Running the Application

1. Start the frontend:
    ```sh
    cd frontend
    npm run dev
    ```

2. Start the backend:
    ```sh
    cd backend
    yarn start:dev
    ```
### Add Env Variables
#### For Frontend 
Add a .env file to the /frontend path 
```
BACKEND_BASE_URL="http://localhost:3000"
WEATHER_API_KEY="yourApiKey"
```

#### For Backend 
```
DB_HOST="localhost"
DB_PORT="5432"
DB_USERNAME="postgres"
DB_PASSWORD="db-password"
DB_NAME="your-database-namae"
WEATHER_API_KEY="yourApiKey"
JWT_SECRET="your-secret-key"
```

### Development Guidelines

- Use `const` by default. Use `let` only when you need to reassign the variable.
- Avoid using `var` for variable declarations.
- Write meaningful commit messages.
- Ensure all new features and changes are covered by tests.
- Follow the project's coding style and guidelines.
- Use ESLint to maintain code quality and consistency. Ensure your code passes all ESLint checks before submitting a pull request.

### Ethics

- **Code Quality:** Always strive for clean, readable, and maintainable code. Avoid using `var` for variable declarations. Use `const` by default and `let` only when necessary.
- **Branch Naming Convention:** Follow the naming convention `we-[feature number]` for new branches. This helps in tracking features and maintaining an organized workflow.
- **Testing:** Ensure your code is thoroughly tested. Write unit and integration tests to cover new features and bug fixes.
- **Collaboration:** Be respectful and considerate in code reviews. Provide constructive feedback and be open to receiving feedback.
- **Security:** Store all the secrets and passwords in enviroment varible. Do not commit any passwords to Git.
- **Dependency Management:** Regularly update dependencies to their latest versions and ensure they are compatible with the project.


---
