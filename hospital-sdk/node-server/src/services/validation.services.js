const checkModelExits = async (model, field, value) => {
	const data = await model.findOne({ [field]: value });
	if (!data) {
		return {
			message: `The ${field} is not found`,
		};
	}
	return;
};

export default {
	checkModelExits,
};
