require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/userRoutes');
const empRoutes = require('./routes/empRoutes');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);

const PORT = process.env.PORT || 5000;
connectDB("mongodb://mongodb:27017/comp3123").then(() => {
  app.listen(PORT, () => console.log('Server running on', PORT));
}).catch(err => console.error(err));
