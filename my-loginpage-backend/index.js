// Load Firebase Admin
const admin = require('./firebaseAdmin');

// Example usage: verify Firebase ID token (if needed)
admin.auth().listUsers().then((list) => {
  console.log("Total users:", list.users.length);
});

