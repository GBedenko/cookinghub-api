'use strict'

const databaseUrl = 'mongodb://localhost:27017/yummy_recipes'
const imagesCollection = 'images'

const database = require('./mongodb-database')

/**
 * Requests and validates a request to add a new image
 * @param {Object} imageObject - Object representing a new image you want to add
 * @returns {Object} Result of request if it was successful or not
 */
// Function to add a new image
exports.add = async(imageObject) => {

	const addImage = database.addResourceToCollection(databaseUrl, imagesCollection, imageObject)
		.then((result) => result)
		.catch((reason) => reason)

	const addImageResponse = await addImage

	return addImageResponse
}

/**
 * Requests and validates a request to retrieve one image by its id
 * @param {number} imageId - ID of the image you want to retrieve
 * @returns {Object} Image object retrieved from the request
 */
exports.getById = async(imageId) => {

	const getImage = database.getResourceFromCollection(databaseUrl, imagesCollection, imageId)
		.then((image) => image)
		.catch((reason) => reason)

	const image = await getImage

	return image
}

/**
 * Requests and validates a request to retrieve all images or all images matching an optional query
 * @param {Object} [paginationObject] - Optional query object for which images you want to request
 * @returns {Array} Array of image objects retrieved from the request
 */
exports.getAll = async(queryObject) => {

	// Set defaults for search, pagination and sort queries (not yet available to be customised for requesting images)
	let searchObject = {}
	let paginationObject = {limit: 0, skip: 0}
	let sortObject = {}

	// Call database to retrieve all resources from the collection
	const results = database.getAllFromCollection(databaseURL, imagesCollection, searchObject, paginationObject, sortObject)
						.then((results) => results) // Obtains the result from the Promise object
						.catch((reason) => reason) // If the result was an error then handle the error

	// Calls the results function, waits for response before continuing
	const finalResult = await results

	// Return the list of images
	return finalResult
}

/**
 * Requests and validates a request to update a image with a new image object
 * @param {number} imageID - ID of the image you want to update
 * @param {Object} newImageDetailsObject - Image object you want to replace the existing image with
 * @returns {Object} Result of request if it was successful or not
 */
exports.update = async(imageID, newImageDetailsObject) => {

	const updateImage = database.updateResource(databaseUrl, imagesCollection, imageID, newImageDetailsObject)
		.then((image) => image)
		.catch((reason) => reason)

	const updateImageResponse = await updateImage

	return updateImageResponse
}

/**
 * Requests and validates a request to delete a image
 * @param {number} imageID - ID of the image you want to delete
 * @returns {Object} Result of request if it was successful or not
 */
exports.delete = async(imageID) => {

	const deleteImage = database.deleteResource(databaseUrl, imagesCollection, imageID)
		.then((image) => image)
		.catch((reason) => reason)

	const deleteImageResponse = await deleteImage

	return deleteImageResponse
}
