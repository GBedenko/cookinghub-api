'use strict'

const imagesController = require('../modules/images-controller')

jest.mock('../modules/mongodb-database')

test('Adding a new image sends it to the database', async done => {

        expect.assertions(1)

        const response = await imagesController.add({"name":"Test Name"})

        expect(response).toBeTruthy()

        done()
})

test('Recieving a get request recieves an array response from the database', async done => {

        expect.assertions(1)
        
        const response = await imagesController.getAll()
        
        expect(response).toEqual([{"_id": 1234, "name":"Test Name"}])
        
        done()
})

test('Recieving a get request for one image recieves one image response from the database', async done => {

        expect.assertions(1)
        
        const response = await imagesController.getById("1234")

        expect(response).toEqual({"_id": 1234, "name":"Test Name"})
        
        done()
})

test('Recieving a put request for one image recieves a success response from the database', async done => {

        expect.assertions(1)
        
        const response = await imagesController.update("1234", {"name":"Test Name"})

        expect(response).toBeTruthy()
        
        done()
})

test('Recieving a delete request for one image recieves a success response from the database', async done => {

        // expect.assertions(1)
        
        const response = await imagesController.delete("1234")

        expect(response).toBeTruthy()
        
        done()
})
        