'use strict'

/** MongoDB Database Interactions modules
 * @module modules/mongodb-database
 * @requires mongodb
 */

// Import package for mongodb client
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb')

// Name of the MongoDB database used for the application
const databaseName = 'cookinghub_db'

/**
 * Add one resource to MongoDB for the provided database and collection
 * @param {string} databaseURL - Address of MongoDB database you want to use
 * @param {string} collectionName - Collection you want to add the new resource to
 * @param {Object} newResource - Object representing a the resource you want to add
 * @returns {Promise} Promise object representing the result of adding a new resource to the provided database/collection
 */
exports.addResourceToCollection = (databaseURL, collectionName, newResource) => new Promise((resolve, reject) => {

	// Log to confirm a request has been made to add a new resource to the provided database and collection
	console.log('New resource being added to database: ' + databaseName + '. collection: ' + collectionName)

	// Connect to the mongodb database
	// Once done, runs the callback to execute the query to add a new resource to the given collection
	MongoClient.connect(databaseURL, (err, db) => {

		// If error, reject the promise with a new error object
		if(err)	reject(new Error('Unable to connect to MongoDB'))

		try {
			// Create an instance of the mongodb database
			const dbo = db.db(databaseName)

			// MongoDB query to insert one document into the provided collection
			dbo.collection(collectionName).insertOne(newResource, (err, result) => {

				// Log to confirm document was successfully inserted
				console.log('Document inserted to mongodb database: ' + databaseName + ', collection: ' + collectionName)

				// Close database connection
				db.close()

				// Resolve the promise with true to confirm the insert has successfully completed
				resolve(true)
			})

		} catch (err) {
			// If error, reject the promise with an error object
			reject(new Error('Unable to connect to MongoDB'))
		}
	})
})

/**
 * Retrieve all resources from MongoDB for the provided database, collection and query
 * @param {string} databaseURL - Address of MongoDB database you want to use
 * @param {string} collectionName - Collection you want to retrieve resources from
 * @param {Object} [searchObject] - Optional query to specify criteria for which resources to retrieve. Retrieves all if no query object provided
 * @param {Object} [paginationObject] - Optional arguments to sort, limit or offset the returned results
 * @returns {Promise} Promise object representing the result of retrieving resources from the provided database/collection
 */
exports.getAllFromCollection = (databaseURL, collectionName, searchObject, paginationObject, sortObject) => new Promise((resolve, reject) => {

	// Connect to the mongodb database
	// Once done, runs the callback to execute the query to find all resources in the given collection
	MongoClient.connect(databaseURL, (err, db) => {

		// If there's an error from the function call, reject the promise with an error object
		if(err)	reject(new Error('Unable to connect to MongoDB'))

		try {
			// Create an instance of the mongodb database
			const dbo = db.db(databaseName)

			// Mongodb query to find all resources from the collection and save it to an array called result
			// Once completed, pass the result array as the resolve parameter of the promise
			// Uses the searchObject and query parameters if they are provided
			dbo.collection(collectionName).find(searchObject).skip(paginationObject.skip).limit(paginationObject.limit).sort(sortObject).toArray((err, result) => {

				// Log to confirm query was successfully performed
				console.log('Requesting documents from mongodb database')

				// Close database connection
				db.close()

				// Resolve the promise with true to confirm the find query has successfully completed
				resolve(result)
			})

		} catch (err) {
			// If error, reject the promise with an error object
			reject(new Error('Unable to connect to MongoDB'))
		}
	})
})

/**
 * Retrieve one resource from MongoDB for the provided database, collection and resource id
 * @param {string} databaseURL - Address of MongoDB database you want to use
 * @param {string} collectionName - Collection you want to retrieve the resource from
 * @param {Object} resourceID - Specifies the id of the resource to retrieve
 * @returns {Promise} Promise object representing the result of retrieving the resource from the provided database/collection
 */
