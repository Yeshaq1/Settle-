const dishes_ratingRepo = require('dishes_rating/repositories/dishes_rating.repository');
const mongoose = require("mongoose");
const userWebAppRepo = require("userWebApp/repositories/userWebApp.repository");
class CmsController {
	constructor() {
	}
	/* @Method: list
	// @Description: CMS list
	*/
	async save(req, res) {
		try {

			req.body.user_id = mongoose.Types.ObjectId(req.user._id);
			let userData = await userWebAppRepo.getByFieldWithRole({ "isDeleted": false, "_id": req.body.user_id });

			if (userData && userData.role.role == "user") {
				const dishes_rating = await dishes_ratingRepo.save(req.body);
				if (dishes_rating) {
					res.status(200).send({ data: dishes_rating, message: 'Feedback submited Successfully' });
				}
				else {
					res.status(201).send({ data: {}, message: 'Something went wrong!' });
				}
			}
			else {
				res.status(201).send({ data: {}, message: 'User not found!' });
			}
		}
		catch (error) {
			res.status(500).send({ message: error.message });
		}
	}

}
module.exports = new CmsController();