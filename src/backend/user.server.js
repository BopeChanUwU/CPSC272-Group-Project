// user.server.js
const express = require('express');
const router = express.Router();
const { pool} = require('./database'); // your database.js

// Simple test route
router.get('/test', (req, res) => {
  res.send('Test route works!');
});

// ----------------- CRUD ROUTES -----------------

// CREATE user with image handling
router.post("/users", async (req, res) => {
  try {
    const { user_name, first_name, last_name, email, password, image_url } = req.body;

    console.log('Creating user:', user_name);
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
      `INSERT INTO public.users (user_name, first_name, last_name, email, password, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_name, first_name, last_name, email, password, image_url]
    );

    const createdUser = result.rows[0];
    
    // Convert the image back to base64 for the response
    if (createdUser.image_url && Buffer.isBuffer(createdUser.image_url)) {
      const base64String = createdUser.image_url.toString('base64');
      createdUser.image_url = `data:image/jpeg;base64,${base64String}`;
    }

    console.log('User created successfully with ID:', createdUser.user_id);
    res.json(createdUser);
  } catch (err) {
    console.error("CREATE USER ERROR:", err.message); // <-- log the real error
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});


// READ all users with image conversion
router.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.users ORDER BY user_id");

    // Convert BYTEA to base64 for each user
    const usersWithImages = result.rows.map(user => ({
      ...user,
      image_url: user.image_url ? user.image_url.toString('base64') : null
    }));

    res.json(usersWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// READ single user by ID with image conversion
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM public.users WHERE user_id = $1", [id]);
    
    console.log('Found', result.rows.length, 'recipes');
    
    // Convert BYTEA to base64 with proper data URL
    const usersWithImages = result.rows.map(user => {
      let imageUrl = null;
      
      if (user.image_url) {
        // Check if image_url is a Buffer
        if (Buffer.isBuffer(user.image_url)) {
          const base64String = user.image_url.toString('base64');
          imageUrl = `data:image/jpeg;base64,${base64String}`;
          console.log('User', user.user_id, 'has image, size:', recipe.image_url.length, 'bytes');
        } else {
          console.log('User', user.user_id, 'image_url is not a Buffer:', typeof recipe.image_url);
        }
      } else {
        console.log('User', user.user_id, 'has no image_url');
      }
      
      return {
        ...user,
        image_url: imageUrl
      };
    });

    res.json(usersWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user" });
  }
});

// LOGIN (POST)
router.post('/users/login', async (req, res) => {
  console.log('Login request body:', req.body); // debug
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM public.users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('LOGIN ERROR:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/login/auth', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM public.users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


// UPDATE user by ID with image handling
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, first_name, last_name, email, password, image_url } = req.body;

    // Convert base64 to Buffer if image is provided
    let imageBuffer = null;
    if (image_url) {
      // Remove data URL prefix if present
      const base64Data = image_url.includes('base64,') ? image_url.split('base64,')[1] : image_url;
      imageBuffer = Buffer.from(base64Data, 'base64');
    }

    const result = await pool.query(
      `UPDATE users
       SET user_name=$1, first_name=$2, last_name=$3, email=$4, password=$5, image_url=$6
       WHERE user_id=$7
       RETURNING *`,
      [user_name, first_name, last_name, email, password, image_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user" });
  }
});

// DELETE user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM users WHERE user_id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;