'use strict' 

const database = jest.genMockFromModule('../mongodb-database');

// Mock adding one resource to provided collection
database.addResourceToCollection = (databaseURL, collectionName, newResource) => new Promise((resolve, reject) => {

    resolve(true)
})

// Mock retrieve all resources from a given collection
database.getAllFromCollection = (databaseURL, collectionName) => new Promise((resolve, reject) => {

    resolve([{"_id": 1234 , "name": "Test Name"}])
})

// Mock retrieve a specific resource from a collection
database.getResourceFromCollection = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

    resolve({"_id": 1234, "name": "Test Name"})
})


// Mock update a resource with the provided ID and new values object
database.updateResource = (databaseURL, collectionName, resourceID, newValuesObject) => new Promise((resolve, reject) => {
    
    resolve(true)
})

// Mock delete a resource by its given ID
database.deleteResource = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

    resolve(true)
})

module.exports = database;
