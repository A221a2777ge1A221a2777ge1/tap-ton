import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const nextServer = functions.https.onRequest(async (req, res) => {
  res.status(200).send('Next.js server placeholder - use Hosting rewrites with SSR adapter if required.');
});

