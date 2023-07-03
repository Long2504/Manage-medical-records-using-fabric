const mailResgist = (name, confirmationCode) => `<h1>Email xác thực</h1>
<h2>Chào ${name}</h2>
<p>Chào mừng bạn đến với ứng dụng HealthCare</p>
<p>Để hoàn thành xác thực tài khoản, bạn hãy nhập mã OTP sau vào ứng dụng: <span style="color: #4CAF50;font-size: 20px">${confirmationCode}</span></p>
</div>`;


// const mailResgist = (name, confirmationCode) =>
// 	`
// <div style="background-color: #f2f2f2; font-family: Arial, sans-serif;">
// 	<div style="width: 600px;margin: 0 auto; border: 1px solid #ddd;display: flex;flex-direction: column">
// 		<div style="padding-top: 20px;padding-bottom: 20px;display:flex;justify-content: center;align-items: center;width: 100%;height: 50px;background-color: #00867E;">
// 			<h1 style="color: #ffff;">ỨNG DỤNG HEALTHCARE</h1>
// 		</div>
// 		<div style="width: 100%;height: 500px;display: flex;justify-content: center;align-items: center;flex-direction: column;">
// 			<h1 style="text-align: center; color: #333;">Đăng ký tài khoản</h1>
// 			<p>Xin chào ${name} </p>
// 			<p>Chào mừng bạn đến với ứng dụng HealthCare</p>
// 			<p>Để hoàn thành xác thực tài khoản, bạn hãy nhập mã OTP sau vào ứng dụng:</p>
// 			<div style=" background-color: #fff; padding:20px 30px; border-radius: 5px; margin-bottom: 20px;">
// 				<h3 style="font-size: 24px; color: #333; margin-bottom: 20px;">Mã OTP: <span style="color: #4CAF50;">${confirmationCode}</span></h3>
// 			</div>
// 					<p style="width: 560px;">Đừng chia sẻ mã OTP này với bất kỳ ai. Hệ thống Y tế HealthCare rất coi trọng vấn đề bảo mật tài khoản của bạn.</p><p style="margin-top: 40px;">Trân trọng,đội ngũ hỗ trợ</p>
// 		</div>
// 	</div>
// </div>`;

const mailForgot = (
	name,
	confirmationCode
) => `<h1>Email xác thực cài lại mật khẩu mới</h1>
<h2>Chào ${name}</h2>
<p>Để hoàn thành xác thực tài khoản, bạn hãy nhập mã OTP sau vào ứng dụng: <span style="color: #4CAF50;font-size: 20px">${confirmationCode}</span></p>
</div>`;


// const mailForgot = (
// 	name,
// 	confirmationCode
// ) => `<h1>Reset your Hospital password</h1>
// <h2>Hello ${name}</h2>
// <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
// <p>${confirmationCode}</p>
// </div>`;

export default { mailResgist, mailForgot };
