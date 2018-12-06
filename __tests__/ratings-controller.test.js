'use strict'

const ratingsController = require('../modules/ratings-controller')

jest.mock('../modules/mongodb-database')

test('Adding a new rating sends it to the database', async done => {

        expect.assertions(1)

        const response = await ratingsController.add({"name":"Test Name"})

        expect(response).toBeTruthy()

        done()
})

test('Recieving a get request recieves an array response from the database', async done => {

        expect.assertions(1)
        
        const response = await ratingsController.getAll()
        
        expect(response).toEqual([{"_id": 1234, "name":"Test Name"}])
        
        done()
})

test('Recieving a get request for one rating recieves one rating response from the database', async done => {

        expect.assertions(1)
        
        const response = await ratingsController.getById("1234")

        expect(response).toEqual({"_id": 1234, "name":"Test Name"})
        
        done()
})

test('Recieving a put request for one rating recieves a success response from the database', async done => {

        expect.assertions(1)
        
        const response = await ratingsController.update("1234", {"name":"Test Name"})

        expect(response).toBeTruthy()
        
        done()
})

test('Recieving a delete request for one rating recieves a success response from the database', async done => {

        // expect.assertions(1)
        
        const response = await ratingsController.delete("1234")

        expect(response).toBeTruthy()
        
        done()
})
        