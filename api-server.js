'use strict'

console.log("Server Booting Up...")

// Using express as my web server, create instance and set attributes
const express = require('express')
const app = express()
app.use(express.json())

// Port this server will run on
const port = 8080;

const databaseController = require('./modules/database-controller')
const favouriteRecipesController = require('./modules/favourite-recipes-controller')
const imagesController = require('./modules/images-controller')
const loginsController = require('./modules/logins-controller')
const notificationsController = require('./modules/notifications-controller')
const ratingsController = require('./modules/ratings-controller')
const recipeImagesController = require('./modules/recipe-images-controller')
const recipesController = require('./modules/recipes-controller')
const usersController = require('./modules/users-controller')

// Home root currently redirects to /recipes
app.get('/api/v1.0/', (req, res) => {
	res.redirect('/api/v1.0/recipes')
})

// GET Request to retrieve all recipes
app.get('/api/v1.0/recipes', async(req, res) => {

	// Call controller to retrieve all recipes
	// Waits for response from controller before continuing (async/await)
	const recipes = await recipesController.getAll()

	res.status(200).send(JSON.stringify(recipes, null, 2))
})

// GET Request to retrieve one recipe
app.get('/api/v1.0/recipes/:recipe_id', async(req, res) => {

	// Call controller to retrieve one recipe
	const recipe = await recipesController.getById(req.params.recipe_id)

	res.status(200).send(JSON.stringify(recipe, null, 2))
})

// POST Request to create a new recipe
app.post('/api/v1.0/recipes', async(req, res) => {

	// Call controller to create a new recipe from the provided request
	const response = await recipesController.add(req.body)
	
	if(response) {
		res.status(200).send("Recipe added succesfully\n")
	} else {
		res.status(400).send("There was an error posting your recipe\n")
	}
})

// PUT Request to update a recipe
app.put('/api/v1.0/recipes/:recipe_id', async(req, res) => {

	// Call controller to create a new recipe from the provided request
	const recipeUpdateResponse = await recipesController.update(req.params.recipe_id, req.body)

	if(recipeUpdateResponse) {
		res.status(200).send("recipe with id: " + req.params.recipe_id + " has been updated\n")
	} else {
		res.status(400).send("There was an error updating your recipe\n")
	}	
})

// DELETE Request to delete one recipe
app.delete('/api/v1.0/recipes/:recipe_id', async(req, res) => {

	// Call controller to delete a recipe corresponding to the HTML request's recipe id
	// Once completed, return back to client a message and status code confirming the recipe was deleted
	const recipeDeleteResponse = await recipesController.delete(req.params.recipe_id)

	if(recipeDeleteResponse) {
		res.status(200).send("Recipe with id: " + req.params.recipe_id + " has been deleted\n")
	} else {
		res.status(400).send("There was an error deleting your recipe\n")
	}
})

app.get('/api/v1.0/users', (req, res) => {


})

app.post('/api/v1.0/users', (req, res) => {


})

// GET Request to retrieve all ratings
app.get('/api/v1.0/ratings', async(req, res) => {

	// Call controller to retrieve all ratings
	// Waits for response from controller before continuing (async/await)
	const ratings = await ratingsController.getAll()

	res.status(200).send(JSON.stringify(ratings, null, 2))
})

// GET Request to retrieve one rating
app.get('/api/v1.0/ratings/:rating_id', async(req, res) => {

	// Call controller to retrieve one rating
	const rating = await ratingsController.getById(req.params.rating_id)

	res.status(200).send(JSON.stringify(rating, null, 2))
})

// POST Request to create a new rating
app.post('/api/v1.0/ratings', async(req, res) => {

	// Call controller to create a new rating from the provided request
	const response = await ratingsController.add(req.body)
	
	if(response) {
		res.status(200).send("Rating added succesfully\n")
	} else {
		res.status(400).send("There was an error posting your rating\n")
	}
})

// PUT Request to update a rating
app.put('/api/v1.0/ratings/:rating_id', async(req, res) => {

	// Call controller to create a new rating from the provided request
	const ratingUpdateResponse = await ratingsController.update(req.params.rating_id, req.body)

	if(ratingUpdateResponse) {
		res.status(200).send("Rating with id: " + req.params.rating_id + " has been updated\n")
	} else {
		res.status(400).send("There was an error updating your rating\n")
	}	
})

// DELETE Request to delete one rating
app.delete('/api/v1.0/ratings/:rating_id', async(req, res) => {

	// Call controller to delete a rating corresponding to the HTML request's rating id
	// Once completed, return back to client a message and status code confirming the rating was deleted
	const ratingDeleteResponse = await ratingsController.delete(req.params.rating_id)

	if(ratingDeleteResponse) {
		res.status(200).send("Rating with id: " + req.params.rating_id + " has been deleted\n")
	} else {
		res.status(400).send("There was an error deleting your rating\n")
	}
})

app.get('/api/v1.0/images', (req,res) => {


})

app.post('/api/v1.0/images', (req,res) => {


})

app.get('/api/v1.0/notifications', (req, res) => {


})

app.post('/api/v1.0/notifications', (req,res) => {


})

app.get('/api/v1.0/favourite_recipes', (req, res) => {


})

app.post('/api/v1.0/favourite_recipes', (req, res) => {


})

app.get('/api/v1.0/recipe_images', (req, res) => {


})

app.post('/api/v1.0/recipe_images', (req, res) => {


})

app.get('/api/v1.0/logins', (req, res) => {


})

app.post('/api/v1.0/logins', (req, res) => {


})

// Runs the server on provided port
app.listen(port, () => console.log(`Server listening on port ${port}`));