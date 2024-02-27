const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { initializeApp, applicationDefault } = require("firebase-admin/app");

const { getMessaging } = require("firebase-admin/messaging");

process.env.GOOGLE_APPLICATION_CREDENTIALS;

initializeApp({
  credential: applicationDefault(),
});

const app = express();

app.use(cors());
app.use(express.json());


app.post("/sendNotification", function (req, res) {
  // This registration token comes from the client FCM SDKs.
  const authHeader = req.headers['authorization'];
  // console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  console.log("recieved registration token: " + token);
  const registrationToken = token;

  const message = {
    notification: {
      title: "Don't Miss Out!",
      body: "Exclusive 24-Hour Sale: Get up to 50% off on your favorite items. Shop now and save big!",
    },
    token: registrationToken,
  };

  //  sending notification to the client side
  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({ message: 'Notification sent successfully', response });
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res.status(500).json({ error: 'Failed to send notification', message: error.message });
    });
});

app.use("*", (req, res) => {
  res.send("Server is running at http://localhost 8080");
});

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
