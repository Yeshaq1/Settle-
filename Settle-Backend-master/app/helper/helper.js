const mongoose = require('mongoose');
const userRepo = require('user/repositories/user.repository');
var moment = require('moment');



class Helper {
	constructor() {
		this.helper = [];
	}
	
	//email checking
	async isEmailAvailable(email) {
		let emailAvailable = userModel.findOne({email:email});
		if(emailAvailable){
			return true;
		}
		else{
			return false;
		}
	};
    
	async imageUpload(uPath,uThumbPath,fName,files){
		try{
			for(var i=0;i<files.length;i++){
				if (files[i].field) {
					//code
				}
			}
		}
		catch(e){
			throw(e);
		}
	}
}

module.exports = new Helper();