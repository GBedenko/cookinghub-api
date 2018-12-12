'use strict'

const ratingsController = require('../modules/ratings-controller')

jest.mock('../modules/mongodb-database')

describe('Add ratings controller functionality', async() => {

	test('Adding a new rating sends it to the database', async done => {
                
		const addRatingResponse = await ratingsController.add({"resource":"test resource"})

		expect(addRatingResponse).toBeTruthy()
		
		done()
	})

	test('Adding an empty rating returns a failed request to the database', async done => {
                
		const addRatingResponse = await ratingsController.add({}).then((response) => response)

		expect(addRatingResponse).toEqual(Error('Trying to add an empty object'))
		
		done()
	})
})

describe('Get all ratings controller functionality', () => {

        test('Recieving a get request recieves an array response from the database', async done => {
                
                const response = await ratingsController.getAll()
                
                expect(response).toEqual([{"_id": 1234, "resource":"test resource"}])
                
                done()
	})
})

describe('Get one rating controller functionality', () => {

	test('Requesting the database for one rating recieves correct response from the database', async done => {
                
                const response = await ratingsController.getById("1234")

                expect(response).toEqual({"_id": 1234, "resource":"test resource"})
                
                done()
        })
        
	test('Requesting the database for a rating that doesnt exist returns a failed request from the database', async done => {
                
                const response = await ratingsController.getById("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Update rating controller functionality', () => {

	test('Updating a rating recieves a success response from the database', async done => {
                
                const response = await ratingsController.update("1234", {"rating":"test rating updated"})

                expect(response).toBeTruthy()
                
                done()
        })
        
	test('Updating a rating with an empty new rating object recieves a failed response from the database', async done => {
                
                const response = await ratingsController.update("1234", {})

                expect(response).toEqual(Error('Trying to update an object with an empty object'))
                
                done()
	})
        
	test('Updating a rating that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await ratingsController.update("6666", {"rating":"test rating updated"})

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Delete rating controller functionality', () => {

	test('Deleting a rating recieves a success response from the database', async done => {
                
                const response = await ratingsController.delete("1234")

                expect(response).toBeTruthy()
                
                done()
        })
        
	test('Deleting a rating that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await ratingsController.delete("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})