const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./config/logger');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. CORE MIDDLEWARE ---

// Allow local and deployed frontend origins
const allowedOrigins = [
  'http://localhost:5173',                     // Local React dev server
  'http://localhost:3000',                     // Alternative local port
  'https://good-meat-frontend.vercel.app',     // Deployed frontend (main)
  'https://good-meat-frontend-git-main-praneeths-projects-22d4c585.vercel.app', // Vercel preview URL
  process.env.FRONTEND_URL                     // Environment-specific frontend URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow if in allowedOrigins list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow any Vercel deployment URL that matches the pattern
    if (origin.includes('vercel.app') && origin.includes('good-meat')) {
      return callback(null, true);
    }
    
    // Reject others
    logger.warn(`CORS blocked origin: ${origin}`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// --- 2. SESSION MIDDLEWARE ---

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // Secure cookies in production
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24                     // 1 day
  }
}));

// --- 3. DATABASE CONNECTION ---

const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  logger.info('MongoDB database connection established successfully!');
});

// --- 4. HEALTH CHECK ENDPOINT ---

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// --- 5. API ROUTES ---

const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const subcategoriesRouter = require('./routes/subcategories');
const uploadRouter = require('./routes/upload');

app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/subcategories', subcategoriesRouter);
app.use('/upload', uploadRouter);

// --- 6. ERROR HANDLING MIDDLEWARE ---

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error: %o', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// --- 7. START SERVER ---

app.listen(PORT, () => {
  logger.info(`Server starting on port ${PORT}`);
});
