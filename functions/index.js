const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// A simple 'hello world' function to verify setup
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Evana Tycoon Firebase Cloud Functions!");
});

/**
 * TODO: Implement the secure executePayouts function.
 * This function will be triggered by a secure call from the admin panel.
 * It will read all user balances, calculate proportional payouts, and then
 * use a TON SDK with a securely stored private key to send the TON coin.
 */
