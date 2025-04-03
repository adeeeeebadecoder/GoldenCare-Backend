const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase-service-account.json"); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = async (deviceToken, title, body) => {
  const message = {
    token: deviceToken,
    notification: {
      title,
      body,
    },
  };

  try {
    await admin.messaging().send(message);
    console.log("Push Notification Sent!");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

module.exports = { sendPushNotification };
