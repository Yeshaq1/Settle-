const transactionRepo = require('transaction/repositories/transaction.repository');
const restaurantRepo = require("restaurant/repositories/restaurant.repository");
var moment = require('moment');
const mongoose = require('mongoose');
class CmsController {
	constructor() {
	}
	/* @Method: list
	// @Description: Transaction list
	*/
	async list(req, res) {
		try {
			// const restaurant = await restaurantRepo.getById(req.user._id);
			// if (!_.isEmpty(restaurant)) {

			const transaction = await transactionRepo.getAllByFieldAPI(req);

			if (!_.isEmpty(transaction) && transaction.length > 0) {
				res.status(200).send({ data: transaction, message: 'Order list fetched Successfully' });
			}
			else {
				res.status(201).send({ data: [], message: 'Orders Not Found' });
			}
			// }
			// else {
			// 	return { status: 201, data: [], "message": 'No user found' };
			// }
		}
		catch (error) {
			res.status(500).send({ message: error.message });
		}
	}

}
module.exports = new CmsController();