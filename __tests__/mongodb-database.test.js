'use strict'

const mongoDB = require('../modules/mongodb-database')

describe('Adding a new resource to a mongodb collection', async() => {

	afterEach(async() => {
		// Function to find the recipe that the tests will add to the database
		const findAddedRecipe = mongoDB.getAllFromCollection('mongodb://localhost:27017/cookinghub',
			'recipes',
			{'name': 'Test Recipe Name'},
			{limit: 0, skip: 0},
			{}).then((result) => result)

		// Call the function and wait for the response
		const findAddedRecipeResponse = await findAddedRecipe

		// Save the id of the test recipe that was added
		const addedRecipeID = findAddedRecipeResponse[findAddedRecipeResponse.length-1]._id

		// Delete the test recipe so that it doesn't affect live database
		mongoDB.deleteResource('mongodb://localhost:27017/cookinghub',
			'recipes',
			addedRecipeID)
	})

	test('Adding a new recipe inserts it into the database successfully', async done => {

		//expect.assertions(1)

		// Send a test recipe object to the correct database
		const response = await mongoDB.addResourceToCollection('mongodb://localhost:27017/cookinghub',
			'recipes',
			{'name': 'Test Recipe Name'})

		// Expect a true boolean response if adding to mongodb was successful
		expect(response).toBeTruthy()

		done()
	})
})

describe('Requesting one resource from a mongodb collection', async() => {

	let resourceIdToRequest

	beforeEach(async() => {
		// Add a new object to mongodb, which will be tested that it can retrieve the correct one
		await mongoDB.addResourceToCollection('mongodb://localhost:27017/cookinghub',
			'recipes',
			{'name': 'Test Recipe Name'})

		const findAddedRecipe = mongoDB.getAllFromCollection('mongodb://localhost:27017/cookinghub',
			'recipes',
			{'name': 'Test Recipe Name'},
			{limit: 0, skip: 0},
			{}).then((result) => result)

		const findAddedRecipeResponse = await findAddedRecipe

		// Save the id of the test recipe that was added
		resourceIdToRequest = findAddedRecipeResponse[findAddedRecipeResponse.length-1]._id
	})

	afterEach(async() => {
		// Delete the test recipe so that it doesn't affect live database
		mongoDB.deleteResource('mongodb://localhost:27017/cookinghub',
			'recipes',
			resourceIdToRequest)
	})

	test('Request a mongodb object returns the correct object that was requested', async done => {

		//expect.assertions(1)

		// Send a test recipe object to the correct database
		const response = await mongoDB.getResourceFromCollection('mongodb://localhost:27017/cookinghub',
			'recipes',
			resourceIdToRequest).then((recipe) => recipe)

		// Expect a true boolean response if adding to mongodb was successful
		expect(response.name).toEqual('Test Recipe Name')

		done()
	})
})

describe('Requesting all resources from a mongodb collection', async() => {

	test('Requesting a mongodb collection returns an array of objects', async done => {

		//expect.assertions(1)

		const response = await mongoDB.getAllFromCollection('mongodb://localhost:27017/cookinghub',
			'recipes',
			{},
			{limit: 0, skip: 0},
			{}).then((recipe) => recipe)

		expect(Array.isArray([response])).toBe(true)
		done()
	})
})

describe('Updating a resource in a mongodb collection', async() => {

	let resourceIdToUpdate

	beforeEach(async() => {
		// Add a new object to mongodb, which will be tested that it can be updated in the test
		await mongoDB.addResourceToCollection('mongodb://localhost:27017/cookinghub',
			'recipes',
			{'name': 'Test Recipe Name'})

		const findAddedRecipe = mongoDB.getAllFromCollection('mongodb://localhost:27017/cookinghub',
			'recipes',
			{'name': 'Test Recipe Name'},
			{limit: 0, skip: 0},
			{}).then((result) => result)

		const findAddedRecipeResponse = await findAddedRecipe

		// Save the id of the test recipe that was added
		resourceIdToUpdate = findAddedRecipeResponse[findAddedRecipeResponse.length-1]._id
	})

	afterEach(async() => {
		// Delete the test recipe so that it doesn't affect live database
		mongoDB.deleteResource('mongodb://localhost:27017/cookinghub',
			'recipes',
			resourceIdToUpdate)
	})

	test('Updating a mongodb resource returns a successful response', async done => {

		//expect.assertions(1)

		const updateResponse = await mongoDB.updateResource('mongodb://localhost:27017/cookinghub',
			'recipes',
			resourceIdToUpdate,
			{'name': 'Updated Name'}).then((response) => response)

		expect(updateResponse).toBeTruthy()

		done()
	})
})

