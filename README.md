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

This project uses environment variables for configuration, which should be stored in a `.env` file in the root directory. Create a file named `.env` and populate it with the following variables:

```
HOST=0.0.0.0
PORT=5000

PGUSER=your_postgres_username
PGHOST=localhost
PGPASSWORD=your_postgres_password
PGDATABASE=your_database_name
PGPORT=5432
```

Make sure to replace `your_postgres_username`, `your_postgres_password`, and `your_database_name` with your actual PostgreSQL credentials.

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
