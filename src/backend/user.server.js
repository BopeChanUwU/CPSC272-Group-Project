// user.server.js
const express = require('express');
const router = express.Router();
const { pool} = require('./database');

// Simple test route
router.get('/test', (req, res) => {
  res.send('Test route works!');
});

// ----------------- IMPORTANT: SPECIFIC ROUTES FIRST -----------------

// LOGIN (POST) - Must come BEFORE /users/:id routes
router.post('/users/login', async (req, res) => {
  console.log('Login request body:', req.body);
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM public.users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];
    
    // Convert image if exists
    if (user.image_url && Buffer.isBuffer(user.image_url)) {
      const base64String = user.image_url.toString('base64');
      user.image_url = `data:image/jpeg;base64,${base64String}`;
    }

    res.json(user);
  } catch (err) {
    console.error('LOGIN ERROR:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ----------------- CRUD ROUTES -----------------

// CREATE user with image handling
router.post("/users", async (req, res) => {
  try {
    const { user_name, first_name, last_name, email, password, image_url } = req.body;

    console.log('Creating NEW user:', user_name);
    console.log('Image data received:', image_url ? 'Yes (' + image_url.length + ' chars)' : 'No');

    // Convert base64 to Buffer for BYTEA storage
    let imageBuffer = null;
    if (image_url) {
      try {
        const base64Data = image_url.includes('base64,') ? image_url.split('base64,')[1] : image_url;
        imageBuffer = Buffer.from(base64Data, 'base64');
        console.log('Image buffer created, size:', imageBuffer.length, 'bytes');
      } catch (err) {
        console.error('Error converting image to buffer:', err);
      }
    }

    const result = await pool.query(
      `INSERT INTO public.users (user_name, first_name, last_name, email, password, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_name, first_name, last_name, email, password, imageBuffer]
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
    console.error("CREATE USER ERROR:", err.message);
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

// READ all users with image conversion
router.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.users ORDER BY user_id");

    const usersWithImages = result.rows.map(user => ({
      ...user,
      image_url: user.image_url && Buffer.isBuffer(user.image_url) 
        ? `data:image/jpeg;base64,${user.image_url.toString('base64')}` 
        : null
    }));

    res.json(usersWithImages);
  } catch (err) {
    console.error('GET ALL USERS ERROR:', err.message);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// READ single user by ID with image conversion
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log('GET user by ID:', id);
    
    const result = await pool.query("SELECT * FROM public.users WHERE user_id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    
    // Convert image if exists
    if (user.image_url && Buffer.isBuffer(user.image_url)) {
      const base64String = user.image_url.toString('base64');
      user.image_url = `data:image/jpeg;base64,${base64String}`;
    }

    console.log('Retrieved user:', user.user_id);
    res.json(user);
  } catch (err) {
    console.error('GET USER BY ID ERROR:', err.message);
    res.status(500).json({ message: "Error fetching user" });
  }
});

// UPDATE user by ID with image handling
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, first_name, last_name, email, password, image_url } = req.body;

    console.log('=== UPDATE USER REQUEST ===');
    console.log('User ID:', id);
    console.log('Update data:', { user_name, first_name, last_name, email, password: '***', has_image: !!image_url });

    // Convert base64 to Buffer if image is provided
    let imageBuffer = null;
    if (image_url) {
      try {
        const base64Data = image_url.includes('base64,') ? image_url.split('base64,')[1] : image_url;
        imageBuffer = Buffer.from(base64Data, 'base64');
        console.log('Image buffer created, size:', imageBuffer.length, 'bytes');
      } catch (err) {
        console.error('Error converting image to buffer:', err);
      }
    }

    const result = await pool.query(
      `UPDATE public.users
       SET user_name=$1, first_name=$2, last_name=$3, email=$4, password=$5, image_url=$6
       WHERE user_id=$7
       RETURNING *`,
      [user_name, first_name, last_name, email, password, imageBuffer, id]
    );

    if (result.rows.length === 0) {
      console.log('No user found with ID:', id);
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = result.rows[0];
    
    // Convert the image back to base64 for the response
    if (updatedUser.image_url && Buffer.isBuffer(updatedUser.image_url)) {
      const base64String = updatedUser.image_url.toString('base64');
      updatedUser.image_url = `data:image/jpeg;base64,${base64String}`;
    }

    console.log('User UPDATED successfully:', updatedUser.user_id);
    res.json(updatedUser);
  } catch (err) {
    console.error('UPDATE USER ERROR:', err.message);
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
});

// DELETE user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM public.users WHERE user_id=$1 RETURNING *", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ message: "User deleted", user: result.rows[0] });
  } catch (err) {
    console.error('DELETE USER ERROR:', err.message);
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;