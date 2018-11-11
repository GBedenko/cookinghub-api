// Import package for mongodb client
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb')

const database_name = "yummy_recipes_db"

// Add one resource to provided collection
exports.addResourceToCollection = (database_url, collection_name, new_resource) => new Promise((resolve, reject) => {

    console.log("New resource being added to database: " + database_name + ". collection: " + collection_name)

    // Connect to the mongodb database
    // Once done, runs the callback to execute the query to add a new resource to the given collection
    MongoClient.connect(database_url, (err, db) => {

        if (err) reject(err)

        let dbo = db.db(database_name)

        dbo.collection(collection_name).insertOne(new_resource, (err, res) => {
            if (err) reject(err)
            console.log("Document inserted to mongodb database: " + database_name + ", collection: " + collection_name);
            db.close();
            resolve(true)
        });
      });
})

// Retrieve all resources from a given collection
exports.getAllFromCollection = (database_url, collection_name) => new Promise((resolve, reject) => {

    // Connect to the mongodb database
    // Once done, runs the callback to execute the query to find all resources in the given collection
    MongoClient.connect(database_url, (err, db) => {
        
        // If there's an error from the function call, exit with error message
        if (err) reject(err)

        // Create an instance of the mongodb database
        let dbo = db.db(database_name);

        // Mongodb query to find all resources from the collection and save it to an array called results
        // Once completed, pass the result as the parameter to the callback function
        dbo.collection(collection_name).find({}).toArray((err, result) => {
            if (err) reject(err)
            db.close()
            resolve(result)
        });
    });
})


// Retrieve a specific resource from a collection
exports.getResourceFromCollection = (database_url, collection_name, resource_id) => new Promise((resolve, reject) => {

    MongoClient.connect(database_url, (err, db) => {

        if (err) reject(err)

        let dbo = db.db(database_name);

        dbo.collection(collection_name).findOne({"_id": new mongodb.ObjectId(resource_id)}, (err, result) => {
            if (err) reject(err)
            db.close()
            resolve(result)
        })
    })
})

// Update a resource with the provided ID and new values object
exports.updateResource = (database_url, collection_name, resourceID, new_values_object) => new Promise((resolve, reject) => {

    // Connect to the mongodb database
    // Once done, runs the callback to execute the query to update the resource matching the id
    MongoClient.connect(database_url, (err, db) => {

        if (err) reject(err)
        let dbo = db.db(database_name)

        dbo.collection(collection_name).updateOne({_id: new mongodb.ObjectID(resourceID)}, {$set:new_values_object}, (err, res) => {
            if (err) reject(err)
            console.log("Resource with id " + resourceID + " has been updated")
            db.close()
            resolve(true)
        })
    })
})

// Delete a resource by its given ID
exports.deleteResource = (database_url, collection_name, resourceID) => new Promise((resolve, reject) => {

    // Connect to the mongodb database
    // Once done, runs the callback to execute the query to delete one resource matching the id
    MongoClient.connect(database_url, (err, db) => {

        if (err) reject(err)
        let dbo = db.db(database_name)

        dbo.collection(collection_name).deleteOne({_id: new mongodb.ObjectID(resourceID)}, (err, obj) => {
            if (err) reject(err)
            console.log("Resource with id " + resourceID + " has been deleted")
            db.close()
            resolve(true)
        });
    });
})
