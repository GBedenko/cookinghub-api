'use strict'

const recipesController = require('../modules/recipes-controller')

jest.mock('../modules/mongodb-database')

test('Adding a new recipe sends it to the database', async done => {

        expect.assertions(1)

        const response = await recipesController.add({"name":"Test Name"})

        expect(response).toBeTruthy()

        done()
})

test('Recieving a get request recieves an array response from the database', async done => {

        expect.assertions(1)
        
        const response = await recipesController.getAll()
        
        expect(response).toEqual([{"_id": 1234, "name":"Test Name"}])
        
        done()
})

test('Recieving a get request for one recipe recieves one recipe response from the database', async done => {

        expect.assertions(1)
        
        const response = await recipesController.getById("1234")

        expect(response).toEqual({"_id": 1234, "name":"Test Name"})
        
        done()
})

test('Recieving a put request for one recipe recieves a success response from the database', async done => {

        expect.assertions(1)
        
        const response = await recipesController.update("1234", {"name":"Test Name"})

        expect(response).toBeTruthy()
        
        done()
})

test('Recieving a delete request for one recipe recieves a success response from the database', async done => {

        // expect.assertions(1)
        
        const response = await recipesController.delete("1234")

        expect(response).toBeTruthy()
        
        done()
})
        