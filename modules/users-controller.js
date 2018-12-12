'use strict'

/** Users Controller module
 * @module modules/users-controller
 * @requires modules/mongodb-database
 */

// Define database attributes that this controller will use
const databaseURL = 'mongodb://localhost:27017/yummy_recipes'
const usersCollection = 'users'

// Import module which handles database interactions
const database = require('./mongodb-database')

/**
 * Requests and validates a request to add a new user
 * @param {Object} userObject - Object representing a new user you want to add
 * @returns {Object} Result of request if it was successful or not
 */
exports.add = async(userObject) => {

	// Set default values for a new user
	userObject.likes = 0
	userObject.dislikes = 0

	// Call database to insert new resource with the provided user object
	const addUserResponse = await database.addResourceToCollection(databaseURL, usersCollection, userObject)
		.then((result) => result) // Retrieve the promise's value if resolved

	// Return the result of adding a new user (either true or error object)
	return addUserResponse
}

/**
 * Requests and validates a request to retrieve one user by its id
 * @param {number} userId - ID of the user you want to retrieve
 * @returns {Object} User object retrieved from the request
 */
exports.getById = async(userId) => {

	// Call database to find one resource with the provided user id
	const getUserResponse = await database.getResourceFromCollection(databaseURL, usersCollection, userId)
		.then((user) => user) // Retrieve the promise's value if resolved
		.catch((reason) => reason) // Handle the promise's value if rejected

	// Return result of finding one user (either user object or error object)
	return getUserResponse
}

/**
 * Requests and validates a request to retrieve all users or all users matching an optional query
 * @param {Object} [paginationObject] - Optional query object for which users you want to request
 * @returns {Array} Array of user objects retrieved from the request
 */
exports.getAll = async(searchObject) => {

	// Set default values for pagination and sort filter as these aren't used for users queries
	const paginationObject = {limit: 0, skip: 0}
	const sortObject = {}

	// Call database to find resources with the provided query object or no query object
	const getAllUsersResponse = await database.getAllFromCollection(databaseURL, usersCollection, searchObject, paginationObject, sortObject)
		.then((users) => users) // Retrieve the promise's value if resolved

	// Return result of finding all users (either array of user objects or error object)
	return getAllUsersResponse
}

/**
 * Requests and validates a request to update a user with a new user object
 * @param {number} userID - ID of the user you want to update
 * @param {Object} newUserDetailsObject - User object you want to replace the existing user with
 * @returns {Object} Result of request if it was successful or not
 */
exports.update = async(userID, newUserDetailsObject) => {

	// Call database to update a resource with the provided id and new resource object
	const updateUserResponse = await database.updateResource(databaseURL, usersCollection, userID, newUserDetailsObject)
		.then((result) => result) // Retrieve the promise's value if resolved
		.catch((reason) => reason) // Handle the promise's value if rejected

	// Return the result of updating the user (either true or error object)
	return updateUserResponse
}

/**
 * Requests and validates a request to delete a user
 * @param {number} userID - ID of the user you want to delete
 * @returns {Object} Result of request if it was successful or not
 */
exports.delete = async(userID) => {

	// Call database to delete a resource with the provided id
	const deleteUserResponse = await database.deleteResource(databaseURL, usersCollection, userID)
		.then((result) => result) // Retrieve the promise's value if resolved
		.catch((reason) => reason) // Handle the promise's value if rejected

	// Return the result of deleting the user (either true or error object)
	return deleteUserResponse
}
