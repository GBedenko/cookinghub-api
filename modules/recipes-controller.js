'use strict'

const databaseURL = 'mongodb://localhost:27017/yummy_recipes'
const recipesCollection = 'recipes'

const database = require('./mongodb-database')

// Function to add a new recipe
exports.add = async(recipeObject) => {

	// Call database to insert new resource with the provided recipe object 
	const addRecipeResponse = await database.addResourceToCollection(databaseURL, recipesCollection, recipeObject)
										.then((result) => result) // Retrieve the promise's value if resolved
										.catch((reason) => reason) // Handle the promise's value if rejected

	// Return the result of adding a new recipe (either true or error object)
	return addRecipeResponse
}

// Function to retrieve one recipe
exports.getById = async(recipeId) => {

	// Call database to find one resource with the provided recipe id 
	const getRecipeResponse = await database.getResourceFromCollection(databaseURL, recipesCollection, recipeId)
										.then((recipe) => recipe) // Retrieve the promise's value if resolved
										.catch((reason) => reason) // Handle the promise's value if rejected

	// Return result of finding one recipe (either recipe object or error object)
	return getRecipeResponse
}

// Function to retrieve all recipes
exports.getAll = async(queryObject) => {

	// Call database to find resources with the provided query object or no query object
	const getAllRecipesResponse = await database.getAllFromCollection(databaseURL, recipesCollection, queryObject)
											.then((recipes) => recipes) // Retrieve the promise's value if resolved
											.catch((reason) => reason) // Handle the promise's value if rejected

	// Return result of finding all recipes (either array of recipe objects or error object)
	return getAllRecipesResponse
}

// Function to update a recipe
exports.update = async(recipeID, newRecipeDetailsObject) => {

	// Call database to update a resource with the provided id and new resource object
	const updateRecipeResponse = await database.updateResource(databaseURL, recipesCollection, recipeID, newRecipeDetailsObject)
											.then((result) => result) // Retrieve the promise's value if resolved
											.catch((reason) => reason) // Handle the promise's value if rejected

	// Return the result of updating the recipe (either true or error object)
	return updateRecipeResponse
}

// Function to delete a recipe
exports.delete = async(recipeID) => {

	// Call database to delete a resource with the provided id
	const deleteRecipeResponse = await database.deleteResource(databaseURL, recipesCollection, recipeID)
											.then((result) => result) // Retrieve the promise's value if resolved
											.catch((reason) => reason) // Handle the promise's value if rejected

	// Return the result of deleting the recipe (either true or error object)
	return deleteRecipeResponse
}
