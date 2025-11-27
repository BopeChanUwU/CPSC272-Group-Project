const express = require('express');
const cors = require('cors');

const userRoutes = require('/Users/tristensandhu/Desktop/hello-world/backend/user.server.js');
const recipeRoutes = require('/Users/tristensandhu/Desktop/hello-world/backend/recipe.server.js');
const savedRecipiesRoutes = require('/Users/tristensandhu/Desktop/hello-world/backend/savedRecipies.server.js');

const app = express();
const port = 3000;

// Middleware
app.use(cors());

// Increase body size limit to 50MB for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Mount routes with /api prefix
app.use('/api', userRoutes);
app.use('/api', recipeRoutes);
app.use('/api', savedRecipiesRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the potluck App API!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});