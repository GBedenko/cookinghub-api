const database_url = "mongodb://localhost:27017/yummy_recipes"
const ratings_collection = "ratings"

const database = require('./mongodb-database')

// Function to add a new rating
exports.add = async(ratingObject) => {
    
    let addRating = database.addResourceToCollection(database_url, ratings_collection, ratingObject)
                        .then((result) => result)

    let addRatingResponse = await addRating

    return addRatingResponse
}

// Function to retrieve one rating
exports.getById = async(ratingId) => {
    
    let getRating = database.getResourceFromCollection(database_url, ratings_collection, ratingId)
                        .then((rating) => rating)
    
    let rating = await getRating

    return rating
}

// Function to retrieve all ratings
exports.getAll = async() => {
    
    let results = database.getAllFromCollection(database_url, ratings_collection)
                    .then((results) => results) // Obtains the result from the Promise object
    
    // Calls the results function, waits for response before continuing
    let final_result = await results

    // Return the list of ratings
    return final_result
}

// Function to update a rating
exports.update = async(ratingID, newRatingDetailsObject) => {

    let updateRating = database.updateResource(database_url, ratings_collection, ratingID, newRatingDetailsObject)
                            .then((rating) => rating)

    let updateRatingResponse = await updateRating

    return updateRatingResponse
}

// Function to delete a rating
exports.delete = async(ratingID) => {

    let deleteRating = database.deleteResource(database_url, ratings_collection, ratingID)
                            .then((rating) => rating)

    let deleteRatingResponse = await deleteRating

    return deleteRatingResponse
}
