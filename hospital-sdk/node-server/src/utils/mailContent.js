const mailResgist = (name, confirmationCode) => `<h1>Email Confirmation</h1>
<h2>Hello ${name}</h2>
<p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
<a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
</div>`;

const mailForgot = (
	name,
	confirmationCode
) => `<h1>Reset your Hospital password</h1>
<h2>Hello ${name}</h2>
<p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
<a href=http://localhost:3000/password_reset/${confirmationCode}> Click here</a>
</div>`;

export default { mailResgist, mailForgot };
