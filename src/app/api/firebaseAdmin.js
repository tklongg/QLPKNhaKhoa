import { initializeApp, credential as _credential } from "firebase-admin";

import serviceAccount from "../../../library-1092e-firebase-adminsdk-e8jln-314b9cc21b.json";

initializeApp({
    credential: _credential.cert(serviceAccount),
    databaseURL: "https://library-1092e-default-rtdb.asia-southeast1.firebasedatabase.app"
});