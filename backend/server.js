require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/userRoutes');
const empRoutes = require('./routes/empRoutes');

const app = express();
app.use(express.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log('Server running on', PORT));
}).catch(err => console.error(err));
