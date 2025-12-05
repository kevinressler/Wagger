const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'tinder_app',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error connecting to database:', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release();
});

// ============================================
// API ROUTES
// ============================================

// Get all dogs
app.get('/api/dogs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dogs ORDER BY distance');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get single dog by ID
app.get('/api/dogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM dogs WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dog not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create a new dog
app.post('/api/dogs', async (req, res) => {
  try {
    const { dog_name, age, breed, distance, bio, tags } = req.body;
    
    const result = await pool.query(
      'INSERT INTO dogs (dog_name, age, breed, distance, bio, tags) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [dog_name, age, breed, distance, bio, tags]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update a dog
app.put('/api/dogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { dog_name, age, breed, distance, bio, tags } = req.body;
    
    const result = await pool.query(
      'UPDATE dogs SET dog_name = $1, age = $2, breed = $3, distance = $4, bio = $5, tags = $6 WHERE id = $7 RETURNING *',
      [dog_name, age, breed, distance, bio, tags, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dog not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete a dog
app.delete('/api/dogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM dogs WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dog not found' });
    }
    
    res.json({ message: 'Dog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Search dogs by tag
app.get('/api/dogs/search/tags', async (req, res) => {
  try {
    const { tag } = req.query;
    const result = await pool.query(
      'SELECT * FROM dogs WHERE $1 = ANY(tags) ORDER BY distance',
      [tag]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
