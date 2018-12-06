'use strict'

const databaseURL = 'mongodb://localhost:27017/yummy_recipes'
const notificationsCollection = 'notifications'

const database = require('./mongodb')

// Function to add a new notification
exports.add = async(notificationObject) => {

	const addNotification = database.addResourceToCollection(databaseURL, notificationsCollection, notificationObject)
		.then((result) => result)
		.catch((err) => console.log(err))

	const addNotificationResponse = await addNotification

	return addNotificationResponse
}

// Function to retrieve one notification
exports.getById = async(notificationId) => {

	const getNotification = database.getResourceFromCollection(databaseURL, notificationsCollection, notificationId)
		.then((notification) => notification)
		.catch((err) => console.log(err))

	const notification = await getNotification

	return notification
}

// Function to retrieve all notifications
exports.getAll = async() => {

	const results = database.getAllFromCollection(databaseURL, notificationsCollection)
		.then((results) => results) // Obtains the result from the Promise object
		.catch((err) => console.log(err)) // If the result was an error then handle the error

	// Calls the results function, waits for response before continuing
	const finalResult = await results

	// Return the list of notifications
	return finalResult
}

// Function to update a notification
exports.update = async(notificationID, newNotificationDetailsObject) => {

	const updateNotification = database.updateResource(databaseURL, notificationsCollection, notificationID, newNotificationDetailsObject)
		.then((notification) => notification)
		.catch((err) => console.log(err))

	const updateNotificationResponse = await updateNotification

	return updateNotificationResponse
}

// Function to delete a notification
exports.delete = async(notificationID) => {

	const deleteNotification = database.deleteResource(databaseURL, notificationsCollection, notificationID)
		.then((notification) => notification)
		.catch((err) => console.log(err))

	const deleteNotificationResponse = await deleteNotification

	return deleteNotificationResponse
}
