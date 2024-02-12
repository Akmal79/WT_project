const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON in the request body
app.use(express.json());

// Connect to MongoDB (replace 'your-database-name' with actual values)
mongoose.connect('mongodb://localhost:27017/Student', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema for your form data
const formDataSchema = new mongoose.Schema({
  name: String,
  srn: String,
  email: String,
  campus: String,
});

// Create a model based on the schema
const FormDataModel = mongoose.model('FormData', formDataSchema);

// API endpoint to save form data
app.post('/api/saveFormData', async (req, res) => {
  const { name, srn, email, campus } = req.body;

  try {
    // Save form data to MongoDB
    const savedFormData = await FormDataModel.create({ name, srn, email, campus });
    console.log('Form data saved to MongoDB:', savedFormData);
    res.json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error saving form data to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
