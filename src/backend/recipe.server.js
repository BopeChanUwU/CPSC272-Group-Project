const express = require('express');
const router = express.Router();
const { pool } = require('./database');

// CREATE recipe with image handling
router.post('/recipes', async (req, res) => {
  try {
    const { author_id, title, description, user_name, ingredients, instructions, image_url } = req.body;

    console.log('Creating recipe:', title);
    console.log('Image data received:', image_url ? 'Yes (' + image_url.length + ' chars)' : 'No');

    // Convert base64 to Buffer for BYTEA storage
    let imageBuffer = null;
    if (image_url) {
      try {
        imageBuffer = Buffer.from(image_url, 'base64');
        console.log('Image buffer created, size:', imageBuffer.length, 'bytes');
      } catch (err) {
        console.error('Error converting image to buffer:', err);
      }
    }

    const result = await pool.query(
      `INSERT INTO public.recipe (author_id, title, description, user_name, ingredients, instructions, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [author_id, title, description, user_name, ingredients, instructions, imageBuffer]
    );

    const createdRecipe = result.rows[0];
    
    // Convert the image back to base64 for the response
    if (createdRecipe.image_url && Buffer.isBuffer(createdRecipe.image_url)) {
      const base64String = createdRecipe.image_url.toString('base64');
      createdRecipe.image_url = `data:image/jpeg;base64,${base64String}`;
    }

    console.log('Recipe created successfully with ID:', createdRecipe.recipe_id);
    res.json(createdRecipe);
  } catch (err) {
    console.error('CREATE RECIPE ERROR:', err.message);
    res.status(500).json({ message: 'Error creating recipe', error: err.message });
  }
});

// READ all recipes with image conversion
router.get('/recipes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.recipe ORDER BY recipe_id');
    
    // Convert BYTEA to base64 for each recipe
    const recipesWithImages = result.rows.map(recipe => ({
      ...recipe,
      image_url: recipe.image_url ? recipe.image_url.toString('base64') : null
    }));
    
    res.json(recipesWithImages);
  } catch (err) {
    console.error('READ RECIPES ERROR:', err.message);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

// GET recipes by author with image conversion
router.get('/recipes/author/:author_id', async (req, res) => {
  try {
    const { author_id } = req.params;
    console.log('Fetching recipes for author_id:', author_id);
    
    const result = await pool.query(
      'SELECT * FROM public.recipe WHERE author_id = $1 ORDER BY recipe_id',
      [author_id]
    );

    console.log('Found', result.rows.length, 'recipes');
    
    // Convert BYTEA to base64 with proper data URL
    const recipesWithImages = result.rows.map(recipe => {
      let imageUrl = null;
      
      if (recipe.image_url) {
        // Check if image_url is a Buffer
        if (Buffer.isBuffer(recipe.image_url)) {
          const base64String = recipe.image_url.toString('base64');
          imageUrl = `data:image/jpeg;base64,${base64String}`;
          console.log('Recipe', recipe.recipe_id, 'has image, size:', recipe.image_url.length, 'bytes');
        } else {
          console.log('Recipe', recipe.recipe_id, 'image_url is not a Buffer:', typeof recipe.image_url);
        }
      } else {
        console.log('Recipe', recipe.recipe_id, 'has no image_url');
      }
      
      return {
        ...recipe,
        image_url: imageUrl
      };
    });

    res.json(recipesWithImages);
  } catch (err) {
    console.error('GET RECIPES BY AUTHOR ERROR:', err);
    res.status(500).json({ message: 'Error fetching recipes by author', error: err.message });
  }
});

// GET recipes except author with image conversion
router.get('/recipes/exclude/:author_id', async (req, res) => {
  try {
    const { author_id } = req.params;
    const result = await pool.query(
      'SELECT * FROM public.recipe WHERE author_id != $1 ORDER BY recipe_id',
      [author_id]
    );

    const recipesWithImages = result.rows.map(recipe => ({
      ...recipe,
      image_url: recipe.image_url ? `data:image/jpeg;base64,${recipe.image_url.toString('base64')}` : null
    }));

    res.json(recipesWithImages);
  } catch (err) {
    console.error('GET RECIPES EXCEPT AUTHOR ERROR:', err.message);
    res.status(500).json({ message: 'Error fetching recipes excluding author' });
  }
});

// READ single recipe by ID with image conversion
router.get('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM public.recipe WHERE recipe_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const recipe = result.rows[0];
    recipe.image_url = recipe.image_url ? `data:image/jpeg;base64,${recipe.image_url.toString('base64')}` : null;

    res.json(recipe);
  } catch (err) {
    console.error('READ RECIPE ERROR:', err.message);
    res.status(500).json({ message: 'Error fetching recipe' });
  }
});

// UPDATE recipe by ID with image handling
router.put('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { author_id, title, description, user_name, ingredients, instructions, image_url } = req.body;

    // Convert base64 to Buffer if image is provided
    let imageBuffer = null;
    if (image_url) {
      // Remove data URL prefix if present
      const base64Data = image_url.includes('base64,') ? image_url.split('base64,')[1] : image_url;
      imageBuffer = Buffer.from(base64Data, 'base64');
    }

    const result = await pool.query(
      `UPDATE public.recipe
       SET author_id=$1, title=$2, description=$3, user_name=$4,
           ingredients=$5, instructions=$6, image_url=$7
       WHERE recipe_id=$8
       RETURNING recipe_id, author_id, title, description, user_name, ingredients, instructions`,
      [author_id, title, description, user_name, ingredients, instructions, imageBuffer, id]
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
router.delete('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM public.recipe WHERE recipe_id=$1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json({ message: 'Recipe deleted', recipe: result.rows[0] });
  } catch (err) {
    console.error('DELETE RECIPE ERROR:', err.message);
    res.status(500).json({ message: 'Error deleting recipe' });
  }
});

module.exports = router;