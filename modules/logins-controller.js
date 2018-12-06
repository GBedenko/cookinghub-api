const database_url = "mongodb://localhost:27017/yummy_recipes"
const logins_collection = "logins"

const database = require('./mongodb-database')

// Function to add a new login
exports.add = async(loginObject) => {
    
    let addLogin = database.addResourceToCollection(database_url, logins_collection, loginObject)
                        .then((result) => result)

    let addLoginResponse = await addLogin

    return addLoginResponse
}

// Function to retrieve one login
exports.getById = async(loginId) => {
    
    let getLogin = database.getResourceFromCollection(database_url, logins_collection, loginId)
                        .then((login) => login)
    
    let login = await getLogin

    return login
}

// Function to retrieve all logins
exports.getAll = async(query) => {
    
    let results = database.getAllFromCollection(database_url, logins_collection, query)
                    .then((results) => results) // Obtains the result from the Promise object
    
    // Calls the results function, waits for response before continuing
    let final_result = await results

    // Return the list of logins
    return final_result
}

// Function to update a login
exports.update = async(loginID, newLoginDetailsObject) => {

    let updateLogin = database.updateResource(database_url, logins_collection, loginID, newLoginDetailsObject)
                            .then((login) => login)

    let updateLoginResponse = await updateLogin

    return updateLoginResponse
}

// Function to delete a login
exports.delete = async(loginID) => {

    let deleteLogin = database.deleteResource(database_url, logins_collection, loginID)
                            .then((login) => login)

    let deleteLoginResponse = await deleteLogin

    return deleteLoginResponse
}
