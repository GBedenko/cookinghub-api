console.log("Server Booting Up...");

// Using express as my web server, create instance and set attributes
const express = require('express');
const app = express();
app.use(express.json());

// Port this server will run on
const port = 8080;

const database_controller = require('./modules/database-controller')
const favourite_recipes_controller = require('./modules/favourite-recipes-controller')
const images_controller = require('./modules/images-controller')
const logins_controller = require('./modules/logins-controller')
const notifications_controller = require('./modules/notifications-controller')
const ratings_controller = require('./modules/ratings-controller')
const recipe_images_controller = require('./modules/recipe-images-controller')
const recipes_controller = require('./modules/recipes-controller')
const users_controller = require('./modules/users-controller')

// Create a new database
app.get('/createDatabase', (req, res) => {

	database_controller.create()
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