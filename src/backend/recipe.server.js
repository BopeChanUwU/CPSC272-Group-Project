
const express = require('express');
const cors = require('cors');
const pool = require('./database'); // your PostgreSQL connection
const app = express();
const port = 3000; // you can change this if needed

// Middleware
app.use(cors());
app.use(express.json());

// ----------------- CRUD ROUTES -----------------

// CREATE recipe
app.post('/api/recipes', async (req, res) => {
  try {
    const { author_id, title, description, user_name, ingredients, instructions, image_url } = req.body;

    const result = await pool.query(
      `INSERT INTO public.recipes (author_id, title, description, user_name, ingredients, instructions, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [author_id, title, description, user_name, ingredients, instructions, image_url]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('CREATE RECIPE ERROR:', err.message);
    res.status(500).json({ message: 'Error creating recipe', error: err.message });
  }
});

// READ all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.recipes ORDER BY recipe_id');
    res.json(result.rows);
  } catch (err) {
    console.error('READ RECIPES ERROR:', err.message);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

// READ single recipe by ID
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM public.recipes WHERE recipe_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('READ RECIPE ERROR:', err.message);
    res.status(500).json({ message: 'Error fetching recipe' });
  }
});

// UPDATE recipe by ID
app.put('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { author_id, title, description, user_name, ingredients, instructions, image_url } = req.body;

    const result = await pool.query(
      `UPDATE public.recipes
       SET author_id=$1, title=$2, description=$3, user_name=$4,
           ingredients=$5, instructions=$6, image_url=$7
       WHERE recipe_id=$8
       RETURNING *`,
      [author_id, title, description, user_name, ingredients, instructions, image_url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('UPDATE RECIPE ERROR:', err.message);
    res.status(500).json({ message: 'Error updating recipe' });
  }
});

// DELETE recipe by ID
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM public.recipes WHERE recipe_id=$1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json({ message: 'Recipe deleted', recipe: result.rows[0] });
  } catch (err) {
    console.error('DELETE RECIPE ERROR:', err.message);
    res.status(500).json({ message: 'Error deleting recipe' });
  }
});

// GET recipes by author
app.get('/api/recipes/author/:author_id', async (req, res) => {
  try {
    const { author_id } = req.params;
    const result = await pool.query(
      'SELECT * FROM public.recipes WHERE author_id = $1 ORDER BY recipe_id',
      [author_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('GET RECIPES BY AUTHOR ERROR:', err.message);
    res.status(500).json({ message: 'Error fetching recipes by author' });
  }
});

// GET recipes except author
app.get('/api/recipes/exclude/:author_id', async (req, res) => {
  try {
    const { author_id } = req.params;
    const result = await pool.query(
      'SELECT * FROM public.recipes WHERE author_id != $1 ORDER BY recipe_id',
      [author_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('GET RECIPES EXCEPT AUTHOR ERROR:', err.message);
    res.status(500).json({ message: 'Error fetching recipes excluding author' });
  }
});


// ----------------- START SERVER -----------------
app.listen(port, () => {
  console.log(`✅ Recipe server running on http://localhost:${port}`);
});
