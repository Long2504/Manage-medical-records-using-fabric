import Button from 'react-bootstrap/Button';
function CreateMedical() {
  return (
    <div>
      <h1>Create Medical</h1>
      <Button variant="success">Xác nhận</Button>
      <Button variant="danger">Hủy bỏ</Button>
      <div>
        <p>Thông tin bệnh nhân</p>
        <div style={{ display: 'flex' }}>
          <div>
            <p>Họ tên</p>
            <p>Ngày sinh</p>
            <p>Giới tính</p>
            <p>Địa chỉ</p>
            <p>Số điện thoại</p>
            <p>Mô tả của bệnh nhân</p>
          </div>
          <div>
            <p>Nguyễn Văn A</p>
            <p>01/01/1999</p>
            <p>Nam</p>
            <p>Địa chỉ</p>
            <p>0123456789</p>
            <p>ấdfasd</p>
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default CreateMedical;