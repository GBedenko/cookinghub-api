const database_url = "mongodb://localhost:27017/yummy_recipes"
const recipes_collection_name = "recipes"

const database = require('./mongodb')

// Function to add a new recipe
exports.add = function(recipeObject, callback){
    database.addResourceToCollection(database_url, recipes_collection_name, recipeObject)
    callback()
};

// Function to retrieve one recipe
exports.getById = function(recipeId, callback){
    database.getResourceFromCollection(database_url, recipes_collection_name, recipeId, function(recipe) {
        return callback(recipe)
    })
};

// Function to retrieve all recipes
exports.getAll = function(err, callback){
    // If there's an error from the function call, exit with error message
    if (err) throw err;

    // Call database to add the new recipe record to the recipe collection
    // Once done, pass the recipes_list result as the parameter to the callback function
    database.getAllFromCollection(database_url, recipes_collection_name, function(recipes_list) {
        return callback(recipes_list)
    })
};

// Function to update a recipe
exports.update = function(recipeID, newRecipeDetailsObject, callback){
    database.updateResource(database_url, recipes_collection_name, recipeID, newRecipeDetailsObject)
    callback()
};

// Function to delete a recipe
exports.delete = function(recipeID, recipeObject, callback){
    database.deleteResource(database_url, recipes_collection_name, recipeID)    
    callback()
};
