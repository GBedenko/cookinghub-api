'use strict'

const usersController = require('../modules/users-controller')

jest.mock('../modules/mongodb-database')

test('Adding a new user sends it to the database', async done => {

        expect.assertions(1)

        const response = await usersController.add({"name":"Test Name"})

        expect(response).toBeTruthy()

        done()
})

test('Recieving a get request recieves an array response from the database', async done => {

        expect.assertions(1)
        
        const response = await usersController.getAll()
        
        expect(response).toEqual([{"_id": 1234, "name":"Test Name"}])
        
        done()
})

test('Recieving a get request for one user recieves one user response from the database', async done => {

        expect.assertions(1)
        
        const response = await usersController.getById("1234")

        expect(response).toEqual({"_id": 1234, "name":"Test Name"})
        
        done()
})

test('Recieving a put request for one user recieves a success response from the database', async done => {

        expect.assertions(1)
        
        const response = await usersController.update("1234", {"name":"Test Name"})

        expect(response).toBeTruthy()
        
        done()
})

test('Recieving a delete request for one user recieves a success response from the database', async done => {

        // expect.assertions(1)
        
        const response = await usersController.delete("1234")

        expect(response).toBeTruthy()
        
        done()
})
        