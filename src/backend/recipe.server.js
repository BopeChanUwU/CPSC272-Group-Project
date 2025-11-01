// server.js
const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
const port = 3000; // Choose a port different from Angular (e.g., 4200)

// Middleware
app.use(cors()); // Enables cross-origin requests
app.use(express.json()); // Parses incoming requests with JSON payloads

// Simple test route
app.get('/', (req, res) => {
  res.send('Node.js API is running!');
});

// ===============================================
// 1. CREATE (C) - HTTP POST
// ===============================================
// Angular: userService.createUser(user) -> POST /api/users
app.post('/', async (req, res) => {
    try {
        const { id, user_name, first_name, last_name, email, password, imageUrl } = req.body; // Data sent from Angular component
        const sql = 'INSERT INTO potluck.users (id, user_name, first_name, last_name, email, password, imageUrl) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
        const result = await db.query(sql, [id, user_name, first_name, last_name, email, password, imageUrl]);
        
        // Return the newly created user object back to Angular
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
});

// ===============================================
// 2. Get (G) - HTTP GET
// ===============================================
// Angular: userService.getUsers() -> GET /api/users
app.get('/', async (req, res) => {
    try {
        const sql = 'SELECT id, name, email FROM potluck.users ORDER BY id;';
        const result = await db.query(sql);
        
        // Return an array of users as JSON
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
    }
});

// ===============================================
// 3. UPDATE (U) - HTTP PUT/PATCH
// ===============================================
// Angular: userService.updateUser(user) -> PUT /api/users/:id
app.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email } = req.body;
        const sql = 'UPDATE potluck.users SET name = $1, email = $2 WHERE id = $3 RETURNING *;';
        const result = await db.query(sql, [name, email, userId]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the updated user object
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user" });
    }
});


// ===============================================
// 4. DELETE (D) - HTTP DELETE
// ===============================================
// Angular: userService.deleteUser(id) -> DELETE /api/users/:id
app.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const sql = 'DELETE FROM potluck.users WHERE id = $1;';
        const result = await db.query(sql, [userId]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send a 204 No Content status on successful deletion
        res.status(204).send(); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user" });
    }
});

// ===============================================
// 5. READ (R) - HTTP Read
// ===============================================
// Reads user with email and password.

app.read('/', async (req, res) => {
    try {
        const {email, password} = req.body; // Data sent from Angular component
        const sql = 'SELECT id, user_name, first_name, last_name, email, password, imageUrl FROM potluck.users WHERE email=$1, password=$2;';
        const result = await db.query(sql, [id, user_name, first_name, last_name, email, password, imageUrl]);
        
        // Return the user object back to Angular
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error reading user" });
    }
});