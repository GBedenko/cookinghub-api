'use strict'

/** Ratings Controller module
 * @module modules/ratings-controller
 * @requires modules/mongodb-database
 */

const databaseURL = 'mongodb://localhost:27017/cookinghub'
const ratingsCollection = 'ratings'

const database = require('./mongodb-database')

/**
 * Requests and validates a request to add a new rating
 * @param {Object} ratingObject - Object representing a new rating you want to add
 * @returns {Object} Result of request if it was successful or not
 */
// Function to add a new rating
exports.add = async(ratingObject) => {

	const addRating = database.addResourceToCollection(databaseURL, ratingsCollection, ratingObject)
		.then((result) => result)
		.catch((reason) => reason)

	const addRatingResponse = await addRating

	return addRatingResponse
}

/**
 * Requests and validates a request to retrieve one rating by its id
 * @param {number} ratingId - ID of the rating you want to retrieve
 * @returns {Object} Rating object retrieved from the request
 */
exports.getById = async(ratingId) => {

	const getRating = database.getResourceFromCollection(databaseURL, ratingsCollection, ratingId)
		.then((rating) => rating)
		.catch((reason) => reason)

	const rating = await getRating

	return rating
}

/**
 * Requests and validates a request to retrieve all ratings or all ratings matching an optional query
 * @param {Object} [paginationObject] - Optional query object for which ratings you want to request
 * @returns {Array} Array of rating objects retrieved from the request
 */
exports.getAll = async(searchObject) => {

	// Set defaults pagination and sort queries (not yet available to be customised for requesting ratings)
	const paginationObject = {limit: 0, skip: 0}
	const sortObject = {}

	// Call database to retrieve all resources from the collection
	const results = database.getAllFromCollection(databaseURL, ratingsCollection, searchObject, paginationObject, sortObject)
		.then((results) => results) // Obtains the result from the Promise object

	// Calls the results function, waits for response before continuing
	const finalResult = await results

	// Return the list of ratings
	return finalResult
}

/**
 * Requests and validates a request to update a rating with a new rating object
 * @param {number} ratingID - ID of the rating you want to update
 * @param {Object} newRatingDetailsObject - Rating object you want to replace the existing rating with
 * @returns {Object} Result of request if it was successful or not
 */
exports.update = async(ratingID, newRatingDetailsObject) => {

	const updateRating = database.updateResource(databaseURL, ratingsCollection, ratingID, newRatingDetailsObject)
		.then((rating) => rating)
		.catch((reason) => reason)

	const updateRatingResponse = await updateRating

	return updateRatingResponse
}

/**
 * Requests and validates a request to delete a rating
 * @param {number} ratingID - ID of the rating you want to delete
 * @returns {Object} Result of request if it was successful or not
 */
exports.delete = async(ratingID) => {

	const deleteRating = database.deleteResource(databaseURL, ratingsCollection, ratingID)
		.then((rating) => rating)
		.catch((reason) => reason)

	const deleteRatingResponse = await deleteRating

	return deleteRatingResponse
}
