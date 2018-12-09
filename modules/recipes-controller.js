'use strict'

/** Recipes Controller module
 * @module modules/recipes-controller
 * @requires modules/mongodb-database
 */

// Define database attributes that this controller will use
const databaseURL = 'mongodb://localhost:27017/yummy_recipes'
const recipesCollection = 'recipes'

// Import module which handles database interactions
const database = require('./mongodb-database')

/**
 * Requests and validates a request to add a new recipe
 * @param {Object} recipeObject - Object representing a new recipe you want to add
 * @returns {Object} Result of request if it was successful or not
 */
exports.add = async(recipeObject) => {

	// Call database to insert new resource with the provided recipe object 
	const addRecipeResponse = await database.addResourceToCollection(databaseURL, recipesCollection, recipeObject)
										.then((result) => result) // Retrieve the promise's value if resolved
										.catch((reason) => reason) // Handle the promise's value if rejected

	// Return the result of adding a new recipe (either true or error object)
	return addRecipeResponse
}

/**
 * Requests and validates a request to retrieve one recipe by its id
 * @param {number} recipeId - ID of the recipe you want to retrieve
 * @returns {Object} Recipe object retrieved from the request
 */
exports.getById = async(recipeId) => {

	// Call database to find one resource with the provided recipe id 
	const getRecipeResponse = await database.getResourceFromCollection(databaseURL, recipesCollection, recipeId)
										.then((recipe) => recipe) // Retrieve the promise's value if resolved
										.catch((reason) => reason) // Handle the promise's value if rejected

	// Return result of finding one recipe (either recipe object or error object)
	return getRecipeResponse
}

/**
 * Requests and validates a request to retrieve all recipes or all recipes matching an optional query
 * @param {Object} [paginationObject] - Optional query object for which recipes you want to request
 * @returns {Array} Array of recipe objects retrieved from the request
 */
exports.getAll = async(searchObject, queryObject) => {
	
	// Set default pagination values if they aren't provided
	let paginationObject = {limit: 0, skip: 0}

	// Set default sort query 
	let sortObject = {}

	// If limit value is provided in query parameters, assign it to paginationObject
	if(queryObject.limit) paginationObject.limit = parseInt(queryObject.limit)
	
	// If skip value is provided in query parameters, assign it to paginationObject
	if(queryObject.skip) paginationObject.skip = parseInt(queryObject.skip)

	// Assign all remaining key parameters to the sort object
	// Sort values are all other parameters passed, apart from the limit and skip values
	sortObject = queryObject
	delete sortObject.limit
	delete sortObject.skip
	
	// For every sort parameter, ensure that its value is an integer so that mongodb can use it
	for (let key in sortObject) {
		console.log(key)
		sortObject[key] = parseInt(sortObject[key])
	}
	
	// Call database to find resources with the provided query object or no query object
	const getAllRecipesResponse = await database.getAllFromCollection(databaseURL, recipesCollection, searchObject, paginationObject, sortObject)
											.then((recipes) => recipes) // Retrieve the promise's value if resolved
											.catch((reason) => reason) // Handle the promise's value if rejected

	// Return result of finding all recipes (either array of recipe objects or error object)
	return getAllRecipesResponse
}

/**
 * Requests and validates a request to update a recipe with a new recipe object
 * @param {number} recipeID - ID of the recipe you want to update
 * @param {Object} newRecipeDetailsObject - Recipe object you want to replace the existing recipe with
 * @returns {Object} Result of request if it was successful or not
 */
exports.update = async(recipeID, newRecipeDetailsObject) => {

	// Call database to update a resource with the provided id and new resource object
	const updateRecipeResponse = await database.updateResource(databaseURL, recipesCollection, recipeID, newRecipeDetailsObject)
											.then((result) => result) // Retrieve the promise's value if resolved
											.catch((reason) => reason) // Handle the promise's value if rejected

	// Return the result of updating the recipe (either true or error object)
	return updateRecipeResponse
}

/**
 * Requests and validates a request to delete a recipe
 * @param {number} recipeID - ID of the recipe you want to delete
 * @returns {Object} Result of request if it was successful or not
 */
exports.delete = async(recipeID) => {

	// Call database to delete a resource with the provided id
	const deleteRecipeResponse = await database.deleteResource(databaseURL, recipesCollection, recipeID)
											.then((result) => result) // Retrieve the promise's value if resolved
											.catch((reason) => reason) // Handle the promise's value if rejected

	// Return the result of deleting the recipe (either true or error object)
	return deleteRecipeResponse
}
