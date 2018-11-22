const database_url = "mongodb://localhost:27017/yummy_recipes"
const logins_collection = "logins"

const database = require('./database')

// Function to add a new login
exports.add = async(loginObject) => {
    
    let addLogin = database.addResourceToCollection(database_url, logins_collection, loginObject)
                        .then((result) => result)
                        .catch((err) => console.log(err))

    let addLoginResponse = await addLogin

    return addLoginResponse
}

// Function to retrieve one login
exports.getById = async(loginId) => {
    
    let getLogin = database.getResourceFromCollection(database_url, logins_collection, loginId)
                        .then((login) => login)
                        .catch((err) => console.log(err))
    
    let login = await getLogin

    return login
}

// Function to retrieve all logins
exports.getAll = async() => {
    
    let results = database.getAllFromCollection(database_url, logins_collection)
                    .then((results) => results) // Obtains the result from the Promise object
                    .catch((err) => console.log(err)) // If the result was an error then handle the error
    
    // Calls the results function, waits for response before continuing
    let final_result = await results

    // Return the list of logins
    return final_result
}

// Function to update a login
exports.update = async(loginID, newLoginDetailsObject) => {

    let updateLogin = database.updateResource(database_url, logins_collection, loginID, newLoginDetailsObject)
                            .then((login) => login)
                            .catch((err) => console.log(err))

    let updateLoginResponse = await updateLogin

    return updateLoginResponse
}

// Function to delete a login
exports.delete = async(loginID) => {

    let deleteLogin = database.deleteResource(database_url, logins_collection, loginID)
                            .then((login) => login)
                            .catch((err) => console.log(err))

    let deleteLoginResponse = await deleteLogin

    return deleteLoginResponse
}
