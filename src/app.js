const express = require('express');
const connectDB = require('./config/db'); 
const importDataRouter = require('./swift-api/routes/importDataRoute'); 

const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('SwiftCloud Test');
});

// Use imported routes here
app.use('/', importDataRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