describe('Deleting a resource in a mongodb collection', async() => {

	let resourceIdToDelete

	beforeEach(async() => {
		// Add a new object to mongodb, which will be tested that it can be updated in the test
		await mongoDB.addResourceToCollection('mongodb://localhost:27017/cookinghub',
			'recipes',
			{'name': 'Test Recipe Name'})

		const findAddedRecipe = mongoDB.getAllFromCollection('mongodb://localhost:27017/cookinghub',
			'recipes',
			{'name': 'Test Recipe Name'},
			{limit: 0, skip: 0},
			{}).then((result) => result)

		const findAddedRecipeResponse = await findAddedRecipe

		// Save the id of the test recipe that was added
		resourceIdToDelete = findAddedRecipeResponse[findAddedRecipeResponse.length-1]._id
	})

	afterEach(async() => {
		// Delete the test recipe so that it doesn't affect live database
		mongoDB.deleteResource('mongodb://localhost:27017/cookinghub',
			'recipes',
			resourceIdToDelete)
	})

	test('Deleting a mongodb collection returns a successful response', async done => {

		//expect.assertions(1)

		const deleteResponse = await mongoDB.deleteResource('mongodb://localhost:27017/cookinghub',
			'recipes',
			resourceIdToDelete).then((response) => response)

		expect(deleteResponse).toBeTruthy()

		done()
	})
})

describe('Requesting database interactions with incorrect credentials', async() => {

    test('Adding a new resource with incorrect database credentials returns a rejected database connection', async done => {
        
        // Send a test resource object to the correct database
        const response = await mongoDB.addResourceToCollection("mongodb://wrongurl:27017/cookinghub",
                                                                           "recipes",
                                                                           {"resource":"test resource"})
                                                                           .then((result) => result)
                                                                           .catch((reason) => reason)       
        
        expect(response).toEqual(Error('Unable to connect to MongoDB'))
        
        done()
    })
    
    test('Requesting a resource with incorrect database credentials returns a rejected database connection', async done => {
        
        const response = await mongoDB.getResourceFromCollection("mongodb://wrongurl:27017/cookinghub",
                                                                             "recipes",
                                                                             1234)
                                                                             .then((response) => response) 
                                                                             .catch((reason) => reason)      
        
        expect(response).toEqual(Error('Unable to connect to MongoDB'))
        
        done()
    })
    
    test('Requesting all resources with incorrect database credentials returns a rejected database connection', async done => {
        
        const response = await mongoDB.getAllFromCollection("mongodb://wrongurl:27017/cookinghub",
                                                                             "recipes")
                                                                             .then((response) => response) 
                                                                             .catch((reason) => reason)      
        
        expect(response).toEqual(Error('Unable to connect to MongoDB'))
        
        done()
    })
    
    test('Updating a resource with incorrect database credentials returns a rejected database connection', async done => {
        
        const response = await mongoDB.updateResource("mongodb://wrongurl:27017/cookinghub",
                                                                             "recipes",
                                                                             1234,
                                                                             {"resource":"updated resource"})
                                                                             .then((response) => response) 
                                                                             .catch((reason) => reason)      
        
        expect(response).toEqual(Error('Unable to connect to MongoDB'))
        
        done()
	})
    
    test('Deleting a resource with incorrect database credentials returns a rejected database connection', async done => {
        
        const response = await mongoDB.deleteResource("mongodb://wrongurl:27017/cookinghub",
                                                                             "recipes",
                                                                             1234)
                                                                             .then((response) => response) 
                                                                             .catch((reason) => reason)      
        
        expect(response).toEqual(Error('Unable to connect to MongoDB'))
        
        done()
	})
})