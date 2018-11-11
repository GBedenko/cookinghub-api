const database_url = "mongodb://localhost:27017/yummy_recipes"
const images_collection = "images"

const database = require('./mongodb')

// Function to add a new image
exports.add = async(imageObject) => {
    
    let addImage = database.addResourceToCollection(database_url, images_collection, imageObject)
                        .then((result) => result)
                        .catch((err) => console.log(err))

    let addImageResponse = await addImage

    return addImageResponse
}

// Function to retrieve one image
exports.getById = async(imageId) => {
    
    let getImage = database.getResourceFromCollection(database_url, images_collection, imageId)
                        .then((image) => image)
                        .catch((err) => console.log(err))
    
    let image = await getImage

    return image
}

// Function to retrieve all images
exports.getAll = async() => {
    
    let results = database.getAllFromCollection(database_url, images_collection)
                    .then((results) => results) // Obtains the result from the Promise object
                    .catch((err) => console.log(err)) // If the result was an error then handle the error
    
    // Calls the results function, waits for response before continuing
    let final_result = await results

    // Return the list of images
    return final_result
}

// Function to update a image
exports.update = async(imageID, newImageDetailsObject) => {

    let updateImage = database.updateResource(database_url, images_collection, imageID, newImageDetailsObject)
                            .then((image) => image)
                            .catch((err) => console.log(err))

    let updateImageResponse = await updateImage

    return updateImageResponse
}

// Function to delete a image
exports.delete = async(imageID) => {

    let deleteImage = database.deleteResource(database_url, images_collection, imageID)
                            .then((image) => image)
                            .catch((err) => console.log(err))

    let deleteImageResponse = await deleteImage

    return deleteImageResponse
}
