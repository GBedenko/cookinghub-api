'use strict'

// Import hashing module for comparing hashed passwords
const bcrypt = require('bcrypt')

// Import package used to assign status codes for responses easily
const httpStatus = require('http-status-codes')

// Import module for communicating with users backend
const usersController = require('./users-controller')

/**
 * Decrypts an authorization header and checks whether the user details are correct
 * @param {Object} authorizationHeader - Basic authorization header sent with the client's request
 * @returns {boolean} Confirm whether the authorization is approved or not (true if user details correct, otherwise false)
 */
const checkUserCredentials = async(authorizationHeader) => {

	// If no authorization header is provided, reject user credentials straight away
	if(!authorizationHeader) return false

	// Split word 'Basic' from the Authorization header
	const [, hash] = authorizationHeader.split(' ')

	// Get the username and password in plain text
	const userCredentials = Buffer.from(hash, 'base64').toString()

	// Split the username and password by the colon seperating them
	const [username, password] = userCredentials.split(':')

	// Retrieve the user from the db that matches the username the user entered
	const existingUser = await usersController.getAll({username: username})

	// If a user was found with this username, check the password
	if(existingUser.length > 0) {

		// Compare the password the user entered with the one stored in db for the user
		const passwordCorrect = await bcrypt.compare(password, existingUser[0].passwordHash)

		if(passwordCorrect) {
			return true
		} else {
			return false
		}
	} else {
		// If the username doesn't exist then don't even try to verify user password
		return false
	}
}

/**
 * Middleware to check if the client's request is authorised, calling another function to check the authorization header
 * @param {Object} req - Client's request
 * @param {Object} req - Server's response
 * @param {Object} next - Function called to pass from middleware to the client's next route
 * @returns Calls next() for the next route or sends back 401 status code
 */
exports.checkAuthorizationHeaderMiddleware = async(req,res,next) => {

	// Retrieve the authorization header from the client's request
	const userAuthenticated = await checkUserCredentials(req.get('Authorization'))

	// If authorised, proceed to the request the client was making
	if (userAuthenticated) next()
	else {
		// If not authorized, return an unauthorized (401) status code
		res.status(httpStatus.UNAUTHORIZED).send()
	}
}
