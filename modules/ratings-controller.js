'use strict'

const databaseURL = 'mongodb://localhost:27017/yummy_recipes'
const ratingsCollection = 'ratings'

const database = require('./mongodb')

// Function to add a new rating
exports.add = async(ratingObject) => {

	const addRating = database.addResourceToCollection(databaseURL, ratingsCollection, ratingObject)
		.then((result) => result)
		.catch((err) => console.log(err))

	const addRatingResponse = await addRating

	return addRatingResponse
}

// Function to retrieve one rating
exports.getById = async(ratingId) => {

	const getRating = database.getResourceFromCollection(databaseURL, ratingsCollection, ratingId)
		.then((rating) => rating)
		.catch((err) => console.log(err))

	const rating = await getRating

	return rating
}

// Function to retrieve all ratings
exports.getAll = async() => {

	const results = database.getAllFromCollection(databaseURL, ratingsCollection)
		.then((results) => results) // Obtains the result from the Promise object
		.catch((err) => console.log(err)) // If the result was an error then handle the error

	// Calls the results function, waits for response before continuing
	const finalResult = await results

	// Return the list of ratings
	return finalResult
}

// Function to update a rating
exports.update = async(ratingID, newRatingDetailsObject) => {

	const updateRating = database.updateResource(databaseURL, ratingsCollection, ratingID, newRatingDetailsObject)
		.then((rating) => rating)
		.catch((err) => console.log(err))

	const updateRatingResponse = await updateRating

	return updateRatingResponse
}

// Function to delete a rating
exports.delete = async(ratingID) => {

	const deleteRating = database.deleteResource(databaseURL, ratingsCollection, ratingID)
		.then((rating) => rating)
		.catch((err) => console.log(err))

	const deleteRatingResponse = await deleteRating

	return deleteRatingResponse
}
