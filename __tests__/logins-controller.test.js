'use strict'

const loginsController = require('../modules/logins-controller')

jest.mock('../modules/mongodb-database')

test('Adding a new login sends it to the database', async done => {

	expect.assertions(1)

	const response = await loginsController.add({'name': 'Test Name'})

	expect(response).toBeTruthy()

	done()
})

test('Recieving a get request recieves an array response from the database', async done => {

	expect.assertions(1)

	const response = await loginsController.getAll()

	expect(response).toEqual([{'_id': 1234, 'name': 'Test Name'}])

	done()
})

test('Recieving a get request for one login recieves one login response from the database', async done => {

	expect.assertions(1)

	const response = await loginsController.getById('1234')

	expect(response).toEqual({'_id': 1234, 'name': 'Test Name'})

	done()
})

test('Recieving a put request for one login recieves a success response from the database', async done => {

	expect.assertions(1)

	const response = await loginsController.update('1234', {'name': 'Test Name'})

	expect(response).toBeTruthy()

	done()
})

test('Recieving a delete request for one login recieves a success response from the database', async done => {

	// expect.assertions(1)

	const response = await loginsController.delete('1234')

	expect(response).toBeTruthy()

	done()
})
