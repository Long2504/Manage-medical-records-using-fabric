import Auth from "../../utils/helper/auth.helper";

function InforDoctor() {
  const inforDoctor = Auth.getInfo();

  return (
    <div className="info-doctor-page">
      <h1>Thông tin bác sĩ</h1>
      <div >
        <div className="info-doctor-page__name">
          <div>

          </div>
          <p>{inforDoctor?.doctor.name}</p>
        </div>
        <p>{inforDoctor?.doctor.phone}</p>
        <p>{inforDoctor.email}</p>
        <p>{inforDoctor?.doctor.address}</p>
        <p>{inforDoctor?.doctor.description}</p>
        <div>
          <p>kinh nghiem</p>
          {
            inforDoctor?.doctor.experiences.map((item, index) => {
              return (
                <div key={index}>
                  <p>{item}</p>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  )
}
export default InforDoctor;