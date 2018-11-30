const database_url = "mongodb://localhost:27017/yummy_recipes"
const users_collection = "users"

const database = require('./mongodb')

// Function to add a new user
exports.add = async(userObject) => {

    let addUser = database.addResourceToCollection(database_url, users_collection, userObject)
                        .then((result) => result)
                        .catch((err) => console.log(err))

    let addUserResponse = await addUser

    return addUserResponse
}

// Function to retrieve one user
exports.getById = async(userId) => {

    let getUser = database.getResourceFromCollection(database_url, users_collection, userId)
                        .then((user) => user)
                        .catch((err) => console.log(err))
    
    let user = await getUser

    return user
}

// Function to retrieve all users
exports.getAll = async(queryObject) => {

    let results = database.getAllFromCollection(database_url, users_collection, queryObject)
                    .then((results) => results) // Obtains the result from the Promise object
                    .catch((err) => console.log(err)) // If the result was an error then handle the error
    
    // Calls the results function, waits for response before continuing
    let final_result = await results

    // Return the list of users
    return final_result
}

// Function to update a user
exports.update = async(userID, newUserDetailsObject) => {
    
    let updateUser = database.updateResource(database_url, users_collection, userID, newUserDetailsObject)
                            .then((user) => user)
                            .catch((err) => console.log(err))

    let updateUserResponse = await updateUser

    return updateUserResponse
}

// Function to delete a user
exports.delete = async(userID) => {

    let deleteUser = database.deleteResource(database_url, users_collection, userID)
                            .then((user) => user)
                            .catch((err) => console.log(err))

    let deleteUserResponse = await deleteUser

    return deleteUserResponse
}
