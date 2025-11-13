const express = require('express');
const router = express.Router();
const pool = require('./database');

app.use(cors());
app.use(express.json());

// Simple test route
router.get('/test', (req, res) => {
  res.send('Saved Recipes route works!');
});

// ----------------- CRUD ROUTES -----------------

// SAVE a recipe (create entry)
router.post('/api/saved', async (req, res) => {
  try {
    const { recipe_id, user_id } = req.body;
    if (!recipe_id || !user_id) {
      return res.status(400).json({ message: 'recipe_id and user_id are required' });
    }

    const result = await pool.query(
      `INSERT INTO "savedRecipies" (recipe_id, user_id)
       VALUES ($1, $2)
       RETURNING *`,
      [recipe_id, user_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('SAVE RECIPE ERROR:', err.message);
    res.status(500).json({ message: 'Error saving recipe', error: err.message });
  }
});

// GET all saved recipes
router.get('/api/saved', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "savedRecipies" ORDER BY user_id');
    res.json(result.rows);
  } catch (err) {
    console.error('READ SAVED RECIPES ERROR:', err.message);
    res.status(500).json({ message: 'Error fetching saved recipes' });
  }
});

// GET saved recipes by user
router.get('/api/saved/user/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await pool.query(
      `SELECT * FROM "savedRecipies" WHERE user_id = $1`,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('READ USER SAVED RECIPES ERROR:', err.message);
    res.status(500).json({ message: 'Error fetching saved recipes by user' });
  }
});

// GET saved recipes by recipe_id (optional)
router.get('/api/saved/recipe/:recipe_id', async (req, res) => {
  try {
    const { recipe_id } = req.params;
    const result = await pool.query(
      `SELECT * FROM "savedRecipies" WHERE recipe_id = $1`,
      [recipe_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('READ RECIPE SAVED USERS ERROR:', err.message);
    res.status(500).json({ message: 'Error fetching saved users for recipe' });
  }
});

// DELETE saved recipe (unsave)
router.delete('/api/saved', async (req, res) => {
  try {
    const { recipe_id, user_id } = req.body;
    if (!recipe_id || !user_id) {
      return res.status(400).json({ message: 'recipe_id and user_id are required' });
    }

    const result = await pool.query(
      `DELETE FROM "savedRecipies"
       WHERE recipe_id = $1 AND user_id = $2
       RETURNING *`,
      [recipe_id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Saved recipe not found' });
    }

    res.json({ message: 'Recipe unsaved', saved: result.rows[0] });
  } catch (err) {
    console.error('DELETE SAVED RECIPE ERROR:', err.message);
    res.status(500).json({ message: 'Error deleting saved recipe' });
  }
});

module.exports = router;
