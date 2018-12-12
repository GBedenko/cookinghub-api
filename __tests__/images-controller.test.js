'use strict'

const imagesController = require('../modules/images-controller')

jest.mock('../modules/mongodb-database')

describe('Add images controller functionality', async() => {

	test('Adding a new image sends it to the database', async done => {
                
		const addImageResponse = await imagesController.add({"resource":"test resource"})

		expect(addImageResponse).toBeTruthy()
		
		done()
	})

	test('Adding an empty image returns a failed request to the database', async done => {
                
		const addImageResponse = await imagesController.add({}).then((response) => response)

		expect(addImageResponse).toEqual(Error('Trying to add an empty object'))
		
		done()
	})
})

describe('Get all images controller functionality', () => {

        test('Recieving a get request recieves an array response from the database', async done => {
                
                const response = await imagesController.getAll()
                
                expect(response).toEqual([{"_id": 1234, "resource":"test resource"}])
                
                done()
	})
})

describe('Get one image controller functionality', () => {

	test('Requesting the database for one image recieves correct response from the database', async done => {
                
                const response = await imagesController.getById("1234")

                expect(response).toEqual({"_id": 1234, "resource":"test resource"})
                
                done()
        })
        
	test('Requesting the database for a image that doesnt exist returns a failed request from the database', async done => {
                
                const response = await imagesController.getById("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Update image controller functionality', () => {

	test('Updating a image recieves a success response from the database', async done => {
                
                const response = await imagesController.update("1234", {"image":"test image updated"})

                expect(response).toBeTruthy()
                
                done()
        })
        
	test('Updating a image with an empty new image object recieves a failed response from the database', async done => {
                
                const response = await imagesController.update("1234", {})

                expect(response).toEqual(Error('Trying to update an object with an empty object'))
                
                done()
	})
        
	test('Updating a image that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await imagesController.update("6666", {"image":"test image updated"})

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Delete image controller functionality', () => {

	test('Deleting a image recieves a success response from the database', async done => {
                
                const response = await imagesController.delete("1234")

                expect(response).toBeTruthy()
                
                done()
        })
        
	test('Deleting a image that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await imagesController.delete("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})