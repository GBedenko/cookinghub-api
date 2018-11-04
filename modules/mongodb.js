// Import package for mongodb client
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb')

const database_name = "yummy_recipes_db"

// Function for creating the initial database
// Requires the url and name for the new database
exports.createDatabase = function(database_url, database_name) {

    // Connecting to the url creates the database if it doesn't exist
    // If this is run after creation it will not overwrite the existing mongodb database
    MongoClient.connect(database_url, function(err, db) {

        if (err) throw err
        console.log(database_name + " mongodb database has been created at url: " + database_url)
        db.close()
    });
}

exports.createCollection = function(database_url, database_name, collection_name) {

    MongoClient.connect(database_url, function(err, db) {
        if (err) throw err;

        const new_mongo_db = db.db(database_name);

        new_mongo_db.createCollection(collection_name, function(err, res) {
          if (err) throw err;
          console.log("Collection " + collection_name + " has been created in database: " + database_name);
          db.close();
        });
      });
}

exports.addResourceToCollection = function(database_url, collection_name, new_resource) {

    console.log("New resource being added to database: " + database_name + ". collection: " + collection_name)

    // Connect to the mongodb database
    // Once done, runs the callback to execute the query to add a new resource to the given collection
    MongoClient.connect(database_url, function(err, db) {

        if (err) throw err;

        let dbo = db.db(database_name);
        
        dbo.collection(collection_name).insertOne(new_resource, function(err, res) {

          if (err) throw err;
          console.log("Document inserted to mongodb database: " + database_name + ", collection: " + collection_name);
          db.close();
        });
      });
}

exports.getAllFromCollection = function(database_url, collection_name, callback) {

    // Connect to the mongodb database
    // Once done, runs the callback to execute the query to find all resources in the given collection
    MongoClient.connect(database_url, function(err, db) {

        // If there's an error from the function call, exit with error message
        if (err) throw err;

        // Create an instance of the mongodb database
        let dbo = db.db(database_name);

        // Mongodb query to find all resources from the collection and save it to an array called results
        // Once completed, pass the result as the parameter to the callback function
        dbo.collection(collection_name).find({}).toArray(function(err, result) {
          if (err) throw err;
          db.close();
          return callback(result); 
        });
    });
}

exports.getResourceFromCollection = function(database_url, collection_name, query_object) {

    MongoClient.connect(database_url, function(err, db) {

        if (err) throw err;
        let dbo = db.db(database_name);
        
        dbo.collection(collection_name).find(query_object).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
});

}

exports.updateResource = function(database_url, collection_name, query_object, new_values_object) {

    MongoClient.connect(database_url, function(err, db) {

        if (err) throw err
        let dbo = db.db(database_name)

        dbo.collection(collection_name).updateOne(query_object, new_values_object, function(err, res) {
          if (err) throw err;
          console.log("Resource updated");
          db.close();
        });
    });

}

exports.deleteResourceById = function(database_url, collection_name, query_object) {

    // Connect to the mongodb database
    // Once done, runs the callback to execute the query to delete one resource matching the id
    MongoClient.connect(database_url, function(err, db) {

        if (err) throw err;
        let dbo = db.db(database_name);

        dbo.collection(collection_name).deleteOne({_id: new mongodb.ObjectID(query_object._id)}, function(err, obj) {
          if (err) throw err;
          console.log("Resource with id " + query_object._id + " has been deleted");
          db.close();
        });
      });
}

exports.deleteResourceByQuery = function(database_url, collection_name, query_object) {

    // Connect to the mongodb database
    // Once done, runs the callback to execute the query to delete one resource matching the query
    MongoClient.connect(database_url, function(err, db) {

        if (err) throw err;
        let dbo = db.db(database_name);

        dbo.collection(collection_name).deleteOne(query_object, function(err, obj) {
          if (err) throw err;
          console.log("Resource with query " + query_object + " has been deleted");
          db.close();
        });
      });
}
