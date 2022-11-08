# Spiralyze Development Test

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/ spiralyze
cd spiralyze
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Testing:

```bash
# run all tests
npm test

# run all tests in watch mode
npm test:watch
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/spiralyze
```

## API Documentation

To view the list of available APIs and their specifications, go to `https://documenter.getpostman.com/view/5622145/2s8YYPHfsA` in your browser.