exports.getResourceFromCollection = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	// Connect to the mongodb database
	// Once done, runs the callback to execute the query to find a resouce using the provided id in the given collection
	MongoClient.connect(databaseURL, (err, db) => {

		// If there's an error from the function call, reject the promise with an error object
		if(err)	reject(new Error('Unable to connect to MongoDB'))

		try {
			// Create an instance of the mongodb database
			const dbo = db.db(databaseName)

			// Mongodb query to find one resource from the collection based on its id and saves the result
			// Once completed, pass the result as the resolve parameter of the promise
			dbo.collection(collectionName).findOne({'_id': new mongodb.ObjectId(resourceID)}, (err, result) => {

				// Log to confirm query was successfully performed
				console.log('Requesting one document from mongodb database')

				// Close database connection
				db.close()

				// Resolve the promise with true to confirm the find query has successfully completed
				resolve(result)
			})

		} catch (err) {
			// If error, reject the promise with an error object
			reject(new Error('Unable to connect to MongoDB'))
		}
	})
})

/**
 * Update one resource from MongoDB for the provided database, collection, resource id and new resource object
 * @param {string} databaseURL - Address of MongoDB database you want to use
 * @param {string} collectionName - Collection you want to update a resource in
 * @param {Object} resourceID - Specifies the id of the resource to update
 * @returns {Promise} Promise object representing the result of updating the resource in the provided database/collection
 */
exports.updateResource = (databaseURL, collectionName, resourceID, newValuesObject) => new Promise((resolve, reject) => {

	// Connect to the mongodb database
	// Once done, runs the callback to execute the query to update the resource matching the id
	MongoClient.connect(databaseURL, (err, db) => {

		// If there's an error from the function call, reject the promise with an error object
		if(err)	reject(new Error('Unable to connect to MongoDB'))

		try {
			// Create an instance of the mongodb database
			const dbo = db.db(databaseName)

			// Mongodb query to update one resource from the collection using the id, collection and new object provided
			// Once completed, resolves the promise as true to confirm the update completed
			dbo.collection(collectionName).updateOne({_id: new mongodb.ObjectID(resourceID)}, {$set: newValuesObject}, (err, result) => {

				// Log to confirm the resource was successfully updated
				console.log('Resource with id ' + resourceID + ' has been updated')

				// Close database connection
				db.close()

				// Resolve the promise with true to confirm the update query has successfully completed
				resolve(true)
			})

		} catch (err) {
			// If error, reject the promise with an error object
			reject(new Error('Unable to connect to MongoDB'))
		}
	})
})

/**
 * Delete one resource from MongoDB for the provided database, collection and resource id
 * @param {string} databaseURL - Address of MongoDB database you want to use
 * @param {string} collectionName - Collection you want to delete a resource in
 * @param {Object} resourceID - Specifies the id of the resource to delete
 * @returns {Promise} Promise object representing the result of deleting the resource in the provided database/collection
 */
exports.deleteResource = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	// Connect to the mongodb database
	// Once done, runs the callback to execute the query to delete one resource matching the id
	MongoClient.connect(databaseURL, (err, db) => {

		// If there's an error from the function call, reject the promise with an error object
		if(err)	reject(new Error('Unable to connect to MongoDB'))

		try {
			// Create an instance of the mongodb database
			const dbo = db.db(databaseName)

			// Mongodb query to delete one resource from the collection using the id
			// Once completed, resolves the promise as true to confirm deleting the resource was completed
			dbo.collection(collectionName).deleteOne({_id: new mongodb.ObjectID(resourceID)}, (err, result) => {

				// Log to confirm the resource was successfully deleted
				console.log('Resource with id ' + resourceID + ' has been deleted')

				// Close database connection
				db.close()

				// Resolve the promise with true to confirm the update query has successfully completed
				resolve(true)
			})

		} catch (err) {
			// If error, reject the promise with an error object
			reject(new Error('Unable to connect to MongoDB'))
		}
	})
})
