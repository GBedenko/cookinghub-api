const MongoClient = require('mongodb').MongoClient

// const url = "mongodb://localhost:27017/articles_store";

// const articles_collection = "articles"

exports.createDatabase = function(database_url, database_name) {

    // Create table/collection
    MongoClient.connect(database_url, function(err, db) {

        if (err) throw err
        console.log(database_name + " mongodb database has been created at url: " + database_url)
        db.close()

        // Create new database object
        const new_mongo_db = db.db(database_name);

        // Create new mongodb collection called articles
        new_mongo_db.createCollection(articles_collection, function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });
}

exports.createCollection = function(database_url, database_name, collection_name) {

    MongoClient.connect(database_url, function(err, db) {
        if (err) throw err;

        const dbo = db.db(database_name);

        dbo.createCollection(collection_name, function(err, res) {
          if (err) throw err;
          console.log("Collection " + collection_name + " has been created in database: " + database_name);
          db.close();
        });
      });
}

exports.addResourceToCollection = function(database_url, database_name, collection_name, new_resource) {

    console.log("New resource added to database: " + database_name)

    MongoClient.connect(database_url, function(err, db) {

        if (err) throw err;

        let dbo = db.db(database_name);
        
        dbo.collection(collection_name).insertOne(new_resource, function(err, res) {

          if (err) throw err;
          console.log("Document inserted to mongodb collection: " + collection_name);
          db.close();
        });
      });
}

exports.getAllFromCollection = function(database_url, database_name, collection_name) {

    MongoClient.connect(database_url, function(err, db) {

        if (err) throw err;
        let dbo = db.db(database_name);

        dbo.collection(collection_name).find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
    });
}

exports.getArticle = function(database_url, database_name, collection_name, query_object) {

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

exports.updateArticle = function(article) {

}

exports.deleteArticle = function(article) {

}
