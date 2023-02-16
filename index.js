const mysql = require('mysql');
const express = require('express');
const bodyParse = require('body-parser');
const app = express();
app.use(bodyParse.urlencoded({extended : false}));
app.use(bodyParse.json());
let connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '123456',
    database :'book_manager'
});
connection.connect(err=>{
    if (err){
        console.log(err)
    } else {
        console.log('success 1')
    }
});

app.set('view engine','ejs');
app.set('views','./views');
app.get('/books/create',(req, res) => {
    res.render('create')
});
app.post('/books/create',(req, res) => {
    const {name,price,status,author}=req.body;
    const sql = " INSERT INTO book_manager.book (name, price, status, author) VALUES ?";
    const value =[
        [name,price,status,author]
    ]
    connection.query(sql,[value],(err,result)=>{
        if (err)throw Error;
        console.log(result)
        res.end('success !')
    })
})

app.listen(3200,()=>{
    console.log('http://localhost:3200/books/create')
})