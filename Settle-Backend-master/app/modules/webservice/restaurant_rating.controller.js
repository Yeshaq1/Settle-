const restaurant_ratingRepo = require('restaurant_rating/repositories/restaurant_rating.repository');
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
				var rateing = await restaurant_ratingRepo.getByField({ user_id: mongoose.Types.ObjectId(req.body.user_id), restaurant_id: mongoose.Types.ObjectId(req.body.restaurant_id), isDeleted: false })
				if (_.isEmpty(rateing)) {
					req.body.avg_rating = Math.floor((req.body.service + req.body.ambiance + req.body.food) / 3);

					const restaurant_rating = await restaurant_ratingRepo.save(req.body);
					if (restaurant_rating) {
						res.status(200).send({ data: restaurant_rating, message: 'Feedback submited Successfully' });
					}
					else {
						res.status(201).send({ data: {}, message: 'Something went wrong!' });
					}
				}
				else {
					res.status(201).send({ data: {}, message: 'You have already rated.' });
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