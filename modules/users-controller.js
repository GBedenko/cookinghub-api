'use strict'

const databaseURL = 'mongodb://localhost:27017/yummy_recipes'
const usersCollection = 'users'

const database = require('./mongodb')

// Function to add a new user
exports.add = async(userObject) => {

	const addUser = database.addResourceToCollection(databaseURL, usersCollection, userObject)
		.then((result) => result)
		.catch((err) => console.log(err))

	const addUserResponse = await addUser

	return addUserResponse
}

// Function to retrieve one user
exports.getById = async(userId) => {

	const getUser = database.getResourceFromCollection(databaseURL, usersCollection, userId)
		.then((user) => user)
		.catch((err) => console.log(err))

	const user = await getUser

	return user
}

// Function to retrieve all users
exports.getAll = async(queryObject) => {

	const results = database.getAllFromCollection(databaseURL, usersCollection, queryObject)
		.then((results) => results) // Obtains the result from the Promise object
		.catch((err) => console.log(err)) // If the result was an error then handle the error

	// Calls the results function, waits for response before continuing
	const finalResult = await results

	// Return the list of users
	return finalResult
}

// Function to update a user
exports.update = async(userID, newUserDetailsObject) => {

	const updateUser = database.updateResource(databaseURL, usersCollection, userID, newUserDetailsObject)
		.then((user) => user)
		.catch((err) => console.log(err))

	const updateUserResponse = await updateUser

	return updateUserResponse
}

// Function to delete a user
exports.delete = async(userID) => {

	const deleteUser = database.deleteResource(databaseURL, usersCollection, userID)
		.then((user) => user)
		.catch((err) => console.log(err))

	const deleteUserResponse = await deleteUser

	return deleteUserResponse
}
