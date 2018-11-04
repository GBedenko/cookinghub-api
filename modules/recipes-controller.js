const database_url = "mongodb://localhost:27017/yummy_recipes"
const recipes_collection_name = "recipes"

const database = require('./mongodb')

exports.add = function(recipeObject, callback){
    database.addResourceToCollection(database_url, recipes_collection_name, recipeObject)
    callback()
};

exports.getById = function(recipeId, callback){
    database.getResourceFromCollection(database_url, recipes_collection_name, recipeId, function(recipe) {
        return callback(recipe)
    })
};

exports.getAll = function(err, callback){
    // If there's an error from the function call, exit with error message
    if (err) throw err;

    // Call database to add the new recipe record to the recipe collection
    // Once done, pass the recipes_list result as the parameter to the callback function
    database.getAllFromCollection(database_url, recipes_collection_name, function(recipes_list) {
        return callback(recipes_list)
    })
};

exports.update = function(recipeID, newRecipeDetailsObject, callback){
    database.updateResource(database_url, recipes_collection_name, recipeID, newRecipeDetailsObject)
    callback()
};

exports.delete = function(recipeObject, callback){
    // First try to delete the recipe by id if it was provided
    try {
        database.deleteResourceById(database_url, recipes_collection_name, recipeObject)
    } // If not, try to delete by search query without the id
    catch {
        database.deleteResourceByQuery(database_url, recipes_collection_name, recipeObject)
    } // Execute the callback provided by the route
    finally {
        callback()
    }
};
