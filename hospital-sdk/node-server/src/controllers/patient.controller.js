
import handleError from '../middleware/error.middewares.js';
import patientServices from '../services/patient.services.js';
const updateDataPatient = async (req, res) => {
  try {
    const data = {
      _id: req.body._id,
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      phone: req.body.phone,
      address: req.body.address,
      userID: req.body.userId,
    }
    const errorCheckField = await patientServices.checkFieldUpdateDataPatient(data);
    if (errorCheckField.error) return res.status(errorCheckField.status).send({ message: errorCheckField.error });
    const patient = await patientServices.updateDataPatient(data);
    return res.status(200).send(patient);

  } catch (error) {
    handleError(500, error, res);
  }
};



export default {
  updateDataPatient
};
