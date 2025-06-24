// ✅ Load environment variables
require('dotenv').config();

const admin = require("firebase-admin");

// ✅ Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

// ✅ Export it to use in other files
module.exports = admin;
