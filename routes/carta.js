const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");
console.log("conexion establecida");

const getCarta = (request, response) => {
    connection.query("SELECT * FROM users", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/carta")
.get(getCarta);

console.log("get del carta");


const postCarta = (request, response) => {
    const {name, username} = request.body;
    connection.query("INSERT INTO users(name, username) VALUES (?,?) ", 
    [name, username],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
};

//ruta
app.route("/carta")
.post(postCarta);


const delCarta = (request, response) => {
    const id = request.params.id;
    connection.query("Delete from carta where id = ?", 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
};

//ruta
app.route("/carta/:id")
.delete(delCarta);


module.exports = app;