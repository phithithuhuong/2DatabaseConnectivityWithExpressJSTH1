const mysql = require('mysql');
const express = require('express');
const bodyParse = require('body-parser');
const app = express();
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'book_manager'
});
connection.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log('success 1')
    }
});

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/books/create', (req, res) => {
    res.render('create')
});
//add new books
app.post('/books/create', (req, res) => {
    const {name, price, status, author} = req.body;
    const sql = " INSERT INTO book_manager.book (name, price, status, author) VALUES ?";
    const value = [
        [name, price, status, author]
    ]
    connection.query(sql, [value], (err, result) => {
        if (err) throw Error;
        console.log(result)
        res.redirect('/books')
    })
});
//show all books
app.get('/books', (req, res) => {
    const sql = `SELECT *
                 FROM book `
    connection.query(sql, (err, values) => {
        if (err) throw Error;
        res.render('books', {books: values})
    })
})
// delete books where id
app.get('/books/:id/delete', (req, res) => {
    const idBook = req.params.id;
    const sql = ` DELETE
                  FROM book
                  WHERE id =` + idBook
    connection.query(sql, (err, values) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/books')
        }
    })
})
//update books
app.get('/books/:id/update', (req, res) => {
    const idBook = req.params.id;
    const sql = `SELECT *
                 FROM book
                 WHERE id =` + idBook;
    connection.query(sql, (err, values) => {
        if (err) throw Error(err);
        res.render('update', {book: values[0]})
    })
})
app.post('/books/:id/update', (req, res) => {
    const idBook = req.params.id;
    let sql = `UPDATE book_manager.book t
               SET t.name   = ?,
                   t.price  = ?,
                   t.author = ?,
                   t.status = ?         
               WHERE t.id = ?`;
    const {name, price, status, author} = req.body;
    const value = [name, price, status, author, idBook];
    connection.query(sql, value, (err, result) => {
        if (err) console.log(err);
        res.redirect('/books')
    })

})
app.listen(3200,()=>{
    console.log('http://localhost:3200/books/create')
})