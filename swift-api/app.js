require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index'); 

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
  res.send('SwiftCloud Test');
});

// Use the imported routes
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
