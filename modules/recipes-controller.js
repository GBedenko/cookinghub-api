'use strict'

const databaseURL = 'mongodb://localhost:27017/yummy_recipes'
const recipesCollection = 'recipes'

const database = require('./mongodb')

// Function to add a new recipe
exports.add = async(recipeObject) => {

	const addRecipe = database.addResourceToCollection(databaseURL, recipesCollection, recipeObject)
		.then((result) => result)
		.catch((err) => console.log(err))

	const addRecipeResponse = await addRecipe

	return addRecipeResponse
}

// Function to retrieve one recipe
exports.getById = async(recipeId) => {

	const getRecipe = database.getResourceFromCollection(databaseURL, recipesCollection, recipeId)
		.then((recipe) => recipe)
		.catch((err) => console.log(err))

	const recipe = await getRecipe

	return recipe
}

// Function to retrieve all recipes
exports.getAll = async() => {

	const results = database.getAllFromCollection(databaseURL, recipesCollection)
		.then((results) => results) // Obtains the result from the Promise object
		.catch((err) => console.log(err)) // If the result was an error then handle the error

	// Calls the results function, waits for response before continuing
	const finalResult = await results

	// Return the list of recipes
	return finalResult
}

// Function to update a recipe
exports.update = async(recipeID, newRecipeDetailsObject) => {

	const updateRecipe = database.updateResource(databaseURL, recipesCollection, recipeID, newRecipeDetailsObject)
		.then((recipe) => recipe)
		.catch((err) => console.log(err))

	const updateRecipeResponse = await updateRecipe

	return updateRecipeResponse
}

// Function to delete a recipe
exports.delete = async(recipeID) => {

	const deleteRecipe = database.deleteResource(databaseURL, recipesCollection, recipeID)
		.then((recipe) => recipe)
		.catch((err) => console.log(err))

	const deleteRecipeResponse = await deleteRecipe

	return deleteRecipeResponse
}
