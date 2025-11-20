// index.js
import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import postRoutes from './src/routes/post.routes.js';
import userRoutes from './src/routes/user.routes.js';
import commentRoutes from './src/routes/comment.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import photoRoutes from './src/routes/photo.routes.js';
import { testConnection } from './src/config/db.js'; 
import { errorHandler } from './src/middleware/errorHandler.middleware.js';

const app = express();
const port = 3000;

app.use(express.json());

// For HTTP headers through helmet
app.use(helmet());

app.use(cors({
  origin: "http://localhost:5173"
}));

const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,                  // max 5 requests per IP per window
  message: "Too many requests, try again later."
});

// Apply to all routes
app.use(globalLimiter);


// Making 'uploads' accessible
app.use('/uploads', express.static('uploads'));

// Mount the authorized users
app.use('/api/auth', authRoutes)

// Mount the post routes
app.use('/api/posts', postRoutes);
// Mount the user routes
app.use('/api/users', userRoutes);
// Mount the comments routes
app.use('/api', commentRoutes);
// Mount the photo routes
app.use('/api/photos', photoRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    testConnection(); // Test the database connection on startup
});