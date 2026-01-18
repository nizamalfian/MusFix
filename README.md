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

This project uses environment variables for configuration. To get started, you'll need to create a `.env` file for development and a `.prod.env` file for production.

1.  **Copy the example files:**
    For development, copy the provided example file:
    ```bash
    cp .env.example .env
    ```
    For production, do the same for the production environment:
    ```bash
    cp .prod.env.example .prod.env
    ```

2.  **Fill in your credentials:**
    Now, open the newly created `.env` (and/or `.prod.env`) file and fill in your specific configuration details, such as database credentials and server port. The actual `.env` and `.prod.env` files are ignored by Git, so your secrets will not be committed to the repository.


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
