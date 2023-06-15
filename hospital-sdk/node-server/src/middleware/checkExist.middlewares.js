import handleError from "./error.middewares.js";
export const checkExist = (model, field) => async (req, res, next) => {
	try {
		const value = req.body[field];
		const data = await model.findOne({ [field]: value });
		if (!data) {
			return res.status(404).send({ message: `${model} Not found.` });
		}
		next();
	} catch (error) {
		handleError(500, error, res);
	}
};

export const checkExistById = (model, field) => async (req, res, next) => {
	try {
		const value = req.body[field];
		const data = await model.findById(value);
		console.log(data);
		if (!data) {
			console.log("not found");
			return res.status(404).send({ message: `${field} Not found.` });
		}
		next();
	} catch (error) {
		handleError(500, error, res);
	}
};
