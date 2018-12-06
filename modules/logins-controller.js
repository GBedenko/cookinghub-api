'use strict'

const databaseUrl = 'mongodb://localhost:27017/yummy_recipes'
const loginsCollection = 'logins'

const database = require('./mongodb')

// Function to add a new login
exports.add = async(loginObject) => {

	const addLogin = database.addResourceToCollection(databaseUrl, loginsCollection, loginObject)
		.then((result) => result)
		.catch((err) => console.log(err))

	const addLoginResponse = await addLogin

	return addLoginResponse
}

// Function to retrieve one login
exports.getById = async(loginId) => {

	const getLogin = database.getResourceFromCollection(databaseUrl, loginsCollection, loginId)
		.then((login) => login)
		.catch((err) => console.log(err))

	const login = await getLogin

	return login
}

// Function to retrieve all logins
exports.getAll = async(query) => {

	const results = database.getAllFromCollection(databaseUrl, loginsCollection, query)
		.then((results) => results) // Obtains the result from the Promise object
		.catch((err) => console.log(err)) // If the result was an error then handle the error

	// Calls the results function, waits for response before continuing
	const finalResult = await results

	// Return the list of logins
	return finalResult
}

// Function to update a login
exports.update = async(loginID, newLoginDetailsObject) => {

	const updateLogin = database.updateResource(databaseUrl, loginsCollection, loginID, newLoginDetailsObject)
		.then((login) => login)
		.catch((err) => console.log(err))

	const updateLoginResponse = await updateLogin

	return updateLoginResponse
}

// Function to delete a login
exports.delete = async(loginID) => {

	const deleteLogin = database.deleteResource(databaseUrl, loginsCollection, loginID)
		.then((login) => login)
		.catch((err) => console.log(err))

	const deleteLoginResponse = await deleteLogin

	return deleteLoginResponse
}
