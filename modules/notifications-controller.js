const database_url = "mongodb://localhost:27017/yummy_recipes"
const notifications_collection = "notifications"

const database = require('./mongodb-database')

// Function to add a new notification
exports.add = async(notificationObject) => {
    
    let addNotification = database.addResourceToCollection(database_url, notifications_collection, notificationObject)
                        .then((result) => result)

    let addNotificationResponse = await addNotification

    return addNotificationResponse
}

// Function to retrieve one notification
exports.getById = async(notificationId) => {
    
    let getNotification = database.getResourceFromCollection(database_url, notifications_collection, notificationId)
                        .then((notification) => notification)
    
    let notification = await getNotification

    return notification
}

// Function to retrieve all notifications
exports.getAll = async() => {
    
    let results = database.getAllFromCollection(database_url, notifications_collection)
                    .then((results) => results) // Obtains the result from the Promise object
    
    // Calls the results function, waits for response before continuing
    let final_result = await results

    // Return the list of notifications
    return final_result
}

// Function to update a notification
exports.update = async(notificationID, newNotificationDetailsObject) => {

    let updateNotification = database.updateResource(database_url, notifications_collection, notificationID, newNotificationDetailsObject)
                            .then((notification) => notification)

    let updateNotificationResponse = await updateNotification

    return updateNotificationResponse
}

// Function to delete a notification
exports.delete = async(notificationID) => {

    let deleteNotification = database.deleteResource(database_url, notifications_collection, notificationID)
                            .then((notification) => notification)

    let deleteNotificationResponse = await deleteNotification

    return deleteNotificationResponse
}
