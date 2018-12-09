'use strict'

// Import package for mongodb client
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb')

// Name of the MongoDB database used for the application
const databaseName = 'yummy_recipes_db'

// Add one resource to provided collection
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

				// If error performing the insert query, reject the promise with an error object
				if(err)	reject(new Error('Unable to insert resource into MongoDB'))

				// Log to confirm document was successfully inserted
				console.log('Document inserted to mongodb database: ' + databaseName + ', collection: ' + collectionName)

				// Close database connection
				db.close()
				
				// Resolve the promise with true to confirm the insert has successfully completed
				if(result) resolve(true)
			})

		} catch (err) {
			// If error, reject the promise with an error object
			reject(new Error('Unable to connect to MongoDB'))
		}
	})
})

// Retrieve all resources from a given collection
exports.getAllFromCollection = (databaseURL, collectionName, queryObject) => new Promise((resolve, reject) => {

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
			dbo.collection(collectionName).find(queryObject).toArray((err, result) => {

				// If error performing the find query, reject the promise with an error object
				if(err)	reject(new Error('Unable to perform find query in MongoDB'))

				// Log to confirm query was successfully performed
				console.log('Requesting documents from mongodb database')

				// Close database connection
				db.close()

				// Resolve the promise with true to confirm the find query has successfully completed
				if(result) resolve(result)
			})

		} catch (err) {
			// If error, reject the promise with an error object
			reject(new Error('Unable to connect to MongoDB'))
		}
	})
})

// Retrieve a specific resource from a collection
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
				
				// If error performing the find query, reject the promise with an error object
				if(err)	reject(new Error('Unable to perform find query in MongoDB'))

				// Log to confirm query was successfully performed
				console.log('Requesting one document from mongodb database')

				// Close database connection
				db.close()

				// Resolve the promise with true to confirm the find query has successfully completed
				if(result) resolve(result)
			})

		} catch (err) {
			// If error, reject the promise with an error object
			reject(new Error('Unable to connect to MongoDB'))
		}
	})
})

// Update a resource with the provided ID and new values object
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
				
				// If error performing the update query, reject the promise with an error object
				if(err)	reject(new Error('Unable to perform update query in MongoDB'))

				// Log to confirm the resource was successfully updated
				console.log('Resource with id ' + resourceID + ' has been updated')
				
				// Close database connection
				db.close()

				// Resolve the promise with true to confirm the update query has successfully completed
				if(result) resolve(true)
			})

		} catch (err) {
			// If error, reject the promise with an error object
			reject(new Error('Unable to connect to MongoDB'))
		}
	})
})

// Delete a resource by its given ID
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

				// If error performing the delete, reject the promise with an error object
				if(err)	reject(new Error('Unable to perform delete query in MongoDB'))

				// Log to confirm the resource was successfully deleted
				console.log('Resource with id ' + resourceID + ' has been deleted')

				// Close database connection
				db.close()

				console.log(result)
				// Resolve the promise with true to confirm the update query has successfully completed
				if(result) resolve(true)
			})

		} catch (err) {
			// If error, reject the promise with an error object
			reject(new Error('Unable to connect to MongoDB'))
		}
	})
})
