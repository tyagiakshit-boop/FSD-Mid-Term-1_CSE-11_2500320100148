const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

let books = [];

function load() {
  try {
    if (fs.existsSync('books.json')) {
      books = JSON.parse(fs.readFileSync('books.json', 'utf8'));
    }
  } catch (e) { books = []; }
}

function save() {
  fs.writeFileSync('books.json', JSON.stringify(books, null, 2));
}

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET single book by id
app.get('/api/books/:id', (req, res) => {
  const b = books.find(x => x.id == req.params.id);
  if (!b) return res.status(404).json({ msg: 'Book not found' });
  if (b.available == 0) {
    return res.json({ msg: 'no book is available', book: b });
  }
  res.json(b);
});

