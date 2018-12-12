'use strict'

const database = jest.genMockFromModule('../mongodb-database')

// Mock adding one resource to provided collection
database.addResourceToCollection = (databaseURL, collectionName, newResource) => new Promise((resolve, reject) => {

	if(databaseURL == 'mongodb://localhost:27017/yummy_recipes' && collectionName != undefined) {

		if(Object.keys(newResource).length == 0) {
			reject(new Error('Trying to add an empty object'))
		} else {
			resolve(true)
		}
	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock retrieve all resources from a given collection
database.getAllFromCollection = (databaseURL, collectionName) => new Promise((resolve, reject) => {

	if(databaseURL == 'mongodb://localhost:27017/yummy_recipes' && collectionName != undefined) {
		resolve([{'_id': 1234 , 'resource': 'test resource'}])
	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock retrieve a specific resource from a collection
database.getResourceFromCollection = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	const mockedInvalidID = 6666

	if(databaseURL == 'mongodb://localhost:27017/yummy_recipes' && collectionName != undefined) {

		if(resourceID == mockedInvalidID) {
			reject(new Error('Trying to request an object that doesnt exist'))
		} else {
			resolve({'_id': 1234, 'resource': 'test resource'})
		}

	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock update a resource with the provided ID and new values object
database.updateResource = (databaseURL, collectionName, resourceID, newValuesObject) => new Promise((resolve, reject) => {

	const mockedInvalidID = 6666

	if(databaseURL == 'mongodb://localhost:27017/yummy_recipes' && collectionName != undefined) {

		if(Object.keys(newValuesObject).length == 0) {
			reject(new Error('Trying to update an object with an empty object'))

		} else if(resourceID == mockedInvalidID) {
			reject(new Error('Trying to request an object that doesnt exist'))

		} else {
			resolve(true)
		}

	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock delete a resource by its given ID
database.deleteResource = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	const mockedInvalidID = 6666

	if(databaseURL == 'mongodb://localhost:27017/yummy_recipes' && collectionName != undefined) {

		if(resourceID == mockedInvalidID) {
			reject(new Error('Trying to request an object that doesnt exist'))
		} else {
			resolve(true)
		}

	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

module.exports = database
