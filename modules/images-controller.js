'use strict'

const databaseUrl = 'mongodb://localhost:27017/yummy_recipes'
const imagesCollection = 'images'

const database = require('./mongodb')

// Function to add a new image
exports.add = async(imageObject) => {

	const addImage = database.addResourceToCollection(databaseUrl, imagesCollection, imageObject)
		.then((result) => result)
		.catch((err) => console.log(err))

	const addImageResponse = await addImage

	return addImageResponse
}

// Function to retrieve one image
exports.getById = async(imageId) => {

	const getImage = database.getResourceFromCollection(databaseUrl, imagesCollection, imageId)
		.then((image) => image)
		.catch((err) => console.log(err))

	const image = await getImage

	return image
}

// Function to retrieve all images
exports.getAll = async() => {

	const results = database.getAllFromCollection(databaseUrl, imagesCollection)
		.then((results) => results) // Obtains the result from the Promise object
		.catch((err) => console.log(err)) // If the result was an error then handle the error

	// Calls the results function, waits for response before continuing
	const finalResult = await results

	// Return the list of images
	return finalResult
}

// Function to update a image
exports.update = async(imageID, newImageDetailsObject) => {

	const updateImage = database.updateResource(databaseUrl, imagesCollection, imageID, newImageDetailsObject)
		.then((image) => image)
		.catch((err) => console.log(err))

	const updateImageResponse = await updateImage

	return updateImageResponse
}

// Function to delete a image
exports.delete = async(imageID) => {

	const deleteImage = database.deleteResource(databaseUrl, imagesCollection, imageID)
		.then((image) => image)
		.catch((err) => console.log(err))

	const deleteImageResponse = await deleteImage

	return deleteImageResponse
}
