const express = require('express');
const cors = require('cors');
const app = express();
const propertyRoutes = require('./routes/propertyRoutes'); 


app.get('/', (req, res) => {
  res.send('Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

//routes
app.use('/properties', propertyRoutes);