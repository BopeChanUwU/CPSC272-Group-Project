const express = require('express');
const cors = require('cors');

const userRoutes = require('./user.server');
const recipeRoutes = require('./recipe.server');
const savedRecipiesRoutes = require('./savedRecipies.server');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/saved', savedRecipiesRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the potluck App API!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});