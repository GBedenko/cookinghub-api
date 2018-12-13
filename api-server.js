'use strict'

/** API Server Index Routes
 * @module api-server
 * @requires express
 * @requires http-status-codes
 * @requires modules/images-controller
 * @requires modules/logins-controller
 * @requires modules/notifications-controller
 * @requires modules/ratings-controller
 * @requires modules/recipes-controller
 * @requires modules/users-controller
 * @requires modules/authentication
 */

console.log('Server Booting Up...')

// Using express as my web server, create instance and set attributes
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const cors = require('cors')

// Import package used to assign status codes for responses easily
const httpStatus = require('http-status-codes')

// Port this server will run on
const port = 8080

// Import controllers used for processing requests logic
const imagesController = require('./modules/images-controller')
const notificationsController = require('./modules/notifications-controller')
const ratingsController = require('./modules/ratings-controller')
const recipesController = require('./modules/recipes-controller')
const usersController = require('./modules/users-controller')
const authentication = require('./modules/authentication')

// Set server's response header allow requests from any host, to allow request headers
// and will return json content type
app.use(cors())

/**
 * POST Request to create a new user
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.post('/api/v1.0/users', async(req, res) => {

	// Call controller to create a new user using the provided request body
	const addUserResponse = await usersController.add(req.body)

	if(addUserResponse) {
		// If adding user was successful, return 201 status code and object confirming request response
		res.status(httpStatus.CREATED).send({status: 'success', userAddedSuccessfully: addUserResponse})
	} else {
		// If adding user was unsuccessful, return 400 status code and object confirming request response
		res.status(httpStatus.BAD_REQUEST).send({status: 'fail', userAddedSuccessfully: addUserResponse})
	}
})

// Every client request must use the middleware module to check the user is authorized
app.use(authentication.checkAuthorizationHeaderMiddleware)

/**
 * HEAD Request to login and authenticate a user using a client's request authorization header
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.head('/api/v1.0/login', async(req, res) => {

	// Send 200 status code as request would have passed middleware to get to this endpoint
	res.status(httpStatus.OK).send()
})

/**
 * GET Request to retrieve all recipes
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.get('/api/v1.0/recipes', async(req, res) => {

	// Call controller to retrieve all recipes for the client's query
	const recipes = await recipesController.getAll(req.query)

	if(recipes.length >= 1) {
		// Respond with appropiate status code and body as results array of objects from the query
		res.status(httpStatus.OK).send(recipes)
	} else {
		// If length is 0, then it returned an empty object, so resource not found/doesn't exist
		res.status(httpStatus.NOT_FOUND).send()
	}
})

/**
 * GET Request to retrieve one recipe
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.get('/api/v1.0/recipes/:recipe_id', async(req, res) => {

	// Call controller to retrieve one recipe using the provided id
	const recipe = await recipesController.getById(req.params.recipe_id)

	if(recipe) {
		// Respond with appropiate status code and body as result object of the query
		res.status(httpStatus.OK).send(recipe)
	} else {
		// If length is 0, then it returned an empty object, so resource not found/doesn't exist
		res.status(httpStatus.NOT_FOUND).send()
	}
})

/**
 * POST Request to create a new recipe
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.post('/api/v1.0/recipes', async(req, res) => {

	// Retrieve user object based on the client's authorization header
	const user = await authentication.retrieveUserFromAuthorizationHeader(req.get('Authorization'))

	// If user is not a creator, send 401 status code as they aren't allowed to create a recipe
	if(user.roles.find('creator') == undefined) {
		res.status(httpStatus.UNAUTHORIZED).send()
	}

	// Call controller to create a new recipe using the provided request body
	const addRecipeResponse = await recipesController.add(req.body)

	if(addRecipeResponse) {
		// If adding recipe was successful, return 201 status code and object confirming request response
		res.status(httpStatus.CREATED).send({status: 'success', recipeAddedSuccessfully: addRecipeResponse})
	} else {
		// If adding recipe was unsuccessful, return 400 status code and object confirming request response
		res.status(httpStatus.BAD_REQUEST).send({status: 'fail', recipeAddedSuccessfully: addRecipeResponse})
	}
})

/**
 * PUT Request to update a recipe
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.put('/api/v1.0/recipes/:recipe_id', async(req, res) => {

	// Call controller to update the recipe for the provided id and updated object from the provided request
	const updateRecipeResponse = await recipesController.update(req.params.recipe_id, req.body)

	if(updateRecipeResponse) {
		// If updating recipe was successful, return 200 status code and object confirming request response
		res.status(httpStatus.OK).send({status: 'success', recipeUpdatedSuccessfully: updateRecipeResponse})
	} else {
		// If updating recipe was unsuccessful, return 400 status code and object confirming request response
		res.status(httpStatus.BAD_REQUEST).send({status: 'fail', recipeUpdatedSuccessfully: updateRecipeResponse})
	}
})

/**
 * PATCH Request to update a recipe
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.patch('/api/v1.0/recipes/:recipe_id', async(req, res) => {

	// Call controller to update the recipe for the provided id and updated object from the provided request
	const updateRecipeResponse = await recipesController.update(req.params.recipe_id, req.body)

	if(updateRecipeResponse) {
		// If updating recipe was successful, return 200 status code and object confirming request response
		res.status(httpStatus.OK).send({status: 'success', recipeUpdatedSuccessfully: updateRecipeResponse})
	} else {
		// If updating recipe was unsuccessful, return 400 status code and object confirming request response
		res.status(httpStatus.BAD_REQUEST).send({status: 'fail', recipeUpdatedSuccessfully: updateRecipeResponse})
	}
})

/**
 * DELETE Request to delete one recipe
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.delete('/api/v1.0/recipes/:recipe_id', async(req, res) => {

	// Call controller to delete a recipe using the provided recipe id from client's request
	const deleteRecipeResponse = await recipesController.delete(req.params.recipe_id)

	if(deleteRecipeResponse) {
		// If deleting recipe was successful, return 200 status code and object confirming request response
		res.status(httpStatus.OK).send({status: 'success', recipeDeletedSuccessfully: deleteRecipeResponse})
	} else {
		// If deleting recipe was unsuccessful, return 400 status code and object confirming request response
		res.status(httpStatus.BAD_REQUEST).send({status: 'fail', recipeDeletedSuccessfully: deleteRecipeResponse})
	}
})

/**
 * GET Request to retrieve all users
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.get('/api/v1.0/users', async(req, res) => {

	// Call controller to retrieve all users for the client's query
	const users = await usersController.getAll(req.query)

	if(users.length >= 1) {
		// Respond with appropiate status code and body as results array of objects from the query
		res.status(httpStatus.OK).send(users)
	} else {
		// If length is 0, then it returned an empty object, so resource not found/doesn't exist
		res.status(httpStatus.NOT_FOUND).send()
	}
})

/**
 * GET Request to retrieve one user
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.get('/api/v1.0/users/:user_id', async(req, res) => {

	// Call controller to retrieve one user using the provided id
	const user = await usersController.getById(req.params.user_id)

	if(user.length >= 1) {
		// Respond with appropiate status code and body as result object of the query
		res.status(httpStatus.OK).send(user)
	} else {
		// If length is 0, then it returned an empty object, so resource not found/doesn't exist
		res.status(httpStatus.NOT_FOUND).send()
	}
})

/**
 * PUT Request to update a user
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.put('/api/v1.0/users/:user_id', async(req, res) => {

	// Call controller to update the user for the provided id and updated object from the provided request
	const updateUserResponse = await usersController.update(req.params.user_id, req.body)

	if(updateUserResponse) {
		// If updating user was successful, return 200 status code and object confirming request response
		res.status(httpStatus.OK).send({status: 'success', userUpdatedSuccessfully: updateUserResponse})
	} else {
		// If updating user was unsuccessful, return 400 status code and object confirming request response
		res.status(httpStatus.BAD_REQUEST).send({status: 'success', userUpdatedSuccessfully: updateUserResponse})
	}
})

/**
 * PATCH Request to update a user
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.patch('/api/v1.0/users/:user_id', async(req, res) => {

	// Call controller to update the user for the provided id and updated object from the provided request
	const updateUserResponse = await usersController.update(req.params.user_id, req.body)

	if(updateUserResponse) {
		// If updating user was successful, return 200 status code and object confirming request response
		res.status(httpStatus.OK).send({status: 'success', userUpdatedSuccessfully: updateUserResponse})
	} else {
		// If updating user was unsuccessful, return 400 status code and object confirming request response
		res.status(httpStatus.BAD_REQUEST).send({status: 'fail', userUpdatedSuccessfully: updateUserResponse})
	}
})

/**
 * DELETE Request to delete one user
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.delete('/api/v1.0/users/:user_id', async(req, res) => {

	// Call controller to delete a user using the provided user id from client's request
	const deleteUserResponse = await usersController.delete(req.params.user_id)

	if(deleteUserResponse) {
		// If deleting user was successful, return 200 status code and object confirming request response
		res.status(httpStatus.OK).send({status: 'success', userDeletedSuccessfully: deleteUserResponse})
	} else {
		// If deleting user was unsuccessful, return 400 status code and object confirming request response
		res.status(httpStatus.BAD_REQUEST).send({status: 'success', userDeletedSuccessfully: deleteUserResponse})
	}
})

/**
 * GET Request to retrieve all ratings
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.get('/api/v1.0/ratings', async(req, res) => {

	// Call controller to retrieve all ratings
	// Waits for response from controller before continuing (async/await)
	const ratings = await ratingsController.getAll()

	res.status(httpStatus.OK).send(ratings)
})

/**
 * GET Request to retrieve one rating
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.get('/api/v1.0/ratings/:rating_id', async(req, res) => {

	// Call controller to retrieve one rating
	const rating = await ratingsController.getById(req.params.rating_id)

	res.status(httpStatus.OK).send(rating)
})

/**
 * POST Request to create a new rating
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.post('/api/v1.0/ratings', async(req, res) => {

	// Call controller to create a new rating from the provided request
	const response = await ratingsController.add(req.body)

	if(response) {
		res.status(httpStatus.OK).send('Rating added succesfully\n')
	} else {
		res.status(httpStatus.BAD_REQUEST).send('There was an error posting your rating\n')
	}
})

/**
 * PUT Request to update a rating
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.put('/api/v1.0/ratings/:rating_id', async(req, res) => {

	// Call controller to create a new rating from the provided request
	const ratingUpdateResponse = await ratingsController.update(req.params.rating_id, req.body)

	if(ratingUpdateResponse) {
		res.status(httpStatus.OK).send('Rating with id: ' + req.params.rating_id + ' has been updated\n')
	} else {
		res.status(httpStatus.BAD_REQUEST).send('There was an error updating your rating\n')
	}
})

/**
 * PATCH Request to update a rating
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.patch('/api/v1.0/ratings/:rating_id', async(req, res) => {

	// Call controller to update the rating for the provided id and updated object from the provided request
	const updateRatingResponse = await ratingsController.update(req.params.rating_id, req.body)

	if(updateRatingResponse) {
		// If updating rating was successful, return 200 status code and object confirming request response
		res.status(httpStatus.OK).send({status: 'success', ratingUpdatedSuccessfully: updateRatingResponse})
	} else {
		// If updating rating was unsuccessful, return 400 status code and object confirming request response
		res.status(httpStatus.BAD_REQUEST).send({status: 'fail', ratingUpdatedSuccessfully: updateRatingResponse})
	}
})

/**
 * DELETE Request to delete one rating
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.delete('/api/v1.0/ratings/:rating_id', async(req, res) => {

	// Call controller to delete a rating corresponding to the HTML request's rating id
	// Once completed, return back to client a message and status code confirming the rating was deleted
	const ratingDeleteResponse = await ratingsController.delete(req.params.rating_id)

	if(ratingDeleteResponse) {
		res.status(httpStatus.OK).send('Rating with id: ' + req.params.rating_id + ' has been deleted\n')
	} else {
		res.status(httpStatus.BAD_REQUEST).send('There was an error deleting your rating\n')
	}
})

/**
 * GET Request to retrieve all images
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.get('/api/v1.0/images', async(req, res) => {

	// Call controller to retrieve all images
	// Waits for response from controller before continuing (async/await)
	const images = await imagesController.getAll()

	res.status(httpStatus.OK).send(images)
})

/**
 * GET Request to retrieve one image
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.get('/api/v1.0/images/:image_id', async(req, res) => {

	// Call controller to retrieve one image
	const image = await imagesController.getById(req.params.image_id)

	res.status(httpStatus.OK).send(image)
})

/**
 * POST Request to create a new image
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.post('/api/v1.0/images', async(req, res) => {

	// Call controller to create a new image from the provided request
	const response = await imagesController.add(req.body)

	if(response) {
		res.status(httpStatus.OK).send('image added succesfully\n')
	} else {
		res.status(httpStatus.BAD_REQUEST).send('There was an error posting your image\n')
	}
})

/**
 * PUT Request to update an image
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.put('/api/v1.0/images/:image_id', async(req, res) => {

	// Call controller to create a new image from the provided request
	const imageUpdateResponse = await imagesController.update(req.params.image_id, req.body)

	if(imageUpdateResponse) {
		res.status(httpStatus.OK).send('image with id: ' + req.params.image_id + ' has been updated\n')
	} else {
		res.status(httpStatus.BAD_REQUEST).send('There was an error updating your image\n')
	}
})

/**
 * PATCH Request to update a image
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.patch('/api/v1.0/images/:image_id', async(req, res) => {

	// Call controller to update the image for the provided id and updated object from the provided request
	const updateImageResponse = await imagesController.update(req.params.image_id, req.body)

	if(updateImageResponse) {
		// If updating image was successful, return 200 status code and object confirming request response
		res.status(httpStatus.OK).send({status: 'success', imageUpdatedSuccessfully: updateImageResponse})
	} else {
		// If updating image was unsuccessful, return 400 status code and object confirming request response
		res.status(httpStatus.BAD_REQUEST).send({status: 'fail', imageUpdatedSuccessfully: updateImageResponse})
	}
})

/**
 * DELETE Request to delete one image
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.delete('/api/v1.0/images/:image_id', async(req, res) => {

	// Call controller to delete a image corresponding to the HTML request's image id
	// Once completed, return back to client a message and status code confirming the image was deleted
	const imageDeleteResponse = await imagesController.delete(req.params.image_id)

	if(imageDeleteResponse) {
		res.status(httpStatus.OK).send('image with id: ' + req.params.image_id + ' has been deleted\n')
	} else {
		res.status(httpStatus.BAD_REQUEST).send('There was an error deleting your image\n')
	}
})

/**
 * GET Request to retrieve all notifications
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.get('/api/v1.0/notifications', async(req, res) => {

	// Call controller to retrieve all notifications
	// Waits for response from controller before continuing (async/await)
	const notifications = await notificationsController.getAll()

	res.status(httpStatus.OK).send(notifications)
})

/**
 * GET Request to retrieve one notification
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.get('/api/v1.0/notifications/:notification_id', async(req, res) => {

	// Call controller to retrieve one notification
	const notification = await notificationsController.getById(req.params.notification_id)

	res.status(httpStatus.OK).send(notification)
})

/**
 * POST Request to create a new notification
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.post('/api/v1.0/notifications', async(req, res) => {

	// Call controller to create a new notification from the provided request
	const response = await notificationsController.add(req.body)

	if(response) {
		res.status(httpStatus.OK).send('notification added succesfully\n')
	} else {
		res.status(httpStatus.BAD_REQUEST).send('There was an error posting your notification\n')
	}
})

/**
 * PUT Request to update a notification
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.put('/api/v1.0/notifications/:notification_id', async(req, res) => {

	// Call controller to create a new notification from the provided request
	const notificationUpdateResponse = await notificationsController.update(req.params.notification_id, req.body)

	if(notificationUpdateResponse) {
		res.status(httpStatus.OK).send('notification with id: ' + req.params.notification_id + ' has been updated\n')
	} else {
		res.status(httpStatus.BAD_REQUEST).send('There was an error updating your notification\n')
	}
})

/**
 * PATCH Request to update a notification
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.patch('/api/v1.0/notifications/:notification_id', async(req, res) => {

	// Call controller to update the notification for the provided id and updated object from the provided request
	const updateNotificationResponse = await notificationsController.update(req.params.notification_id, req.body)

	if(updateNotificationResponse) {
		// If updating notification was successful, return 200 status code and object confirming request response
		res.status(httpStatus.OK).send({status: 'success', notificationUpdatedSuccessfully: updateNotificationResponse})
	} else {
		// If updating notification was unsuccessful, return 400 status code and object confirming request response
		res.status(httpStatus.BAD_REQUEST).send({status: 'fail', notificationUpdatedSuccessfully: updateNotificationResponse})
	}
})

/**
 * DELETE Request to delete one notification
 * @param {Object} req - HTTP request object from the client
 * @param {Object} res - HTTP response object from the server
 */
app.delete('/api/v1.0/notifications/:notification_id', async(req, res) => {

	// Call controller to delete a notification corresponding to the HTML request's notification id
	// Once completed, return back to client a message and status code confirming the notification was deleted
	const notificationDeleteResponse = await notificationsController.delete(req.params.notification_id)

	if(notificationDeleteResponse) {
		res.status(httpStatus.OK).send('notification with id: ' + req.params.notification_id + ' has been deleted\n')
	} else {
		res.status(httpStatus.BAD_REQUEST).send('There was an error deleting your notification\n')
	}
})

// Runs the server on provided port
app.listen(port, () => console.log(`Server listening on port ${port}`))

// Export the endpoints module
module.exports = app
