'use strict'

const notificationsController = require('../modules/notifications-controller')

jest.mock('../modules/mongodb-database')

describe('Add notifications controller functionality', async() => {

	test('Adding a new notification sends it to the database', async done => {
                
		const addNotificationResponse = await notificationsController.add({"resource":"test resource"})

		expect(addNotificationResponse).toBeTruthy()
		
		done()
	})

	test('Adding an empty notification returns a failed request to the database', async done => {
                
		const addNotificationResponse = await notificationsController.add({}).then((response) => response)

		expect(addNotificationResponse).toEqual(Error('Trying to add an empty object'))
		
		done()
	})
})

describe('Get all notifications controller functionality', () => {

        test('Recieving a get request recieves an array response from the database', async done => {
                
                const response = await notificationsController.getAll()
                
                expect(response).toEqual([{"_id": 1234, "resource":"test resource"}])
                
                done()
	})
})

describe('Get one notification controller functionality', () => {

	test('Requesting the database for one notification recieves correct response from the database', async done => {
                
                const response = await notificationsController.getById("1234")

                expect(response).toEqual({"_id": 1234, "resource":"test resource"})
                
                done()
        })
        
	test('Requesting the database for a notification that doesnt exist returns a failed request from the database', async done => {
                
                const response = await notificationsController.getById("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Update notification controller functionality', () => {

	test('Updating a notification recieves a success response from the database', async done => {
                
                const response = await notificationsController.update("1234", {"notification":"test notification updated"})

                expect(response).toBeTruthy()
                
                done()
        })
        
	test('Updating a notification with an empty new notification object recieves a failed response from the database', async done => {
                
                const response = await notificationsController.update("1234", {})

                expect(response).toEqual(Error('Trying to update an object with an empty object'))
                
                done()
	})
        
	test('Updating a notification that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await notificationsController.update("6666", {"notification":"test notification updated"})

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Delete notification controller functionality', () => {

	test('Deleting a notification recieves a success response from the database', async done => {
                
                const response = await notificationsController.delete("1234")

                expect(response).toBeTruthy()
                
                done()
        })
        
	test('Deleting a notification that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await notificationsController.delete("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})