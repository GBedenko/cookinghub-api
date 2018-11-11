const database_url = "mongodb://localhost:27017/yummy_recipes"
const recipes_collection = "recipes"

const database = require('./mongodb')

// Function to add a new recipe
exports.add = async(recipeObject) => {
    
    let addRecipe = database.addResourceToCollection(database_url, recipes_collection, recipeObject)
                        .then((result) => result)
                        .catch((err) => console.log(err))

    let addRecipeResponse = await addRecipe

    return addRecipeResponse
}

// Function to retrieve one recipe
exports.getById = async(recipeId) => {
    
    let getRecipe = database.getResourceFromCollection(database_url, recipes_collection, recipeId)
                        .then((recipe) => recipe)
                        .catch((err) => console.log(err))
    
    let recipe = await getRecipe

    return recipe
}

// Function to retrieve all recipes
exports.getAll = async() => {
    
    let results = database.getAllFromCollection(database_url, recipes_collection)
                    .then((results) => results) // Obtains the result from the Promise object
                    .catch((err) => console.log(err)) // If the result was an error then handle the error
    
    // Calls the results function, waits for response before continuing
    let final_result = await results

    // Return the list of recipes
    return final_result
}

// Function to update a recipe
exports.update = async(recipeID, newRecipeDetailsObject) => {

    let updateRecipe = database.updateResource(database_url, recipes_collection, recipeID, newRecipeDetailsObject)
                            .then((recipe) => recipe)
                            .catch((err) => console.log(err))

    let updateRecipeResponse = await updateRecipe

    return updateRecipeResponse
}

// Function to delete a recipe
exports.delete = async(recipeID) => {

    let deleteRecipe = database.deleteResource(database_url, recipes_collection, recipeID)
                            .then((recipe) => recipe)
                            .catch((err) => console.log(err))

    let deleteRecipeResponse = await deleteRecipe

    return deleteRecipeResponse
}
