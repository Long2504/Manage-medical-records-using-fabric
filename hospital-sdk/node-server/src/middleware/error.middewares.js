const handleError = async (code, error, res) => {
	console.error(error);
	const errorMessage = error.toString();
	if (errorMessage == "[object Object]") {
		return res.status(code).send(error);
	}

	return res.status(code).send(errorMessage);
};

export default handleError;
