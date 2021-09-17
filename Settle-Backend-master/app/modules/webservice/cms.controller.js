const cmsRepo = require('cms/repositories/cms.repository');
class CmsController {
	constructor() { 
	}
	/* @Method: list
	// @Description: CMS list
	*/
	async list (req, res) {
		try {
			const cms = await cmsRepo.getAllByField({"status":"Active","isDeleted":false});
			if(!_.isEmpty(cms)){
				res.status(200).send({data: cms,message: 'Cms fetched Successfully'});
			}
			else{
				res.status(201).send({data: [],message: 'Cms Not Found'});
			}
		}
		catch (error) {
			res.status(500).send({message:error.message});
		}
	}

	/* @Method: details
	// @Description: CMS details
	*/
	async details (req, res) {
		try {
			const cms = await cmsRepo.getByField({"status":"Active","isDeleted":false, 'slug':req.params.slug});
			if(cms){
				res.status(200).send({data: cms,message: 'Cms fetched Successfully'});
			}
			else{
				res.status(201).send({data: [],message: 'Cms Not Found'});
			}
		}
		catch (error) {
			res.status(500).send({message:error.message});
		}
	}
}
module.exports = new CmsController();