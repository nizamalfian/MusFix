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

This project contains `.env` and `.prod.env` files for managing environment variables. These files are tracked by Git but should contain your local secrets, which must not be pushed to the remote repository.

**CRITICAL SETUP STEP:**

After cloning the repository, you **must** tell Git to ignore your local changes to these files by running the following command:

```bash
git update-index --assume-unchanged .env .prod.env
```

This command makes Git 'forget' about the files, so any secrets you add locally will not be staged or committed.

If you ever need to start tracking changes to these files again (for example, to add a new variable to the template), you can run:
```bash
git update-index --no-assume-unchanged .env .prod.env
```

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
