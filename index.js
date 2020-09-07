const express = require('express')
const nodemailer = require("nodemailer");
const port = 4210
const app = express()

require('dotenv').config()

// Initialize the express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"))

// Add CORS headers in development
if (process.env.ENVIRONMENT === 'development') {
  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
  });
}

// When hitting this route, send the mails to the received email adresses
app.post("/sendmail", (req, res) => {

  // Destucture the req.body and prepare the nevessary data
  const { emailAdresses, activity, emailText } = req.body
  const receivers = emailAdresses.map(email => email.adress)
  const emailContent =
  `
  <p>Hey there! You've been invited to an activity</p>
  <p><b>${activity.activity}</b></p>
  <p>${emailText}</p>
  `

  async function send() {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_ADRESS,
      port: process.env.PORT,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      },
    });

    // Only send mails if the environment is not marked as production
    if (process.env.ENVIRONMENT === 'development') {
      res.send({ msg: "At this moment, " + receivers.length + " mails will be sent in a productive node environment" });
    } else /* if ENVIRONMENT === 'production' */ {
      try {
        // Send out the mails with defined transport object
        const info = await transporter.sendMail({
          from: process.env.USER,
          to: receivers,
          subject: "You have been invited to a time-killer",
          html: emailContent,
        });

        // When it's done, send out an email  
        res.send({ msg: "📧 Messages have been sent to " + receivers.length + " people" });

        // If there's an error, send an error message back to the client
      } catch (error) {

        res.status(500).send({ msg: "Something went wrong while dispatching the email transporter, please try again later" });
        console.error(error)
      }
      
    } // /else
  }
  // Execute the function here
  send().catch(console.error);
});

app.listen(port, () => console.log(`Example app listening on port 4210!`))