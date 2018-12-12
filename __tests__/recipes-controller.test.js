'use strict'

const recipesController = require('../modules/recipes-controller')

jest.mock('../modules/mongodb-database')

describe('Add recipes controller functionality', async() => {

	test('Adding a new recipe sends it to the database', async done => {
                
		const addRecipeResponse = await recipesController.add({"resource":"test resource"})

		expect(addRecipeResponse).toBeTruthy()
		
		done()
	})
})

describe('Get all recipes controller functionality', () => {

	test('Recieving a get request recieves an array response from the database', async done => {
			
		const response = await recipesController.getAll({})
		
		expect(response).toEqual([{"_id": 1234, "resource":"test resource"}])
		
		done()
	})

	test('Get request passing pagination and search query recieves an array response from the database', async done => {
			
		const response = await recipesController.getAll({limit: 1, skip: 1, query: "test"})
		
		expect(response).toEqual([{"_id": 1234, "resource":"test resource"}])
		
		done()
	})

	test('Get request passing a sort query recieves an array response from the database', async done => {
			
		const response = await recipesController.getAll({likes: 1})
		
		expect(response).toEqual([{"_id": 1234, "resource":"test resource"}])
		
		done()
	})
})

describe('Get one recipe controller functionality', () => {

	test('Requesting the database for one recipe recieves correct response from the database', async done => {
                
		const response = await recipesController.getById("1234")

		expect(response).toEqual({"_id": 1234, "resource":"test resource"})
		
		done()
	})
        
	test('Requesting the database for a recipe that doesnt exist returns a failed request from the database', async done => {
                
		const response = await recipesController.getById("6666")

		expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
		
		done()
	})
})

describe('Update recipe controller functionality', () => {

	test('Updating a recipe recieves a success response from the database', async done => {
                
		const response = await recipesController.update("1234", {"recipe":"test recipe updated"})

		expect(response).toBeTruthy()
		
		done()
	})
        
	test('Updating a recipe with an empty new recipe object recieves a failed response from the database', async done => {
                
		const response = await recipesController.update("1234", {})

		expect(response).toEqual(Error('Trying to update an object with an empty object'))
		
		done()
	})
        
	test('Updating a recipe that doesnt exist recieves a failed response from the database', async done => {
                
		const response = await recipesController.update("6666", {"recipe":"test recipe updated"})

		expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
		
		done()
	})
})

describe('Delete recipe controller functionality', () => {

	test('Deleting a recipe recieves a success response from the database', async done => {
                
		const response = await recipesController.delete("1234")

		expect(response).toBeTruthy()
		
		done()
	})
        
	test('Deleting a recipe that doesnt exist recieves a failed response from the database', async done => {
                
		const response = await recipesController.delete("6666")

		expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
		
		done()
	})
})