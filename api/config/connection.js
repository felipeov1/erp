const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datas'
});

db.connect((error) => {
    if(error){
        console.log(error)
    }else{
        console.log("mysql connected")
    }
})