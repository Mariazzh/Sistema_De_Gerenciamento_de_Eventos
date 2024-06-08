const { MongoClient, ObjectId } = require("mongodb");
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

let db;

async function connectDB() {
  if (db) return db;
  const client = await MongoClient.connect('mongodb+srv://Mariazzh:Beta142536@gerenciadoreventos.4kgvw6j.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
  db = client.db('unifor');
  return db;
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const db = await connectDB();
    const result = await db.collection('users').insertOne({ name, email, password });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await connectDB();
    const user = await db.collection('users').findOne({ email, password });
    if (user) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/guests', async (req, res) => {
  try {
    const db = await connectDB();
    const guests = await db.collection('guests').find().toArray();
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/guests', async (req, res) => {
  try {
    const { name, email, event } = req.body;
    const db = await connectDB();
    const result = await db.collection('guests').insertOne({ name, email, event });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/guests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, event } = req.body;
    const db = await connectDB();
    const result = await db.collection('guests').updateOne({ _id: new ObjectId(id) }, { $set: { name, email, event } });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/guests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDB();
    const result = await db.collection('guests').deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`API funcionando na porta ${port}`);
});
