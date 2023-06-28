import { createTransport } from "nodemailer";

// sendEmail function takes 3 parameters
const sendEmail = async (email, subject, mailContent) => {
	try {
		const transporter = createTransport({
			service: "Gmail",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASS,
			},
		});

		// Tạo mã xác nhận

		const mailOptions = {
			from: process.env.EMAIL,
			to: email,
			subject: subject,
			html: mailContent,
		};

		await transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		});
	} catch (error) {
		console.log(error);
	}
};

export default sendEmail;
