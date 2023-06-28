const mailResgist = (name, confirmationCode) => `<h1>Email Confirmation</h1>
<h2>Hello ${name}</h2>
<p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
<p>${confirmationCode}</p>
</div>`;

const mailForgot = (
	name,
	confirmationCode
) => `<h1>Reset your Hospital password</h1>
<h2>Hello ${name}</h2>
<p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
<p>${confirmationCode}</p>
</div>`;

export default { mailResgist, mailForgot };
