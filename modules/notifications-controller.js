'use strict'

const databaseURL = 'mongodb://localhost:27017/yummy_recipes'
const notificationsCollection = 'notifications'

const database = require('./mongodb-database')

/**
 * Requests and validates a request to add a new notification
 * @param {Object} notificationObject - Object representing a new notification you want to add
 * @returns {Object} Result of request if it was successful or not
 */
// Function to add a new notification
exports.add = async(notificationObject) => {

	const addNotification = database.addResourceToCollection(databaseURL, notificationsCollection, notificationObject)
		.then((result) => result)
		.catch((reason) => reason)

	const addNotificationResponse = await addNotification

	return addNotificationResponse
}

/**
 * Requests and validates a request to retrieve one notification by its id
 * @param {number} notificationId - ID of the notification you want to retrieve
 * @returns {Object} Notification object retrieved from the request
 */
exports.getById = async(notificationId) => {

	const getNotification = database.getResourceFromCollection(databaseURL, notificationsCollection, notificationId)
		.then((notification) => notification)
		.catch((reason) => reason)

	const notification = await getNotification

	return notification
}

/**
 * Requests and validates a request to retrieve all notifications or all notifications matching an optional query
 * @param {Object} [paginationObject] - Optional query object for which notifications you want to request
 * @returns {Array} Array of notification objects retrieved from the request
 */
exports.getAll = async(searchObject) => {

	// Set defaults for pagination and sort queries (not yet available to be customised for requesting notifications)
	const paginationObject = {limit: 0, skip: 0}
	const sortObject = {}

	// Call database to retrieve all resources from the collection
	const results = database.getAllFromCollection(databaseURL, notificationsCollection, searchObject, paginationObject, sortObject)
		.then((results) => results) // Obtains the result from the Promise object

	// Calls the results function, waits for response before continuing
	const finalResult = await results

	// Return the list of notifications
	return finalResult
}

/**
 * Requests and validates a request to update a notification with a new notification object
 * @param {number} notificationID - ID of the notification you want to update
 * @param {Object} newNotificationDetailsObject - Notification object you want to replace the existing notification with
 * @returns {Object} Result of request if it was successful or not
 */
exports.update = async(notificationID, newNotificationDetailsObject) => {

	const updateNotification = database.updateResource(databaseURL, notificationsCollection, notificationID, newNotificationDetailsObject)
		.then((notification) => notification)
		.catch((reason) => reason)

	const updateNotificationResponse = await updateNotification

	return updateNotificationResponse
}

/**
 * Requests and validates a request to delete a notification
 * @param {number} notificationID - ID of the notification you want to delete
 * @returns {Object} Result of request if it was successful or not
 */
exports.delete = async(notificationID) => {

	const deleteNotification = database.deleteResource(databaseURL, notificationsCollection, notificationID)
		.then((notification) => notification)
		.catch((reason) => reason)

	const deleteNotificationResponse = await deleteNotification

	return deleteNotificationResponse
}
