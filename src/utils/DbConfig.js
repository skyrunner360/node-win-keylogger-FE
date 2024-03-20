import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
    apiKey: import.meta.env.FIRE_API_KEY,
    authDomain: import.meta.env.FIRE_AUTH_DOMAIN,
    databaseURL: import.meta.env.FIRE_DB_URL,
    projectId: import.meta.env.FIRE_PROJECT_ID,
    storageBucket: import.meta.env.FIRE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.FIRE_MSG_ID,
    appId: import.meta.env.FIRE_APP_ID,
    measurementId: import.meta.env.FIRE_MEASURE_ID
};

initializeApp(firebaseConfig)

export const getStoredFileLink =async  (filename) => {
    const storage = getStorage();
    const pathReference = storageRef(storage, filename);
    let url =  getDownloadURL(pathReference).then((urlResult) => {return urlResult});   
    return await url;
    
}