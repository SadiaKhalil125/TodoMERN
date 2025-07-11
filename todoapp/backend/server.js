const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const todoRoutes = require('./routes/todoRoutes');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);
// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, '../client/build')));

// Serve React for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log('Server started on http://localhost:5000'));
}).catch(err => console.error(err));


// MongoDB connect
// mongoose.connect('mongodb://localhost:27017/todoapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('MongoDB connected');
//   app.listen(5000, () => console.log('Server started on http://localhost:5000'));
// }).catch(err => console.error(err));
