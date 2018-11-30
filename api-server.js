'use strict'

console.log("Server Booting Up...")

// Using express as my web server, create instance and set attributes
const express = require('express')
const app = express()
app.use(express.json())

// Port this server will run on
const port = 8080;

const imagesController = require('./modules/images-controller')
const loginsController = require('./modules/logins-controller')
const notificationsController = require('./modules/notifications-controller')
const ratingsController = require('./modules/ratings-controller')
const recipesController = require('./modules/recipes-controller')
const usersController = require('./modules/users-controller')
const authentication = require('./modules/authentication')

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	next()
})

// app.all('*',function(req,res,next){
//     if(req.isAuthenticated()){
//         next();
//     }else{
//         next(new Error(401)); // 401 Not Authorized
//     }
// })

// app.use((err,req,res,next) => {
//     // Just basic, should be filled out to next()
//     // or respond on all possible code paths
//     if(err instanceof Error){
//         if(err.message === '401'){
//             res.render('error401');
//         }
//     }
// })

// GET Request to retrieve all recipes
app.get('/api/v1.0/recipes', async(req, res) => {

	// Using authentication module, check if the user exists for not
	const userExists = await authentication.checkUserCredentials(req)

	if(userExists) {
		// Call controller to retrieve all recipes
		// Waits for response from controller before continuing (async/await)
		const recipes = await recipesController.getAll()
	
		res.status(200).send(JSON.stringify(recipes, null, 2))
	} else {
		res.status(401).send()
	}
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

// GET Request to retrieve all users
app.get('/api/v1.0/users', async(req, res) => {

	// Call controller to retrieve all users
	// Waits for response from controller before continuing (async/await)
	const users = await usersController.getAll()

	res.status(200).send(JSON.stringify(users, null, 2))
})

// GET Request to retrieve one user
app.get('/api/v1.0/user/:user_id', async(req, res) => {

	// Call controller to retrieve one user
	const user = await usersController.getById(req.params.user_id)

	res.status(200).send(JSON.stringify(user, null, 2))
})

// POST Request to create a new user
app.post('/api/v1.0/users', async(req, res) => {

	// Call controller to create a new user from the provided request
	const response = await usersController.add(req.body)

	if(response) {
		res.status(200).send("User added succesfully\n")
	} else {
		res.status(400).send("There was an error posting the user\n")
	}
})

// PUT Request to update a user
app.put('/api/v1.0/users/:user_id', async(req, res) => {

	// Call controller to create a new user from the provided request
	const userUpdateResponse = await usersController.update(req.params.user_id, req.body)

	if(userUpdateResponse) {
		res.status(200).send("User with id: " + req.params.user_id + " has been updated\n")
	} else {
		res.status(400).send("There was an error updating the user\n")
	}
})

// DELETE Request to delete one user
app.delete('/api/v1.0/users/:user_id', async(req, res) => {

	// Call controller to delete a user corresponding to the HTML request's user id
	// Once completed, return back to client a message and status code confirming the user was deleted
	const userDeleteResponse = await usersController.delete(req.params.user_id)

	if(userDeleteResponse) {
		res.status(200).send("User with id: " + req.params.user_id + " has been deleted\n")
	} else {
		res.status(400).send("There was an error deleting your user\n")
	}
})

// HEAD Request to authenticate/check if a user exists
app.head('/api/v1.0/users/:user', async (req, res) => {

	// Retrieve the authorization credentials used by the client's request
	const authorizationHeader = req.get('Authorization')

	// Using authentication module, check if the user exists for not
	const userExists = await authentication.checkUserCredentials(authorizationHeader)
	
	if(userExists) {
		// If user exists, return status 200
		res.status(200).send()
	} else {
		// If user doesn't exist, return status 401
		res.status(401).send()
	}
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
		ratings_endpoints_functionality
	}
})

// GET Request to retrieve all image
app.get('/api/v1.0/images', async(req, res) => {

	// Call controller to retrieve all images
	// Waits for response from controller before continuing (async/await)
	const images = await imagesController.getAll()

	res.status(200).send(JSON.stringify(images, null, 2))
})

// GET Request to retrieve one image
app.get('/api/v1.0/images/:image_id', async(req, res) => {

	// Call controller to retrieve one image
	const image = await imagesController.getById(req.params.image_id)

	res.status(200).send(JSON.stringify(image, null, 2))
})

// POST Request to create a new image
app.post('/api/v1.0/images', async(req, res) => {

	// Call controller to create a new image from the provided request
	const response = await imagesController.add(req.body)
	
	if(response) {
		res.status(200).send("image added succesfully\n")
	} else {
		res.status(400).send("There was an error posting your image\n")
	}
})

// PUT Request to update a image
app.put('/api/v1.0/images/:image_id', async(req, res) => {

	// Call controller to create a new image from the provided request
	const imageUpdateResponse = await imagesController.update(req.params.image_id, req.body)

	if(imageUpdateResponse) {
		res.status(200).send("image with id: " + req.params.image_id + " has been updated\n")
	} else {
		res.status(400).send("There was an error updating your image\n")
	}	
})

// DELETE Request to delete one image
app.delete('/api/v1.0/images/:image_id', async(req, res) => {

	// Call controller to delete a image corresponding to the HTML request's image id
	// Once completed, return back to client a message and status code confirming the image was deleted
	const imageDeleteResponse = await imagesController.delete(req.params.image_id)

	if(imageDeleteResponse) {
		res.status(200).send("image with id: " + req.params.image_id + " has been deleted\n")
	} else {
		res.status(400).send("There was an error deleting your image\n")
	}
})

// GET Request to retrieve all notifications
app.get('/api/v1.0/notifications', async(req, res) => {

	// Call controller to retrieve all notifications
	// Waits for response from controller before continuing (async/await)
	const notifications = await notificationsController.getAll()

	res.status(200).send(JSON.stringify(notifications, null, 2))
})

// GET Request to retrieve one notification
app.get('/api/v1.0/notifications/:notification_id', async(req, res) => {

	// Call controller to retrieve one notification
	const notification = await notificationsController.getById(req.params.notification_id)

	res.status(200).send(JSON.stringify(notification, null, 2))
})

// POST Request to create a new notification
app.post('/api/v1.0/notifications', async(req, res) => {

	// Call controller to create a new notification from the provided request
	const response = await notificationsController.add(req.body)
	
	if(response) {
		res.status(200).send("notification added succesfully\n")
	} else {
		res.status(400).send("There was an error posting your notification\n")
	}
})

// PUT Request to update a notification
app.put('/api/v1.0/notifications/:notification_id', async(req, res) => {

	// Call controller to create a new notification from the provided request
	const notificationUpdateResponse = await notificationsController.update(req.params.notification_id, req.body)

	if(notificationUpdateResponse) {
		res.status(200).send("notification with id: " + req.params.notification_id + " has been updated\n")
	} else {
		res.status(400).send("There was an error updating your notification\n")
	}	
})

// DELETE Request to delete one notification
app.delete('/api/v1.0/notifications/:notification_id', async(req, res) => {

	// Call controller to delete a notification corresponding to the HTML request's notification id
	// Once completed, return back to client a message and status code confirming the notification was deleted
	const notificationDeleteResponse = await notificationsController.delete(req.params.notification_id)

	if(notificationDeleteResponse) {
		res.status(200).send("notification with id: " + req.params.notification_id + " has been deleted\n")
	} else {
		res.status(400).send("There was an error deleting your notification\n")
	}
})

// GET Request to retrieve all logins
app.get('/api/v1.0/logins', async(req, res) => {

	// Call controller to retrieve all logins
	// Waits for response from controller before continuing (async/await)
	const logins = await loginsController.getAll()

	res.status(200).send(JSON.stringify(logins, null, 2))
})

// GET Request to retrieve one login
app.get('/api/v1.0/logins/:login_id', async(req, res) => {

	// Call controller to retrieve one login
	const login = await loginsController.getById(req.params.login_id)

	res.status(200).send(JSON.stringify(login, null, 2))
})

// POST Request to create a new login
app.post('/api/v1.0/logins', async(req, res) => {

	// Call controller to create a new login from the provided request
	const response = await loginsController.add(req.body)
	
	if(response) {
		res.status(200).send("login added succesfully\n")
	} else {
		res.status(400).send("There was an error posting your login\n")
	}
})

// PUT Request to update a login
app.put('/api/v1.0/logins/:login_id', async(req, res) => {

	// Call controller to create a new login from the provided request
	const loginUpdateResponse = await loginsController.update(req.params.login_id, req.body)

	if(loginUpdateResponse) {
		res.status(200).send("login with id: " + req.params.login_id + " has been updated\n")
	} else {
		res.status(400).send("There was an error updating your login\n")
	}	
})

// DELETE Request to delete one login
app.delete('/api/v1.0/logins/:login_id', async(req, res) => {

	// Call controller to delete a login corresponding to the HTML request's login id
	// Once completed, return back to client a message and status code confirming the login was deleted
	const loginDeleteResponse = await loginsController.delete(req.params.login_id)

	if(loginDeleteResponse) {
		res.status(200).send("login with id: " + req.params.login_id + " has been deleted\n")
	} else {
		res.status(400).send("There was an error deleting your login\n")
	}
})

// Runs the server on provided port
app.listen(port, () => console.log(`Server listening on port ${port}`));