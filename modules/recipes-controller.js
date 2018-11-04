const database_url = "mongodb://localhost:27017/yummy_recipes"
const recipes_collection_name = "recipes"

const database = require('./mongodb')

exports.add = function(recipeObject){
    database.addResourceToCollection(database_url, recipes_collection_name, recipeObject)
};

exports.getById = function(conData, req, callback){

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

exports.update = function(recipeObject){

};

exports.delete = function(recipeObject){

};
