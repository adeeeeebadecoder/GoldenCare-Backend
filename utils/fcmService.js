const admin = require("firebase-admin");

// const sendPushNotification = async (fcmToken, title, body) => {
//   const message = {
//     notification: { title, body },
//     token: fcmToken,
//   };

//   try {
//     const response = await admin.messaging().send(message);
//     console.log("Push Notification sent:", response);
//   } catch (error) {
//     console.error("Push Notification Error:", error);
//   }
// };
const sendPushNotification = async (fcmToken, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    token: fcmToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Push Notification sent:", response);
  } catch (error) {
    console.error("Push Notification Error:", error);
  }
};



module.exports = { sendPushNotification };
