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

// POST add book (prevent duplicate id)
app.post('/api/books', (req, res) => {
  if (books.find(x => x.id == req.body.id)) {
    return res.status(400).json({ msg: 'Duplicate book id' });
  }
  books.push(req.body);
  save();
  res.status(201).json({ msg: 'Book added' });
});

// PUT update book
app.put('/api/books/:id', (req, res) => {
  const i = books.findIndex(x => x.id == req.params.id);
  if (i == -1) return res.status(404).json({ msg: 'Book not found' });
  books[i] = req.body;
  save();
  res.json({ msg: 'Book updated' });
});

// DELETE - decrease availability by 1
app.delete('/api/books/:id', (req, res) => {
  const i = books.findIndex(x => x.id == req.params.id);
  if (i == -1) return res.status(404).json({ msg: 'Book not found' });
  if (books[i].available <= 0) {
    return res.status(400).json({ msg: 'No copies available' });
  }
  books[i].available--;
  save();
  res.json({ msg: 'Availability decreased', book: books[i] });
});

load();
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

