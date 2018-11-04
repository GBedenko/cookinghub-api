console.log("Server Booting Up...");

// Using express as my web server, create instance and set attributes
const express = require('express');
const app = express();
app.use(express.json());

// Port this server will run on
const port = 8080;

// Create a new database
app.get('/createDatabase', (req, res) => {

	database.createDatabase()
	console.log('Articles table created')
})

// Home root currently redirects to /recipes
app.get('/', (req, res) => {
	res.redirect('/recipes')
})

app.get('/recipes', (req, res) => {


})

app.post('/recipes', (req, res) => {


})

app.get('/users', (req, res) => {


})

app.post('/users', (req, res) => {


})

app.get('/ratings', (req, res) => {


})

app.post('/ratings', (req, res) => {


})

app.get('/images', (req,res) => {


})


app.post('/images', (req,res) => {


})

app.get('/notifications', (req, res) => {


})


app.post('/notifications', (req,res) => {


})

app.get('/favourite_recipes', (req, res) => {


})

app.post('/favourite_recipes', (req, res) => {


})

app.get('/recipe_images', (req, res) => {


})

app.post('/recipe_images', (req, res) => {


})

app.get('/logins', (req, res) => {


})

app.post('/logins', (req, res) => {


})


// Runs the server on provided port
app.listen(port, () => console.log(`Server listening on port ${port}`));