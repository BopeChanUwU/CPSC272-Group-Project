// user.server.js
const express = require('express');
const cors = require('cors');
const pool = require('./database'); // your database.js
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/test', (req, res) => {
  res.send('Test route works!');
});

// ----------------- CRUD ROUTES -----------------

// CREATE user
app.post("/api/users", async (req, res) => {
  try {
    const { user_name, first_name, last_name, email, password, image_url } = req.body;
    const result = await pool.query(
      `INSERT INTO users (user_name, first_name, last_name, email, password, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_name, first_name, last_name, email, password, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("CREATE USER ERROR:", err.message); // <-- log the real error
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});


// READ all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY user_id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// READ single user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user" });
  }
});

// LOGIN (POST)
app.post('/api/users/login', async (req, res) => {
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


// UPDATE user by ID
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, first_name, last_name, email, password, image_url } = req.body;
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
app.delete("/api/users/:id", async (req, res) => {
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

// ----------------- START SERVER -----------------
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
