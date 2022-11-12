import * as functions from "firebase-functions";
import { nft } from "./nft";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createNFT = functions.database
  .ref(`/games/{gameId}/tags/{tagId}`)
  .onCreate((snapshot, context) => {
    const data = snapshot.val();
    const base64 = data.image.uri;
    
  });

  