const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'minhtran21301@gmail.com',
    subject: 'Welcome mail',
    text: `Welcome to our family, ${name}. Please contact us if there is anything wrong.`,
  });
};

const cancelServiceEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'minhtran21301@gmail.com',
    subject: 'Goodbye mail',
    text: `Thank you for using our service, ${name}. Hope to see you again soon.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  cancelServiceEmail,
};
