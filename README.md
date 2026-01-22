# GoodMeat Backend

A Node.js/Express backend API for the GoodMeat application, providing endpoints for authentication, product management, categories, and file uploads.

## Features

- User authentication
- Product CRUD operations
- Category and subcategory management
- Image upload via Cloudinary
- MongoDB database integration
- Session management
- CORS enabled for frontend integration

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Cloud Storage:** Cloudinary
- **Logging:** Pino
- **Session Management:** express-session

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Cloudinary account

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# Session
SESSION_SECRET=your_session_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ch-praneeth-08/GoodMeat-Backend.git
cd GoodMeat-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and add your environment variables (see above).

4. Start the development server:
```bash
npm start
```

For development with auto-reload:
```bash
npx nodemon server.js
```

## API Endpoints

### Health Check
- `GET /health` - Check server status

### Authentication
- `/auth/*` - Authentication routes

### Products
- `/products/*` - Product management routes

### Categories
- `/categories/*` - Category management routes

### Subcategories
- `/subcategories/*` - Subcategory management routes

### Upload
- `/upload/*` - File upload routes

## Deployment

### Deploy to Render

This application is configured for easy deployment on Render using the included `render.yaml` file.

#### Steps:

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service:**
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` configuration

3. **Configure Environment Variables:**
   Add the following environment variables in the Render dashboard:
   - `MONGO_URI` - Your MongoDB connection string
   - `SESSION_SECRET` - A secure random string for sessions
   - `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY` - Your Cloudinary API key
   - `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

4. **Deploy:**
   - Render will automatically build and deploy your application
   - Your API will be available at `https://your-service-name.onrender.com`

#### Manual Deployment (without render.yaml):

If you prefer to configure manually:

1. Create a new Web Service on Render
2. Set **Build Command:** `npm install`
3. Set **Start Command:** `npm start`
4. Add all environment variables listed above
5. Deploy!

### Deploy to Vercel

The application also includes a `vercel.json` configuration for Vercel deployment:

```bash
npm install -g vercel
vercel --prod
```

## Project Structure

```
├── config/
│   ├── cloudinary.js    # Cloudinary configuration
│   └── logger.js        # Pino logger configuration
├── models/
│   ├── category.model.js
│   ├── product.model.js
│   └── subcategory.model.js
├── routes/
│   ├── auth.js
│   ├── categories.js
│   ├── products.js
│   ├── subcategories.js
│   └── upload.js
├── server.js            # Main application entry point
├── package.json
├── render.yaml          # Render deployment configuration
└── vercel.json          # Vercel deployment configuration
```

## Development

- The server runs on port 5000 by default (configurable via `PORT` environment variable)
- CORS is configured to allow requests from:
  - `http://localhost:5173` (local development)
  - `https://good-meat-frontend.vercel.app` (production frontend)

## License

ISC

## Author

[Add your name/organization here]
