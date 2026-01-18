# MusFix API

This is the API for the MusFix music service.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

This project uses environment variables for configuration. To get started, follow these steps:

1.  **Copy the Template File**: For development, create a copy of the example file and name it `.env`.
    ```bash
    cp .env.example .env
    ```
    For a production setup, you would do the same with `.prod.env`.

2.  **Fill in Local Credentials**: Open the new `.env` file and fill in your specific database credentials and other settings. This file is listed in `.gitignore`, so your secrets will not be committed.

## Usage

### Development
To run the server in development mode with nodemon, use:
```bash
npm run start:dev
```

### Production
To run the server in production mode, use:
```bash
npm run start:prod
```

## Linting
To lint the project files, run:
```bash
npm run lint
```

## Database Migration
To run database migrations, use:
```bash
npm run migrate
```

## End-to-End API Testing (Postman)
This project includes Postman files for End-to-End (E2E) API testing.

-   `./postman/MusFix API Test.postman_collection.json`: This file contains a collection of API requests that can be used to test the various endpoints of the MusFix API.
-   `./postman/MusFix API Test.postman_environment.json`: This file defines the environment variables used by the Postman collection, such as the base URL of the API.

To use these files, import them into Postman and set up your local environment.
