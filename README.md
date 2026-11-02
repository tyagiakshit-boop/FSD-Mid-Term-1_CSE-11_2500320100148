# Library Management System

**Student Name:** ______________  
**Roll Number:** ______________  
**Branch:** ______________  
**Section:** ______________  

## Description
A simple Library Management REST API built with Node.js and Express.js.  
No database is used — books are stored in memory and saved to `books.json`.

## Endpoints
- `GET /api/books` — List all books
- `GET /api/books/:id` — Get a book by ID (shows "no book is available" if available is 0)
- `POST /api/books` — Add a new book (prevents duplicate IDs)
- `PUT /api/books/:id` — Update a book
- `DELETE /api/books/:id` — Decrease book availability by 1

## How to Run
```bash
npm install
node server.js
```
Server runs at `http://localhost:3000`
