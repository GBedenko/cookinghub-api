'use strict'

const bcrypt = require('bcrypt')

const loginsController = require('./logins-controller');

exports.loginUser = (request, callback) => {
	
	//first check if basic authorization is present
	if (request.authorization === undefined || request.authorization.basic === undefined){
		//throw new Error('authorization header missing')
		let err = {message:'authorization header missing'};
		console.log("-->" + err.message);
		callback(err);
		return;
	}
		
	const auth = request.authorization.basic

	//extract username and password from the auth
	if (auth.username === undefined || auth.password === undefined){
		//throw new Error('missing username and/or password')
		let err = {message:'missing username and/or password'};
		console.log("-->" + err.message);
		callback(err);
		return;
	}
    
    const user = loginsController.getAll({username:auth.username, passwordHash: auth.password})

    if(user === undefined) {
        callback(null, {login: false})
    } else {
        callback(null, {login: true})
    }
}

exports.doPasswordsMatch = () => {
    
}