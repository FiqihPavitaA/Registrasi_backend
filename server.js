const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// Middleware body parser untuk menguraikan JSON
app.use(express.json());
// Middleware ini adalah bagian penting dalam mengatasi masalah kebijakan CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Konfigurasi koneksi ke database MySQL
const connection = mysql.createConnection({
  host: 'localhost',          // Ganti dengan host database Anda
  user: 'root',      // Ganti dengan username database Anda
  password: 'root',  // Ganti dengan password database Anda
  database: 'registrasi'   // Ganti dengan nama database Anda
});

connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Database connected successfully');
});

// Definisikan endpoint untuk menerima permintaan dari halaman registrasi

app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
  
    // Cetak data dari permintaan frontend
    console.log('Data dari permintaan frontend:');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  
    // Query SQL untuk menyimpan data ke database
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, password];
  
    // Cetak query SQL
    console.log('Query SQL:', sql);
    console.log('Values:', values);
  
    //eksekusi query
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      console.log('Data berhasil dimasukkan ke database');
  
      res.json({ message: 'Registration successful!', username, email });
    });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });