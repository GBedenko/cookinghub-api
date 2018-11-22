'use strict'

const notificationsController = require('../modules/notifications-controller')

jest.mock('../modules/mongodb-database')

test('Adding a new notification sends it to the database', async done => {

        expect.assertions(1)

        const response = await notificationsController.add({"name":"Test Name"})

        expect(response).toBeTruthy()

        done()
})

test('Recieving a get request recieves an array response from the database', async done => {

        expect.assertions(1)
        
        const response = await notificationsController.getAll()
        
        expect(response).toEqual([{"_id": 1234, "name":"Test Name"}])
        
        done()
})

test('Recieving a get request for one notification recieves one notification response from the database', async done => {

        expect.assertions(1)
        
        const response = await notificationsController.getById("1234")

        expect(response).toEqual({"_id": 1234, "name":"Test Name"})
        
        done()
})

test('Recieving a put request for one notification recieves a success response from the database', async done => {

        expect.assertions(1)
        
        const response = await notificationsController.update("1234", {"name":"Test Name"})

        expect(response).toBeTruthy()
        
        done()
})

test('Recieving a delete request for one notification recieves a success response from the database', async done => {

        // expect.assertions(1)
        
        const response = await notificationsController.delete("1234")

        expect(response).toBeTruthy()
        
        done()
})
        